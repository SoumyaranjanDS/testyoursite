import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Zap, Server, BrainCircuit, FileText, CheckCircle2, ArrowRight, Terminal, Database, Activity, Eye, Layers } from 'lucide-react';

const phases = [
  {
    id: 0,
    label: "Input",
    icon: Globe,
    title: "1. Enter Your URL",
    description: "Paste your API endpoint. No installations, no agents needed.",
    details: [
      "Supports REST, GraphQL, WebSocket",
      "Test single or multiple endpoints",
      "Custom headers and authentication"
    ]
  },
  {
    id: 1,
    label: "Load",
    icon: Zap,
    title: "2. We Generate Load",
    description: "K6 spins up and simulates 5,000 to 50,000 concurrent users.",
    details: [
      "Ramp up from 0 to peak users smoothly",
      "Hold peak traffic for full duration",
      "Measure response time and errors in real-time"
    ]
  },
  {
    id: 2,
    label: "Collect",
    icon: Server,
    title: "3. Collect Server Metrics",
    description: "SSH agent logs into your server and pulls live metrics every 5 seconds.",
    details: [
      "CPU utilization %",
      "Memory usage %",
      "Disk I/O and connections",
      "All data encrypted and never logged"
    ]
  },
  {
    id: 3,
    label: "Analyze",
    icon: BrainCircuit,
    title: "4. Find Root Cause",
    description: "Our AI correlates load metrics with server metrics to spot the bottleneck.",
    details: [
      "Matches CPU spikes to latency spikes",
      "Identifies exact user count where it breaks",
      "Detects connection pool, memory, or query issues"
    ]
  },
  {
    id: 4,
    label: "Report",
    icon: FileText,
    title: "5. Actionable Report",
    description: "Get a PDF with root cause, 5 ranked fixes, and implementation steps.",
    details: [
      "Executive summary (1 page)",
      "Technical findings + charts",
      "Prioritized fixes by effort & impact",
      "Ready to share with your team"
    ]
  }
];

const BrandIcons = {
  K6: ({ className, style }) => (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor" stroke="none">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  Mongo: ({ className, style }) => (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor" stroke="none">
      <path d="M12 2C8 6 6 12 8 17C10 21 12 22 12 22C12 22 14 21 16 17C18 12 16 6 12 2Z" />
    </svg>
  ),
  Redis: ({ className, style }) => (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor" stroke="none">
      <path d="M12 2L3 7v10l9 5 9-5V7L12 2zm0 10L4 7l8-4 8 4-8 5zm0 1l7-4v8l-7 4v-8zm-1 0v8l-7-4V8l7 4z" />
    </svg>
  )
};

