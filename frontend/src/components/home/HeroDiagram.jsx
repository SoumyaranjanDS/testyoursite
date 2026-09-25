import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Server, Database, Activity, FileText, Terminal, Zap, BrainCircuit } from 'lucide-react';

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

const SimulationLine = ({ d, density = 3, speed = 0.8, baseDelay = 0 }) => {
  const particles = Array.from({ length: density });
  const color = "#3b82f6"; // Primary Blue
  
  return (
    <g>
      <path d={d} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeDasharray="4 8" />
      {particles.map((_, i) => (
        <motion.circle
          key={i}
          r="2.5"
          fill={color}
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
          animate={{ offsetDistance: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
          transition={{ duration: speed, repeat: Infinity, ease: "linear", delay: baseDelay + (i * (speed / density)) }}
        >
          <animateMotion dur={`${speed}s`} repeatCount="indefinite" path={d} begin={`${baseDelay + (i * (speed / density))}s`} />
        </motion.circle>
      ))}
    </g>
  );
};

const SimulationNode = ({ x, y, icon: Icon, label, subtitle }) => {
  return (
    <foreignObject x={x - 90} y={y - 25} width="180" height="50" className="overflow-visible">
      <div className="w-full h-full flex items-center gap-3 bg-gray-100 dark:bg-[#1c1c1e] border border-gray-200 dark:border-white/10 rounded-[1.25rem] px-3 py-2 shadow-lg">
        <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20">
          <Icon className="w-4 h-4 text-blue-400" />
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-[12px] font-semibold text-gray-100 whitespace-nowrap leading-tight">
            {label}
          </span>
          {subtitle && (
            <span className="text-[10px] text-gray-500 dark:text-gray-500 whitespace-nowrap leading-tight">
              {subtitle}
            </span>
          )}
        </div>
      </div>
    </foreignObject>
  );
};

const HeroDiagram = () => {
  return (
    <div className="w-full relative h-[660px] flex justify-center mt-0 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      <svg viewBox="0 0 600 660" className="absolute inset-0 w-full h-full overflow-visible z-10">
        <g>
          {/* URL -> Load Gen */}
          <SimulationLine d="M 300 68 L 300 102" density={1} speed={2.5} baseDelay={0} />
          
          {/* Load Gen -> Target API (Traffic) */}
          <SimulationLine d="M 207 130 Q 120 130, 120 212" density={1} speed={2.5} baseDelay={0.5} />
          
          {/* Target API -> SSH Agent (SSH Extracting Metrics) */}
          <SimulationLine d="M 213 240 L 387 240" density={1} speed={2.5} baseDelay={1.0} />
          
          {/* Load Gen -> Redis (Load Metrics) */}
          <SimulationLine d="M 300 158 L 300 322" density={1} speed={2.5} baseDelay={0.5} />
          
          {/* SSH Agent -> Redis (Server Metrics) */}
          <SimulationLine d="M 480 268 Q 480 350, 393 350" density={1} speed={2.5} baseDelay={1.5} />
          
          {/* Redis -> Mongo */}
          <SimulationLine d="M 300 378 L 300 412" density={1} speed={2.5} baseDelay={2.0} />
          
          {/* Mongo -> AI */}
          <SimulationLine d="M 300 468 L 300 502" density={1} speed={2.5} baseDelay={2.5} />
          
          {/* AI -> PDF */}
          <SimulationLine d="M 300 558 L 300 592" density={1} speed={2.5} baseDelay={3.0} />

          {/* Nodes */}
          <SimulationNode x={300} y={40} icon={Globe} label="User URL" subtitle="Input Endpoint" />
          <SimulationNode x={300} y={130} icon={BrandIcons.K6} label="Load Generator" subtitle="Synthetic Traffic" />
          <SimulationNode x={120} y={240} icon={Server} label="Target API" subtitle="Your Web App" />
          <SimulationNode x={480} y={240} icon={Terminal} label="SSH Agent" subtitle="Live Extraction" />
          <SimulationNode x={300} y={350} icon={BrandIcons.Redis} label="Redis Buffer" subtitle="Data Queue" />
          <SimulationNode x={300} y={440} icon={BrandIcons.Mongo} label="MongoDB" subtitle="TimeSeries DB" />
          <SimulationNode x={300} y={530} icon={Zap} label="AI Analysis" subtitle="Anomaly Detection" />
          <SimulationNode x={300} y={620} icon={FileText} label="PDF Report" subtitle="Root Cause Found" />
        </g>
      </svg>
    </div>
  );
};

export default HeroDiagram;
