import React, { useState, useEffect } from "react";
import { Moon, Sun, Bell, User, Map, Sparkles, MessageSquare, Zap, Rocket } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isDark, setIsDark] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    setIsDark(!isDark);
  };

  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="fixed w-full z-50 top-4 px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto bg-black/40 border border-white/10 rounded-2xl h-[60px] flex items-center justify-between px-4 sm:px-6 shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-xl">
        
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-2 mr-4 sm:mr-8 group">
          <Rocket className="w-5 h-5 text-white group-hover:text-blue-400 transition-colors" />
          <span className="text-lg font-bold text-white tracking-wide hidden sm:block font-heading">
            TestYourSite
          </span>
        </Link>

        {/* Middle: Links */}
        {!isAuthPage && (
          <div className="hidden lg:flex items-center gap-8 flex-1 justify-center mr-8">
            <button onClick={() => scrollToSection('how-it-works')} className="flex items-center gap-2 text-[15px] font-medium text-gray-300 hover:text-white transition-colors">
              <Sparkles className="w-[18px] h-[18px]" /> Features
            </button>
            <button onClick={() => scrollToSection('roadmap')} className="flex items-center gap-2 text-[15px] font-medium text-gray-300 hover:text-white transition-colors">
              <Map className="w-[18px] h-[18px]" /> Roadmap
            </button>
            <button onClick={() => scrollToSection('testimonials')} className="flex items-center gap-2 text-[15px] font-medium text-gray-300 hover:text-white transition-colors">
              <MessageSquare className="w-[18px] h-[18px]" /> Testimonials
            </button>
          </div>
        )}

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-4 ml-auto">
          <button
            onClick={toggleTheme}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-[22px] h-[22px]" /> : <Moon className="w-[22px] h-[22px]" />}
          </button>
          
          <button className="p-1.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <Bell className="w-[22px] h-[22px]" />
          </button>
          
          {!isAuthPage && (
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="flex items-center gap-1.5 text-[15px] font-semibold bg-[#6366f1] hover:bg-[#4f46e5] text-white px-3 sm:px-4 py-1.5 rounded-lg transition-colors ml-1 sm:ml-2 shadow-[0_0_15px_rgba(99,102,241,0.3)]"
            >
              <Zap className="w-[18px] h-[18px] fill-current" /> <span className="hidden sm:inline">Live Testing</span>
            </button>
          )}

          {/* User Avatar */}
          <Link to="/login" className="ml-1 sm:ml-3">
            <div className="w-[34px] h-[34px] rounded-full bg-[#2c2c2e] border border-white/10 flex items-center justify-center overflow-hidden hover:border-white/30 transition-colors">
              <User className="w-[18px] h-[18px] text-gray-400" />
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
