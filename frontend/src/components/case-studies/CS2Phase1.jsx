import React from "react";
import { Terminal } from "lucide-react";

const CS2Phase1 = () => {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-medium font-['Outfit'] text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2 mb-6">
          Phase 1: Mock Authentication & IP Rate Limiting
        </h1>
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p>
            Before introducing a database, we built a dummy API that mocked authentication latency using a simple <code>setTimeout()</code>. This isolated the testing environment to focus strictly on network-layer constraints and application firewalls.
          </p>
          <p>
            We protected the API using the <code>express-rate-limit</code> middleware configured to allow a maximum of 10 requests per minute per IP address.
          </p>

          <div className="bg-[#111111] rounded-xl p-4 my-6 border border-gray-800 shadow-inner overflow-hidden">
            <div className="flex items-center gap-2 mb-3 px-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono text-gray-400">server.js (Phase 1 Code)</span>
            </div>
            <pre className="text-gray-300 text-sm font-mono whitespace-pre-wrap overflow-x-auto bg-black/50 p-4 rounded-lg">
<span className="text-purple-400">const</span> rateLimit = <span className="text-blue-400">require</span>(<span className="text-green-400">'express-rate-limit'</span>);{`\n\n`}
<span className="text-gray-500">{`// 1. Configure the Firewall`}</span>{`\n`}
<span className="text-purple-400">const</span> limiter = <span className="text-yellow-200">rateLimit</span>({"{\n"}
  windowMs: <span className="text-orange-400">60</span> * <span className="text-orange-400">1000</span>, <span className="text-gray-500">{"// 1 minute"}</span>{"\n"}
  max: <span className="text-orange-400">10</span>, <span className="text-gray-500">{"// Limit each IP to 10 requests per window"}</span>{"\n"}
  message: <span className="text-green-400">'Too many requests from this IP, please try again later.'</span>{"\n"}
{"});\n\n"}
app.<span className="text-yellow-200">use</span>(<span className="text-green-400">'/api/'</span>, limiter);{`\n\n`}
<span className="text-gray-500">{`// 2. Mock Authentication`}</span>{`\n`}
app.<span className="text-yellow-200">post</span>(<span className="text-green-400">'/api/auth/mock-login'</span>, (req, res) {"=>"} {"{\n"}
  <span className="text-yellow-200">setTimeout</span>(() {"=>"} {"{\n"}
    res.<span className="text-yellow-200">json</span>({"{"} success: true, token: "mock_jwt_123" {"}"});{"\n"}
  {"},"} <span className="text-orange-400">200</span>); <span className="text-gray-500">{"// Simulate 200ms latency"}</span>{"\n"}
{"});"}
            </pre>
          </div>

          <div className="relative rounded-2xl p-6 my-6 group">
            <div className="absolute inset-0 rounded-2xl bg-white dark:bg-secondary/90 border border-gray-200 dark:border-white/5 shadow-[inset_0_1px_1px_rgba(0,0,0,0.05)] dark:shadow-top z-0"></div>
            <div className="relative z-10">
              <h4 className="mt-0 text-gray-900 dark:text-white">Test 1.1: Rate Limiting Enabled</h4>
              <p className="mb-0 text-gray-700 dark:text-gray-300">
                When we launched the AWS Lambda Swarm, the firewall successfully detected that multiple requests were originating from the same Lambda IP addresses. The server immediately began returning <code>HTTP 429 Too Many Requests</code>, dropping the attack completely.
              </p>
            </div>
          </div>

          <div className="relative rounded-2xl p-6 my-6 group">
            <div className="absolute inset-0 rounded-2xl bg-white dark:bg-secondary/90 border border-gray-200 dark:border-white/5 shadow-[inset_0_1px_1px_rgba(0,0,0,0.05)] dark:shadow-top z-0"></div>
            <div className="relative z-10">
              <h4 className="mt-0 text-gray-900 dark:text-white">Test 1.2: Rate Limiting Disabled</h4>
              <p className="mb-0 text-gray-700 dark:text-gray-300">
                By removing the rate limiter, we proved that the raw EC2 instance could comfortably process hundreds of concurrent requests. The <code>setTimeout</code> functions resolved cleanly, resulting in a 100% success rate.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CS2Phase1;
