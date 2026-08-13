import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from '../../context/RouterContext';

export const SignupView: React.FC = () => {
  const { signup } = useAuth();
  const { navigate } = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [agencyName, setAgencyName] = useState('');
  const [npn, setNpn] = useState('');
  const [licenseState, setLicenseState] = useState('CA');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup({ name, email, agencyName, npn, licenseState });
    navigate('/broker/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg space-y-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-xl">
        
        <div className="text-center space-y-2">
          <div className="w-10 h-10 bg-[#0F4C81] rounded-xl flex items-center justify-center shadow-xs mx-auto">
            <div className="w-5 h-5 border-2 border-white rotate-45"></div>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Request Broker Appointment
          </h1>
          <p className="text-xs text-slate-500">
            Gain immediate access to Northstar's wholesale capacity and digital underwriting desk.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Sarah Jenkins"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Work Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="s.jenkins@apexrisk.com"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Agency Name
            </label>
            <input
              type="text"
              required
              value={agencyName}
              onChange={(e) => setAgencyName(e.target.value)}
              placeholder="Apex Risk Solutions LLC"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                National Producer Number (NPN)
              </label>
              <input
                type="text"
                required
                value={npn}
                onChange={(e) => setNpn(e.target.value)}
                placeholder="18492048"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Primary Domicile State
              </label>
              <select
                value={licenseState}
                onChange={(e) => setLicenseState(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
              >
                {['CA', 'NY', 'TX', 'FL', 'IL', 'WA', 'OR', 'AZ', 'CO', 'GA'].map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-slate-700 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-[#0F4C81]">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Instant Appointment Approval</span>
            </div>
            <p className="text-[11px] text-slate-500">
              For demo testing, your NPN will be automatically verified with state insurance commissioner databases.
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-[#0F4C81] hover:bg-[#0d416e] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <span>Complete Appointment & Enter Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500">
          Already appointed?{' '}
          <button
            onClick={() => navigate('/broker/login')}
            className="text-[#0F4C81] hover:underline font-bold cursor-pointer"
          >
            Sign In Here
          </button>
        </div>

      </div>
    </div>
  );
};
