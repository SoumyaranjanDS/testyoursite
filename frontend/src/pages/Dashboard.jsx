import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Play,
  Activity,
  Settings,
  LogOut,
  CheckCircle,
  Clock,
  ArrowUpRight,
  Cpu,
  Zap,
  Code,
  ChevronDown,
  BookOpen
} from "lucide-react";
import { motion } from "framer-motion";
import Editor from "@monaco-editor/react";
import Logo from "../components/common/Logo";
import api from "../api";
import TestDetails from "../components/dashboard/TestDetails";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Test Data State
  const [tests, setTests] = useState([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);
  const [selectedTestId, setSelectedTestId] = useState(null);
  
  // Form State
  const [method, setMethod] = useState("GET");
  const [targetUrl, setTargetUrl] = useState("");
  const [virtualUsers, setVirtualUsers] = useState(10);
  const [duration, setDuration] = useState(10);
  const [headers, setHeaders] = useState('{\n  "Content-Type": "application/json"\n}');
  const [body, setBody] = useState("");
  const [isTestStarting, setIsTestStarting] = useState(false);
  const [isMethodDropdownOpen, setIsMethodDropdownOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
    } else {
      setUser(JSON.parse(userData));
      fetchTestHistory();
    }
  }, [navigate]);

  const fetchTestHistory = async () => {
    try {
      setIsHistoryLoading(true);
      const res = await api.get('/tests/history');
      setTests(res.data);
    } catch (err) {
      console.error("Failed to fetch test history:", err);
    } finally {
      setIsHistoryLoading(false);
    }
  };

  const handleStartTest = async (e) => {
    e.preventDefault();
    if (!targetUrl) return;
    
    try {
      setIsTestStarting(true);
      // Run the test
      const res = await api.post('/tests/run', {
        url: targetUrl,
        method,
        headers,
        body,
        virtualUsers: Number(virtualUsers),
        duration: Number(duration)
      });
      
      // Clear form
      setTargetUrl("");
      setVirtualUsers(10);
      setDuration(10);
      
      // Jump to test details view and poll
      setActiveTab("test-details");
      setSelectedTestId(res.data.testId);
      
      // Still refresh the background history list so it's fresh when they go back
      fetchTestHistory();
    } catch (err) {
      console.error("Failed to start test", err);
      alert("Failed to start test. Make sure backend is running.");
    } finally {
      setIsTestStarting(false);
    }
  };

  const openTestDetails = (testId) => {
    setSelectedTestId(testId);
    setActiveTab("test-details");
  };

  const handleBackToHistory = () => {
    setActiveTab("history");
    setSelectedTestId(null);
    fetchTestHistory();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("authChange"));
    navigate("/");
  };

  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "new-test", label: "Load Generator", icon: Play },
    { id: "history", label: "Test History", icon: Activity },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  if (!user) return null;

  return (
    <div className="h-screen bg-[#09090b] flex font-sans text-white overflow-hidden">
      {/* Professional Expanded Sidebar */}
      <aside className="w-64 bg-[#09090b] border-r border-white/10 flex flex-col shrink-0 z-10 hidden md:flex h-full">
        {/* Brand Header */}
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <Link to="/" className="flex items-center gap-3 group">
            <Logo className="w-6 h-6 text-white group-hover:text-indigo-400 transition-colors" />
            <span className="font-heading text-lg font-semibold tracking-wide text-white">
              LoadGen
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-1">
          <div className="px-3 mb-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
              Dashboard
            </p>
          </div>

          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`group relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium ${
                  isActive
                    ? "text-white"
                    : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                }`}
              >
                {isActive && (
                  <div className="absolute inset-0 rounded-xl bg-secondary/90 shadow-top dark:bg-secondary/90 border border-white/5" style={{ opacity: 1 }}></div>
                )}
                <div className="relative z-10 flex items-center gap-3 w-full">
                  <item.icon
                    className="w-4 h-4"
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  {item.label}
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
                  )}
                </div>
              </button>
            );
          })}
        </nav>

        {/* User Profile Footer */}
        <div className="p-4 border-t border-white/5 bg-[#121214]/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 flex items-center justify-center text-white font-bold shadow-sm border border-white/10">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user.email?.split("@")[0]}
              </p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full pt-10 px-6 pb-20 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {activeTab !== "test-details" && (
          <header className="mb-12 flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-semibold text-white mb-2">
                {activeTab === "overview"
                  ? `Hello, ${user.email.split("@")[0]}`
                  : activeTab === "new-test"
                    ? "Load Generator"
                    : "Dashboard"}
              </h1>
              <p className="text-gray-400 text-sm">
                {activeTab === "overview"
                  ? "View and control your infrastructure here."
                  : "Configure your target endpoint and traffic patterns."}
              </p>
            </div>
          </header>
        )}

        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Cards using exact inspected structure */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative rounded-2xl p-6 flex flex-col justify-between min-h-[160px] group">
                <div
                  className="absolute inset-0 rounded-2xl bg-secondary/90 shadow-top dark:bg-secondary/90 border border-white/5"
                  style={{ opacity: 1 }}
                ></div>

                <div className="relative z-10 flex justify-between items-start">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Activity className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium">Total Tests</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-600" />
                </div>
                <div className="relative z-10 flex items-end justify-between mt-8">
                  <p className="text-4xl font-semibold text-white">12</p>
                  <span className="text-sm font-medium text-blue-400">
                    +2 this week
                  </span>
                </div>
              </div>

              <div className="relative rounded-2xl p-6 flex flex-col justify-between min-h-[160px] group">
                <div
                  className="absolute inset-0 rounded-2xl bg-secondary/90 shadow-top dark:bg-secondary/90 border border-white/5"
                  style={{ opacity: 1 }}
                ></div>

                <div className="relative z-10 flex justify-between items-start">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Cpu className="w-4 h-4 text-purple-400" />
                    <span className="text-sm font-medium">Compute Used</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-600" />
                </div>
                <div className="relative z-10 flex items-end justify-between mt-8">
                  <p className="text-4xl font-semibold text-white">
                    2.4
                    <span className="text-2xl text-gray-500 font-normal">
                      h
                    </span>
                  </p>
                  <span className="text-sm font-medium text-purple-400">
                    10h limit
                  </span>
                </div>
              </div>

              <div className="relative rounded-2xl p-6 flex flex-col justify-between min-h-[160px] group">
                <div
                  className="absolute inset-0 rounded-2xl bg-secondary/90 shadow-top dark:bg-secondary/90 border border-white/5"
                  style={{ opacity: 1 }}
                ></div>

                <div className="relative z-10 flex justify-between items-start">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Zap className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-medium">Avg Latency</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-600" />
                </div>
                <div className="relative z-10 flex items-end justify-between mt-8">
                  <p className="text-4xl font-semibold text-white">
                    145
                    <span className="text-2xl text-gray-500 font-normal">
                      ms
                    </span>
                  </p>
                  <span className="text-sm font-medium text-green-400">
                    p95
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="relative rounded-2xl p-6">
              <div
                className="absolute inset-0 rounded-2xl bg-secondary/90 shadow-top dark:bg-secondary/90 border border-white/5"
                style={{ opacity: 1 }}
              ></div>

              <div className="relative z-10 flex justify-between items-center mb-6">
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">Recent Activity</span>
                </div>
              </div>

              <div className="relative z-10 space-y-4">
                {isHistoryLoading ? (
                  <p className="text-gray-500 text-sm">Loading history...</p>
                ) : tests.length === 0 ? (
                  <p className="text-gray-500 text-sm">No tests run yet.</p>
                ) : (
                  tests.slice(0, 5).map((test) => (
                    <div
                      key={test._id}
                      onClick={() => openTestDetails(test._id)}
                      className="flex items-center justify-between p-4 bg-[#18181b]/50 border border-white/5 rounded-xl cursor-pointer hover:bg-white/5 transition-colors group"
                    >
                      <div className="flex items-center gap-4">
                        {test.status === 'running' ? (
                          <div className="w-5 h-5 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
                        ) : test.status === 'completed' ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center">
                            <span className="text-red-500 text-xs font-bold">!</span>
                          </div>
                        )}
                        <div>
                          <p className="text-base font-medium text-white max-w-[200px] sm:max-w-[400px] truncate group-hover:text-indigo-300 transition-colors">
                            {test.url}
                          </p>
                          <p className="text-sm text-gray-500">
                            {test.virtualUsers} VUs • {test.duration}s
                          </p>
                        </div>
                      </div>
                      <div className="text-right flex items-center gap-4">
                        <div>
                          <p className="text-sm font-medium text-white capitalize">
                            {test.status}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(test.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "new-test" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-indigo-400" />
              <h2 className="text-lg font-semibold text-white">Create Load Test</h2>
            </div>
            
            <form onSubmit={handleStartTest} className="space-y-6">
              
              {/* Endpoint Configuration */}
              <div className="relative rounded-2xl p-6 z-50">
                <div className="absolute inset-0 rounded-2xl bg-secondary/90 shadow-top dark:bg-secondary/90 border border-white/5" style={{ opacity: 1 }}></div>
                <div className="relative z-10 space-y-4">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Target Endpoint</label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsMethodDropdownOpen(!isMethodDropdownOpen)}
                        className="bg-[#09090b] border border-white/10 text-white font-medium rounded-xl px-4 py-3 sm:w-32 focus:outline-none focus:border-white/30 transition-all shadow-lg flex items-center justify-between hover:bg-white/5"
                      >
                        <span>{method}</span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </button>
                      
                      {isMethodDropdownOpen && (
                        <div className="absolute top-full left-0 mt-3 w-full bg-[#09090b] border border-white/10 rounded-xl overflow-hidden z-[100] shadow-[0_20px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                          {['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].map(m => (
                            <button
                              key={m}
                              type="button"
                              className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-white hover:text-black transition-all group"
                              onClick={() => {
                                setMethod(m);
                                setIsMethodDropdownOpen(false);
                              }}
                            >
                              <span className="font-medium group-hover:font-bold">{m}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <input
                      type="url"
                      placeholder="https://api.example.com/v1/users"
                      className="flex-1 bg-[#09090b]/80 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500/50 transition-colors placeholder:text-gray-600"
                      required
                      value={targetUrl}
                      onChange={(e) => setTargetUrl(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Traffic Shaping */}
                <div className="relative rounded-2xl p-6 h-full">
                  <div className="absolute inset-0 rounded-2xl bg-secondary/90 shadow-top dark:bg-secondary/90 border border-white/5" style={{ opacity: 1 }}></div>
                  <div className="relative z-10 space-y-6 h-full flex flex-col">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                      <Activity className="w-4 h-4" /> Traffic Shaping
                    </label>
                    <div className="space-y-4 flex-1">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <label className="text-sm font-medium text-gray-300">Virtual Users (VUs)</label>
                          <span className="text-sm text-indigo-400 font-medium">{virtualUsers}</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="500"
                          value={virtualUsers}
                          onChange={(e) => setVirtualUsers(e.target.value)}
                          className="w-full accent-indigo-500"
                        />
                        <p className="text-xs text-gray-500">Number of concurrent connections simulated.</p>
                      </div>
                      
                      <div className="space-y-2 pt-4">
                        <div className="flex justify-between">
                          <label className="text-sm font-medium text-gray-300">Duration</label>
                          <span className="text-sm text-indigo-400 font-medium">{duration}s</span>
                        </div>
                        <input
                          type="range"
                          min="5"
                          max="300"
                          step="5"
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                          className="w-full accent-indigo-500"
                        />
                        <p className="text-xs text-gray-500">Total time the load test will run.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Request Payload */}
                <div className="relative rounded-2xl p-6 h-full">
                  <div className="absolute inset-0 rounded-2xl bg-secondary/90 shadow-top dark:bg-secondary/90 border border-white/5" style={{ opacity: 1 }}></div>
                  <div className="relative z-10 space-y-4 h-full flex flex-col">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                      <Code className="w-4 h-4" /> Request Payload
                    </label>
                    <div className="space-y-4 flex-1 flex flex-col">
                      <div className={method === 'GET' || method === 'HEAD' ? 'flex-1 flex flex-col min-h-[250px]' : 'h-32 flex flex-col min-h-[120px]'}>
                        <label className="text-xs text-gray-500 mb-2 block font-medium">Headers (JSON)</label>
                        <div className="flex-1 border border-white/10 rounded-lg overflow-hidden bg-[#1e1e1e] shadow-inner relative">
                          <Editor
                            height="100%"
                            defaultLanguage="json"
                            theme="vs-dark"
                            value={headers}
                            onChange={(val) => setHeaders(val || '')}
                            options={{
                              minimap: { enabled: false },
                              scrollBeyondLastLine: false,
                              fontSize: 13,
                              lineNumbers: 'on',
                              wordWrap: 'on',
                              padding: { top: 12, bottom: 12 },
                              overviewRulerLanes: 0,
                              hideCursorInOverviewRuler: true,
                              scrollbar: { vertical: 'hidden' },
                              renderLineHighlight: 'none',
                            }}
                          />
                        </div>
                      </div>
                      
                      {method !== 'GET' && method !== 'HEAD' && (
                        <div className="flex-1 flex flex-col min-h-[200px]">
                          <label className="text-xs text-gray-500 mb-2 block font-medium">Body (JSON / Text)</label>
                          <div className="flex-1 border border-white/10 rounded-lg overflow-hidden bg-[#1e1e1e] shadow-inner relative">
                            <Editor
                              height="100%"
                              defaultLanguage="json"
                              theme="vs-dark"
                              value={body}
                              onChange={(val) => setBody(val || '')}
                              options={{
                                minimap: { enabled: false },
                                scrollBeyondLastLine: false,
                                fontSize: 13,
                                lineNumbers: 'on',
                                wordWrap: 'on',
                                padding: { top: 12, bottom: 12 },
                                overviewRulerLanes: 0,
                                hideCursorInOverviewRuler: true,
                                scrollbar: { vertical: 'hidden' },
                                renderLineHighlight: 'none',
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Area */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={isTestStarting}
                  className="bg-white hover:bg-gray-200 text-black font-semibold py-3 px-8 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 min-w-[200px]"
                >
                  {isTestStarting ? (
                    <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                  ) : (
                    <Play className="w-4 h-4 fill-current" />
                  )}
                  {isTestStarting ? "Starting test..." : "Run Test"}
                </button>
              </div>

            </form>
          </motion.div>
        )}

        {activeTab === "history" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="relative rounded-2xl p-6">
              <div
                className="absolute inset-0 rounded-2xl bg-secondary/90 shadow-top dark:bg-secondary/90 border border-white/5"
                style={{ opacity: 1 }}
              ></div>

              <div className="relative z-10 flex justify-between items-center mb-6">
                <div className="flex items-center gap-2 text-gray-400">
                  <Activity className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium">Full Test History</span>
                </div>
              </div>

              <div className="relative z-10 space-y-4">
                {isHistoryLoading ? (
                  <p className="text-gray-500 text-sm">Loading history...</p>
                ) : tests.length === 0 ? (
                  <p className="text-gray-500 text-sm">No tests run yet.</p>
                ) : (
                  tests.map((test) => (
                    <div
                      key={test._id}
                      onClick={() => openTestDetails(test._id)}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-[#18181b]/50 border border-white/5 rounded-xl gap-4 cursor-pointer hover:bg-white/5 transition-colors group"
                    >
                      <div className="flex items-start sm:items-center gap-4 w-full sm:w-auto">
                        {test.status === 'running' ? (
                          <div className="w-5 h-5 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin mt-1 sm:mt-0 shrink-0" />
                        ) : test.status === 'completed' ? (
                          <CheckCircle className="w-5 h-5 text-green-400 mt-1 sm:mt-0 shrink-0" />
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center mt-1 sm:mt-0 shrink-0">
                            <span className="text-red-500 text-xs font-bold">!</span>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-base font-medium text-white truncate group-hover:text-indigo-300 transition-colors">
                            {test.url}
                          </p>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-400 mt-1">
                            <span>VUs: <span className="text-white">{test.virtualUsers}</span></span>
                            <span>Duration: <span className="text-white">{test.duration}s</span></span>
                            {test.status === 'completed' && (
                              <>
                                <span>Total Reqs: <span className="text-white">{test.metrics?.totalRequests}</span></span>
                                <span>P95 Latency: <span className="text-white">{test.metrics?.p95Latency?.toFixed(1)}ms</span></span>
                                <span>Errors: <span className="text-red-400">{test.metrics?.errorRate?.toFixed(1)}%</span></span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-left sm:text-right w-full sm:w-auto shrink-0 pl-9 sm:pl-0 flex items-center justify-between sm:block">
                        <div>
                          <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full capitalize ${
                            test.status === 'running' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                            test.status === 'completed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                            'bg-red-500/10 text-red-400 border border-red-500/20'
                          }`}>
                            {test.status}
                          </span>
                          <p className="text-xs text-gray-500 mt-2">
                            {new Date(test.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-gray-600 sm:hidden group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "test-details" && selectedTestId && (
          <TestDetails testId={selectedTestId} onBack={handleBackToHistory} />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
