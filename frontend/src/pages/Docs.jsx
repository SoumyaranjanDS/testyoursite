import React, { useState, useEffect } from "react";
import {
  NavLink,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import {
  Book,
  Code,
  Terminal,
  Zap,
  FileText,
  Activity,
  Laptop,
  Cloud,
  ShieldX,
  ShieldCheck,
  Server,
  AlertTriangle,
  Database,
  Network,
  Menu,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import Editor from "@monaco-editor/react";

const Highlight = ({ children }) => (
  <span className="bg-yellow-200 dark:bg-yellow-900/40 text-yellow-900 dark:text-yellow-100 px-1 rounded-sm font-medium">
    {children}
  </span>
);

const DiagramNode = ({
  icon: Icon,
  label,
  color = "bg-gray-800",
  textColor = "text-white",
  border = "border-gray-700",
}) => (
  <div className="flex flex-col items-center relative z-10 w-24 text-center">
    <div
      className={`w-14 h-14 ${color} rounded-xl flex items-center justify-center border ${border} shadow-lg mb-2 relative`}
    >
      <Icon className={`w-6 h-6 ${textColor}`} />
    </div>
    <span className="text-[11px] text-gray-400 font-medium tracking-wider uppercase">
      {label}
    </span>
  </div>
);

import CaseStudy1 from "../components/case-studies/CaseStudy1";
import CaseStudy2 from "../components/case-studies/CaseStudy2";
import CS2Phase1 from "../components/case-studies/CS2Phase1";
import CS2Phase2 from "../components/case-studies/CS2Phase2";
import CS2Phase3 from "../components/case-studies/CS2Phase3";
import CS2Phase3_1 from "../components/case-studies/CS2Phase3_1";
import CS2Phase3_2 from "../components/case-studies/CS2Phase3_2";
import CS2Phase3_3 from "../components/case-studies/CS2Phase3_3";
import CS2Phase3_4 from "../components/case-studies/CS2Phase3_4";

const Docs = () => {
  const location = useLocation();
  const activeSection =
    location.pathname.replace("/docs", "").replace(/^\//, "") || "quick-start";
  // Using location.pathname instead of state
  useEffect(() => {
    document.title = `TestYourSite Docs | ${activeSection}`;
  }, [activeSection]);
  const [caseStudiesExpanded, setCaseStudiesExpanded] = useState(true);
  const [cs2Expanded, setCs2Expanded] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "introduction", label: "Introduction", icon: Book },
    { id: "quick-start", label: "Quick Start", icon: Terminal }, // Play was removed from import, replaced with Terminal for now
    { id: "writing-tests", label: "Writing Tests", icon: Code },
    { id: "cli-reference", label: "CLI Reference", icon: Terminal },
    { id: "ai-analysis", label: "AI Root Cause", icon: Zap },
    { id: "metrics", label: "Understanding Metrics", icon: Activity },
    { id: "ci-cd", label: "CI/CD Integration", icon: Server },
    { id: "architecture", label: "Swarm Architecture", icon: Server },
    {
      id: "case-studies",
      label: "Case Studies",
      icon: Book,
      hasSubItems: true,
    },
  ];

  const caseStudyItems = [
    {
      id: "cloud-concurrency-vs-rate-limiting",
      label: "1. Cloud Concurrency vs Rate Limiting",
      description:
        "Why standard rate limits fail against decentralized botnets and how massive concurrency bypasses basic IP blocking.",
    },
    {
      id: "scaling-nodejs-auth-service",
      label: "2. Scaling an Auth Service",
      hasPhases: true,
      description:
        "A deep dive into diagnosing and fixing Node.js event loop blocks, Redis caching, and MongoDB connection pool exhaustion.",
    },
  ];

  const cs2Phases = [
    { id: "nodejs-initial-rate-limiting", label: "Phase 1: Rate Limiting" },
    { id: "nodejs-database-pool-exhaustion", label: "Phase 2: DB Exhaustion" },
    { id: "nodejs-performance-fix-plan", label: "Phase 3: The Fix (Plan)" },
    { id: "nodejs-pm2-cluster-mode", label: "3.1: PM2 Clustering" },
    { id: "nodejs-redis-rate-limiting", label: "3.2: Redis Caching" },
    {
      id: "nodejs-mongoose-connection-pooling",
      label: "3.3: DB Connection Pooling",
    },
    { id: "nodejs-load-shedding-conclusion", label: "3.4: Final Comparison" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 bg-white dark:bg-[#09090b] text-gray-900 dark:text-gray-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-8">
        {/* Mobile Header (To open menu) */}
        <div className="lg:hidden flex items-center justify-between py-2 border-b border-gray-200 dark:border-white/10 -mt-2 mb-2">
          <span className="font-medium text-gray-900 dark:text-white text-sm uppercase tracking-wider">
            Documentation Menu
          </span>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Overlay Backdrop */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 bg-white/60 dark:bg-black/60 backdrop-blur-md lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar Navigation Drawer */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-[280px] bg-white dark:bg-[#09090b] px-4 py-6 shadow-2xl transition-transform duration-300 lg:static lg:w-64 lg:px-0 lg:py-0 lg:bg-transparent lg:shadow-none lg:border-r border-gray-200 dark:border-white/10 lg:pr-8 shrink-0 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        >
          <div className="flex items-center justify-between lg:hidden mb-6">
            <span className="font-medium text-gray-900 dark:text-white text-sm uppercase tracking-wider">
              Menu
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="h-[calc(100vh-8rem)] lg:sticky lg:top-28 overflow-y-auto pr-2 pb-2 lg:pb-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-4 px-3 uppercase tracking-wider">
              Documentation
            </h3>
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <div key={item.id}>
                  <NavLink
                    to={`/docs/${item.id}`}
                    className={({ isActive }) =>
                      `flex items-center gap-3 w-full px-3 py-2.5 text-sm text-left transition-all duration-200 rounded-xl border ${
                        isActive ||
                        (item.hasSubItems &&
                          activeSection.startsWith("case-study-"))
                          ? "bg-white dark:bg-[#18181b]/50 shadow-[0_4px_12px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(255,255,255,0.05)] border-gray-200 dark:border-white/10 text-[#6366f1] dark:text-[#818cf8] font-medium"
                          : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 hover:border-gray-200/50 dark:hover:border-white/5"
                      }`
                    }
                    onClick={(e) => {
                      if (item.hasSubItems) {
                        setCaseStudiesExpanded(!caseStudiesExpanded);
                      }
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </NavLink>
                  {item.hasSubItems && caseStudiesExpanded && (
                    <div className="ml-5 mt-2 space-y-1 border-l-2 border-gray-100 dark:border-white/5 pl-3">
                      {caseStudyItems.map((subItem) => (
                        <div key={subItem.id}>
                          <NavLink
                            to={`/docs/${subItem.id}`}
                            className={({ isActive }) =>
                              `flex items-center w-full px-3 py-2 text-sm text-left transition-all duration-200 rounded-xl border ${
                                isActive ||
                                (subItem.hasPhases &&
                                  activeSection.startsWith("nodejs-"))
                                  ? "bg-white dark:bg-[#18181b]/50 shadow-[0_4px_12px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(255,255,255,0.05)] border-gray-200 dark:border-white/10 text-[#6366f1] dark:text-[#818cf8] font-medium"
                                  : "border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 hover:border-gray-200/50 dark:hover:border-white/5"
                              }`
                            }
                            onClick={(e) => {
                              if (subItem.hasPhases) {
                                setCs2Expanded(!cs2Expanded);
                              }
                              setIsMobileMenuOpen(false);
                            }}
                          >
                            {subItem.label}
                          </NavLink>

                          {subItem.hasPhases && cs2Expanded && (
                            <div className="ml-4 mt-2 space-y-1 border-l-2 border-gray-100 dark:border-white/5 pl-3">
                              {cs2Phases.map((phase) => (
                                <NavLink
                                  to={`/docs/${phase.id}`}
                                  className={({ isActive }) =>
                                    `flex items-center w-full px-3 py-2 text-xs text-left transition-all duration-200 rounded-xl border ${
                                      isActive
                                        ? "bg-white dark:bg-[#18181b]/50 shadow-[0_4px_12px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(255,255,255,0.05)] border-gray-200 dark:border-white/10 text-[#6366f1] dark:text-[#818cf8] font-medium"
                                        : "border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 hover:border-gray-200/50 dark:hover:border-white/5"
                                    }`
                                  }
                                  key={phase.id}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {phase.label}
                                </NavLink>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 max-w-4xl min-w-0">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="prose prose-gray dark:prose-invert max-w-none"
          >
            <Routes>
              <Route path="/" element={<Navigate to="quick-start" replace />} />
              <Route
                path="quick-start"
                element={
                  <div className="space-y-8">
                    <div>
                      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 font-heading">
                        Quick Start Guide
                      </h1>
                      <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                        Welcome to TestYourSite! This beginner-friendly guide
                        will help you run your very first load test in under 3
                        minutes. No complex installations or agents required.
                      </p>
                    </div>

                    <div className="relative rounded-2xl p-6 group">
                      <div className="absolute inset-0 rounded-2xl bg-white dark:bg-secondary/90 border border-gray-200 dark:border-white/5 shadow-[inset_0_1px_1px_rgba(0,0,0,0.05)] dark:shadow-top z-0"></div>
                      <div className="relative z-10">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                          1. Install the CLI
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          The easiest way to trigger a test is through our
                          Node-based CLI. Open your terminal and run:
                        </p>
                        <div className="bg-gray-900 dark:bg-[#000000] rounded-xl p-4 flex items-center justify-between border border-gray-800 dark:border-white/5 shadow-inner">
                          <code className="text-emerald-400 text-sm font-mono">
                            npm install -g testyoursite-cli
                          </code>
                        </div>
                      </div>
                    </div>

                    <div className="relative rounded-2xl p-6 group">
                      <div className="absolute inset-0 rounded-2xl bg-white dark:bg-secondary/90 border border-gray-200 dark:border-white/5 shadow-[inset_0_1px_1px_rgba(0,0,0,0.05)] dark:shadow-top z-0"></div>
                      <div className="relative z-10">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                          2. Authenticate
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          Link the CLI to your account using the API key found
                          in your dashboard.
                        </p>
                        <div className="bg-gray-900 dark:bg-[#000000] rounded-xl p-4 flex items-center justify-between border border-gray-800 dark:border-white/5 shadow-inner">
                          <code className="text-blue-400 text-sm font-mono">
                            tys login --token="YOUR_API_KEY"
                          </code>
                        </div>
                      </div>
                    </div>

                    <div className="relative rounded-2xl p-6 group">
                      <div className="absolute inset-0 rounded-2xl bg-white dark:bg-secondary/90 border border-gray-200 dark:border-white/5 shadow-[inset_0_1px_1px_rgba(0,0,0,0.05)] dark:shadow-top z-0"></div>
                      <div className="relative z-10">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                          3. Run Your First Test
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          We'll simulate 50 virtual users connecting to your
                          website for 30 seconds. Replace{" "}
                          <code className="text-pink-400 bg-pink-400/10 px-1.5 py-0.5 rounded">
                            example.com
                          </code>{" "}
                          with your actual URL.
                        </p>
                        <div className="bg-gray-900 dark:bg-[#000000] rounded-xl p-4 border border-gray-800 dark:border-white/5 shadow-inner">
                          <pre className="text-gray-300 text-sm font-mono whitespace-pre-wrap">
                            <span className="text-[#6366f1]">tys</span> run \{" "}
                            <br />
                            &nbsp;&nbsp;--url{" "}
                            <span className="text-emerald-400">
                              "https://example.com"
                            </span>{" "}
                            \ <br />
                            &nbsp;&nbsp;--users{" "}
                            <span className="text-orange-400">50</span> \ <br />
                            &nbsp;&nbsp;--duration{" "}
                            <span className="text-orange-400">30s</span>
                          </pre>
                        </div>
                      </div>
                    </div>

                    <div className="relative rounded-2xl p-6 group">
                      <div className="absolute inset-0 rounded-2xl bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-200 dark:border-indigo-500/30 z-0"></div>
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-2">
                          <Zap className="w-5 h-5 text-[#6366f1]" />
                          <h4 className="font-bold text-gray-900 dark:text-white">
                            What happens next?
                          </h4>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                          TestYourSite will automatically provision global
                          servers and begin directing traffic to your URL.
                          Real-time metrics (like latency, CPU spikes, and error
                          rates) will stream directly to your web dashboard. If
                          any bottlenecks occur, our AI will automatically
                          attach a root-cause analysis report.
                        </p>
                      </div>
                    </div>
                  </div>
                }
              />

              <Route
                path="architecture"
                element={
                  <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
                    <h1 className="text-4xl font-semibold tracking-wider font-['Space_Grotesk'] text-transparent bg-clip-text mb-2">
                      Engineering Journal: The Distributed Swarm
                    </h1>

                    <div className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                      How we engineered a zero-cost, massively distributed
                      load-testing engine to bypass Web Application Firewalls.
                    </div>

                    <hr className="border-gray-200 dark:border-gray-800" />

                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold font-['Outfit'] text-gray-900 dark:text-white border-l-4 border-indigo-500 pl-4 py-1">
                        The Firewall Blockade
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        It started when we tried to run a 200-VU (Virtual User)
                        load test against a real production API (e.g.,{" "}
                        <code>https://api.example.com/auth/login</code>). To our
                        surprise, 100% of the requests began failing. But they
                        weren't failing with a standard error like{" "}
                        <code>500 Internal Server Error</code>. Instead, they
                        were returning <code>429 Too Many Requests</code> and{" "}
                        <Highlight>403 Forbidden (Blocked by WAF)</Highlight>.
                      </p>

                      {/* The Problem Diagram */}
                      <div className="my-8 text-sm border border-gray-200 dark:border-white/10 rounded-2xl p-8 bg-white dark:bg-[#111113] flex flex-col md:flex-row items-center justify-between text-gray-500 dark:text-gray-400 shadow-xl gap-6 md:gap-0">
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 ring-1 ring-gray-200 dark:ring-white/10 shadow-sm">
                            <Laptop className="w-8 h-8 text-gray-700 dark:text-gray-300" />
                          </div>
                          <span className="mt-3 text-xs font-semibold text-gray-900 dark:text-gray-200">
                            Your Machine
                          </span>
                          <span className="text-[10px] text-gray-500">
                            1 IP Address
                          </span>
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center px-4 w-full md:w-auto relative min-h-[40px] md:min-h-0">
                          <div className="flex flex-col md:flex-row items-center w-full h-full md:h-auto">
                            <div className="w-px h-full md:h-px bg-gray-300 dark:bg-gray-700 flex-1"></div>
                            <div className="hidden md:block w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-gray-300 dark:border-l-gray-700 border-b-[4px] border-b-transparent"></div>
                          </div>
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#111113] px-3 py-1 rounded-full text-xs font-semibold border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 shadow-sm whitespace-nowrap">
                            200 Req/s
                          </div>
                        </div>

                        <div className="flex flex-col items-center z-10">
                          <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-red-50 dark:bg-red-500/10 shadow-[0_0_20px_rgba(239,68,68,0.15)] ring-1 ring-red-500/30">
                            <ShieldX className="w-8 h-8 text-red-500" />
                          </div>
                          <span className="mt-3 text-xs text-red-500 font-bold tracking-wider">
                            WAF
                          </span>
                          <span className="text-[10px] text-red-500/70 font-semibold">
                            429 Blocked
                          </span>
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center px-4 w-full md:w-auto relative min-h-[40px] md:min-h-0 opacity-40">
                          <div className="flex flex-col md:flex-row items-center w-full h-full md:h-auto">
                            <div className="w-px h-full md:h-px bg-red-500/50 border-dashed border-l md:border-t md:border-l-0 border-red-500/50 flex-1"></div>
                            <div className="hidden md:block w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-red-500/50 border-b-[4px] border-b-transparent"></div>
                          </div>
                        </div>

                        <div className="flex flex-col items-center opacity-40">
                          <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 ring-1 ring-gray-200 dark:ring-white/10 shadow-sm">
                            <Server className="w-8 h-8 text-gray-700 dark:text-gray-300" />
                          </div>
                          <span className="mt-3 text-xs font-semibold text-gray-900 dark:text-gray-200">
                            Production API
                          </span>
                          <span className="text-[10px] text-gray-500">
                            0 Reached
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        The discovery was immediate: The production server's Web
                        Application Firewall and Rate Limiter noticed a massive
                        flood of traffic coming from a{" "}
                        <Highlight>single IP address</Highlight>. It treated our
                        load test as a malicious DDoS attack and instantly
                        blocked our machine's IP. We were no longer testing the
                        target server's capacity—we were only testing the
                        firewall's ability to reject us.
                      </p>
                    </div>

                    <div className="space-y-6 mt-12">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-indigo-500 pl-4 py-1">
                        The Quest for Distributed IPs
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        To bypass the WAF and simulate a real-world scenario,
                        the traffic needed to originate from hundreds of
                        different IP addresses simultaneously. However, buying
                        high-quality residential proxies or spinning up hundreds
                        of cloud VMs is extremely expensive. We wanted a
                        solution that was 100% free.
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        We decided to use{" "}
                        <Highlight>Serverless Edge Functions</Highlight>.
                        Because serverless providers spin up isolated
                        micro-containers to handle concurrent traffic, hitting a
                        serverless endpoint 200 times simultaneously would
                        result in 200 distinct containers attacking the target
                        from 200 different IP addresses!
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        But we identified two massive flaws with using providers
                        like <Highlight>Vercel</Highlight> for this:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
                        <li>
                          <strong>Abuse Policies:</strong> Blasting millions of
                          outbound requests from Vercel's free tier would likely
                          flag our account for network abuse.
                        </li>
                        <li>
                          <Highlight>Cold Starts:</Highlight> Serverless
                          functions take several seconds to boot up on their
                          first request. If our backend measured the time it
                          took for the serverless function to reply, the metric
                          would be utterly ruined by the container's boot time
                          (e.g., reporting a 3000ms latency when 2950ms of that
                          was just the cold boot).
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-6 mt-12">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-indigo-500 pl-4 py-1">
                        The Architecture Breakthrough: "The Self-Timing Swarm"
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        We pivoted to using the{" "}
                        <Highlight>AWS Lambda Free Tier</Highlight>, which
                        provides 1,000,000 free requests per month. To solve the
                        critical "Cold Start" problem, we designed an
                        architectural pattern called the Self-Timing Swarm.
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Instead of our main Node.js backend holding the
                        stopwatch, we programmed the AWS Lambda function to{" "}
                        <Highlight>hold its own stopwatch</Highlight>. When the
                        Lambda boots up (taking however long it needs), it
                        starts a high-precision timer exactly <em>before</em>{" "}
                        making the HTTP request, and stops it immediately after.
                        It then returns that exact <code>durationMs</code> back
                        to our backend.
                      </p>
                    </div>

                    <div className="space-y-6 mt-12">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-indigo-500 pl-4 py-1">
                        The Lambda Implementation
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        We wrote a lightweight Node 20.x script using native{" "}
                        <code>fetch</code> (requiring no dependencies or
                        node_modules) and deployed it via AWS Lambda Function
                        URLs.
                      </p>

                      <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10 my-8">
                        <Editor
                          height="400px"
                          language="javascript"
                          theme="vs-dark"
                          value={`export const handler = async (event) => {
  const { url, method = "GET", headers = {}, payload } = JSON.parse(event.body || "{}");

  const options = { method, headers };
  if (payload) options.body = typeof payload === "string" ? payload : JSON.stringify(payload);

  // START THE STOPWATCH (Ignores cold boot time!)
  const startTime = performance.now();
  let responseStatus = 0;

  try {
    const targetResponse = await fetch(url, options);
    responseStatus = targetResponse.status;
    await targetResponse.text();
  } catch (error) {
    const endTime = performance.now();
    return {
      statusCode: 200,
      body: JSON.stringify({ success: false, error: error.message, durationMs: Math.round(endTime - startTime) }),
    };
  }

  // STOP THE STOPWATCH
  const endTime = performance.now();
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      status: responseStatus,
      durationMs: Math.round(endTime - startTime),
    }),
  };
};`}
                          options={{
                            minimap: { enabled: false },
                            readOnly: true,
                            scrollbar: {
                              vertical: "hidden",
                              horizontal: "hidden",
                            },
                            fontSize: 14,
                            padding: { top: 20, bottom: 20 },
                            scrollBeyondLastLine: false,
                            wordWrap: "on",
                          }}
                        />
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
                        In the code above, notice the crucial timer logic:{" "}
                        <code>performance.now()</code>. The lambda explicitly
                        captures the moment right before it makes the outgoing{" "}
                        <code>fetch</code> request and right after it completes.
                        We wrap the fetch in a <code>try-catch</code> so even if
                        the request times out or the target crashes, we
                        accurately capture the duration until failure.
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
                        Because we only measure the time it takes for the{" "}
                        <em>fetch itself</em> to execute, any delays from AWS
                        booting up the micro-container (Cold Starts) are
                        completely ignored. The Lambda might take 3 seconds to
                        boot, but it will correctly report that the HTTP request
                        only took 150ms.
                      </p>
                    </div>

                    <div className="space-y-6 mt-12">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-indigo-500 pl-4 py-1">
                        Orchestrating with k6
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Finally, we updated our Node.js backend orchestrator.
                        Instead of configuring <code>k6</code> to attack the
                        target directly, we configured <code>k6</code> to attack
                        the AWS Lambda URL, passing the target's instructions in
                        the payload.
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        By using a custom k6 <code>Trend</code> metric (
                        <code>true_req_duration</code>), we extracted the exact
                        target latency from the Lambda response, filtering out
                        the AWS connection and cold start overhead entirely. The
                        result is a massively distributed, zero-cost load
                        testing engine capable of seamlessly bypassing modern
                        WAFs.
                      </p>

                      {/* The Solution Diagram */}
                      <div className="my-8 text-sm border border-gray-200 dark:border-white/10 rounded-2xl p-6 lg:p-8 bg-white dark:bg-[#111113] flex flex-col lg:flex-row items-center justify-between text-gray-500 dark:text-gray-400 shadow-xl gap-4 lg:gap-0">
                        {/* Step 1: k6 */}
                        <div className="flex flex-col items-center w-full lg:w-auto">
                          <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 ring-1 ring-gray-200 dark:ring-white/10 shadow-sm">
                            <Terminal className="w-6 h-6 lg:w-8 lg:h-8 text-gray-700 dark:text-gray-300" />
                          </div>
                          <span className="mt-3 text-xs font-semibold text-gray-900 dark:text-gray-200">
                            k6 Commander
                          </span>
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center px-2 w-full lg:w-auto relative min-h-[40px] lg:min-h-0">
                          <div className="flex flex-col lg:flex-row items-center w-full h-full lg:h-auto">
                            <div className="w-px h-full lg:h-px bg-gray-300 dark:bg-gray-700 flex-1"></div>
                            <div className="hidden lg:block w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-gray-300 dark:border-l-gray-700 border-b-[4px] border-b-transparent"></div>
                          </div>
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#111113] px-2 py-0.5 rounded-full text-[10px] font-semibold border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 whitespace-nowrap shadow-sm">
                            Distributes Tasks
                          </div>
                        </div>

                        {/* Step 2: Backend */}
                        <div className="flex flex-col items-center w-full lg:w-auto z-10">
                          <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center bg-blue-50 dark:bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/30">
                            <Activity className="w-6 h-6 lg:w-8 lg:h-8 text-blue-500" />
                          </div>
                          <span className="mt-3 text-xs text-blue-500 font-bold tracking-wider">
                            Node Backend
                          </span>
                          <span className="text-[10px] text-blue-500/70 font-semibold">
                            Orchestrator
                          </span>
                        </div>

                        <div className="flex-1 flex items-center justify-center px-2 w-full lg:w-auto relative min-h-[40px] lg:min-h-0">
                          <div className="flex flex-col lg:flex-row items-center w-full h-full lg:h-auto">
                            <div className="w-px h-full lg:h-px bg-gray-300 dark:bg-gray-700 flex-1"></div>
                            <div className="hidden lg:block w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-gray-300 dark:border-l-gray-700 border-b-[4px] border-b-transparent"></div>
                          </div>
                        </div>

                        {/* Step 3: Lambdas */}
                        <div className="flex flex-col items-center w-full lg:w-auto z-10">
                          <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center bg-indigo-50 dark:bg-indigo-500/10 shadow-[0_0_20px_rgba(99,102,241,0.15)] ring-1 ring-indigo-500/30">
                            <Cloud className="w-6 h-6 lg:w-8 lg:h-8 text-indigo-500" />
                          </div>
                          <span className="mt-3 text-xs text-indigo-500 font-bold tracking-wider">
                            AWS Swarm
                          </span>
                          <span className="text-[10px] text-indigo-500/70 font-semibold">
                            200 Unique IPs
                          </span>
                        </div>

                        <div className="flex-1 flex items-center justify-center px-2 w-full lg:w-auto relative min-h-[40px] lg:min-h-0 opacity-50">
                          <div className="flex flex-col lg:flex-row items-center w-full h-full lg:h-auto">
                            <div className="w-px h-full lg:h-px bg-gray-300 dark:bg-gray-700 flex-1"></div>
                            <div className="hidden lg:block w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-gray-300 dark:border-l-gray-700 border-b-[4px] border-b-transparent"></div>
                          </div>
                        </div>

                        {/* Step 4: WAF */}
                        <div className="flex flex-col items-center w-full lg:w-auto opacity-50">
                          <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 ring-1 ring-gray-200 dark:ring-white/10 shadow-sm relative">
                            <ShieldCheck className="w-6 h-6 lg:w-8 lg:h-8 text-gray-400" />
                          </div>
                          <span className="mt-3 text-xs font-bold text-gray-500 tracking-wider">
                            WAF
                          </span>
                          <span className="text-[10px] text-green-500 font-semibold">
                            Bypassed!
                          </span>
                        </div>

                        <div className="flex-1 flex items-center justify-center px-2 w-full lg:w-auto relative min-h-[40px] lg:min-h-0">
                          <div className="flex flex-col lg:flex-row items-center w-full h-full lg:h-auto">
                            <div className="w-px h-full lg:h-px bg-gray-300 dark:bg-gray-700 flex-1"></div>
                            <div className="hidden lg:block w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-gray-300 dark:border-l-gray-700 border-b-[4px] border-b-transparent"></div>
                          </div>
                        </div>

                        {/* Step 5: Target API */}
                        <div className="flex flex-col items-center w-full lg:w-auto text-green-600 dark:text-green-500">
                          <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center bg-emerald-50 dark:bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/30">
                            <Server className="w-6 h-6 lg:w-8 lg:h-8 text-emerald-500" />
                          </div>
                          <span className="mt-3 text-xs text-emerald-600 dark:text-emerald-400 font-bold tracking-wider">
                            Target API
                          </span>
                          <span className="text-[10px] text-emerald-600/70 font-semibold">
                            200 Reached
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6 mt-12">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-indigo-500 pl-4 py-1">
                        Proving It: Local Validation
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        To prove why this distributed architecture is necessary,
                        we configured our own local backend with an{" "}
                        <code>express-rate-limit</code> middleware, restricting
                        traffic to just 10 requests per minute per IP:
                      </p>

                      <div className="rounded-xl overflow-hidden shadow-xl border border-white/10 my-6">
                        <Editor
                          height="230px"
                          language="javascript"
                          theme="vs-dark"
                          value={`const rateLimit = require("express-rate-limit");

// Limit each IP to 10 requests per minute
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  message: { message: "Too many requests, please try again later." },
  handler: (req, res, next, options) => {
    console.log(\`[RATE LIMIT] IP \${req.ip} exceeded the rate limit! Blocking request.\`);
    res.status(options.statusCode).send(options.message);
  },
});

app.use(limiter);`}
                          options={{
                            minimap: { enabled: false },
                            readOnly: true,
                            scrollbar: {
                              vertical: "hidden",
                              horizontal: "hidden",
                            },
                            fontSize: 14,
                            padding: { top: 20, bottom: 20 },
                            wordWrap: "on",
                          }}
                        />
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
                        We then ran a local load-testing script targeting this
                        endpoint with 50 concurrent virtual users for 10
                        seconds. The results were immediate and devastating to
                        the load test:
                      </p>

                      <div className="bg-gray-900 dark:bg-[#000000] rounded-xl p-4 border border-gray-800 dark:border-white/5 shadow-inner mt-4 overflow-x-auto">
                        <pre className="text-gray-300 text-sm font-mono whitespace-pre-wrap">
                          <span className="text-emerald-400">
                            ✅ Local Test Complete!
                          </span>
                          ----------------------------------- 📊 Total Requests:{" "}
                          <span className="text-white">33611</span>✅ Success:{" "}
                          <span className="text-emerald-400">10</span>❌ Failed:{" "}
                          <span className="text-red-400">33601</span>
                          📡 Status Codes Breakdown: - Status 200:{" "}
                          <span className="text-emerald-400">10 responses</span>
                          - Status 429:{" "}
                          <span className="text-red-400">33601 responses</span>
                        </pre>
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
                        Exactly 10 requests succeeded. The remaining 33,601
                        requests were instantly blocked, returning{" "}
                        <code>429 Too Many Requests</code>. Meanwhile, our
                        backend terminal flooded with rate-limit warnings from{" "}
                        <code>::1</code> (the IPv6 loopback address for
                        localhost):
                      </p>

                      <div className="bg-gray-900 dark:bg-[#000000] rounded-xl p-4 border border-gray-800 dark:border-white/5 shadow-inner mt-4">
                        <pre className="text-yellow-400/90 text-sm font-mono whitespace-pre-wrap opacity-80">
                          [RATE LIMIT] IP ::1 exceeded the rate limit! Blocking
                          request. [RATE LIMIT] IP ::1 exceeded the rate limit!
                          Blocking request. [RATE LIMIT] IP ::1 exceeded the
                          rate limit! Blocking request. ... (33,598 more lines)
                        </pre>
                      </div>

                      <div className="bg-indigo-50 dark:bg-[#6366f1]/10 border border-indigo-200 dark:border-[#6366f1]/30 rounded-2xl p-6 mt-8">
                        <div className="flex items-center gap-3 mb-2">
                          <ShieldCheck className="w-5 h-5 text-[#6366f1]" />
                          <h4 className="font-bold text-gray-900 dark:text-white">
                            The Conclusion
                          </h4>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                          Testing locally proves the limitation of traditional
                          load testing from a single machine. By distributing
                          the load across hundreds of temporary AWS containers,
                          each request originates from a completely distinct IP
                          address, effortlessly keeping the traffic per-IP well
                          below the <code>max: 10</code> threshold.
                        </p>
                      </div>

                      <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-2xl p-6 mt-4">
                        <div className="flex items-center gap-3 mb-2">
                          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-500" />
                          <h4 className="font-bold text-gray-900 dark:text-white">
                            Note on Concurrency vs. Total Requests
                          </h4>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">
                          Even with the AWS Swarm, you can still hit a WAF rate
                          limiter if you don't use enough concurrency. AWS
                          Lambda provisions unique IPs based on{" "}
                          <strong>Concurrency</strong>, not total requests.
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                          If you run a load test with 50 Virtual Users (VUs)
                          that generates 14,000 requests, AWS only spins up 50
                          IP addresses. Each of those 50 IPs will rapidly make
                          hundreds of requests, triggering rate limits on
                          Enterprise Firewalls. To simulate a true global attack
                          and completely evade Datacenter IP blocking, the
                          orchestrator must command massive concurrency (e.g.,
                          5,000+ VUs) spread across multiple global AWS regions!
                        </p>
                      </div>
                    </div>
                  </div>
                }
              />

              <Route
                path="case-studies"
                element={
                  <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
                    <div>
                      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 font-heading">
                        Engineering Case Studies
                      </h1>
                      <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                        Explore real-world engineering case studies showcasing
                        how we discovered, analyzed, and solved massive scaling
                        challenges.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                      {caseStudyItems.map((item) => (
                        <NavLink
                          to={`/docs/${item.id}`}
                          key={item.id}
                          className="relative rounded-2xl p-8 flex flex-col justify-between group no-underline min-h-[180px]"
                        >
                          <div className="absolute inset-0 rounded-2xl bg-white dark:bg-secondary/90 shadow-[inset_0_1px_1px_rgba(0,0,0,0.05)] dark:shadow-top group-hover:shadow-none border border-gray-200 dark:border-white/5 group-hover:border-[#6366f1]/50 group-hover:bg-gray-50 dark:group-hover:bg-white/5 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] dark:group-hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-300 z-0"></div>
                          <div className="relative z-10 flex flex-col h-full items-start">
                            <h3 className="text-xl font-medium font-['Outfit'] tracking-normal text-gray-900 dark:text-white mt-0 mb-3 group-hover:text-[#6366f1] transition-colors">
                              {item.label}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                              {item.description}
                            </p>
                            <div className="mt-auto flex items-center text-[#6366f1] text-sm font-medium">
                              Read Case Study →
                            </div>
                          </div>
                        </NavLink>
                      ))}
                    </div>
                  </div>
                }
              />

              <Route
                path="cloud-concurrency-vs-rate-limiting"
                element={
                  <div className="prose prose-slate dark:prose-invert max-w-none">
                    <CaseStudy1 />
                  </div>
                }
              />

              <Route
                path="scaling-nodejs-auth-service"
                element={
                  <div className="prose prose-slate dark:prose-invert max-w-none">
                    <CaseStudy2 />
                  </div>
                }
              />

              <Route
                path="nodejs-initial-rate-limiting"
                element={
                  <div className="prose prose-slate dark:prose-invert max-w-none">
                    <CS2Phase1 />
                  </div>
                }
              />

              <Route
                path="nodejs-database-pool-exhaustion"
                element={
                  <div className="prose prose-slate dark:prose-invert max-w-none">
                    <CS2Phase2 />
                  </div>
                }
              />

              <Route
                path="nodejs-performance-fix-plan"
                element={
                  <div className="prose prose-slate dark:prose-invert max-w-none">
                    <CS2Phase3 />
                  </div>
                }
              />

              <Route
                path="nodejs-pm2-cluster-mode"
                element={
                  <div className="prose prose-slate dark:prose-invert max-w-none">
                    <CS2Phase3_1 />
                  </div>
                }
              />

              <Route
                path="nodejs-redis-rate-limiting"
                element={
                  <div className="prose prose-slate dark:prose-invert max-w-none">
                    <CS2Phase3_2 />
                  </div>
                }
              />

              <Route
                path="nodejs-mongoose-connection-pooling"
                element={
                  <div className="prose prose-slate dark:prose-invert max-w-none">
                    <CS2Phase3_3 />
                  </div>
                }
              />

              <Route
                path="nodejs-load-shedding-conclusion"
                element={
                  <div className="prose prose-slate dark:prose-invert max-w-none">
                    <CS2Phase3_4 />
                  </div>
                }
              />
            </Routes>
            {activeSection !== "quick-start" &&
              activeSection !== "architecture" &&
              activeSection !== "case-studies" &&
              !activeSection.startsWith("nodejs-") &&
              !activeSection.startsWith("cloud-concurrency") &&
              !activeSection.startsWith("scaling-nodejs") && (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-[#1c1c1e] rounded-full flex items-center justify-center mb-6 border border-gray-200 dark:border-white/10">
                    <FileText className="w-8 h-8 text-gray-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {navItems.find((i) => i.id === activeSection)?.label}
                  </h2>
                  <p className="text-gray-500 max-w-md">
                    This section of the documentation is currently being written
                    by our technical writing team. Check back soon for detailed
                    examples and guides!
                  </p>
                </div>
              )}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Docs;