const colorMap = {
  url: { text: "text-gray-300", bg: "bg-gray-500/10", border: "border-gray-500/50", glow: "rgba(107,114,128,0.5)", solid: "bg-gray-500", hex: "#9ca3af" },
  k6: { text: "text-[#7D64FF]", bg: "bg-[#7D64FF]/10", border: "border-[#7D64FF]/50", glow: "rgba(125,100,255,0.6)", solid: "bg-[#7D64FF]", hex: "#7D64FF" },
  server: { text: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/50", glow: "rgba(59,130,246,0.6)", solid: "bg-blue-500", hex: "#3b82f6" },
  watcher: { text: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/50", glow: "rgba(139,92,246,0.6)", solid: "bg-violet-500", hex: "#8b5cf6" },
  redis: { text: "text-[#DC382D]", bg: "bg-[#DC382D]/10", border: "border-[#DC382D]/50", glow: "rgba(220,56,45,0.6)", solid: "bg-[#DC382D]", hex: "#DC382D" },
  mongo: { text: "text-[#47A248]", bg: "bg-[#47A248]/10", border: "border-[#47A248]/50", glow: "rgba(71,162,72,0.6)", solid: "bg-[#47A248]", hex: "#47A248" },
  ssh: { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/50", glow: "rgba(16,185,129,0.6)", solid: "bg-emerald-500", hex: "#10b981" },
  ai: { text: "text-fuchsia-400", bg: "bg-fuchsia-500/10", border: "border-fuchsia-500/50", glow: "rgba(217,70,239,0.6)", solid: "bg-fuchsia-500", hex: "#d946ef" },
  report: { text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/50", glow: "rgba(245,158,11,0.6)", solid: "bg-amber-500", hex: "#f59e0b" }
};

const TourMode = () => {
  const [activeTab, setActiveTab] = useState(0);
  const travelTime = 1.0; 
  
  const highestNode = activeTab === 0 ? 0 : activeTab === 1 ? 1 : activeTab === 2 ? 3 : activeTab === 3 ? 4 : 5;
  const cycleDuration = highestNode > 0 ? (highestNode * travelTime) + 1.5 : 1.5;

  const FlowLine = ({ d, active, depth }) => {
    if (!active) {
      return <path d={d} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" strokeLinejoin="round" className="transition-colors duration-500" />;
    }

    const start = (depth * travelTime) / cycleDuration;
    const end = (depth * travelTime + travelTime) / cycleDuration;
    const mid1 = start + (end - start) * 0.25;
    const mid2 = start + (end - start) * 0.75;

    return (
      <>
        <path d={d} fill="none" stroke="rgba(16,185,129,0.15)" strokeWidth="2" strokeLinejoin="round" className="transition-colors duration-500" />
        <motion.path 
          d={d}
          fill="none" 
          stroke="#10b981" 
          strokeWidth="4" 
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ opacity: 0 }}
          animate={{ 
            pathLength: [0, 0, 0.35, 0.35, 0, 0], 
            pathOffset: [0, 0, 0, 0.65, 1, 1],
            opacity:    [0, 0, 1, 1, 0, 0]
          }}
          transition={{ 
            duration: cycleDuration, 
            repeat: Infinity, 
            ease: "linear",
            times: [0, Math.max(0.001, start), mid1, mid2, end, 1]
          }}
          style={{ filter: "drop-shadow(0 0 12px rgba(16,185,129,1))" }}
        />
      </>
    );
  };

  const isNodeActive = (tab, idx) => {
    if (tab === 0) return idx === 0;
    if (tab === 1) return idx <= 1;
    if (tab === 2) return idx <= 3;
    if (tab === 3) return idx <= 4;
    return true; 
  };

  const MiniNode = ({ icon: Icon, label, cx, cy, theme, nodeIndex }) => {
    const t = colorMap[theme];
    const active = isNodeActive(activeTab, nodeIndex);
    
    let times = [0, 1];
    let opacities = [0, 0];

    if (active) {
      let startGlowTime = 0;
      let peakGlowTime = 0;

      if (nodeIndex > 0) {
        const segmentStart = (nodeIndex - 1) * travelTime;
        startGlowTime = (segmentStart + travelTime * 0.75) / cycleDuration;
        peakGlowTime = (segmentStart + travelTime * 0.95) / cycleDuration;
      }
      
      const fadeTime = (nodeIndex * travelTime + 1.2) / cycleDuration; 

      if (peakGlowTime === 0) {
        times = [0, fadeTime, 1];
        opacities = [1, 0, 0];
      } else {
        times = [0, Math.max(0, startGlowTime), peakGlowTime, fadeTime, 1];
        opacities = [0, 0, 1, 0, 0];
      }
    }

    return (
      <foreignObject x={cx - 125} y={cy - 60} width="250" height="120" className="overflow-visible">
        <div className="w-full h-full relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-3 px-3 py-2 w-[176px] h-[56px] rounded-xl border bg-[#121214]/80 border-white/5 text-[var(--muted)]">
              <div className="p-2 rounded-lg bg-white/5">
                <Icon className="w-4 h-4 text-gray-500" />
              </div>
              <span className="text-xs font-bold tracking-wide uppercase">{label}</span>
            </div>
          </div>

          <AnimatePresence>
            {active && (
              <motion.div 
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: opacities }}
                transition={{ 
                  duration: cycleDuration,
                  repeat: Infinity,
                  ease: "linear",
                  times: times
                }}
              >
                <div 
                  className={`flex items-center gap-3 px-3 py-2 w-[176px] h-[56px] rounded-xl border backdrop-blur-md ${t.bg} ${t.border} ${t.text}`}
                  style={{ boxShadow: `0 0 25px ${t.glow}` }}
                >
                  <div className={`p-2 rounded-lg ${t.solid}`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-bold tracking-wide uppercase">{label}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </foreignObject>
    );
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
        {phases.map((phase) => {
          const Icon = phase.icon;
          const isActive = activeTab === phase.id;

          return (
            <button
              key={phase.id}
              onClick={() => setActiveTab(phase.id)}
              className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 flex items-center gap-2
                ${isActive
                  ? 'bg-[#1c1c1e] text-white border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.5)]'
                  : 'bg-transparent text-[var(--muted)] hover:bg-[#1c1c1e]/50 hover:text-white border border-transparent'
                }
              `}
            >
              <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-accent' : ''}`} />
              <span>{phase.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="w-full lg:w-1/2 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-[#121214]/80 backdrop-blur-xl border border-white/5 p-10 rounded-[2rem] shadow-2xl"
            >
              <div className="inline-flex items-center justify-center px-4 py-1.5 bg-accent/10 border border-accent/20 text-accent text-xs font-mono rounded-full mb-8 tracking-widest uppercase shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                Phase 0{activeTab + 1}
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold text-milky mb-6">
                {phases[activeTab].title}
              </h3>
              <p className="text-lg text-[var(--muted)] mb-10 leading-relaxed">
                {phases[activeTab].description}
              </p>

              <div className="space-y-5">
                {phases[activeTab].details.map((detail, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + (idx * 0.1), duration: 0.4 }}
                    className="flex gap-4 items-start"
                  >
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5 drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]" />
                    <span className="text-milky/90 leading-relaxed text-base">{detail}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="w-full lg:w-1/2 relative h-[560px] flex justify-center mt-10 lg:mt-0">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-accent/10 blur-[100px] rounded-full pointer-events-none" />

           <svg viewBox="0 0 600 560" className="absolute inset-0 w-full h-full overflow-visible">
              <g key={activeTab}>
                <FlowLine d="M 150 85 L 150 105 L 450 105 L 450 125" active={activeTab >= 1} depth={0} />
                <FlowLine d="M 450 175 L 450 195 L 150 195 L 150 215" active={activeTab >= 2} depth={1} />
                <FlowLine d="M 150 265 L 150 285 L 450 285 L 450 305" active={activeTab >= 2} depth={2} />
                <FlowLine d="M 450 355 L 450 375 L 150 375 L 150 395" active={activeTab >= 3} depth={3} />
                <FlowLine d="M 150 445 L 150 465 L 450 465 L 450 485" active={activeTab >= 4} depth={4} />

                <MiniNode theme="url" icon={Globe} label="User URL" cx={150} cy={60} nodeIndex={0} />
                <MiniNode theme="k6" icon={Zap} label="K6 Load Gen" cx={450} cy={150} nodeIndex={1} />
                <MiniNode theme="server" icon={Server} label="Target API" cx={150} cy={240} nodeIndex={2} />
                <MiniNode theme="ssh" icon={Terminal} label="SSH Agent" cx={450} cy={330} nodeIndex={3} />
                <MiniNode theme="ai" icon={BrainCircuit} label="AI Engine" cx={150} cy={420} nodeIndex={4} />
                <MiniNode theme="report" icon={FileText} label="PDF Report" cx={450} cy={510} nodeIndex={5} />
              </g>
           </svg>
        </div>
      </div>
    </>
  );
};

const SimulationLine = ({ d, state, density = 1, speed = 1, color = "#10b981", baseDelay = 0 }) => {
  if (state === "idle") {
    return <path d={d} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" strokeLinejoin="round" />;
  }

  const renderComet = (i = 0) => {
    const interval = Number(speed) / Number(density);
    const delay = state === "continuous" ? baseDelay + (interval * i) : baseDelay;
    
    return (
      <motion.path 
        key={`comet-${i}`}
        d={d}
        fill="none" 
        stroke={color} 
        strokeWidth={state === "single" ? "4" : "3"} 
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0.15, pathOffset: -0.15, opacity: 0 }}
        animate={{ 
          pathOffset: [-0.15, 1.15],
          opacity: [0, 1, 1, 0]
        }}
        transition={{ 
          duration: speed, 
          repeat: state === "continuous" ? Infinity : 0, 
          ease: "linear",
          delay: delay,
          times: [0, 0.1, 0.9, 1]
        }}
      />
    );
  };

  return (
    <>
      <path d={d} fill="none" stroke={color} strokeWidth="6" strokeOpacity="0.1" strokeLinejoin="round" />
      <path d={d} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeLinejoin="round" />
      {state === "continuous" 
        ? Array.from({ length: density }).map((_, i) => renderComet(i))
        : renderComet(0)
      }
    </>
  );
};

const SimulationNode = ({ icon: Icon, label, cx, cy, theme, pulseSpeed = 0.8, simState }) => {
  const t = colorMap[theme];
  
  let isLit = false;
  let isPulsing = false;
  
  if (theme === "url" && simState === "starting") isLit = true;
  if (theme === "k6" && simState === "running") { isLit = true; isPulsing = true; }
  if (theme === "server" && (simState === "running" || simState === "analyzing")) { isLit = true; isPulsing = simState === "running"; }
  
  if (theme === "watcher" && (simState === "running" || simState === "analyzing")) { isLit = true; isPulsing = simState === "running"; }
  if (theme === "redis" && (simState === "running" || simState === "analyzing")) { isLit = true; isPulsing = simState === "running"; }
  if (theme === "mongo" && (simState === "running" || simState === "analyzing")) { isLit = true; isPulsing = simState === "running"; }
  
  if (theme === "ssh" && (simState === "running" || simState === "analyzing")) { isLit = true; }
  if (theme === "ai" && simState === "analyzing") { isLit = true; isPulsing = true; }
  if (theme === "report" && simState === "report") isLit = true;

  return (
    <foreignObject x={cx - 125} y={cy - 60} width="250" height="120" className="overflow-visible">
      <div className="w-full h-full relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-3 px-3 py-2 w-[176px] h-[56px] rounded-xl border bg-[#121214]/80 border-white/5 shadow-[0_4px_12px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)] text-[var(--muted)] transition-opacity duration-300">
            <div className="p-2 rounded-lg bg-white/5">
              <Icon className="w-4 h-4" style={{ color: t.hex }} />
            </div>
            <span className="text-xs font-bold tracking-wide uppercase">{label}</span>
          </div>
        </div>

        <motion.div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLit ? (isPulsing ? [0.5, 1, 0.5] : 1) : 0 }}
          transition={{ duration: isLit && isPulsing ? pulseSpeed : 0.3, repeat: isLit && isPulsing ? Infinity : 0, ease: "easeInOut" }}
        >
          <div 
            className={`flex items-center gap-3 px-3 py-2 w-[176px] h-[56px] rounded-xl border backdrop-blur-md ${t.bg} ${t.border} ${t.text}`}
            style={{ boxShadow: `0 0 25px ${t.glow}, 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)` }}
          >
            <div className={`p-2 rounded-lg ${t.solid}`}>
              <Icon className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-bold tracking-wide uppercase">{label}</span>
          </div>
        </motion.div>
      </div>
    </foreignObject>
  );
};

const MetricBox = ({ label, value, icon: Icon, color }) => (
  <div className="bg-[#121214] border border-white/5 rounded-lg p-3 shadow-[0_4px_12px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)]">
    <div className="flex items-center gap-2 mb-1">
      <Icon className={`w-3 h-3 ${color}`} />
      <span className="text-xs text-gray-400">{label}</span>
    </div>
    <div className="text-xl font-bold text-white font-mono ">{value}</div>
  </div>
);

const SandboxMode = () => {
  const [simState, setSimState] = useState("idle"); 
  const [rps, setRps] = useState(1000);
  const [duration, setDuration] = useState(5);
  const [liveMetrics, setLiveMetrics] = useState({ activeUsers: 0, cpu: 2, redisBuffer: 0, mongoOps: 0 });

  const rpsValue = Number(rps) || 1;
  const getDynamicProps = () => {
    if (rpsValue <= 10) return { density: 1, speed: 1.2 };
    if (rpsValue <= 100) return { density: 2, speed: 1.0 };
    if (rpsValue <= 500) return { density: 3, speed: 0.8 };
    if (rpsValue <= 1000) return { density: 4, speed: 0.6 };
    if (rpsValue <= 5000) return { density: 5, speed: 0.4 };
    return { density: 6, speed: 0.3 };
  };
  const { density: k6Density, speed: k6Speed } = getDynamicProps();
  
  // Pipeline speeds
  const pSpeed = k6Speed;
  const pDelay1 = 0;
  const pDelay2 = pSpeed;
  const pDelay3 = pSpeed * 2;
  
  // Rate limited flushing to Mongo
  const mongoDensity = Math.max(1, Math.floor(k6Density * 0.3)); 
  const mongoSpeed = 1.0; 

  const startSimulation = () => {
    setSimState("starting");
    
    setTimeout(() => {
      setSimState("running");
      
      setTimeout(() => {
        setSimState("analyzing");
        
        setTimeout(() => {
          setSimState("report");
        }, 3000); 
      }, duration * 1000);
    }, 1000); 
  };

  useEffect(() => {
    if (simState === "running") {
      const interval = setInterval(() => {
        setLiveMetrics(prev => {
          const targetUsers = rps * 5;
          const newUsers = Math.min(targetUsers, prev.activeUsers + Math.floor(targetUsers / (duration * 10)));
          const loadFactor = newUsers / targetUsers;
          
          return {
            activeUsers: newUsers,
            cpu: Math.min(99, 10 + (loadFactor * 85) + (Math.random() * 5)),
            redisBuffer: Math.floor(newUsers * 5.4 + (Math.random() * 200)),
            mongoOps: Math.floor(newUsers * 0.8 + (Math.random() * 20))
          };
        });
      }, 100);
      return () => clearInterval(interval);
    } else if (simState === "idle") {
      setLiveMetrics({ activeUsers: 0, cpu: 2, redisBuffer: 0, mongoOps: 0 });
    }
  }, [simState, rps, duration]);

  return (
    <div className="flex flex-col lg:flex-row gap-16 items-center">
      <div className="w-full lg:w-[45%] relative z-10">
        <div className="bg-[#121214]/80 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] shadow-[0_16px_48px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] relative overflow-hidden">
          
          {simState === "running" && (
            <motion.div 
              className="absolute top-0 left-0 h-1 bg-accent"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: duration, ease: "linear" }}
            />
          )}

          <div className="mb-8">
            <h3 className="text-xl font-bold text-white ">Setup Scenario</h3>
            <p className="text-sm text-gray-500 mt-1">Configure and trigger a live diagnostic test</p>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Globe className="w-4 h-4 text-gray-500" /> Target Endpoint
              </label>
              <input type="text" className="w-full bg-[#09090b] border border-white/10 rounded-xl p-3.5 text-white text-sm focus:outline-none focus:border-accent/50 transition-colors" defaultValue="https://api.example.com/graphql" disabled={simState !== "idle"} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Requests per Sec</label>
                <input type="number" value={rps} onChange={(e) => setRps(Number(e.target.value))} className="w-full bg-[#09090b] border border-white/10 rounded-xl p-3.5 text-white text-sm focus:outline-none focus:border-accent/50 transition-colors" disabled={simState !== "idle"} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Duration (sec)</label>
                <input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="w-full bg-[#09090b] border border-white/10 rounded-xl p-3.5 text-white text-sm focus:outline-none focus:border-accent/50 transition-colors" disabled={simState !== "idle"} />
              </div>
            </div>

            <button 
              onClick={() => simState === "report" ? setSimState("idle") : startSimulation()} 
              disabled={simState !== "idle" && simState !== "report"}
              className="w-full bg-[#1c1c1e] hover:bg-[#2c2c2e] text-white border border-white/10 py-3.5 rounded-xl font-medium shadow-[0_4px_14px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {simState === "idle" ? "Deploy Agents & Run Test" : simState === "starting" ? "Initializing..." : simState === "running" ? "Test in Progress..." : simState === "analyzing" ? "AI Analyzing Logs..." : "Run Another Test"}
            </button>
          </div>

          <AnimatePresence>
            {simState !== "idle" && simState !== "starting" && (
              <motion.div 
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 32 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="border-t border-white/10 pt-6 overflow-hidden"
              >
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Activity className="w-3 h-3" /> Live Telemetry
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <MetricBox label="Active Users" value={liveMetrics.activeUsers.toLocaleString()} icon={Zap} color="text-rose-400" />
                  <MetricBox label="Server CPU" value={`${Math.round(liveMetrics.cpu)}%`} icon={Server} color="text-blue-400" />
                  <MetricBox label="Redis Buffer" value={liveMetrics.redisBuffer.toLocaleString()} icon={Layers} color="text-red-400" />
                  <MetricBox label="MongoDB Ops/s" value={liveMetrics.mongoOps.toLocaleString()} icon={Database} color="text-cyan-400" />
                </div>

                {simState === "report" && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-between"
                  >
                    <div>
                      <p className="text-emerald-400 font-bold text-sm mb-1">Root Cause Identified</p>
                      <p className="text-xs text-gray-400">MongoDB rate limit exceeded. Buffer overflow.</p>
                    </div>
                    <button onClick={() => setSimState("idle")} className="text-xs px-4 py-2 bg-emerald-500 text-white rounded-lg font-bold hover:bg-emerald-600 transition-colors shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                      Reset
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="w-full lg:w-[55%] relative h-[660px] flex justify-center mt-10 lg:mt-0">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />

         <svg viewBox="0 0 600 660" className="absolute inset-0 w-full h-full overflow-visible">
            <g key={`lines-${simState}`}>
              {/* URL -> K6 */}
              <SimulationLine d="M 300 78 L 300 112" state={simState === "starting" ? "single" : "idle"} color={colorMap.url.hex} baseDelay={0} />
              
              {/* K6 -> Target API */}
              <SimulationLine d="M 300 168 Q 150 168, 150 202" 
                state={simState === "running" ? "continuous" : "idle"} 
                density={k6Density} speed={pSpeed} color={colorMap.k6.hex} baseDelay={pDelay1}
              />
              
              {/* Target API -> Watcher */}
              <SimulationLine d="M 150 258 L 150 292"
                state={simState === "running" ? "continuous" : "idle"}
                density={k6Density} speed={pSpeed} color={colorMap.server.hex} baseDelay={pDelay2}
              />
              
              {/* Watcher -> Redis */}
              <SimulationLine d="M 150 348 L 150 382"
                state={simState === "running" ? "continuous" : "idle"}
                density={k6Density} speed={pSpeed} color={colorMap.watcher.hex} baseDelay={pDelay3}
              />
              
              {/* Redis -> Mongo (Rate limited flow) */}
              <SimulationLine d="M 150 438 L 150 472"
                state={simState === "running" ? "continuous" : "idle"}
                density={mongoDensity} speed={mongoSpeed} color={colorMap.redis.hex} baseDelay={0}
              />
              
              {/* SSH -> Target (Monitoring Ping) */}
              <SimulationLine d="M 450 292 Q 450 230, 238 230"
                state={simState === "running" ? "continuous" : "idle"}
                density={1} speed={1.5} color={colorMap.ssh.hex} baseDelay={0}
              />
              
              {/* SSH -> Mongo (Monitoring Ping) */}
              <SimulationLine d="M 362 320 C 290 320, 290 500, 238 500"
                state={simState === "running" ? "continuous" : "idle"}
                density={1} speed={1.5} color={colorMap.ssh.hex} baseDelay={0.75}
              />
              
              {/* Target -> AI (Log Shipping) */}
              <SimulationLine d="M 238 230 C 330 230, 330 440, 362 440"
                state={simState === "analyzing" ? "continuous" : "idle"}
                density={2} speed={0.8} color={colorMap.server.hex} baseDelay={0}
              />
              
              {/* Mongo -> AI (Log Shipping) */}
              <SimulationLine d="M 238 500 C 330 500, 330 440, 362 440"
                state={simState === "analyzing" ? "continuous" : "idle"}
                density={2} speed={0.8} color={colorMap.mongo.hex} baseDelay={0.4}
              />
              
              {/* SSH -> AI (Log Shipping) */}
              <SimulationLine d="M 450 348 L 450 412"
                state={simState === "analyzing" ? "continuous" : "idle"}
                density={1} speed={0.8} color={colorMap.ssh.hex} baseDelay={0}
              />
              
              {/* AI -> Report */}
              <SimulationLine d="M 450 468 L 450 502"
                state={simState === "report" ? "single" : "idle"}
                color={colorMap.ai.hex} baseDelay={0}
              />
            </g>

            {/* Left Data Pipeline */}
            <SimulationNode theme="url" icon={Globe} label="User URL" cx={300} cy={50} simState={simState} />
            <SimulationNode theme="k6" icon={BrandIcons.K6} label="K6 Load Gen" cx={300} cy={140} pulseSpeed={k6Speed} simState={simState} />
            <SimulationNode theme="server" icon={Server} label="Target API" cx={150} cy={230} pulseSpeed={k6Speed} simState={simState} />
            <SimulationNode theme="watcher" icon={Eye} label="Log Watcher" cx={150} cy={320} pulseSpeed={k6Speed} simState={simState} />
            <SimulationNode theme="redis" icon={BrandIcons.Redis} label="Redis Buffer" cx={150} cy={410} pulseSpeed={k6Speed} simState={simState} />
            <SimulationNode theme="mongo" icon={BrandIcons.Mongo} label="MongoDB" cx={150} cy={500} pulseSpeed={mongoSpeed} simState={simState} />
            
            {/* Right Diagnostic Pipeline */}
            <SimulationNode theme="ssh" icon={Terminal} label="SSH Agent" cx={450} cy={320} simState={simState} />
            <SimulationNode theme="ai" icon={BrainCircuit} label="AI Engine" cx={450} cy={440} simState={simState} />
            <SimulationNode theme="report" icon={FileText} label="PDF Report" cx={450} cy={530} simState={simState} />
         </svg>
      </div>
    </div>
  );
};

const HowItWorks = () => {
  const [viewMode, setViewMode] = useState('tour'); 

  return (
    <section id="how-it-works" className="py-24 bg-[#09090b] relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,black_0%,transparent_100%)] pointer-events-none" />

      <div className="max-w-[1300px] mx-auto px-6 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-medium text-milky mb-4 font-heading">
            How it Works
          </h2>
          <p className="text-lg text-[var(--muted)]">
            From diagnosis to actionable insights in 10 minutes
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="bg-[#121214] border border-white/10 rounded-full p-1.5 flex items-center gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            <button 
              onClick={() => setViewMode('tour')}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${viewMode === 'tour' ? 'bg-white/10 text-white shadow-md' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
            >
              Step-by-Step Tour
            </button>
            <button 
              onClick={() => setViewMode('sandbox')}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${viewMode === 'sandbox' ? 'bg-accent/20 text-accent border border-accent/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
            >
              <Activity className="w-4 h-4" /> Live Sandbox
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {viewMode === 'tour' ? (
            <motion.div key="tour" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <TourMode />
            </motion.div>
          ) : (
            <motion.div key="sandbox" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <SandboxMode />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default HowItWorks;
