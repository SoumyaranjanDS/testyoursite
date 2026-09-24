import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import HowItWorks from "../components/home/HowItWorks";
import SocialProof from "../components/home/SocialProof";
import Integrations from "../components/home/Integrations";
import Testimonials from "../components/home/Testimonials";
import FAQ from "../components/home/FAQ";
import Roadmap from "./Roadmap";
import HeroDiagram from "../components/home/HeroDiagram";
import DashboardPreview from "../components/home/DashboardPreview";

const Home = () => {
  return (
    <main className="pt-16 pb-0 overflow-hidden relative">
      {/* Background Glows (CodeHelp Vibe - 35%) */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Split Layout (65%) */}
        <div className="grid lg:grid-cols-2 gap-12 items-center pt-8 pb-12">
          {/* Left: Typography & CTA */}
          <div className="text-left z-10">
            

            <h1 className="flex flex-col mb-8 font-heading">
              <span className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold text-milky mb-2 leading-tight tracking-wider">
                A better way to
              </span>
              <span className="text-7xl md:text-8xl lg:text-[7.5rem] font-black text-milky leading-none flex items-baseline">
                Load Test
                <span className="inline-block w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 bg-accent rounded-full ml-2"></span>
              </span>
            </h1>

            <p className="text-lg text-(--muted) max-w-xl mb-10 font-light leading-relaxed">
              Correlate synthetic traffic with native server metrics in
              real-time. No agents to install. Identify exactly where and why
              your infrastructure breaks.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              {/* "Pop Type" Pill Button */}
              <Link
                to="/signup"
                className="group flex items-center justify-center gap-2 bg-[#1c1c1e] hover:bg-[#2c2c2e] text-milky border border-white/10 px-8 py-3.5 rounded-full font-medium transition-all shadow-[0_4px_14px_0_rgba(0,0,0,0.39)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.23)] hover:-translate-y-0.5 active:translate-y-0"
              >
                Start Free Test
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-medium text-[var(--muted)] hover:text-milky transition-colors border border-transparent hover:bg-white/5">
                View Documentation
              </button>
            </div>
          </div>

          {/* Right: Sandbox Diagram */}
          <div className="relative hidden lg:flex items-center justify-center h-full w-full z-10 -mt-12">
            <div className="transform scale-[0.8] xl:scale-[0.9] origin-center w-full">
              <HeroDiagram />
            </div>
          </div>
        </div>
      </div>

      {/* New Sections */}
      <HowItWorks />
      <SocialProof />
      <Integrations />
      <Roadmap />
      <DashboardPreview />
      <Testimonials />
      <FAQ />
    </main>
  );
};

export default Home;
