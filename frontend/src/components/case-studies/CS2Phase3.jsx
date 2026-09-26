import React from "react";

const CS2Phase3 = () => {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold font-['Outfit'] text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2 mb-6">
          Phase 3: The Fix (Master Plan)
        </h2>
        <div className="prose prose-slate dark:prose-invert max-w-none mb-8">
          <p>
            In Phase 2, we witnessed a catastrophic system collapse. A massive wave of 11,985 requests completely obliterated our single-threaded Node.js server, resulting in 11,900 dropped connections and a crippled database pool.
          </p>
          <p>
            Now, it's time to fix it. We are going to incrementally apply enterprise-grade scaling patterns to our <code>t3.micro</code> instance, load-testing the server after each change to scientifically measure the impact of our architectural decisions.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">The Implementation Roadmap</h3>
          <ul className="space-y-4">
            <li>
              <strong>Phase 3.1: PM2 Clustering (Horizontal Scaling on a Single Box)</strong>
              <br />
              <span className="text-gray-600 dark:text-gray-400">Node.js is single-threaded, but our t3.micro has 2 vCPUs. By enabling PM2 Cluster mode, we will spawn two Node.js processes, instantly doubling our bcrypt hashing capacity.</span>
            </li>
            <li>
              <strong>Phase 3.2: Redis Rate Limiting (The Shield)</strong>
              <br />
              <span className="text-gray-600 dark:text-gray-400">We will re-introduce the rate limiter from Phase 1, but this time powered by Redis instead of memory. This allows us to instantly drop malicious requests without waking up the main database.</span>
            </li>
            <li>
              <strong>Phase 3.3: DB Connection Pooling Optimization</strong>
              <br />
              <span className="text-gray-600 dark:text-gray-400">We will adjust our MongoDB <code>maxPoolSize</code> and introduce a queue mechanism to prevent the TCP connection drops that caused our silent 500 errors.</span>
            </li>
            <li>
              <strong>Phase 3.4: The Final Comparison</strong>
              <br />
              <span className="text-gray-600 dark:text-gray-400">We will run a final AWS Lambda Swarm load test against the fully optimized architecture and compare the metrics side-by-side with Phase 2's catastrophic failure.</span>
            </li>
          </ul>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg border border-gray-200 dark:border-gray-800 mt-12">
          <p className="text-gray-700 dark:text-gray-300 font-medium mb-0">
            Ready to start scaling? Click on <strong>Phase 3.1: PM2 Clustering</strong> in the sidebar to begin our first infrastructure upgrade!
          </p>
        </div>
      </section>
    </div>
  );
};

export default CS2Phase3;
