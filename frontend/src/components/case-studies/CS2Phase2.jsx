import React from "react";

const CS2Phase2 = () => {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-medium font-['Outfit'] text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2 mb-6">
          Phase 2: Database Connection Pool Exhaustion
        </h1>
        <div className="prose prose-slate dark:prose-invert max-w-none mb-8">
          <p>
            In the final phase, we replaced the mocked latency with real-world,
            CPU-intensive operations and an actual database connection to a
            MongoDB Atlas cluster.
          </p>
          <p>
            We artificially introduced two critical chokepoints to ensure the
            system would collapse under load:
          </p>
          <ul>
            <li>
              <strong>maxPoolSize: 10</strong> - We configured Mongoose to
              maintain a maximum of 10 concurrent database connections.
            </li>
            <li>
              <strong>bcrypt (10 rounds)</strong> - Every login request forces
              the server to compute a heavy cryptographic hash, blocking the
              single thread.
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">
            The DB Bottleneck Code:
          </h3>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
            {`const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    // Intentional Bottleneck:
    maxPoolSize: 10, // Only 10 concurrent connections allowed!
    serverSelectionTimeoutMS: 5000 // Timeout quickly if pool is full
  });
};`}
          </pre>
        </div>

        <div className="mb-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">
            The CPU Bottleneck Code:
          </h3>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
            {`const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  // Intentional CPU Blocking:
  // 10 salt rounds blocks the Event Loop for ~100ms per request
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  // Wait in line for 1 of the 10 DB connections
  const user = await User.findOne({ email });
};`}
          </pre>
        </div>

        <div className="mb-8">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">
            Architecture Flow:
          </h3>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded text-sm text-gray-800 dark:text-gray-200 overflow-x-auto whitespace-pre">
            {`[AWS Lambda Swarm] 
       | (50 Virtual Users)
       v
[EC2 Instance (Firewall OFF)]
       | 
       v
[Node.js Express App] <--- [CPU Bottleneck: Bcrypt hashing]
       |
       v
[MongoDB Atlas] <--- [DB Bottleneck: maxPoolSize 10]`}
          </pre>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none mt-12">
          <h3 className="font-bold text-gray-900 dark:text-white">
            The Catastrophic Result
          </h3>
          <p>
            When the orchestrator unleashes 50 concurrent Virtual Users, they
            generate thousands of requests per second. The first 10 requests
            immediately consume all available MongoDB connections.
            Simultaneously, the Node.js Event Loop is entirely blocked by the
            heavy <code>bcrypt.hash()</code> operations. This prevents the
            server from asynchronously closing old connections or rejecting new
            ones gracefully. The connection queue freezes, and thousands of
            pending requests timeout, resulting in a cascade of errors.
          </p>

          <h3 className="font-bold text-gray-900 dark:text-white mt-8 mb-4">
            Post-Mortem: Analyzing the Metrics
          </h3>
          <p className="mb-4">
            Over a precise 10-second window, we fired a sustained barrage of <strong>11,985 authentication requests</strong> at the EC2 server using an AWS Lambda swarm (simulating 50 highly aggressive concurrent users). The outcome was completely binary and catastrophic:
          </p>
          <ul className="space-y-2 mb-6">
            <li><strong>Successful Authentications:</strong> Only <strong>85 requests</strong> managed to secure a database connection, pass the bcrypt algorithm, and return a 200 OK status. That is a success rate of just <strong>0.7%</strong>.</li>
            <li><strong>Catastrophic Failures:</strong> A staggering <strong>11,900 requests</strong> timed out or failed to establish a connection entirely.</li>
            <li><strong>Sustained Latency:</strong> Even the 85 successful requests suffered an average target latency of <strong>1,141ms</strong> (over a full second per request), completely shattering acceptable SLA standards for authentication APIs.</li>
          </ul>

          <h3 className="font-bold text-gray-900 dark:text-white mt-8 mb-4">
            Is 85 successful requests a bug?
          </h3>
          <p className="mb-4">
            <strong>No! It is exactly what we designed the code to do.</strong>
          </p>
          <p className="mb-6">
            A t3.micro EC2 instance can easily handle thousands of requests per
            second if it's just returning a simple JSON response. The reason it
            only handled 85 requests is because we intentionally sabotaged the
            code in Phase 2 to demonstrate how bad architecture destroys good
            hardware.
          </p>

          <h4 className="font-bold text-gray-900 dark:text-white mb-3">
            The Mathematical Breakdown of the Crash:
          </h4>
          <ul className="space-y-3">
            <li>
              <strong>The Bcrypt CPU Block:</strong> In <code>server.js</code>,
              we used <code>bcrypt.compare(password, user.password)</code>.
              Bcrypt is mathematically designed to be slow. On a t3.micro, one
              bcrypt comparison takes about ~100 milliseconds of pure CPU time.
            </li>
            <li>
              <strong>The Node.js Single Thread:</strong> Node.js runs on a
              single thread. If one request takes 100ms of CPU time, that thread
              can mathematically only process exactly 10 requests per second.
            </li>
            <li>
              <strong>The 10-Second Test:</strong> The load test ran for exactly
              10 seconds. 10 requests/second × 10 seconds = ~100 theoretical
              maximum requests.
            </li>
            <li>
              <strong>The Database Choke:</strong> We also added{" "}
              <code>maxPoolSize: 10</code> to Mongoose, forcing those successful
              requests to wait in line.
            </li>
          </ul>

          <p className="mt-6 mb-8">
            Because of that 100ms CPU freeze, the other 11,900 requests were
            completely ignored by Node.js. They sat in the TCP queue waiting to
            be processed until the 10-second timer ran out, and they all died as
            Timeout or 500 errors.
          </p>

          <h3 className="font-bold text-gray-900 dark:text-white mt-8 mb-2">
            The Silent Killer: Why didn't pm2 log the errors?
          </h3>
          <p>
            The most terrifying aspect of this failure is that{" "}
            <code>pm2 logs</code> remained completely silent while 11,900
            requests failed.
          </p>
          <p>
            Because Node.js was stuck doing heavy math (bcrypt) on the first few
            requests, it physically could not pause to process the other 11,900
            requests waiting at the door. Those requests did not fail{" "}
            <em>inside</em> the Express app—they timed out at the network (TCP)
            level because Node.js ignored them.
          </p>
          <p>
            Since they never made it into the <code>try/catch</code> block of
            the code, <code>console.error("DB Login Error")</code> was never
            triggered. If a DevOps engineer only looked at the application logs,
            they would think the server was perfectly healthy and receiving no
            traffic, while in reality, the CPU was pinned at 100% and dropping
            thousands of users.
          </p>
        </div>
      </section>
    </div>
  );
};

export default CS2Phase2;
