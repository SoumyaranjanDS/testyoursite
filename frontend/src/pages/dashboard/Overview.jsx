import React from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  Cpu,
  Zap,
  Clock,
  CheckCircle,
} from "lucide-react";

const Overview = () => {
  const { user, tests, isHistoryLoading } = useOutletContext();
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative rounded-2xl p-6 flex flex-col justify-between min-h-[160px] group">
          <div className="absolute inset-0 rounded-2xl bg-secondary/90 shadow-top dark:bg-secondary/90 border border-white/5"></div>
          <div className="relative z-10 flex justify-between items-start">
            <div className="flex items-center gap-2 text-gray-400">
              <Activity className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium">Total Tests</span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-gray-600" />
          </div>
          <div className="relative z-10 flex items-end justify-between mt-8">
            <p className="text-4xl font-semibold text-white">{tests.length || 0}</p>
            <span className="text-sm font-medium text-blue-400">Lifetime</span>
          </div>
        </div>

        <div className="relative rounded-2xl p-6 flex flex-col justify-between min-h-[160px] group">
          <div className="absolute inset-0 rounded-2xl bg-secondary/90 shadow-top dark:bg-secondary/90 border border-white/5"></div>
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
              <span className="text-2xl text-gray-500 font-normal">h</span>
            </p>
            <span className="text-sm font-medium text-purple-400">10h limit</span>
          </div>
        </div>

        <div className="relative rounded-2xl p-6 flex flex-col justify-between min-h-[160px] group">
          <div className="absolute inset-0 rounded-2xl bg-secondary/90 shadow-top dark:bg-secondary/90 border border-white/5"></div>
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
              <span className="text-2xl text-gray-500 font-normal">ms</span>
            </p>
            <span className="text-sm font-medium text-green-400">p95</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="relative rounded-2xl p-6">
        <div className="absolute inset-0 rounded-2xl bg-secondary/90 shadow-top dark:bg-secondary/90 border border-white/5"></div>

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
                onClick={() => navigate(`/dashboard/history/${test._id}`)}
                className="flex items-center justify-between p-4 bg-[#18181b]/50 border border-white/5 rounded-xl cursor-pointer hover:bg-white/5 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  {test.status === "running" ? (
                    <div className="w-5 h-5 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
                  ) : test.status === "completed" ? (
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
  );
};

export default Overview;
