import React from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, Zap, Terminal, Globe, AlertTriangle, 
  CheckCircle2, Search, Bell, Settings, 
  BarChart2, FileText, ChevronRight 
} from 'lucide-react';

const DashboardPreview = () => {
  return (
    <section id="live-testing" className="py-24 bg-[#09090b] relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          
          <h2 className="text-4xl md:text-5xl font-medium text-white mb-6 font-heading">
            Everything you need in <br className="hidden md:block" /> one unified view<span className="text-blue-500">.</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base leading-relaxed">
            Correlate synthetic traffic spikes directly with native server metrics. 
            Identify bottlenecks in seconds with AI-powered root cause analysis.
          </p>
        </div>

        {/* Dashboard Mockup Container */}
        <div className="relative mx-auto max-w-6xl w-full rounded-2xl border border-white/10 bg-[#121214] shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.02)] overflow-hidden">
          
          {/* Mockup Header (Window Controls) */}
          <div className="h-12 border-b border-white/5 flex items-center px-4 bg-[#1c1c1e] justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/5">
              <Globe className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-xs text-gray-300 font-mono">api.production.internal</span>
            </div>
            <div className="flex items-center gap-4">
              <Search className="w-4 h-4 text-gray-400" />
              <Bell className="w-4 h-4 text-gray-400" />
              <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                <span className="text-[10px] text-blue-400 font-bold">JD</span>
              </div>
            </div>
          </div>

          <div className="flex">
            {/* Sidebar */}
            <div className="w-64 border-r border-white/5 bg-[#121214] p-4 flex flex-col gap-8 hidden md:flex">
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-3">
                  Overview
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-blue-500/10 text-blue-400 cursor-pointer">
                    <Activity className="w-4 h-4" />
                    <span className="text-sm font-medium">Live Metrics</span>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-white/5 cursor-pointer transition-colors">
                    <BarChart2 className="w-4 h-4" />
                    <span className="text-sm">Historical Tests</span>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-white/5 cursor-pointer transition-colors">
                    <Terminal className="w-4 h-4" />
                    <span className="text-sm">SSH Agents</span>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-3">
                  Analysis
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-white/5 cursor-pointer transition-colors">
                    <Zap className="w-4 h-4" />
                    <span className="text-sm">AI Insights</span>
                    <span className="ml-auto flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white">2</span>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-white/5 cursor-pointer transition-colors">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm">Reports</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 bg-[#09090b] flex flex-col overflow-hidden">
              {/* Toolbar */}
              <div className="h-16 border-b border-white/5 flex items-center px-6 justify-between shrink-0">
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-medium text-white">Active Load Test</h3>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-medium text-emerald-400">Running</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-400">Duration: <span className="text-gray-200 font-mono">04:23</span></span>
                  <button className="px-4 py-1.5 rounded-md bg-[#DC382D] text-white text-sm font-medium hover:bg-[#b92b22] transition-colors">
                    Stop Test
                  </button>
                </div>
              </div>

              {/* Dashboard Body */}
              <div className="flex-1 p-6 space-y-6">
                
                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { label: "Active VUs", value: "2,450", trend: "+12%", color: "text-blue-400" },
                    { label: "Req/Second", value: "8,920", trend: "+45%", color: "text-emerald-400" },
                    { label: "P95 Latency", value: "1.24s", trend: "+0.8s", color: "text-orange-400", alert: true },
                    { label: "Error Rate", value: "0.04%", trend: "-0.01%", color: "text-gray-200" },
                  ].map((stat, i) => (
                    <div key={i} className="p-4 rounded-xl bg-[#1c1c1e] border border-white/10 relative overflow-hidden group shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Activity className="w-12 h-12" />
                      </div>
                      <div className="text-xs text-gray-400 mb-1 flex items-center gap-2">
                        {stat.label}
                        {stat.alert && <AlertTriangle className="w-3 h-3 text-orange-400" />}
                      </div>
                      <div className={`text-3xl font-bold font-mono mb-2 ${stat.color}`}>
                        {stat.value}
                      </div>
                      <div className={`text-[10px] font-medium px-2 py-0.5 rounded-sm inline-block ${stat.alert ? 'bg-orange-500/10 text-orange-400' : 'bg-white/5 text-gray-400'}`}>
                        {stat.trend} vs baseline
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Chart Area */}
                  <div className="lg:col-span-2 rounded-xl bg-[#1c1c1e] border border-white/10 p-5 flex flex-col shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-sm font-medium text-gray-200">Requests vs CPU Load (Correlated)</h4>
                      <div className="flex gap-2">
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                          <div className="w-2 h-2 rounded-full bg-blue-500" /> RPS
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                          <div className="w-2 h-2 rounded-full bg-orange-500" /> Target CPU %
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1 relative w-full h-[220px]">
                      {/* Fake Chart Grid */}
                      <div className="absolute inset-0 flex flex-col justify-between">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-full border-t border-white/5" />
                        ))}
                      </div>
                      {/* Fake SVG Chart Line - RPS */}
                      <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                        <path 
                          d="M0,200 L50,190 L100,160 L150,170 L200,90 L250,95 L300,40 L350,50 L400,20 L450,25 L500,20" 
                          fill="none" 
                          stroke="#3b82f6" 
                          strokeWidth="3" 
                          vectorEffect="non-scaling-stroke"
                        />
                        <path 
                          d="M0,200 L50,190 L100,160 L150,170 L200,90 L250,95 L300,40 L350,50 L400,20 L450,25 L500,20 L500,220 L0,220 Z" 
                          fill="url(#blue-grad)" 
                          opacity="0.2"
                          vectorEffect="non-scaling-stroke"
                        />
                        <defs>
                          <linearGradient id="blue-grad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                      </svg>
                      {/* Fake SVG Chart Line - CPU */}
                      <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                        <path 
                          d="M0,210 L50,205 L100,190 L150,195 L200,150 L250,155 L300,90 L350,80 L400,30 L450,20 L500,15" 
                          fill="none" 
                          stroke="#f97316" 
                          strokeWidth="2" 
                          strokeDasharray="4 4"
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>
                      
                      {/* Hover Tooltip Mock */}
                      <div className="absolute top-[30px] left-[65%] -translate-x-1/2 w-[2px] h-full bg-white/20 pointer-events-none">
                        <div className="absolute top-0 left-4 bg-[#2c2c2e] border border-white/10 rounded-lg p-2 shadow-xl whitespace-nowrap z-20">
                          <div className="text-[10px] text-gray-400 mb-1">14:23:45</div>
                          <div className="text-xs text-white font-medium flex items-center justify-between gap-4">
                            <span>RPS:</span> <span className="text-blue-400 font-mono">8,920</span>
                          </div>
                          <div className="text-xs text-white font-medium flex items-center justify-between gap-4 mt-0.5">
                            <span>CPU:</span> <span className="text-orange-400 font-mono">94%</span>
                          </div>
                        </div>
                        <div className="absolute top-[-5px] left-[-4px] w-2.5 h-2.5 rounded-full bg-orange-500 border-2 border-[#1c1c1e]" />
                      </div>
                    </div>
                  </div>

                  {/* AI Insights Panel */}
                  <div className="rounded-xl bg-[#1c1c1e] border border-white/10 p-5 flex flex-col shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                    <div className="flex items-center gap-2 mb-4">
                      <Zap className="w-4 h-4 text-blue-400" />
                      <h4 className="text-sm font-medium text-gray-200">AI Root Cause</h4>
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                        <div className="flex gap-2">
                          <AlertTriangle className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                          <div>
                            <div className="text-xs font-semibold text-orange-400 mb-1">CPU Spiking at 94%</div>
                            <div className="text-[11px] text-gray-400 leading-relaxed">
                              Node.js event loop is blocked. The `crypto.pbkdf2` function in your auth middleware is running synchronously under heavy load.
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                        <div className="flex gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <div>
                            <div className="text-xs font-semibold text-gray-300 mb-1">DB Connections OK</div>
                            <div className="text-[11px] text-gray-500 leading-relaxed">
                              Connection pool is stable at 45/100. No deadlocks detected in Postgres.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button className="w-full mt-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] transition-colors text-xs font-medium text-white flex items-center justify-center gap-2">
                      Generate PDF Report
                    </button>
                  </div>
                </div>

                {/* Bottom Agents List */}
                <div className="rounded-xl bg-[#1c1c1e] border border-white/10 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                   <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-medium text-gray-200">Active SSH Agents</h4>
                      <div className="text-xs text-blue-400 hover:text-blue-300 cursor-pointer">View All</div>
                   </div>
                   
                   <div className="overflow-hidden rounded-lg border border-white/5">
                     <table className="w-full text-left text-xs">
                       <thead className="bg-[#2c2c2e] text-gray-400">
                         <tr>
                           <th className="px-4 py-2 font-medium">Hostname</th>
                           <th className="px-4 py-2 font-medium">Status</th>
                           <th className="px-4 py-2 font-medium">CPU</th>
                           <th className="px-4 py-2 font-medium">RAM</th>
                           <th className="px-4 py-2 font-medium text-right">Actions</th>
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-white/5">
                         <tr className="bg-[#1c1c1e] hover:bg-white/5 transition-colors">
                           <td className="px-4 py-3 font-mono text-gray-300">web-prod-01</td>
                           <td className="px-4 py-3">
                             <span className="flex items-center gap-1.5 text-emerald-400">
                               <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Connected
                             </span>
                           </td>
                           <td className="px-4 py-3 text-orange-400 font-mono">94%</td>
                           <td className="px-4 py-3 text-gray-400 font-mono">4.2GB</td>
                           <td className="px-4 py-3 text-right">
                             <ChevronRight className="w-4 h-4 text-gray-500 inline-block cursor-pointer hover:text-white" />
                           </td>
                         </tr>
                         <tr className="bg-[#1c1c1e] hover:bg-white/5 transition-colors">
                           <td className="px-4 py-3 font-mono text-gray-300">db-prod-primary</td>
                           <td className="px-4 py-3">
                             <span className="flex items-center gap-1.5 text-emerald-400">
                               <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Connected
                             </span>
                           </td>
                           <td className="px-4 py-3 text-gray-400 font-mono">22%</td>
                           <td className="px-4 py-3 text-gray-400 font-mono">14.8GB</td>
                           <td className="px-4 py-3 text-right">
                             <ChevronRight className="w-4 h-4 text-gray-500 inline-block cursor-pointer hover:text-white" />
                           </td>
                         </tr>
                       </tbody>
                     </table>
                   </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
