import React from "react";
import { Link } from "react-router-dom";
import { FolderTree, FileJson, FileCode, ArrowRight } from "lucide-react";

const CaseStudy2 = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-['Space_Grotesk'] text-gray-900 dark:text-white mb-4">
          Case Study 2: Scaling an Authentication Service
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          A phased architectural breakdown of building a highly concurrent
          authentication microservice, load testing it with an AWS Lambda Swarm,
          and observing catastrophic failures under extreme traffic.
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-bold font-['Outfit'] text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2 mb-6">
          Project Goals & Architecture
        </h2>
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p>
            The primary objective of this case study is to understand how
            backend systems fail under sudden, massive traffic spikes. Rather
            than theoretical assumptions, we constructed a real-world,
            standalone microservice deployed on an AWS EC2 instance.
          </p>
          <p>We set out to measure three specific phenomena:</p>
          <ul>
            <li>
              <strong>WAF Rate Limiting:</strong> How effectively an application
              firewall drops concurrent requests from reused IP addresses.
            </li>
            <li>
              <strong>Event Loop Blocking:</strong> How CPU-intensive operations
              (like <code>bcrypt</code> password hashing) impact the Node.js
              single-threaded event loop.
            </li>
            <li>
              <strong>Database Pool Exhaustion:</strong> What happens when
              thousands of concurrent requests attempt to acquire a database
              connection from a highly restricted connection pool.
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-[#111111] rounded-2xl p-6 border border-gray-800">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <FolderTree className="w-5 h-5 text-indigo-400" />
          Project Folder Structure
        </h3>
        <div className="font-mono text-sm text-gray-400">
          <div className="flex items-center gap-2 text-gray-200 mb-1">
            <FolderTree className="w-4 h-4 text-gray-500" /> target-auth-app/
          </div>
          <div className="pl-6 space-y-1">
            <div className="flex items-center gap-2">
              <FileJson className="w-4 h-4 text-emerald-500" /> package.json
            </div>
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-blue-400" /> server.js{" "}
              <span className="text-gray-600 italic ml-2">
                # Main entry point
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-yellow-400" /> .env{" "}
              <span className="text-gray-600 italic ml-2">
                # Secrets (PORT, MONGO_URI)
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-200 mt-2">
              <FolderTree className="w-4 h-4 text-gray-500" /> src/
            </div>
            <div className="pl-6 space-y-1">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-blue-400" />{" "}
                auth.controller.js{" "}
                <span className="text-gray-600 italic ml-2">
                  # Bcrypt hashing logic
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-blue-400" /> db.js{" "}
                <span className="text-gray-600 italic ml-2">
                  # Mongoose Connection Pool
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative rounded-2xl p-6 mt-8 group">
        <div className="absolute inset-0 rounded-2xl bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-200 dark:border-indigo-500/30 shadow-[inset_0_1px_1px_rgba(0,0,0,0.05)] z-0"></div>
        <div className="relative z-10">
          <h3 className="text-xl font-bold font-['Inter'] text-gray-900 dark:text-white mb-3 mt-0">
          FAQ: Why not just use{" "}
          <code className="text-sm font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/30 px-1.5 py-0.5 rounded">
            express-rate-limit
          </code>
          ?
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
          A common question is why we don't just use standard in-memory rate
          limiting middleware on a single server. Here is why that fails in
          enterprise environments:
        </p>
        <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400 ml-4 list-disc marker:text-indigo-500">
          <li>
            <strong>Bypassed by Distributed Swarms:</strong> Standard rate
            limiters track individual IP addresses. A distributed botnet uses
            thousands of distinct IP addresses, completely bypassing per-IP rate
            limits.
          </li>
          <li>
            <strong>Incompatible with Multi-Core Scaling:</strong> When you
            scale Node.js across multiple CPU cores using PM2, memory is not
            shared. An IP blocked on Core 1 is still allowed on Core 2. A
            centralized store like Redis is mandatory.
          </li>
          <li>
            <strong>CPU Exhaustion:</strong> Even if the IP was blocked,
            processing 10,000 malicious HTTP requests in the Node.js event loop
            just to check a memory store still consumes massive CPU, freezing
            weak servers before the firewall can even trigger.
          </li>
        </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        <Link
          to="/docs/nodejs-initial-rate-limiting"
          className="relative rounded-2xl p-8 flex flex-col justify-between group no-underline min-h-[220px]"
        >
          <div className="absolute inset-0 rounded-2xl bg-secondary/90 shadow-top group-hover:shadow-none dark:bg-secondary/90 border border-white/5 group-hover:border-[#6366f1]/50 group-hover:bg-white/5 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-300 z-0"></div>
          <div className="relative z-10 flex flex-col h-full items-start">
            <span className="text-xs font-bold text-[#6366f1] mb-3 uppercase tracking-wider">
              Phase 1
            </span>
            <h3 className="text-xl font-medium font-['Outfit'] tracking-normal text-gray-900 dark:text-white mt-0 mb-3 group-hover:text-[#6366f1] transition-colors">
              Mock Auth & Firewalls
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 leading-relaxed">
              We isolate the network layer by simulating authentication latency.
              Watch how a highly distributed AWS Lambda swarm effortlessly
              bypasses standard IP-based WAF rate limiters.
            </p>
            <div className="mt-auto flex items-center text-[#6366f1] text-sm font-medium">
              Explore Phase 1{" "}
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        </Link>

        <Link
          to="/docs/nodejs-database-pool-exhaustion"
          className="relative rounded-2xl p-8 flex flex-col justify-between group no-underline min-h-[220px]"
        >
          <div className="absolute inset-0 rounded-2xl bg-secondary/90 shadow-top group-hover:shadow-none dark:bg-secondary/90 border border-white/5 group-hover:border-[#6366f1]/50 group-hover:bg-white/5 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-300 z-0"></div>
          <div className="relative z-10 flex flex-col h-full items-start">
            <span className="text-xs font-bold text-[#6366f1] mb-3 uppercase tracking-wider">
              Phase 2
            </span>
            <h3 className="text-xl font-medium font-['Outfit'] tracking-normal text-gray-900 dark:text-white mt-0 mb-3 group-hover:text-[#6366f1] transition-colors">
              DB Pool Exhaustion
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 leading-relaxed">
              Connecting real MongoDB instances reveals the next bottleneck.
              Observe how CPU-heavy bcrypt operations block the event loop,
              starving the database connection pool and triggering massive 500
              errors.
            </p>
            <div className="mt-auto flex items-center text-[#6366f1] text-sm font-medium">
              Explore Phase 2{" "}
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        </Link>

        <Link
          to="/docs/nodejs-performance-fix-plan"
          className="relative rounded-2xl p-8 flex flex-col justify-between group no-underline min-h-[220px]"
        >
          <div className="absolute inset-0 rounded-2xl bg-secondary/90 shadow-top group-hover:shadow-none dark:bg-secondary/90 border border-white/5 group-hover:border-[#6366f1]/50 group-hover:bg-white/5 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-300 z-0"></div>
          <div className="relative z-10 flex flex-col h-full items-start">
            <span className="text-xs font-bold text-[#6366f1] mb-3 uppercase tracking-wider">
              Phase 3
            </span>
            <h3 className="text-xl font-medium font-['Outfit'] tracking-normal text-gray-900 dark:text-white mt-0 mb-3 group-hover:text-[#6366f1] transition-colors">
              The Architecture Fix
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 leading-relaxed">
              With the system completely broken, we step back and design a
              three-part horizontal scaling strategy to repair the architecture
              and prepare the t3.micro for extreme traffic.
            </p>
            <div className="mt-auto flex items-center text-[#6366f1] text-sm font-medium">
              View The Plan{" "}
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        </Link>

        <Link
          to="/docs/nodejs-pm2-cluster-mode"
          className="relative rounded-2xl p-8 flex flex-col justify-between group no-underline min-h-[220px]"
        >
          <div className="absolute inset-0 rounded-2xl bg-secondary/90 shadow-top group-hover:shadow-none dark:bg-secondary/90 border border-white/5 group-hover:border-emerald-500/50 group-hover:bg-white/5 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-300 z-0"></div>
          <div className="relative z-10 flex flex-col h-full items-start">
            <span className="text-xs font-bold text-emerald-500 mb-3 uppercase tracking-wider">
              Phase 3.1
            </span>
            <h3 className="text-xl font-medium font-['Outfit'] tracking-normal text-gray-900 dark:text-white mt-0 mb-3 group-hover:text-emerald-500 transition-colors">
              PM2 Clustering
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 leading-relaxed">
              We implement PM2 to spawn multiple Node processes across available
              CPU cores. This effectively doubles our event loop capacity but
              introduces hidden memory constraints.
            </p>
            <div className="mt-auto flex items-center text-emerald-500 text-sm font-medium">
              Read Phase 3.1{" "}
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        </Link>

        <Link
          to="/docs/nodejs-redis-rate-limiting"
          className="relative rounded-2xl p-8 flex flex-col justify-between group no-underline min-h-[220px]"
        >
          <div className="absolute inset-0 rounded-2xl bg-secondary/90 shadow-top group-hover:shadow-none dark:bg-secondary/90 border border-white/5 group-hover:border-emerald-500/50 group-hover:bg-white/5 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-300 z-0"></div>
          <div className="relative z-10 flex flex-col h-full items-start">
            <span className="text-xs font-bold text-emerald-500 mb-3 uppercase tracking-wider">
              Phase 3.2
            </span>
            <h3 className="text-xl font-medium font-['Outfit'] tracking-normal text-gray-900 dark:text-white mt-0 mb-3 group-hover:text-emerald-500 transition-colors">
              Redis Caching
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 leading-relaxed">
              With memory now split across PM2 workers, local IP tracking fails.
              We inject Redis as a centralized, high-speed memory store to track
              global request rates accurately.
            </p>
            <div className="mt-auto flex items-center text-emerald-500 text-sm font-medium">
              Read Phase 3.2{" "}
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        </Link>

        <Link
          to="/docs/nodejs-mongoose-connection-pooling"
          className="relative rounded-2xl p-8 flex flex-col justify-between group no-underline min-h-[220px]"
        >
          <div className="absolute inset-0 rounded-2xl bg-secondary/90 shadow-top group-hover:shadow-none dark:bg-secondary/90 border border-white/5 group-hover:border-emerald-500/50 group-hover:bg-white/5 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-300 z-0"></div>
          <div className="relative z-10 flex flex-col h-full items-start">
            <span className="text-xs font-bold text-emerald-500 mb-3 uppercase tracking-wider">
              Phase 3.3
            </span>
            <h3 className="text-xl font-medium font-['Outfit'] tracking-normal text-gray-900 dark:text-white mt-0 mb-3 group-hover:text-emerald-500 transition-colors">
              Connection Pooling
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 leading-relaxed">
              Finally, we tune the Mongoose connection pool size mathematically,
              ensuring that MongoDB never drops connections even when Node.js is
              operating at maximum concurrency.
            </p>
            <div className="mt-auto flex items-center text-emerald-500 text-sm font-medium">
              Read Phase 3.3{" "}
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        </Link>

        <Link
          to="/docs/nodejs-load-shedding-conclusion"
          className="relative rounded-2xl p-10 flex flex-col justify-between group no-underline md:col-span-2 lg:col-span-3 min-h-[220px]"
        >
          <div className="absolute inset-0 rounded-2xl bg-secondary/90 shadow-top group-hover:shadow-none dark:bg-secondary/90 border border-indigo-500/20 group-hover:border-indigo-400/50 group-hover:bg-indigo-900/10 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all duration-300 z-0"></div>
          <div className="relative z-10 flex flex-col h-full items-start">
            <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 mb-3 uppercase tracking-widest">
              Phase 3.4 (Conclusion)
            </span>
            <h3 className="text-3xl font-medium font-['Outfit'] tracking-normal text-gray-900 dark:text-white mt-0 mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              The Final Benchmark
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-base max-w-3xl mb-8 leading-relaxed">
              Review the final architecture diagram and our comprehensive
              before/after comparison matrix. We summarize the exact metrics
              that prove our optimizations allowed a tiny 1GB server to survive
              an onslaught from 50 AWS Lambdas.
            </p>
            <div className="mt-auto flex items-center text-indigo-600 dark:text-indigo-400 text-base font-bold uppercase tracking-widest">
              View Final Results{" "}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CaseStudy2;
