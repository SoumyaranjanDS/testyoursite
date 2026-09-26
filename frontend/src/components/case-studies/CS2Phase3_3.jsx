import React from "react";

const CS2Phase3_3 = () => {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-medium font-['Outfit'] text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2 mb-6">
          Phase 3.3: DB Connection Pooling (Unchoking the Pipes)
        </h1>

        <div className="prose prose-slate dark:prose-invert max-w-none mb-8">
          <p>
            With the Redis firewall allowing 500 requests to slip through (10
            requests per each of the 50 Lambda IPs), our server was still
            crashing.
          </p>
          <p>
            Why? Because of a compounding bottleneck: Mongoose's{" "}
            <code>maxPoolSize</code>.
          </p>
          <p>
            By default, we artificially restricted Mongoose to only allow 10
            concurrent database connections. When 500 requests hit the server,
            10 of them instantly grab a database connection to fetch the user.
            Then, they hit <code>bcrypt</code>, which takes ~100ms. During that
            100ms, those 10 database connections are held hostage.
          </p>
          <p>
            The other 490 requests are stuck waiting in a queue just to talk to
            the database. Because the queue gets so long, the requests
            eventually timeout at the network layer before they even get a
            chance to execute!
          </p>
        </div>

        <div className="mb-6">
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
            {`// We increased the connection pool size from 10 to 100!
mongoose.connect(process.env.MONGO_URI, {
  maxPoolSize: 100, 
})`}
          </pre>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none mt-8">
          <p>
            We deployed the pool size increase to the EC2 server and ran the
            Lambda Swarm one more time. The results showed a slight, but
            measurable improvement:
          </p>

          <h3 className="font-medium font-['Inter'] text-xl text-gray-900 dark:text-white mt-8 mb-4">
            Post-Mortem: Connection Pool Metrics
          </h3>
          <p className="mb-4">
            Over the 10-second window, we fired{" "}
            <strong>12,184 authentication requests</strong>.
          </p>
          <ul className="space-y-2 mb-6">
            <li>
              <strong>Successful Authentications:</strong>{" "}
              <strong>97 requests</strong> returned 200 OK.
            </li>
            <li>
              <strong>Successful Rate Limits:</strong>{" "}
              <strong>12 requests</strong> successfully returned a 429.
            </li>
            <li>
              <strong>Catastrophic Failures:</strong>{" "}
              <strong>12,075 requests</strong> still timed out.
            </li>
            <li>
              <strong>Average Latency:</strong> Dropped from 1171ms down to{" "}
              <strong>880ms</strong>.
            </li>
          </ul>

          <h3 className="font-medium font-['Inter'] text-xl text-gray-900 dark:text-white mt-8 mb-4">
            The Diagnosis
          </h3>
          <p className="mb-4">
            Increasing the database connection pool worked exactly as expected:
            it widened the pipe. Because 100 requests could now talk to the
            database simultaneously, our throughput increased (from 71 up to 109
            total processed requests), and our latency dropped by almost 300ms!
            We even saw a few <code>429 Too Many Requests</code> successfully
            make it back to the client.
          </p>
          <p className="mb-4">
            But the server still fundamentally crashed. Over 12,000 requests
            timed out.
          </p>

          <p className="mt-6 font-medium">
            <strong>Conclusion:</strong> Tuning your database pool will improve
            throughput and latency, but it cannot save you if the CPU itself is
            choking. Node.js is single-threaded; if <code>bcrypt</code> maxes
            out the CPU, the Event Loop freezes. When the Event Loop freezes,
            Express stops answering network requests, causing massive timeouts
            regardless of how many database connections you have.
          </p>
          <p className="text-emerald-600 dark:text-emerald-400 font-medium">
            Next, we move to the final chapter—Phase 3.4: The Final Comparison
            and the True Solution.
          </p>
        </div>
      </section>
    </div>
  );
};

export default CS2Phase3_3;
