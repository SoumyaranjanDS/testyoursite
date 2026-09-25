import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../common/Logo';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-[#09090b] border-t border-gray-200 dark:border-white/10 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center">
                <Logo className="w-6 h-6 text-[#6366f1]" />
              </div>
              <span className="text-lg font-bold font-heading text-gray-900 dark:text-milky">TestYourSite</span>
            </Link>
            <p className="text-[var(--muted)] text-sm max-w-xs">
              Automated load testing and intelligent root-cause analysis for modern engineering teams.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-milky mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              <li><a href="#" className="hover:text-gray-900 dark:text-milky transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:text-milky transition-colors">Pricing</a></li>
              <li><Link to="/docs" className="hover:text-gray-900 dark:text-milky transition-colors">Documentation</Link></li>
              <li><a href="#" className="hover:text-gray-900 dark:text-milky transition-colors">Changelog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-milky mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              <li><a href="#" className="hover:text-gray-900 dark:text-milky transition-colors">About</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:text-milky transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:text-milky transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:text-milky transition-colors">GitHub</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--muted)]">
          <div>&copy; {new Date().getFullYear()} TestYourSite. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-900 dark:text-milky transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-900 dark:text-milky transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
