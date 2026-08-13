import React from 'react';
import { Shield } from 'lucide-react';

export const PublicFooter: React.FC = () => {
  return (
    <footer id="public-support" className="bg-slate-950 text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#0F4C81] rounded-lg flex items-center justify-center shadow-xs">
                <div className="w-4 h-4 border-2 border-white rotate-45"></div>
              </div>
              <span className="text-lg font-bold text-[#0F4C81] tracking-tight">
                NORTHSTAR <span className="font-light text-slate-400">INSURANCE</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Northstar Insurance Underwriting Management, Inc. is a licensed wholesale insurance general agency serving appointed B2B brokers across all 50 US states.
            </p>
            <div className="text-xs text-slate-500 font-mono">
              NPN #10892042 • NAIC #40921
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Products</h4>
            <ul className="space-y-2 text-xs">
              <li>Commercial Liability</li>
              <li>Employee Benefits</li>
              <li>Key Executive Life</li>
              <li>Property & Casualty</li>
              <li>Cyber & Specialty Risks</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Broker Portal</h4>
            <ul className="space-y-2 text-xs">
              <li>Request Quote Flow</li>
              <li>Application Pipeline</li>
              <li>Active Policies</li>
              <li>Rate Sheets 2026</li>
              <li>Commission Reports</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Broker Support</h4>
            <ul className="space-y-2 text-xs">
              <li>Underwriting Desk</li>
              <li>Claims Emergency Hotline</li>
              <li>Loss Run Requests</li>
              <li>Appoint Agency</li>
              <li>Underwriter Directory</li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © 2026 Northstar Insurance Services LLC. All rights reserved. For Broker Demo & Testing.
          </div>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Licensing Disclosures</span>
            <span>Security & Compliance</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
