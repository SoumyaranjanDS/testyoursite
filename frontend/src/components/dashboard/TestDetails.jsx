import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Activity,
  CheckCircle,
  XCircle,
  Clock,
  Globe,
  Zap,
  Server,
  BarChart3,
  Timer
} from "lucide-react";
import api from "../../api";

const TestDetails = ({ testId, onBack }) => {
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (test && test.status === "running") {
      const calcTimeLeft = () => {
        const elapsed = Math.floor((Date.now() - new Date(test.createdAt).getTime()) / 1000);
        return Math.max(0, test.duration - elapsed);
      };
      
      setTimeLeft(calcTimeLeft());
      
      const timer = setInterval(() => {
        setTimeLeft(calcTimeLeft());
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [test]);

  useEffect(() => {
    let interval;
    const fetchTest = async () => {
      try {
        const res = await api.get(`/tests/${testId}`);
        setTest(res.data);
        setLoading(false);

        if (res.data.status !== "running" && interval) {
          clearInterval(interval);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load test details");
        setLoading(false);
        if (interval) clearInterval(interval);
      }
    };

    fetchTest();
    interval = setInterval(fetchTest, 2000);

    return () => clearInterval(interval);
  }, [testId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-white">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin mb-4"></div>
        <p className="text-gray-400 font-medium tracking-wide animate-pulse">Loading test data...</p>
      </div>
    );
  }

  if (error || !test) {
    return (
      <div className="text-red-400 text-center py-20">
        <XCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
        <p className="text-xl font-medium">{error || "Test not found"}</p>
        <button onClick={onBack} className="mt-6 px-6 py-2 bg-white/5 rounded-full text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
          Go Back
        </button>
      </div>
    );
  }

  const isRunning = test.status === "running";
  const isCompleted = test.status === "completed";
  const metrics = test.metrics || {};
  const rawOutput = test.rawOutput || {};

  const dataReceived = rawOutput.metrics?.data_received || {};
  const httpDuration = rawOutput.metrics?.http_req_duration || {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-8 max-w-5xl mx-auto"
    >
      {/* Navigation & Status Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium w-fit"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>
        <div className={`px-4 py-1.5 text-xs font-bold rounded-full uppercase tracking-widest flex items-center gap-2 w-fit ${
          isRunning ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.2)]' :
          isCompleted ? 'bg-green-500/10 text-green-400 border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]' :
          'bg-red-500/10 text-red-400 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
        }`}>
          {isRunning ? (
            <div className="w-3 h-3 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin" />
          ) : isCompleted ? (
            <CheckCircle className="w-3.5 h-3.5" />
          ) : (
            <XCircle className="w-3.5 h-3.5" />
          )}
          {test.status}
        </div>
      </div>

      {/* Hero Banner (Target Info) */}
      <div className="relative rounded-3xl p-8 overflow-hidden group">
        <div className="absolute inset-0 bg-[#09090b]/80 shadow-top border border-white/5 z-0 transition-colors group-hover:bg-[#09090b]"></div>
        {/* Subtle background glow based on method */}
        <div className={`absolute top-0 left-1/4 w-1/2 h-full opacity-10 blur-3xl z-0 ${
          test.method === 'POST' ? 'bg-green-500' :
          test.method === 'PUT' ? 'bg-yellow-500' :
          test.method === 'DELETE' ? 'bg-red-500' :
          test.method === 'PATCH' ? 'bg-purple-500' :
          'bg-blue-500'
        }`}></div>

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <p className="text-gray-500 text-sm font-semibold tracking-wider uppercase mb-3 flex items-center gap-2">
                <Globe className="w-4 h-4" /> Target Endpoint
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <span className={`px-3 py-1 rounded-lg text-sm font-bold tracking-wider ${
                  test.method === 'POST' ? 'bg-green-500/10 text-green-400' :
                  test.method === 'PUT' ? 'bg-yellow-500/10 text-yellow-400' :
                  test.method === 'DELETE' ? 'bg-red-500/10 text-red-400' :
                  test.method === 'PATCH' ? 'bg-purple-500/10 text-purple-400' :
                  'bg-blue-500/10 text-blue-400'
                }`}>
                  {test.method || 'GET'}
                </span>
                <h1 className="text-2xl md:text-3xl font-medium text-white break-all">
                  {test.url}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-6 bg-white/5 rounded-2xl p-5 border border-white/5 backdrop-blur-sm">
              <div>
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">VUs</p>
                <p className="text-xl font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-indigo-400" /> {test.virtualUsers}
                </p>
              </div>
              <div className="w-px h-10 bg-white/10"></div>
              <div>
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">Duration</p>
                <p className="text-xl font-bold text-white flex items-center gap-2">
                  <Timer className="w-4 h-4 text-indigo-400" /> {test.duration}s
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Running State */}
      {isRunning && (
        <div className="relative rounded-3xl p-12 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[#09090b]/80 shadow-top border border-white/5"></div>
          <div className="relative z-10 flex flex-col items-center justify-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 rounded-full animate-pulse"></div>
              <div className="w-20 h-20 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 border-r-indigo-500 animate-spin relative z-10" />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-2">Simulating Traffic</h2>
            <div className="text-4xl font-mono text-indigo-400 font-bold mb-4">
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </div>
            <p className="text-gray-400 max-w-sm mx-auto">
              Generating load from {test.virtualUsers} virtual users against your endpoint. Please wait for the test to complete.
            </p>
          </div>
        </div>
      )}

      {/* Failed State */}
      {test.status === 'failed' && (
        <div className="relative rounded-3xl p-8 overflow-hidden">
          <div className="absolute inset-0 bg-[#09090b]/80 shadow-top border border-red-500/20"></div>
          <div className="relative z-10 flex items-start gap-4">
            <div className="p-3 bg-red-500/10 rounded-xl">
              <XCircle className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white mb-2">Test Execution Failed</h2>
              <p className="text-red-400/90 text-sm font-mono p-4 bg-red-500/5 rounded-xl border border-red-500/10 whitespace-pre-wrap">
                {test.errorMessage || "An unknown error occurred during execution."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Completed State: Primary Metrics */}
      {isCompleted && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Requests */}
            <div className="relative rounded-3xl p-6 group">
              <div className="absolute inset-0 bg-[#09090b]/80 shadow-top border border-white/5 rounded-3xl transition-colors group-hover:bg-[#09090b]"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-gray-400">Total Requests</p>
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <BarChart3 className="w-4 h-4 text-blue-400" />
                  </div>
                </div>
                <h3 className="text-4xl font-bold text-white mb-1">
                  {(metrics.totalRequests || 0).toLocaleString()}
                </h3>
                <p className="text-xs text-gray-500 mt-2">Requests completed in {test.duration}s</p>
              </div>
            </div>

            {/* Average Latency */}
            <div className="relative rounded-3xl p-6 group">
              <div className="absolute inset-0 bg-[#09090b]/80 shadow-top border border-white/5 rounded-3xl transition-colors group-hover:bg-[#09090b]"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-gray-400">Avg Latency</p>
                  <div className="p-2 bg-yellow-500/10 rounded-lg">
                    <Clock className="w-4 h-4 text-yellow-400" />
                  </div>
                </div>
                <div className="flex items-end gap-2 mb-1">
                  <h3 className="text-4xl font-bold text-white">
                    {metrics.avgLatency?.toFixed(1) || 0}
                  </h3>
                  <span className="text-lg text-gray-500 font-medium mb-1">ms</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">Average response time</p>
              </div>
            </div>

            {/* Error Rate */}
            <div className="relative rounded-3xl p-6 group">
              <div className="absolute inset-0 bg-[#09090b]/80 shadow-top border border-white/5 rounded-3xl transition-colors group-hover:bg-[#09090b]"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-gray-400">Error Rate</p>
                  <div className={`p-2 rounded-lg ${metrics.errorRate > 0 ? 'bg-red-500/10' : 'bg-green-500/10'}`}>
                    {metrics.errorRate > 0 ? <XCircle className="w-4 h-4 text-red-400" /> : <CheckCircle className="w-4 h-4 text-green-400" />}
                  </div>
                </div>
                <div className="flex items-end gap-2 mb-1">
                  <h3 className={`text-4xl font-bold ${metrics.errorRate > 0 ? 'text-red-400' : 'text-white'}`}>
                    {metrics.errorRate?.toFixed(2) || 0}
                  </h3>
                  <span className="text-lg text-gray-500 font-medium mb-1">%</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">{metrics.errorRate > 0 ? 'Some requests failed' : 'All requests successful'}</p>
              </div>
            </div>
          </div>

          {/* Secondary Stats Row */}
          <div className="relative rounded-3xl p-6">
            <div className="absolute inset-0 bg-[#09090b]/80 shadow-top border border-white/5 rounded-3xl"></div>
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-white/5">
              
              <div className="px-4 first:pl-0">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-indigo-400" /> P95 Latency
                </p>
                <p className="text-xl font-semibold text-white">{metrics.p95Latency?.toFixed(1) || 0} <span className="text-sm text-gray-500 font-normal">ms</span></p>
              </div>

              <div className="px-4">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-green-400" /> Throughput
                </p>
                <p className="text-xl font-semibold text-white">{metrics.throughput?.toFixed(1) || 0} <span className="text-sm text-gray-500 font-normal">req/s</span></p>
              </div>

              <div className="px-4">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-gray-400" /> Min / Max
                </p>
                <p className="text-lg font-semibold text-white">
                  {httpDuration.min?.toFixed(0) || 0} <span className="text-xs text-gray-500">ms</span> 
                  <span className="text-gray-600 mx-2">/</span> 
                  {httpDuration.max?.toFixed(0) || 0} <span className="text-xs text-gray-500">ms</span>
                </p>
              </div>

              <div className="px-4">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-blue-400" /> Data Received
                </p>
                <p className="text-xl font-semibold text-white">{((dataReceived.count || 0) / 1024 / 1024).toFixed(2)} <span className="text-sm text-gray-500 font-normal">MB</span></p>
              </div>

            </div>
          </div>

          {/* Error Diagnostics */}
          {test.errorDetails && test.errorDetails.length > 0 && (
            <div className="relative rounded-3xl p-6 mt-6">
              <div className="absolute inset-0 bg-red-500/5 shadow-top border border-red-500/20 rounded-3xl"></div>
              <div className="relative z-10">
                <h3 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> Error Diagnostics
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {test.errorDetails.map((err, i) => (
                    <div key={i} className="bg-[#09090b]/80 border border-red-500/10 rounded-xl p-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-red-400 font-medium mb-1">{err.message}</p>
                        <p className="text-white font-mono text-lg font-bold">
                          HTTP {err.code === 0 ? 'ERR' : err.code}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500 mb-1">Occurrences</p>
                        <p className="text-xl font-bold text-gray-300">{err.count.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      )}
    </motion.div>
  );
};

export default TestDetails;
