import React from 'react';
import { Activity, Shield, Zap, Server, BrainCircuit, Globe } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: "Massive Scale Load Gen",
    description: "Spin up millions of virtual users in seconds from over 15 global regions. Test your true limits before your customers do.",
    className: "md:col-span-2 bg-[#121214] border border-white/5",
  },
  {
    icon: Shield,
    title: "Zero-Agent Telemetry",
    description: "Secure SSH tunnel extracts live server metrics without installing a single agent on your infrastructure.",
    className: "md:col-span-1 bg-[#121214] border border-white/5",
  },
  {
    icon: BrainCircuit,
    title: "AI Root Cause Analysis",
    description: "Stop guessing. Our AI engine correlates traffic spikes with server bottlenecks to pinpoint exactly why your app crashed.",
    className: "md:col-span-1 bg-[#121214] border border-white/5",
  },
  {
    icon: Server,
    title: "Full-Stack Visibility",
    description: "Monitor CPU, Memory, Disk I/O, Database Queries, and Connection pools synchronously with your load test.",
    className: "md:col-span-2 bg-[#121214] border border-white/5",
  }
];

const Features = () => {
  return (
    <section className="py-24 bg-[#09090b] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-medium text-milky mb-4 font-heading">
            Everything you need. <span className="text-gray-500">Nothing you don't.</span>
          </h2>
          <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
            A complete suite of performance engineering tools designed for modern cloud architectures.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div 
                key={idx} 
                className={`p-8 rounded-[2rem] shadow-[0_4px_24px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)] transition-transform hover:-translate-y-1 ${feature.className}`}
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
