import React, { useRef, useEffect } from "react";
import { motion, useInView, animate } from "framer-motion";
import {
  CheckCircle2,
  Globe,
  Activity,
  Server,
  Zap,
  BrainCircuit,
  Terminal,
  Box,
  Cloud,
} from "lucide-react";

const stats = [
  { value: 500, suffix: "M+", label: "Total Requests", isFloat: false },
  { value: 99.9, suffix: "%", label: "Accuracy", isFloat: true },
  { value: 10, suffix: "k+", label: "Engineers", isFloat: false },
];

const outerNodes = [
  {
    type: "pill",
    icon: CheckCircle2,
    text: "Test Completed",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/30",
    startAngle: -45,
  },
  {
    type: "avatar",
    icon: Globe,
    color: "text-blue-400",
    bg: "bg-white/5 border-gray-200 dark:border-white/10",
    startAngle: 15,
  },
  {
    type: "small-pill",
    icon: Activity,
    text: "94% CPU",
    color: "text-rose-400",
    bg: "bg-gray-50 dark:bg-[#121214] border-gray-200 dark:border-white/10",
    startAngle: 65,
  },
];

const innerNodes = [
  {
    type: "small-pill",
    icon: Zap,
    text: "1.2s ms",
    color: "text-amber-400",
    bg: "bg-gray-50 dark:bg-[#121214] border-gray-200 dark:border-white/10",
    startAngle: -30,
  },
  {
    type: "avatar",
    icon: BrainCircuit,
    color: "text-accent",
    bg: "bg-accent/10 border-accent/30",
    startAngle: 30,
  },
  {
    type: "avatar",
    icon: Server,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10 border-indigo-500/30",
    startAngle: -75,
  },
];

const bottomPills = [
  { icon: Terminal, text: "Agentless SSH" },
  { icon: Box, text: "Distributed Scale" },
  { icon: Activity, text: "Real-time Metrics" },
  { icon: Cloud, text: "Cloud Native" },
];

const AnimatedCounter = ({ value, suffix, isFloat }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(0, value, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate(v) {
          if (ref.current) {
            ref.current.textContent = (isFloat ? v.toFixed(1) : Math.floor(v)) + suffix;
          }
        }
      });
      return () => controls.stop();
    }
  }, [value, suffix, isFloat, inView]);

  return <span ref={ref}>0{suffix}</span>;
};

const OrbitingNode = ({ node, radius, duration }) => {
  const Icon = node.icon;
  const initialRotate = node.startAngle;

  return (
    <motion.div
      className="absolute top-1/2 left-1/2"
      style={{
        width: radius * 2,
        height: radius * 2,
        x: "-50%",
        y: "-50%",
      }}
      animate={{ rotate: [initialRotate, initialRotate + 360] }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{ rotate: [-initialRotate, -(initialRotate + 360)] }}
          transition={{ duration, repeat: Infinity, ease: "linear" }}
        >
          {node.type === "pill" && (
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-md shadow-lg whitespace-nowrap ${node.bg}`}
            >
              <Icon className={`w-4 h-4 ${node.color}`} />
              <span className={`text-sm font-medium ${node.color}`}>
                {node.text}
              </span>
            </div>
          )}
          {node.type === "small-pill" && (
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border backdrop-blur-md shadow-lg whitespace-nowrap ${node.bg}`}
            >
              <Icon className={`w-3.5 h-3.5 ${node.color}`} />
              <span className="text-xs font-medium text-gray-300">
                {node.text}
              </span>
            </div>
          )}
          {node.type === "avatar" && (
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-full border backdrop-blur-md shadow-lg ${node.bg}`}
            >
              <Icon className={`w-5 h-5 ${node.color}`} />
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

const SocialProof = () => {
  return (
    <section className="pt-32 pb-16 bg-white dark:bg-[#09090b] relative overflow-hidden">
      {/* Background Arcs Container */}
      <div className="absolute top-[60px] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] pointer-events-none z-0">
        {/* Outer Arc */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full border-[1.5px] border-gray-200 dark:border-white/5" />

        {/* Inner Arc */}
        <div className="absolute top-[150px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full border-[1.5px] border-gray-200 dark:border-white/5" />

        {/* Orbiting Elements */}
        {outerNodes.map((node, i) => (
          <OrbitingNode key={`outer-${i}`} node={node} radius={500} duration={90} />
        ))}
        {innerNodes.map((node, i) => (
          <OrbitingNode key={`inner-${i}`} node={node} radius={350} duration={60} />
        ))}
      </div>

      {/* Gradient Overlay to hide nodes as they orbit downwards */}
      <div className="absolute top-[250px] left-0 w-full h-[500px] bg-gradient-to-b from-transparent via-[#09090b]/80 to-[#09090b] pointer-events-none z-0" />

      {/* Main Content Area */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 mt-[120px] md:mt-[180px] text-center">
        {/* Stats Row */}
        <div className="flex flex-wrap justify-center gap-12 md:gap-24 mb-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="text-3xl md:text-5xl font-medium text-gray-900 dark:text-white mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} isFloat={stat.isFloat} />
              </div>
              <div className="text-sm md:text-base text-gray-500 dark:text-gray-500 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Big Title */}
        <h2 className="text-2xl md:text-4xl font-light text-gray-900 dark:text-white mb-10 leading-tight max-w-2xl mx-auto">
          We Build The Most Resilient Systems For Engineering Teams
        </h2>

        {/* Bottom Pills */}
        <div className="flex flex-wrap justify-center gap-4">
          {bottomPills.map((pill, idx) => {
            const Icon = pill.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white/5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-white hover:bg-white/10 transition-colors cursor-default"
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{pill.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
