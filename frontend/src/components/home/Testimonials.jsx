import React from "react";
import { Quote } from "lucide-react";

const Testimonials = () => {
  const reviews = [
    {
      name: "Alex Rivera",
      role: "Lead DevOps, TechFlow",
      content:
        "This platform completely changed how we prep for Black Friday. We found a memory leak in 10 minutes that Datadog missed for weeks because it correlated the exact user load.",
    },
    {
      name: "Sarah Chen",
      role: "CTO, StartupX",
      content:
        "The agentless SSH approach is pure magic. I don't have time to install heavy APM tools on all our microservices. TestYourSite just worked instantly.",
    },
    {
      name: "James Holden",
      role: "Senior Backend Eng",
      content:
        "The AI analysis engine is shockingly accurate. It didn't just tell me the server crashed, it literally told me to increase my Node.js heap size.",
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-32 bg-white dark:bg-[#09090b] relative border-t border-gray-200 dark:border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24 relative z-10">
          <h2 className="text-4xl md:text-5xl font-medium text-gray-900 dark:text-white mb-4 font-heading">
            Trusted by engineering teams
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-16 md:gap-6 lg:gap-10">
          {reviews.map((review, idx) => (
            <div key={idx} className="relative pb-24 md:pb-20 pr-4 pt-6 group">
              {/* Back Layer (Author Info) */}
              <div className="absolute bottom-0 left-0 w-[85%] h-[160px] bg-gradient-to-br from-blue-600/20 to-purple-600/10 border border-blue-500/20 rounded-[2rem] flex items-end p-6 z-0 shadow-lg group-hover:from-blue-600/30 group-hover:to-purple-600/20 transition-colors duration-500">
                <div className="flex items-center gap-4 w-full">
                  <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-[#1c1c1e] border border-gray-200 dark:border-white/10 flex items-center justify-center text-lg font-bold text-gray-900 dark:text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] shrink-0 z-10">
                    {review.name.charAt(0)}
                  </div>
                  <div className="z-10 truncate">
                    <div className="font-bold text-gray-900 dark:text-white text-base tracking-tight truncate">
                      {review.name}
                    </div>
                    <div className="text-xs text-blue-300 font-medium truncate mt-0.5">
                      {review.role}
                    </div>
                  </div>
                </div>
              </div>

              {/* Front Layer (Quote Box) */}
              <div className="relative z-10 w-[92%] ml-auto bg-gray-100 dark:bg-[#1c1c1e] border border-gray-200 dark:border-white/10 rounded-[2rem] p-8 shadow-[0_24px_48px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)] group-hover:-translate-y-2 transition-transform duration-500">
                {/* Floating Decorative Quote Mark (Top Left) */}
                <div className="absolute -top-6 -left-6 w-12 h-12 bg-[#DC382D] rounded-2xl flex items-center justify-center shadow-lg border border-red-400/30 z-20">
                  <Quote className="w-6 h-6 text-gray-900 dark:text-white fill-current" />
                </div>

                {/* Decorative Quote Mark (Bottom Right) */}
                <div className="absolute bottom-4 right-6 text-blue-500/10 pointer-events-none">
                  <Quote className="w-16 h-16 fill-current rotate-180" />
                </div>

                {/* Stars aligned to top right */}
                <div className="flex items-center gap-1 mb-6 justify-end pb-4 border-b border-gray-200 dark:border-white/5 relative z-10">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-4 h-4 text-[#ffbd2e] fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-300 text-sm leading-relaxed relative z-10 min-h-[100px]">
                  {review.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
