import React from 'react';
import { ShieldCheck, FileText, Download, ExternalLink, RefreshCw } from 'lucide-react';
import { INITIAL_POLICIES } from '../../data/initialData';

export const PoliciesView: React.FC = () => {
  const handleViewPolicy = (policyNum: string) => {
    alert(`Viewing Dec Page & Policy Terms for ${policyNum}`);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6" id="policy-details">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Bound Active Policies</h1>
          <p className="text-xs text-slate-500 mt-1">
            Access active declarations pages, endorsement schedules, and renewal tracking for client policies.
          </p>
        </div>

        <div className="px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Total Active Premium: $610,000</span>
        </div>
      </div>

      {/* Policies List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {INITIAL_POLICIES.map((pol) => (
          <div
            key={pol.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4 hover:shadow-md transition-shadow"
            id={`policy-card-${pol.policyNumber}`}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <div className="text-xs font-bold text-blue-700 font-mono">{pol.policyNumber}</div>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">{pol.clientName}</h3>
              </div>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                  pol.status === 'Active'
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                    : 'bg-amber-100 text-amber-800 border-amber-200'
                }`}
              >
                {pol.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block">Product Line</span>
                <span className="font-semibold text-slate-800">{pol.product}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Underwriting Carrier</span>
                <span className="font-semibold text-slate-800">{pol.carrier}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Effective Term</span>
                <span className="font-semibold text-slate-800">{pol.effectiveDate} to {pol.renewalDate}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Annual Premium</span>
                <span className="font-extrabold text-slate-900">${pol.annualPremium.toLocaleString()}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400 block">Coverage Limits</span>
                <span className="font-semibold text-slate-800">{pol.coverageAmount}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => handleViewPolicy(pol.policyNumber)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>View Policy & Dec Page</span>
              </button>

              <button
                onClick={() => alert(`Requesting renewal for ${pol.policyNumber}`)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Request Early Renewal</span>
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
