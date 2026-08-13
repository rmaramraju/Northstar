import React, { useState } from 'react';
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Download,
  ChevronRight,
  ArrowRight,
  FileSpreadsheet,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from '../../context/RouterContext';
import { INITIAL_APPLICATIONS, INITIAL_POLICIES, INITIAL_RESOURCES } from '../../data/initialData';
import { ApplicationStatus } from '../../types';

const STAGES: ApplicationStatus[] = [
  'Quote Requested',
  'Application Started',
  'Documents Submitted',
  'Under Review',
  'Approved',
  'Policy Issued',
];

export const DashboardView: React.FC = () => {
  const { user } = useAuth();
  const { navigate } = useRouter();

  // Quick quote widget state
  const [quickType, setQuickType] = useState('Commercial Property');
  const [quickCompany, setQuickCompany] = useState('');
  const [quickEmployees, setQuickEmployees] = useState('');
  const [quickRevenue, setQuickRevenue] = useState('');

  const activeAppsCount = INITIAL_APPLICATIONS.filter((a) => a.status !== 'Policy Issued').length;
  const pendingActionsCount = INITIAL_APPLICATIONS.reduce((acc, a) => acc + a.outstandingActions.length, 0);
  const approvedPoliciesCount = INITIAL_POLICIES.length;
  const quotesInProgressCount = INITIAL_APPLICATIONS.filter((a) => a.status === 'Quote Requested' || a.status === 'Application Started').length;

  const handleAppClick = (appId: string) => {
    navigate(`/broker/applications/${appId}`);
  };

  const handleQuickQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/broker/quote');
  };

  const handleResourceDownload = (title: string) => {
    alert(`Downloading ${title}`);
  };

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'Approved':
      case 'Policy Issued':
        return 'bg-green-50 text-green-700 text-[10px] font-bold rounded-md uppercase';
      case 'Under Review':
        return 'bg-amber-50 text-amber-700 text-[10px] font-bold rounded-md uppercase';
      case 'Documents Submitted':
        return 'bg-slate-100 text-slate-600 text-[10px] font-bold rounded-md uppercase';
      default:
        return 'bg-slate-100 text-slate-600 text-[10px] font-bold rounded-md uppercase';
    }
  };

  const getStageIndex = (status: ApplicationStatus) => {
    return STAGES.indexOf(status);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 text-slate-800">
      
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Welcome back, {user?.name?.split(' ')[0] || 'Jonathan'}
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Here is a summary of your active insurance pipeline.
          </p>
        </div>
        <div className="text-left sm:text-right text-xs text-slate-400 font-medium">
          Last synced: Oct 24, 2023 • 09:42 AM
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="dashboard-metric-cards">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">Active Apps</p>
          <p className="text-2xl font-bold text-slate-900">{activeAppsCount}</p>
          <p className="text-[10px] text-green-600 mt-1 font-bold">+2 since yesterday</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">Pending Actions</p>
          <p className="text-2xl font-bold text-orange-500">{pendingActionsCount}</p>
          <p className="text-[10px] text-slate-400 mt-1">Awaiting client signatures</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">Approved Policies</p>
          <p className="text-2xl font-bold text-slate-900">{approvedPoliciesCount}</p>
          <p className="text-[10px] text-slate-400 mt-1">$4.2M TIV managed</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">Quotes in Progress</p>
          <p className="text-2xl font-bold text-slate-900">{quotesInProgressCount}</p>
          <p className="text-[10px] text-slate-400 mt-1">Estimated $45k premium</p>
        </div>
      </div>

      {/* Main Split Body */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Section: Applications Table */}
        <section className="flex-[1.5] bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-bold text-slate-800">Recent Applications</h2>
            <button
              onClick={() => navigate('/broker/applications')}
              className="text-xs font-bold text-[#0F4C81] hover:underline cursor-pointer"
            >
              View All
            </button>
          </div>

          <div className="flex-1 overflow-x-auto">
            <table id="application-status-table" className="w-full text-left border-collapse min-w-[540px]">
              <thead className="sticky top-0 bg-white text-[10px] text-slate-400 uppercase tracking-widest font-bold border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Reference</th>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Timeline</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-600 divide-y divide-slate-50">
                {INITIAL_APPLICATIONS.map((app) => {
                  const stageIdx = getStageIndex(app.status);
                  return (
                    <tr
                      key={app.id}
                      onClick={() => handleAppClick(app.id)}
                      className="hover:bg-slate-50/70 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-900">#{app.id}</p>
                        <p className="text-[10px] text-slate-400">{app.clientName}</p>
                      </td>
                      <td className="px-6 py-4 font-medium text-xs">{app.insuranceType}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 ${getStatusBadge(app.status)}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1 items-center">
                          {STAGES.map((_, sIdx) => (
                            <div
                              key={sIdx}
                              className={`w-3 h-1 rounded-full ${
                                sIdx < stageIdx
                                  ? 'bg-green-500'
                                  : sIdx === stageIdx
                                  ? 'bg-[#0F4C81]'
                                  : 'bg-slate-200'
                              }`}
                            />
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Right Sidebar: Quick Quote & Resources */}
        <aside className="flex-1 flex flex-col gap-6">
          
          {/* Quick Quote Widget */}
          <div
            id="quick-quote-form"
            className="bg-[#0F4C81] text-white p-6 rounded-2xl shadow-xl shadow-blue-900/10 flex flex-col"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-base">New Quote</h3>
                <p className="text-[10px] text-blue-200">Step 1: Selection</p>
              </div>
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-xs font-bold">
                1/6
              </div>
            </div>

            <form onSubmit={handleQuickQuoteSubmit} className="space-y-3 mb-6">
              <label className="block">
                <span className="text-[10px] font-bold uppercase opacity-60">Insurance Type</span>
                <select
                  value={quickType}
                  onChange={(e) => setQuickType(e.target.value)}
                  className="w-full mt-1 bg-white/10 border border-white/20 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  <option value="Health Insurance" className="bg-slate-800 text-white">Health Insurance</option>
                  <option value="Commercial Property" className="bg-slate-800 text-white">Commercial Property</option>
                  <option value="General Liability" className="bg-slate-800 text-white">General Liability</option>
                  <option value="Employee Benefits" className="bg-slate-800 text-white">Employee Benefits</option>
                </select>
              </label>

              <label className="block">
                <span className="text-[10px] font-bold uppercase opacity-60">Company Legal Name</span>
                <input
                  type="text"
                  placeholder="e.g. Acme Corp LLC"
                  value={quickCompany}
                  onChange={(e) => setQuickCompany(e.target.value)}
                  className="w-full mt-1 bg-white/10 border border-white/20 rounded-lg py-2 px-3 text-xs text-white placeholder:text-blue-300 focus:outline-none"
                />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-[10px] font-bold uppercase opacity-60">Employees</span>
                  <input
                    type="number"
                    placeholder="25"
                    value={quickEmployees}
                    onChange={(e) => setQuickEmployees(e.target.value)}
                    className="w-full mt-1 bg-white/10 border border-white/20 rounded-lg py-2 px-3 text-xs text-white placeholder:text-blue-300 focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] font-bold uppercase opacity-60">Annual Rev.</span>
                  <input
                    type="text"
                    placeholder="$2.5M"
                    value={quickRevenue}
                    onChange={(e) => setQuickRevenue(e.target.value)}
                    className="w-full mt-1 bg-white/10 border border-white/20 rounded-lg py-2 px-3 text-xs text-white placeholder:text-blue-300 focus:outline-none"
                  />
                </label>
              </div>

              <button
                type="submit"
                id="submit-step-1"
                className="w-full py-3 bg-white text-[#0F4C81] font-bold rounded-xl text-xs transition-transform active:scale-95 cursor-pointer hover:bg-slate-50 shadow-md mt-2"
              >
                Continue to Step 2
              </button>
            </form>
          </div>

          {/* Broker Resources Widget */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 flex-1 flex flex-col">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center justify-between">
              <span>Broker Resources</span>
              <span className="text-[10px] font-normal text-slate-400 uppercase tracking-widest">Downloads</span>
            </h3>

            <div className="space-y-2.5 overflow-y-auto pr-1">
              {INITIAL_RESOURCES.slice(0, 3).map((res) => (
                <div
                  key={res.id}
                  onClick={() => handleResourceDownload(res.title)}
                  className="group flex items-center p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs ${
                    res.fileType === 'PDF' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'
                  }`}>
                    {res.fileType}
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-xs font-bold text-slate-700 group-hover:text-[#0F4C81] transition-colors">{res.title}</p>
                    <p className="text-[10px] text-slate-400">{res.category} • {res.fileSize}</p>
                  </div>
                  <Download className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors" />
                </div>
              ))}
            </div>
          </div>

        </aside>

      </div>

    </div>
  );
};
