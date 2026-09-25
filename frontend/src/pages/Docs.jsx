import React, { useState } from 'react';
import { Book, Code, Terminal, Zap, FileText, ChevronRight, Play, Server, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const Docs = () => {
  const [activeSection, setActiveSection] = useState('quick-start');

  const navItems = [
    { id: 'introduction', label: 'Introduction', icon: Book },
    { id: 'quick-start', label: 'Quick Start', icon: Play },
    { id: 'writing-tests', label: 'Writing Tests', icon: Code },
    { id: 'cli-reference', label: 'CLI Reference', icon: Terminal },
    { id: 'ai-analysis', label: 'AI Root Cause', icon: Zap },
    { id: 'metrics', label: 'Understanding Metrics', icon: Activity },
    { id: 'ci-cd', label: 'CI/CD Integration', icon: Server },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 bg-white dark:bg-[#09090b] text-gray-900 dark:text-gray-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Navigation */}
        <aside className="w-full lg:w-64 shrink-0 lg:pr-8 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-white/10 pb-8 lg:pb-0 mb-8 lg:mb-0">
          <div className="sticky top-28">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 px-2">
              Getting Started
            </h3>
            <nav className="flex flex-col space-y-0.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center justify-between px-2 py-1.5 text-sm text-left transition-colors rounded-lg ${
                    activeSection === item.id
                      ? 'text-[#6366f1] dark:text-[#818cf8] font-medium bg-indigo-50 dark:bg-indigo-500/10'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
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
            {activeSection === 'quick-start' && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 font-heading">Quick Start Guide</h1>
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    Welcome to TestYourSite! This beginner-friendly guide will help you run your very first load test in under 3 minutes. No complex installations or agents required.
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">1. Install the CLI</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    The easiest way to trigger a test is through our Node-based CLI. Open your terminal and run:
                  </p>
                  <div className="bg-gray-900 dark:bg-[#000000] rounded-xl p-4 flex items-center justify-between border border-gray-800 dark:border-white/5 shadow-inner">
                    <code className="text-emerald-400 text-sm font-mono">npm install -g testyoursite-cli</code>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">2. Authenticate</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Link the CLI to your account using the API key found in your dashboard.
                  </p>
                  <div className="bg-gray-900 dark:bg-[#000000] rounded-xl p-4 flex items-center justify-between border border-gray-800 dark:border-white/5 shadow-inner">
                    <code className="text-blue-400 text-sm font-mono">tys login --token="YOUR_API_KEY"</code>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">3. Run Your First Test</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    We'll simulate 50 virtual users connecting to your website for 30 seconds. Replace <code className="text-pink-400 bg-pink-400/10 px-1.5 py-0.5 rounded">example.com</code> with your actual URL.
                  </p>
                  <div className="bg-gray-900 dark:bg-[#000000] rounded-xl p-4 border border-gray-800 dark:border-white/5 shadow-inner">
                    <pre className="text-gray-300 text-sm font-mono whitespace-pre-wrap">
                      <span className="text-[#6366f1]">tys</span> run \ <br/>
                      &nbsp;&nbsp;--url <span className="text-emerald-400">"https://example.com"</span> \ <br/>
                      &nbsp;&nbsp;--users <span className="text-orange-400">50</span> \ <br/>
                      &nbsp;&nbsp;--duration <span className="text-orange-400">30s</span>
                    </pre>
                  </div>
                </div>

                <div className="bg-indigo-50 dark:bg-[#6366f1]/10 border border-indigo-200 dark:border-[#6366f1]/30 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="w-5 h-5 text-[#6366f1]" />
                    <h4 className="font-bold text-gray-900 dark:text-white">What happens next?</h4>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    TestYourSite will automatically provision global servers and begin directing traffic to your URL. Real-time metrics (like latency, CPU spikes, and error rates) will stream directly to your web dashboard. If any bottlenecks occur, our AI will automatically attach a root-cause analysis report.
                  </p>
                </div>
              </div>
            )}

            {activeSection !== 'quick-start' && (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 bg-gray-100 dark:bg-[#1c1c1e] rounded-full flex items-center justify-center mb-6 border border-gray-200 dark:border-white/10">
                  <FileText className="w-8 h-8 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {navItems.find(i => i.id === activeSection)?.label}
                </h2>
                <p className="text-gray-500 max-w-md">
                  This section of the documentation is currently being written by our technical writing team. Check back soon for detailed examples and guides!
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
