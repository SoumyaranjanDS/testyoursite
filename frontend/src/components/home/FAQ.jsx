import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "How does agentless monitoring work?",
      a: "Instead of installing a heavy APM binary on your server, you provide an SSH key. Our engine securely connects via SSH, runs native Linux commands (top, free, df) every few seconds, and parses the output in real-time."
    },
    {
      q: "Is it secure to provide SSH keys?",
      a: "Absolutely. We encrypt all credentials at rest using AES-256. We recommend creating a dedicated, strictly-scoped user account on your server just for our platform, rather than providing root access."
    },
    {
      q: "What load generation engine do you use?",
      a: "We orchestrate K6, the industry-leading open-source load testing tool written in Go, running on distributed AWS Fargate containers to generate massive, realistic traffic."
    },
    {
      q: "Can I test multiple endpoints at once?",
      a: "Yes! You can define custom user journeys and hit multiple endpoints with varying payloads to simulate realistic user behavior across your entire application."
    }
  ];

  return (
    <section className="py-24 bg-[#09090b] border-t border-white/5 relative z-10">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-medium font-heading text-white mb-4">
            Frequently asked questions
          </h2>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div 
                key={idx} 
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen 
                    ? 'bg-[#1c1c1e] border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]' 
                    : 'bg-[#121214] border-white/5 hover:bg-[#151518]'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none cursor-pointer"
                >
                  <span className={`text-base md:text-lg font-medium transition-colors ${isOpen ? 'text-white' : 'text-gray-300'}`}>
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isOpen 
                      ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' 
                      : 'bg-white/5 border-white/10 text-gray-500'
                  }`}>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
                  </div>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="p-6 pt-0 text-gray-400 text-sm md:text-base leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
