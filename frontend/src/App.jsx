import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Roadmap from "./pages/Roadmap";
import Docs from "./pages/Docs";

import Dashboard from "./pages/Dashboard";
import Overview from "./pages/dashboard/Overview";
import LoadGenerator from "./pages/dashboard/LoadGenerator";
import History from "./pages/dashboard/History";
import TestDetailsView from "./pages/dashboard/TestDetailsView";

const Layout = ({ children }) => {
  const location = useLocation();
  const isNoLayoutPage =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname.startsWith("/dashboard");
  const isNoFooterPage = location.pathname.startsWith("/docs");

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300 font-sans selection:bg-blue-500/30 flex flex-col">
      {!isNoLayoutPage && <Navbar />}
      <div className="flex-1">{children}</div>
      {!isNoLayoutPage && !isNoFooterPage && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/docs/*" element={<Docs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Overview />} />
            <Route path="load-generator" element={<LoadGenerator />} />
            <Route path="history" element={<History />} />
            <Route path="history/:testId" element={<TestDetailsView />} />
            <Route path="settings" element={<div className="text-gray-400">Settings coming soon...</div>} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
