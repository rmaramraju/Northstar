import React from 'react';
import { ArrowRight, UserCheck } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';
import { useAuth } from '../../context/AuthContext';

export const Header: React.FC = () => {
  const { navigate } = useRouter();
  const { isAuthenticated, user } = useAuth();

  const handleNavClick = (anchorId: string) => {
    const el = document.getElementById(anchorId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const handleQuoteClick = () => {
    if (isAuthenticated) {
      navigate('/broker/quote');
    } else {
      navigate('/broker/login');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate('/')}
          id="brand-logo"
        >
          <div className="w-8 h-8 bg-[#0F4C81] rounded-lg flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <div className="w-4 h-4 border-2 border-white rotate-45"></div>
          </div>
          <div>
            <span className="text-xl font-bold text-[#0F4C81] tracking-tight">
              NORTHSTAR <span className="font-light text-slate-400">INSURANCE</span>
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
          <button
            onClick={() => handleNavClick('product-cards')}
            className="hover:text-[#0F4C81] transition-colors cursor-pointer"
            id="nav-products"
          >
            Products
          </button>
          <button
            onClick={() => handleNavClick('why-northstar')}
            className="hover:text-[#0F4C81] transition-colors cursor-pointer"
            id="nav-why-us"
          >
            Why Northstar
          </button>
          <button
            onClick={() => handleNavClick('public-resources')}
            className="hover:text-[#0F4C81] transition-colors cursor-pointer"
            id="nav-resources"
          >
            Resources
          </button>
          <button
            onClick={() => handleNavClick('public-support')}
            className="hover:text-[#0F4C81] transition-colors cursor-pointer"
            id="nav-support"
          >
            Support
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full text-xs font-semibold text-slate-600">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Broker Portal Active
          </div>

          {isAuthenticated ? (
            <button
              onClick={() => navigate('/broker/dashboard')}
              id="broker-dashboard-link"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all border border-slate-200 cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-[#0F4C81]" />
              <span>Portal ({user?.name.split(' ')[0]})</span>
            </button>
          ) : (
            <button
              onClick={() => {
                navigate('/broker/login');
              }}
              id="broker-login"
              className="px-3.5 py-2 text-xs font-bold text-slate-600 hover:text-[#0F4C81] transition-colors cursor-pointer"
            >
              Broker Login
            </button>
          )}

          <button
            onClick={handleQuoteClick}
            id="request-quote"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold shadow-lg transition-all cursor-pointer bg-[#0F4C81] hover:bg-[#0d416e] text-white shadow-blue-900/20"
          >
            <span>Request a Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
