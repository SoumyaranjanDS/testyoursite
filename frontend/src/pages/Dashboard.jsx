import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Play,
  Activity,
  Settings,
  LogOut,
} from "lucide-react";
import Logo from "../components/common/Logo";
import api from "../api";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  
  // App-level data state
  const [tests, setTests] = useState([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

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
      const res = await api.get("/tests/history");
      setTests(res.data);
    } catch (err) {
      console.error("Failed to fetch test history:", err);
    } finally {
      setIsHistoryLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("authChange"));
    navigate("/");
  };

  const navItems = [
    { id: "overview", path: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { id: "load-generator", path: "/dashboard/load-generator", label: "Load Generator", icon: Play },
    { id: "history", path: "/dashboard/history", label: "Test History", icon: Activity },
    { id: "settings", path: "/dashboard/settings", label: "Settings", icon: Settings },
  ];

  if (!user) return null;

  // Determine current active section for header
  let headerTitle = "Dashboard";
  let headerDesc = "";
  if (location.pathname === "/dashboard" || location.pathname === "/dashboard/") {
    headerTitle = `Hello, ${user.email.split("@")[0]}`;
    headerDesc = "View and control your infrastructure here.";
  } else if (location.pathname.includes("/dashboard/load-generator")) {
    headerTitle = "Load Generator";
    headerDesc = "Configure your target endpoint and traffic patterns.";
  } else if (location.pathname.includes("/dashboard/history")) {
    headerTitle = "Test History";
    headerDesc = "Review and analyze past performance runs.";
  }

  // Hide header for deeply nested pages (like TestDetails view)
  const isDetailsView = location.pathname.match(/\/dashboard\/history\/[a-zA-Z0-9_-]+/);

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
            // Precise active matching
            const isActive =
              item.path === "/dashboard"
                ? location.pathname === "/dashboard" || location.pathname === "/dashboard/"
                : location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.id}
                to={item.path}
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
              </Link>
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

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl mx-auto w-full pt-10 px-6 pb-20 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {!isDetailsView && (
          <header className="mb-12 flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-semibold text-white mb-2">
                {headerTitle}
              </h1>
              {headerDesc && <p className="text-gray-400 text-sm">{headerDesc}</p>}
            </div>
          </header>
        )}

        <Outlet context={{ user, tests, isHistoryLoading, fetchTestHistory }} />
      </main>
    </div>
  );
};

export default Dashboard;
