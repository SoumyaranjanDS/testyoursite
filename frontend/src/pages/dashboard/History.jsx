import React from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Activity, CheckCircle, ArrowUpRight } from "lucide-react";

const History = () => {
  const { tests, isHistoryLoading } = useOutletContext();
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="relative rounded-2xl p-6">
        <div className="absolute inset-0 rounded-2xl bg-secondary/90 shadow-top dark:bg-secondary/90 border border-white/5"></div>

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
                onClick={() => navigate(`/dashboard/history/${test._id}`)}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-[#18181b]/50 border border-white/5 rounded-xl gap-4 cursor-pointer hover:bg-white/5 transition-colors group"
              >
                <div className="flex items-start sm:items-center gap-4 w-full sm:w-auto">
                  {test.status === "running" ? (
                    <div className="w-5 h-5 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin mt-1 sm:mt-0 shrink-0" />
                  ) : test.status === "completed" ? (
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
                      <span>
                        VUs: <span className="text-white">{test.virtualUsers}</span>
                      </span>
                      <span>
                        Duration: <span className="text-white">{test.duration}s</span>
                      </span>
                      {test.status === "completed" && (
                        <>
                          <span>
                            Total Reqs: <span className="text-white">{test.metrics?.totalRequests}</span>
                          </span>
                          <span>
                            P95 Latency:{" "}
                            <span className="text-white">
                              {test.metrics?.p95Latency?.toFixed(1)}ms
                            </span>
                          </span>
                          <span>
                            Errors:{" "}
                            <span className="text-red-400">
                              {test.metrics?.errorRate?.toFixed(1)}%
                            </span>
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-left sm:text-right w-full sm:w-auto shrink-0 pl-9 sm:pl-0 flex items-center justify-between sm:block">
                  <div>
                    <span
                      className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full capitalize ${
                        test.status === "running"
                          ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                          : test.status === "completed"
                          ? "bg-green-500/10 text-green-400 border border-green-500/20"
                          : "bg-red-500/10 text-red-400 border border-red-500/20"
                      }`}
                    >
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
  );
};

export default History;
