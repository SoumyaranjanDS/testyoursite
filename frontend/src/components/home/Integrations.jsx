import React from "react";
import {
  AlertTriangle,
  Cpu,
  Clock,
  Database,
  Lock,
  Activity,
} from "lucide-react";
import { motion } from "framer-motion";

const Integrations = () => {
  // Top Polaroid Cards (Performance Issues)
  const topPolaroids = [
    { Icon: Cpu, name: "CPU 99%", color: "text-orange-400", rotate: -8, y: 15 },
    {
      Icon: AlertTriangle,
      name: "500 Error",
      color: "text-red-400",
      rotate: 4,
      y: -5,
    },
    {
      Icon: Clock,
      name: "High Latency",
      color: "text-amber-400",
      rotate: -3,
      y: 5,
    },
    {
      Icon: Database,
      name: "Mem Leak",
      color: "text-indigo-400",
      rotate: 7,
      y: 12,
    },
    { Icon: Lock, name: "DB Locked", color: "text-red-500", rotate: -5, y: -2 },
  ];

  // Floating tags erupting from the box
  const floatingTags = [
    { text: "AI Root Cause", x: -180, y: -90, rotate: -12, delay: 0.1 },
    { text: "Load Gen", x: -280, y: 10, rotate: -20, delay: 0.2 },
    { text: "K6 Scripts", x: 180, y: -90, rotate: 12, delay: 0.3 },
    { text: "Real-time Metrics", x: 260, y: 10, rotate: 20, delay: 0.4 },
    { text: "PDF Reports", x: -120, y: -180, rotate: -8, delay: 0.5 },
    { text: "CI/CD Tests", x: 120, y: -180, rotate: 8, delay: 0.6 },
    { text: "SSH Agents", x: -220, y: -140, rotate: -15, delay: 0.7 },
    { text: "Alerts", x: 220, y: -140, rotate: 15, delay: 0.8 },
    { text: "Distributed", x: 0, y: -230, rotate: 0, delay: 0.9 },
  ];

  return (
    <section className="py-24 bg-[#09090b] relative overflow-hidden flex flex-col items-center justify-center border-t border-white/5 min-h-[90vh]">
      {/* Top Polaroids / Tech Cards */}
      <div className="flex items-center justify-center gap-4 md:gap-8 mb-16 relative z-10 flex-wrap px-4">
        {topPolaroids.map((item, i) => {
          const Icon = item.Icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: item.y }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
              style={{ rotate: item.rotate }}
              className="w-20 h-24 md:w-24 md:h-28 bg-[#1c1c1e] p-2 md:p-2.5 rounded-xl border border-white/10 shadow-[0_12px_32px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)] flex flex-col items-center justify-between hover:-translate-y-2 hover:rotate-0 hover:z-20 transition-all duration-300 cursor-pointer"
            >
              <div className="w-full h-12 md:h-16 bg-[#09090b] rounded-lg flex items-center justify-center overflow-hidden border border-white/5 shadow-inner">
                <Icon className={`w-6 h-6 md:w-8 md:h-8 ${item.color}`} />
              </div>
              <span className="text-[10px] md:text-xs font-medium text-gray-400 tracking-wider font-mono">
                {item.name}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Center Text & Call to Action */}
      <div className="text-center relative z-20 mb-20 px-4">
        <h2 className="text-4xl md:text-6xl font-medium text-white mb-10 max-w-3xl mx-auto leading-[1.1] font-heading">
          Have Performance Issues <br className="hidden md:block" /> and need
          help?
        </h2>

        {/* Action Button */}
        <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-0 p-2 sm:pr-8 bg-[#1c1c1e] rounded-3xl sm:rounded-full border border-white/10 shadow-[0_16px_48px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)] cursor-pointer hover:bg-[#252528] hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto">
          <div className="flex items-center sm:mr-6 p-2 sm:p-0">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shadow-lg z-20 backdrop-blur-md">
              <Activity className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-gray-500 mx-3 text-sm font-bold">+</span>
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-lg z-10 backdrop-blur-md">
              <span className="text-[11px] text-gray-300 font-bold uppercase tracking-wider">
                You
              </span>
            </div>
          </div>
          <span className="text-white font-medium text-base md:text-lg tracking-tight pb-2 sm:pb-0">
            Run a free diagnostic
          </span>
        </div>
      </div>
      {/* Bottom Box & Particles */}
      <div className="relative w-full max-w-3xl h-[250px] flex justify-center items-end mt-10">
        {/* Exploding Particles (z-10) */}
        <div className="absolute bottom-[60px] left-1/2 z-10">
          {floatingTags.map((tag, i) => (
            <motion.div
              key={i}
              initial={{ x: 0, y: 50, scale: 0, opacity: 0, rotate: 0 }}
              whileInView={{
                x: tag.x,
                y: tag.y,
                scale: 1,
                opacity: 1,
                rotate: tag.rotate,
              }}
              viewport={{ once: true, margin: "100px" }}
              transition={{
                type: "spring",
                stiffness: 60,
                damping: 12,
                delay: tag.delay,
              }}
              className="absolute bg-[#1c1c1e] border border-white/10 px-5 py-2.5 rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)] text-sm font-medium text-gray-200 whitespace-nowrap backdrop-blur-md"
              style={{
                marginLeft: "-50%",
                marginTop: "-50%",
              }}
            >
              {tag.text}
            </motion.div>
          ))}
        </div>

        {/* Simple 2D Folder (z-20) */}
        <div className="relative z-20 w-[200px] h-[160px] drop-shadow-2xl translate-y-8 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 240 180">
            <defs>
              <linearGradient id="folderGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2c2c2e" />
                <stop offset="100%" stopColor="#18181b" />
              </linearGradient>
            </defs>
            {/* Flat Folder Shape */}
            <path
              d="M 20,40 
                     L 80,40 
                     C 90,40 95,45 105,55 
                     C 115,65 120,70 130,70 
                     L 220,70 
                     C 230,70 230,80 230,80 
                     L 230,160 
                     C 230,170 220,170 220,170 
                     L 20,170 
                     C 10,170 10,160 10,160 
                     L 10,50 
                     C 10,40 20,40 20,40 Z"
              fill="url(#folderGradient)"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="2"
            />

            {/* Simple folder fold line */}
            <line
              x1="10"
              y1="70"
              x2="230"
              y2="70"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Integrations;
