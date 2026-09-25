import React from 'react';
import { ArrowLeft, Terminal, Activity, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../components/common/Logo';

const Signup = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#09090b] flex">
      {/* Left Panel - Graphic/Branding */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-gray-50 dark:bg-[#121214] border-r border-gray-200 dark:border-white/5 flex-col justify-between p-12">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,black_0%,transparent_100%)] pointer-events-none" />
        
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2 group w-max">
            <ArrowLeft className="w-5 h-5 text-gray-500 dark:text-gray-500 group-hover:text-gray-900 dark:text-white transition-colors" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:text-white transition-colors">Back to Home</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-md">
          <div className="flex items-center gap-2 mb-8">
             <Logo className="w-10 h-10 text-white" />
             <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-wide font-heading">
                TestYourSite
             </span>
          </div>
          <h2 className="text-4xl font-medium text-gray-900 dark:text-white mb-6 leading-tight">
            Start load testing your infrastructure today.
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
            Join thousands of engineering teams building resilient applications with our agentless load testing platform.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-4">
                <Globe className="w-6 h-6 text-blue-400 mb-2" />
                <h3 className="text-gray-900 dark:text-white font-medium mb-1">Global Load</h3>
                <p className="text-gray-500 dark:text-gray-500 text-sm">Traffic from 10+ regions</p>
             </div>
             <div className="bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-4">
                <Terminal className="w-6 h-6 text-purple-400 mb-2" />
                <h3 className="text-gray-900 dark:text-white font-medium mb-1">K6 Scripts</h3>
                <p className="text-gray-500 dark:text-gray-500 text-sm">Bring your own tests</p>
             </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative">
        <Link to="/" className="absolute top-8 left-6 lg:hidden flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-white">
           <ArrowLeft className="w-5 h-5" /> Back
        </Link>
        
        <div className="w-full max-w-md">
          <div className="text-center lg:text-left mb-10">
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-3">Create an account</h2>
            <p className="text-gray-600 dark:text-gray-400">Get started with a free 14-day trial</p>
          </div>

          <button className="w-full bg-gray-100 dark:bg-[#1c1c1e] hover:bg-[#252528] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white font-medium py-3 rounded-xl flex items-center justify-center gap-3 transition-colors mb-6 shadow-lg shadow-black/20">
            <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true"><path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335"></path><path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4"></path><path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05"></path><path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.26537 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853"></path></svg>
            Sign up with Google
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-px bg-white/10 flex-1"></div>
            <span className="text-gray-500 dark:text-gray-500 text-sm">or sign up with email</span>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>

          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); console.log('Signup submitted'); }}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Full Name</label>
              <input 
                type="text" 
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#121214] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1] transition-all placeholder:text-gray-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Email Address</label>
              <input 
                type="email" 
                placeholder="you@company.com"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#121214] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1] transition-all placeholder:text-gray-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#121214] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1] transition-all placeholder:text-gray-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-[#6366f1] hover:bg-[#4f46e5] shadow-[0_4px_14px_0_rgba(99,102,241,0.39)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.23)] hover:-translate-y-0.5 text-gray-900 dark:text-white font-medium py-3 rounded-xl transition-all mt-6"
            >
              Create Account
            </button>
          </form>

          <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
            Already have an account? <Link to="/login" className="text-gray-900 dark:text-white hover:text-[#6366f1] font-medium transition-colors">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
