import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, UserCheck, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from '../../context/RouterContext';

export const LoginView: React.FC = () => {
  const { login, loginAsDemoBroker } = useAuth();
  const { navigate } = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const queryParams = new URLSearchParams(window.location.search);
  const redirectPath = queryParams.get('redirect');
  const prefillType = queryParams.get('type');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your broker email address.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const success = login(email, password);
      setIsSubmitting(false);

      if (success) {
        if (redirectPath === 'quote') {
          navigate(`/broker/quote${prefillType ? `?type=${encodeURIComponent(prefillType)}` : ''}`);
        } else if (redirectPath === 'resources') {
          navigate('/broker/resources');
        } else {
          navigate('/broker/dashboard');
        }
      } else {
        setError('Invalid credentials. Use "s.jenkins@apexrisk.com" or click Demo Login.');
      }
    }, 400);
  };

  const handleDemoLoginClick = () => {
    loginAsDemoBroker();
    if (redirectPath === 'quote') {
      navigate(`/broker/quote${prefillType ? `?type=${encodeURIComponent(prefillType)}` : ''}`);
    } else {
      navigate('/broker/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="relative w-full max-w-md space-y-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-xl" id="broker-login-card">
        
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="w-10 h-10 bg-[#0F4C81] rounded-xl flex items-center justify-center shadow-xs mx-auto">
            <div className="w-5 h-5 border-2 border-white rotate-45"></div>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Broker Portal Sign In
          </h1>
          <p className="text-xs text-slate-500">
            Northstar Insurance Institutional Wholesale Management
          </p>
        </div>

        {/* Demo Fast Track Banner */}
        <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 text-slate-700 text-xs space-y-3">
          <div className="flex items-center gap-2 font-bold text-[#0F4C81]">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Demonstration Account</span>
          </div>
          <p className="text-slate-600 text-[11px] leading-relaxed">
            Test as Sarah Jenkins (Principal Broker at Apex Risk Solutions) with pre-populated quote applications, policies, and documents.
          </p>
          <button
            type="button"
            onClick={handleDemoLoginClick}
            id="quick-demo-login-btn"
            className="w-full py-2.5 px-4 rounded-xl bg-[#0F4C81] hover:bg-[#0d416e] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <UserCheck className="w-4 h-4" />
            <span>Sign In as Demo Broker (Sarah Jenkins)</span>
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4" id="broker-login-form">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Broker Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="s.jenkins@apexrisk.com"
                id="login-email-input"
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                id="login-password-input"
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-slate-500 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-[#0F4C81] focus:ring-0" />
              <span>Remember this session</span>
            </label>
            <span className="text-[#0F4C81] hover:underline cursor-pointer font-semibold">Forgot password?</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            id="submit-login-btn"
            className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-50"
          >
            <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Portal'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500">
          Not yet appointed with Northstar?{' '}
          <button
            type="button"
            onClick={() => navigate('/broker/signup')}
            className="text-[#0F4C81] hover:underline font-bold cursor-pointer"
          >
            Request Broker Appointment
          </button>
        </div>

      </div>
    </div>
  );
};
