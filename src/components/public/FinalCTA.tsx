import React from 'react';
import { ArrowRight, UserCheck } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';
import { useAuth } from '../../context/AuthContext';

export const FinalCTA: React.FC = () => {
  const { navigate } = useRouter();
  const { isAuthenticated } = useAuth();

  const handleRequestQuote = () => {
    if (isAuthenticated) {
      navigate('/broker/quote');
    } else {
      navigate('/broker/login');
    }
  };

  const handleLogin = () => {
    navigate('/broker/login');
  };

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-indigo-900/40 pointer-events-none" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
          Ready to submit a quote?
        </h2>

        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
          Join over 2,800 appointed brokers placing high-capacity commercial, group benefit, and specialty risks with Northstar Insurance.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={handleRequestQuote}
            id="final-cta-request-quote"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm shadow-xl transition-all cursor-pointer bg-[#0F4C81] hover:bg-[#0d416e] text-white shadow-blue-900/30"
          >
            <span>Request a Quote</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          {!isAuthenticated && (
            <button
              onClick={handleLogin}
              id="final-cta-broker-login"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-semibold text-base text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all cursor-pointer"
            >
              <UserCheck className="w-5 h-5 text-blue-400" />
              <span>Broker Login</span>
            </button>
          )}
        </div>

      </div>
    </section>
  );
};
