import React from "react";

const CS2Phase3_2 = () => {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-medium font-['Outfit'] text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2 mb-6">
          Phase 3.2: Redis Rate Limiting (The Botnet Bypass)
        </h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none mb-8">
          <p>
            Since throwing more CPU cores at the problem didn't work, we decided to fall back to the strategy from Phase 1: <strong className="text-emerald-600 dark:text-emerald-400">Rate Limiting</strong>. 
          </p>
          <p>
            Because we are now running two Node processes in PM2 Cluster mode, we couldn't use the standard in-memory rate limiter (since memory isn't shared between processes). Instead, we installed <span className="text-indigo-600 dark:text-indigo-400 font-medium">Redis</span>—a blazing fast in-memory database—to centrally track the IP addresses of incoming requests across all CPU cores.
          </p>
          <p>
            We configured Redis to block any IP that makes more than 10 requests per minute.
          </p>
        </div>

        <div className="mb-6">
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
{`const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 requests max per IP
  store: new RedisStore({ ... }),
  message: { error: "Too many requests!" }
});`}
          </pre>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none mt-8">
          <p>
            With the Redis firewall engaged, we confidently launched the AWS Lambda Swarm. Our expectation was that exactly 10 requests would succeed, and the remaining 11,000+ would be instantly rejected by Redis with a <code>429 Too Many Requests</code>. 
          </p>
          <p>
            Here is what actually happened:
          </p>

          <h3 className="font-medium font-['Inter'] text-xl text-gray-900 dark:text-white mt-8 mb-4">
            Post-Mortem: Redis Load Test Metrics
          </h3>
          <p className="mb-4">
            Over the 10-second window, we fired <strong>11,780 authentication requests</strong>.
          </p>
          <ul className="space-y-2 mb-6">
            <li><strong>Successful Authentications:</strong> <strong>71 requests</strong> succeeded.</li>
            <li><strong>Catastrophic Failures:</strong> <strong>11,709 requests</strong> timed out completely.</li>
          </ul>

          <h3 className="font-medium font-['Inter'] text-xl text-gray-900 dark:text-white mt-8 mb-4">
            Wait, why did the server still crash?!
          </h3>
          <p className="mb-4">
            This is where load testing from a Cloud Swarm (instead of localhost) proves its worth. Our rate limiter was configured to allow <strong>10 requests per IP address</strong>. 
          </p>
          <p className="mb-4">
            But our AWS Swarm utilized <strong>50 distinct Virtual Users</strong>, and AWS Lambda assigned each of them a unique IP address.
          </p>
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-900/50 mb-6">
            <code className="text-red-700 dark:text-red-400 font-bold">50 Unique IPs × 10 Allowed Requests = 500 Requests passing through the firewall.</code>
          </div>
          <p className="mb-4">
            While Redis successfully blocked 11,280 requests, it allowed exactly 500 requests through to the backend. And as we learned in Phase 2, dumping 500 <code>bcrypt</code> hashes onto a <code>t3.micro</code> server in 10 seconds is enough to completely exhaust the Event Loop and lock up the MongoDB connection pool.
          </p>
          
          <p className="mt-6 font-medium">
            <strong>Conclusion:</strong> IP-based rate limiting is utterly defenseless against a distributed botnet. When attackers use thousands of different IP addresses, your firewall lets them all right through the front door.
          </p>
          <p className="text-emerald-600 dark:text-emerald-400 font-medium">
            To survive this, we must harden the actual bottleneck itself. Next, we move to Phase 3.3: Database Connection Pooling.
          </p>
        </div>
      </section>
    </div>
  );
};

export default CS2Phase3_2;
