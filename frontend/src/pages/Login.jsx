import React from 'react';
import { Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex flex-col items-center mb-8">
          <div className="w-10 h-10 rounded bg-blue-600 flex items-center justify-center mb-4">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold font-heading">Welcome back</h2>
          <p className="text-[var(--muted)] text-sm mt-2">
            Enter your credentials to access your dashboard
          </p>
        </div>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); console.log('Login submitted'); }}>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email Address</label>
            <input 
              type="email" 
              placeholder="you@company.com"
              className="w-full px-4 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Password</label>
              <a href="#" className="text-xs text-blue-500 hover:underline">Forgot password?</a>
            </div>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors mt-6"
          >
            Sign in
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-[var(--muted)]">
          Don't have an account? <Link to="/signup" className="text-[var(--foreground)] hover:text-blue-500 font-medium">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
