import React from 'react';
import { Zap, Headset, FileSpreadsheet, Activity, CheckCircle2 } from 'lucide-react';

export const WhyNorthstar: React.FC = () => {
  const features = [
    {
      icon: Zap,
      title: 'Fast Quote Processing',
      description: 'Automated triage and underwriter routing ensure 24 to 48-hour turnarounds for complex commercial and group benefits applications.',
    },
    {
      icon: Headset,
      title: 'Dedicated Broker Support',
      description: 'Direct telephone and chat access to assigned senior underwriters and regional vice presidents for custom risk structuring.',
    },
    {
      icon: FileSpreadsheet,
      title: 'Digital Application Management',
      description: 'Centralized document repository for loss runs, censuses, SOVs, and policy endorsements with zero email clutter.',
    },
    {
      icon: Activity,
      title: 'Real-Time Application Tracking',
      description: 'Step-by-step visual status pipeline tracking quotes from submission to binder issuance and active policy lifecycle.',
    },
  ];

  return (
    <section id="why-northstar" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold tracking-widest text-[#0F4C81] uppercase px-3.5 py-1 bg-blue-50 rounded-full border border-blue-100">
              The Northstar Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
              Built Specifically for the Modern B2B Broker
            </h2>
            <p className="text-base text-slate-500 leading-relaxed">
              We remove the traditional frictions of wholesale brokerage—eliminating back-and-forth emails, opaque underwriting status, and delayed quote turnarounds.
            </p>

            <ul className="space-y-3 pt-2">
              {[
                'Single login for multi-carrier policy administration',
                'Transparent commission tracking and automated ACH payouts',
                'Pre-vetted appetite guides updated weekly',
                'Dedicated claims hotline 24/7/365',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 hover:bg-white hover:shadow-md transition-all space-y-3"
                  id={`why-northstar-card-${idx}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#0F4C81] text-white flex items-center justify-center shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{feat.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{feat.description}</p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
