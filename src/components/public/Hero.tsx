import React from 'react';
import { ArrowRight, ShieldCheck, Building2, TrendingUp, Users } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';
import { useAuth } from '../../context/AuthContext';

export const Hero: React.FC = () => {
  const { navigate } = useRouter();
  const { isAuthenticated } = useAuth();

  const handleRequestQuote = () => {
    if (isAuthenticated) {
      navigate('/broker/quote');
    } else {
      navigate('/broker/login');
    }
  };

  const handleExploreProducts = () => {
    const el = document.getElementById('product-cards');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-900 text-white pt-16 pb-20 border-b border-slate-800">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F4C81]/30 via-slate-900 to-slate-950 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-700/50 text-blue-200 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Institutional B2B Brokerage Solutions</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
         Hi <span data-vwo="name">prospect</span>!
         We Empower Brokers with Faster Quotes & Smarter Coverage
          
          </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Northstar Insurance connects licensed brokers to multi-carrier risk capacity, automated underwriting workflows, and digital application tracking across Health, Commercial, Life, and Property & Casualty.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleRequestQuote}
                id="hero-request-quote-btn"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm shadow-xl transition-all cursor-pointer bg-[#0F4C81] hover:bg-[#0d416e] text-white shadow-blue-900/30"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleExploreProducts}
                id="hero-explore-products-btn"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all cursor-pointer"
              >
                <span>Explore Products</span>
              </button>
            </div>

            {/* Quick Feature Badges */}
            <div className="pt-6 border-t border-slate-800 grid grid-cols-3 gap-4 text-slate-400 text-xs font-medium">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>24-Hour Quote Turnaround</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                <span>A+ Rated Carrier Capacity</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                <span>100% Digital Broker Portal</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Card / Metric Panel */}
          <div className="lg:col-span-5">
            <div className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white">Broker Network Impact</h3>
                  <p className="text-xs text-slate-400">Live Q3 Performance Dashboard</p>
                </div>
                <div className="p-2 rounded-lg bg-[#0F4C81]/50 text-blue-300 border border-blue-700/50">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60">
                  <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                    <Building2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>Bound Premiums</span>
                  </div>
                  <div className="text-2xl font-bold text-white">$4.2 Billion+</div>
                  <div className="text-[11px] text-emerald-400 font-bold mt-1">↑ 18.4% YoY Growth</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60">
                  <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                    <Users className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Active Brokers</span>
                  </div>
                  <div className="text-2xl font-bold text-white">2,850+</div>
                  <div className="text-[11px] text-emerald-400 font-bold mt-1">NPN Verified</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0F4C81]/30 border border-blue-700/40 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-blue-200">Fast-Track Commercial Quote</div>
                  <div className="text-xs text-slate-400">Average response time: 2.4 hrs</div>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  ACTIVE
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
