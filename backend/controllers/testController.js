const os = require('os');
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");
const LoadTest = require("../models/LoadTest");

exports.runLoadTest = async (req, res) => {
  try {
    const { url, method = 'GET', headers = '', body = '', virtualUsers, duration } = req.body;
    const userId = req.user.id;

    if (!url || !virtualUsers || !duration) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    // Create the test record
    const loadTest = new LoadTest({
      user: userId,
      url,
      method,
      headers,
      body,
      virtualUsers,
      duration,
      status: "running",
    });
    await loadTest.save();

    // Start execution asynchronously (do not block the response)
    executeK6(loadTest._id, url, method, headers, body, virtualUsers, duration);

    res.status(202).json({
      message: "Load test started successfully",
      testId: loadTest._id,
    });
  } catch (error) {
    console.error("Error starting load test:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const executeK6 = async (testId, targetUrl, method, headers, body, virtualUsers, durationSec) => {
  try {
    const scriptPath = path.join(os.tmpdir(), `run-${testId}.js`);
    const resultFile = path.join(os.tmpdir(), `result-${testId}.json`);

    // Parse headers safely
    let parsedHeaders = {};
    if (headers) {
      try {
        parsedHeaders = JSON.parse(headers);
      } catch (e) {
        console.error("Invalid headers JSON");
      }
    }

    // Generate custom k6 script
    const scriptContent = `
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter, Trend } from 'k6/metrics';

export let options = {
  vus: ${virtualUsers},
  duration: '${durationSec}s',
};

const status400 = new Counter('status_400');
const status401 = new Counter('status_401');
const status403 = new Counter('status_403');
const status404 = new Counter('status_404');
const status429 = new Counter('status_429');
const status500 = new Counter('status_500');
const status502 = new Counter('status_502');
const status503 = new Counter('status_503');
const status504 = new Counter('status_504');
const statusOther = new Counter('status_other');

// Custom metric to track the REAL latency (ignoring Lambda cold starts)
const trueLatency = new Trend('true_req_duration');

export default function () {
  const swarmUrl = 'https://i7e2te5i7kn3zeay2whnphnayu0bchlu.lambda-url.ap-south-1.on.aws/';
  
  const targetPayload = ${method !== 'GET' && method !== 'HEAD' ? (body ? JSON.stringify(body) : 'null') : 'null'};
  
  // Package the request instructions for the Swarm Node
  const swarmPayload = JSON.stringify({
    url: '${targetUrl}',
    method: '${method}',
    headers: ${JSON.stringify(parsedHeaders)},
    payload: targetPayload
  });

  const params = {
    headers: { 'Content-Type': 'application/json' },
  };

  // Blast the Swarm Node
  const res = http.post(swarmUrl, swarmPayload, params);
  
  let targetStatus = 0;
  
  if (res.status === 200) {
    try {
      const data = JSON.parse(res.body);
      targetStatus = data.status;
      
      // Record the true latency returned by the stopwatch inside the Lambda!
      if (data.durationMs) {
        trueLatency.add(data.durationMs);
      }
    } catch(e) {}
  }
  
  check(res, {
    'swarm connected': (r) => r.status === 200,
    'target status 2XX': () => targetStatus >= 200 && targetStatus < 300,
  });
  
  // Record the actual target's status codes for the diagnostics UI
  if (targetStatus >= 400) {
    switch(targetStatus) {
      case 400: status400.add(1); break;
      case 401: status401.add(1); break;
      case 403: status403.add(1); break;
      case 404: status404.add(1); break;
      case 429: status429.add(1); break;
      case 500: status500.add(1); break;
      case 502: status502.add(1); break;
      case 503: status503.add(1); break;
      case 504: status504.add(1); break;
      default: statusOther.add(1); break;
    }
  }

  sleep(0.1);
}
`;

    // Write temporary script
    fs.writeFileSync(scriptPath, scriptContent);

    // Command to run k6
    const k6Process = spawn("k6", ["run", `--summary-export=${resultFile}`, scriptPath]);

    let rawLogs = "";

    k6Process.stdout.on("data", (data) => {
      const output = data.toString();
      rawLogs += output;
      
      // Look for progress like [  33% ]
      const match = output.match(/\[\s*(\d+)%\s*\]/);
      if (match && match[1]) {
        const progress = parseInt(match[1], 10);
        // Fire and forget update
        LoadTest.findByIdAndUpdate(testId, { progress }).catch(() => {});
      }
    });

    k6Process.stderr.on("data", (data) => {
      rawLogs += data.toString();
    });

    k6Process.on("close", async (code) => {
      let status = "completed";
      let errorMessage = "";

      if (code !== 0) {
        console.error(`k6 execution failed with code ${code}`);
        status = "failed";
        errorMessage = `Process exited with code ${code}.\nLogs: ${rawLogs.substring(0, 1000)}`;
      }

      // Parse result file
      let metrics = {};
      let rawOutput = {};

      try {
        if (fs.existsSync(resultFile)) {
          const rawData = fs.readFileSync(resultFile, "utf8");
          const resultJson = JSON.parse(rawData);

          rawOutput = resultJson;

          const reqs = resultJson.metrics.http_reqs?.count || 0;
          const reqRate = resultJson.metrics.http_reqs?.rate || 0;
          
          // Use our custom trueLatency metric! If it doesn't exist, fallback to k6's http_req_duration
          const p95 = resultJson.metrics.true_req_duration?.["p(95)"] || resultJson.metrics.http_req_duration?.["p(95)"] || 0;
          const avg = resultJson.metrics.true_req_duration?.avg || resultJson.metrics.http_req_duration?.avg || 0;

          // Extract Error Details and calculate true target error rate
          const errorDetails = [];
          const statusMap = {
            status_400: "Bad Request",
            status_401: "Unauthorized",
            status_403: "Forbidden",
            status_404: "Not Found",
            status_429: "Too Many Requests",
            status_500: "Internal Server Error",
            status_502: "Bad Gateway",
            status_503: "Service Unavailable",
            status_504: "Gateway Timeout",
            status_other: "Other Error"
          };

          let targetFails = 0;
          for (const [key, msg] of Object.entries(statusMap)) {
            const count = resultJson.metrics[key]?.count || 0;
            if (count > 0) {
              targetFails += count;
              const code = key === 'status_other' ? 0 : parseInt(key.replace('status_', ''));
              errorDetails.push({ code, count, message: msg });
            }
          }

          const errorRate = reqs > 0 ? (targetFails / reqs) * 100 : 0;

          metrics = {
            totalRequests: reqs,
            throughput: reqRate,
            p95Latency: p95,
            avgLatency: avg,
            errorRate: errorRate,
          };

          // Cleanup result file
          fs.unlinkSync(resultFile);
        } else {
          if (status !== "failed") {
            status = "failed";
            errorMessage = "Result file was not generated by k6";
          }
        }
      } catch (parseError) {
        console.error("Error parsing k6 results:", parseError);
        status = "failed";
        errorMessage = parseError.message;
      }

      // Cleanup script file
      try {
        if (fs.existsSync(scriptPath)) fs.unlinkSync(scriptPath);
      } catch (e) {
        console.error("Failed to delete temp script:", e);
      }

      // Update test record
      const updateData = {
        status,
        metrics,
        rawOutput,
        errorMessage,
      };
      if (typeof errorDetails !== 'undefined') {
        updateData.errorDetails = errorDetails;
      }

      await LoadTest.findByIdAndUpdate(testId, updateData);
    });
  } catch (err) {
    console.error("K6 Orchestrator error:", err);
    await LoadTest.findByIdAndUpdate(testId, {
      status: "failed",
      errorMessage: err.message,
    });
  }
};

exports.getTestHistory = async (req, res) => {
  try {
    const tests = await LoadTest.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getTestById = async (req, res) => {
  try {
    const test = await LoadTest.findOne({ _id: req.params.id, user: req.user.id });
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }
    res.json(test);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
