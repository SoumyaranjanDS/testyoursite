import React from "react";

const roadmapNodes = [
  {
    id: "1",
    cx: 500,
    cy: 120,
    title: "Load Testing Basics",
    desc: "Understanding throughput and latency",
    progress: 100,
    status: "completed",
    children: ["2", "3"],
  },
  {
    id: "2",
    cx: 250,
    cy: 280,
    title: "Scripting (K6)",
    desc: "Virtual users and traffic shaping",
    progress: 100,
    status: "completed",
    children: ["4", "5"],
  },
  {
    id: "3",
    cx: 750,
    cy: 280,
    title: "Protocols",
    desc: "REST, GraphQL, and WebSockets",
    progress: 65,
    status: "active",
    children: ["5", "6"],
  },
  {
    id: "4",
    cx: 150,
    cy: 460,
    title: "Server Telemetry",
    desc: "CPU, Memory, and Disk I/O",
    progress: 0,
    status: "locked",
    children: ["7"],
  },
  {
    id: "5",
    cx: 500,
    cy: 460,
    title: "Database Profiling",
    desc: "Query analysis and connection pools",
    progress: 0,
    status: "locked",
    children: ["7"],
  },
  {
    id: "6",
    cx: 850,
    cy: 460,
    title: "Distributed Tracing",
    desc: "Multi-region traffic routing",
    progress: 0,
    status: "locked",
    children: ["7"],
  },
  {
    id: "7",
    cx: 500,
    cy: 640,
    title: "AI Diagnostics",
    desc: "Automated root cause identification",
    progress: 0,
    status: "locked",
    children: ["8", "9"],
  },
  {
    id: "8",
    cx: 300,
    cy: 820,
    title: "CI/CD Integration",
    desc: "Automated PR performance checks",
    progress: 0,
    status: "locked",
    children: ["10"],
  },
  {
    id: "9",
    cx: 700,
    cy: 820,
    title: "Chaos Engineering",
    desc: "Fault injection and latency spikes",
    progress: 0,
    status: "locked",
    children: ["10"],
  },
  {
    id: "10",
    cx: 500,
    cy: 1000,
    title: "Platform Mastery",
    desc: "Full performance engineering expert",
    progress: 0,
    status: "locked",
    children: [],
  },
];

const NodeCard = ({ node }) => {
  const isCompleted = node.status === "completed";
  const isActive = node.status === "active";

  const borderClass = isCompleted
    ? "border-accent/50"
    : isActive
      ? "border-accent"
      : "border-white/5";
  const bgClass = isCompleted
    ? "bg-accent/5"
    : isActive
      ? "bg-[#121214]"
      : "bg-[#121214]/50";
  const titleClass = isCompleted
    ? "text-white"
    : isActive
      ? "text-accent"
      : "text-gray-500";
  const shadowClass = isActive
    ? "shadow-[0_0_20px_rgba(99,102,241,0.2),inset_0_1px_0_rgba(255,255,255,0.1)]"
    : "shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]";

  return (
    <div
      className={`absolute w-[240px] h-[100px] -ml-[120px] -mt-[50px] rounded-xl border ${borderClass} ${bgClass} ${shadowClass} p-4 flex flex-col justify-between transition-all hover:scale-105 cursor-pointer z-10 backdrop-blur-md`}
      style={{ left: node.cx, top: node.cy }}
    >
      <div className="flex flex-col gap-1">
        <h4 className={`text-sm font-bold ${titleClass} text-center`}>
          {node.title}
        </h4>
        <p className="text-[10px] text-gray-400 text-center leading-tight px-1">
          {node.desc}
        </p>
      </div>

      <div className="w-full flex items-center justify-between gap-3 mt-2">
        <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
          <div
            className={`h-full ${isCompleted ? "bg-accent" : isActive ? "bg-accent" : "bg-gray-600"} rounded-full`}
            style={{ width: `${node.progress}%` }}
          />
        </div>
        <span className="text-[10px] font-mono text-gray-500">
          {node.progress}%
        </span>
      </div>
    </div>
  );
};

const Roadmap = () => {
  return (
    <section id="roadmap" className="py-24 bg-[#09090b] relative flex flex-col items-center overflow-x-hidden border-t border-white/5">
      <div className="text-center mb-16 relative z-10 px-4">
        <div className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-6">
          Learning Path
        </div>
        <h2 className="text-4xl md:text-5xl font-medium text-white mb-4 font-heading">
          The roadmap<span className="text-accent">.</span>
        </h2>
        <p className="text-gray-400 max-w-lg mx-auto text-sm leading-relaxed">
          Master load testing and performance engineering in the optimal order.
          Each topic builds on the previous ones.
        </p>
      </div>

      <div className="w-full max-w-[1000px] overflow-x-auto pb-10 custom-scrollbar relative z-10 mx-auto px-4 lg:px-0">
        <div className="relative min-w-[1000px] h-[1100px] mx-auto">
          {/* SVG Connectors */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {roadmapNodes.map((node) =>
              node.children.map((childId) => {
                const child = roadmapNodes.find((n) => n.id === childId);
                if (!child) return null;

                const startX = node.cx;
                const startY = node.cy + 50;
                const endX = child.cx;
                const endY = child.cy - 50;
                const midY = startY + (endY - startY) / 2;

                const path = `M ${startX} ${startY} L ${startX} ${midY} L ${endX} ${midY} L ${endX} ${endY}`;
                const isActivePath =
                  node.status === "completed" || node.status === "active";

                return (
                  <path
                    key={`${node.id}-${child.id}`}
                    d={path}
                    fill="none"
                    stroke={
                      isActivePath
                        ? "rgba(99,102,241,0.4)"
                        : "rgba(255,255,255,0.05)"
                    }
                    strokeWidth="2"
                    strokeDasharray="6 6"
                    strokeLinejoin="round"
                    className="transition-colors duration-500"
                  />
                );
              }),
            )}
          </svg>

          {/* Nodes */}
          {roadmapNodes.map((node) => (
            <NodeCard key={node.id} node={node} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
