import React from "react";

const CS2Phase3_1 = () => {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-medium font-['Outfit'] text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2 mb-6">
          Phase 3.1: PM2 Clustering (The False Hope)
        </h1>

        <div className="prose prose-slate dark:prose-invert max-w-none mb-8">
          <p>
            Node.js operates on a{" "}
            <span className="text-indigo-600 dark:text-indigo-400 font-medium">
              single thread
            </span>
            . By default, even if you deploy your application to a server with
            32 CPU cores, Node.js will only use exactly one of them.
          </p>
          <p>
            Our AWS <code>t3.micro</code> instance comes with{" "}
            <strong>2 vCPUs</strong>. So theoretically, by running Node.js in
            Cluster Mode, we can spawn a process on both cores and instantly
            double our capacity to calculate those heavy <code>bcrypt</code>{" "}
            hashes, right?
          </p>
          <p>We updated the server using PM2's cluster mode:</p>
        </div>

        <div className="mb-6">
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
            {`# Delete the single-thread process
sudo pm2 delete target-auth

# Start in Cluster Mode (spawns 1 process per CPU core)
sudo pm2 start server.js --name target-auth -i max`}
          </pre>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none mt-8">
          <p>
            With two Node.js workers online, we unleashed the 50 Virtual Users
            again. We expected to see double the success rate (around ~170
            successes). Instead, we got this:
          </p>

          <h3 className="font-medium font-['Inter'] text-xl text-gray-900 dark:text-white mt-8 mb-4">
            Post-Mortem: Cluster Mode Metrics
          </h3>
          <p className="mb-4">
            Over a precise 10-second window, we fired{" "}
            <strong>12,152 authentication requests</strong> at the dual-core EC2
            server.
          </p>
          <ul className="space-y-2 mb-6">
            <li>
              <strong>Successful Authentications:</strong> Only{" "}
              <strong>68 requests</strong> succeeded.
            </li>
            <li>
              <strong>Catastrophic Failures:</strong>{" "}
              <strong>12,084 requests</strong> timed out or failed.
            </li>
            <li>
              <strong>Sustained Latency:</strong> <strong>1,125ms</strong>{" "}
              average latency per request.
            </li>
          </ul>

          <h3 className="font-medium font-['Inter'] text-xl text-gray-900 dark:text-white mt-8 mb-4">
            Why did it fail? (The Cloud Reality Check)
          </h3>
          <p className="mb-4">
            Our results were virtually identical to Phase 2. Why didn't doubling
            the CPU cores double the performance?
          </p>
          <ul className="space-y-3">
            <li>
              <strong>AWS Burstable Instances:</strong> The{" "}
              <code>t3.micro</code> is a "burstable" instance. It gives you 2
              vCPUs, but restricts their baseline performance to just 10%. If
              you spike to 100% CPU, you spend "CPU Credits". When PM2 unleashed
              two Node processes running <code>bcrypt</code> simultaneously, it
              instantly drained the remaining CPU credits, causing AWS to
              throttle both cores down to a crawl.
              <div className="relative rounded-2xl p-2 mt-6 group">
                <div className="absolute inset-0 rounded-2xl bg-white dark:bg-secondary/90 border border-gray-200 dark:border-white/5 shadow-[inset_0_1px_1px_rgba(0,0,0,0.05)] dark:shadow-top z-0"></div>
                <div className="relative z-10 rounded-xl overflow-hidden shadow-sm">
                  <img
                    src="/image.png"
                    alt="AWS EC2 CPU Metric Graph"
                    className="w-full h-auto object-cover block"
                  />
                </div>
              </div>
            </li>
            <li>
              <strong>The DB Pool Contention:</strong> By running two Node
              processes, we now have two completely separate Mongoose connection
              pools (10 connections each) fighting for resources on the same
              tiny server.
            </li>
          </ul>

          <p className="mt-6 font-medium">
            <strong>Conclusion:</strong> Throwing more compute power
            (Vertical/Horizontal Scaling) at a fundamentally blocked
            architecture is a massive waste of money. To truly fix this, we have
            to stop the bad requests from ever reaching the CPU in the first
            place.
          </p>
          <p className="text-emerald-600 dark:text-emerald-400 font-medium">
            Next, we move to Phase 3.2: Re-enabling the Firewall (with Redis
            Cache).
          </p>
        </div>
      </section>
    </div>
  );
};

export default CS2Phase3_1;
