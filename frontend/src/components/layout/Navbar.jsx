import React, { useState, useEffect } from "react";
import { Moon, Sun, Bell, User, Map, Sparkles, MessageSquare, Zap, Book } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Logo from "../common/Logo";

const Navbar = () => {
  const [isDark, setIsDark] = useState(true);
  const [hidden, setHidden] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollY } = useScroll();

  // Actual Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const handleAuthChange = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };
    window.addEventListener('authChange', handleAuthChange);
    return () => window.removeEventListener('authChange', handleAuthChange);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

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
    <motion.nav 
      variants={{
        visible: { y: 0 },
        hidden: { y: "-150%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed w-full z-50 top-4 px-4 sm:px-6"
    >
      <div className="max-w-[1200px] mx-auto bg-white/80 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-2xl h-[60px] flex items-center justify-between px-4 sm:px-6 shadow-sm dark:shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-xl">
        
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-2 mr-4 sm:mr-8 group">
          <Logo className="w-6 h-6 text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors" />
          <span className="text-lg font-bold text-gray-900 dark:text-white hidden sm:block font-heading">
            TestYourSite
          </span>
        </Link>

        {/* Middle: Links */}
        {!isAuthPage && (
          <div className="hidden lg:flex items-center gap-8 flex-1 justify-center mr-8">
            <button onClick={() => scrollToSection('how-it-works')} className="flex items-center gap-2 text-[15px] font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              <Sparkles className="w-[18px] h-[18px]" /> Features
            </button>
            <button onClick={() => scrollToSection('roadmap')} className="flex items-center gap-2 text-[15px] font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              <Map className="w-[18px] h-[18px]" /> Roadmap
            </button>
            <button onClick={() => scrollToSection('testimonials')} className="flex items-center gap-2 text-[15px] font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              <MessageSquare className="w-[18px] h-[18px]" /> Testimonials
            </button>
            <Link to="/docs" className="flex items-center gap-2 text-[15px] font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              <Book className="w-[18px] h-[18px]" /> Docs
            </Link>
          </div>
        )}

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-4 ml-auto">
          <button
            onClick={toggleTheme}
            className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-white hover:bg-white/5 rounded-lg transition-colors hidden sm:block"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-[22px] h-[22px]" /> : <Moon className="w-[22px] h-[22px]" />}
          </button>
          
          <button className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-white hover:bg-white/5 rounded-lg transition-colors hidden sm:block">
            <Bell className="w-[22px] h-[22px]" />
          </button>
          
          {!isAuthPage && (
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="flex items-center gap-1.5 text-[14px] sm:text-[15px] font-semibold bg-[#6366f1] hover:bg-[#4f46e5] text-white px-3 sm:px-4 py-1.5 rounded-lg transition-colors ml-1 sm:ml-2 shadow-[0_0_15px_rgba(99,102,241,0.3)]"
            >
              <Zap className="w-[16px] sm:w-[18px] h-[16px] sm:h-[18px] fill-current" /> <span className="hidden sm:inline">Live Testing</span>
            </button>
          )}

          {/* Auth State */}
          <div className="ml-1 sm:ml-2">
            {isLoggedIn ? (
              <Link to="/dashboard">
                <div className="w-[32px] h-[32px] sm:w-[34px] sm:h-[34px] rounded-full bg-[#2c2c2e] border border-gray-200 dark:border-white/10 flex items-center justify-center overflow-hidden hover:border-white/30 transition-colors">
                  <User className="w-[16px] sm:w-[18px] h-[16px] sm:h-[18px] text-gray-600 dark:text-gray-400" />
                </div>
              </Link>
            ) : (
              <Link to="/login" className="flex items-center justify-center px-3 sm:px-4 py-1.5 rounded-lg text-[14px] sm:text-[15px] font-medium text-gray-900 dark:text-white hover:bg-white/10 transition-colors border border-gray-200 dark:border-white/10">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
