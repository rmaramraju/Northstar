import React, { useState } from 'react';
import {
  FileText,
  Search,
  Filter,
  ChevronRight,
  PlusCircle,
  Download,
} from 'lucide-react';
import { useRouter } from '../../context/RouterContext';
import { INITIAL_APPLICATIONS } from '../../data/initialData';
import { ApplicationStatus, InsuranceType } from '../../types';

export const ApplicationsView: React.FC = () => {
  const { navigate } = useRouter();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');

  const filteredApps = INITIAL_APPLICATIONS.filter((app) => {
    const matchesSearch =
      app.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    const matchesType = typeFilter === 'All' || app.insuranceType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleSelectApp = (appId: string) => {
    navigate(`/broker/applications/${appId}`);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Broker Application Management</h1>
          <p className="text-xs text-slate-500 mt-1">
            Track and manage submitted quotes, active underwriting reviews, and policy bindings.
          </p>
        </div>

        <button
          onClick={() => navigate('/broker/quote')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Quote Application</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center gap-4 justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by client or App ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
            <Filter className="w-4 h-4 text-slate-400" />
            <span>Filters:</span>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-600"
          >
            <option value="All">All Statuses</option>
            <option value="Quote Requested">Quote Requested</option>
            <option value="Documents Submitted">Documents Submitted</option>
            <option value="Under Review">Under Review</option>
            <option value="Approved">Approved</option>
            <option value="Policy Issued">Policy Issued</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-600"
          >
            <option value="All">All Insurance Types</option>
            <option value="Commercial Insurance">Commercial Insurance</option>
            <option value="Employee Benefits">Employee Benefits</option>
            <option value="Property & Casualty">Property & Casualty</option>
            <option value="Health">Health</option>
            <option value="Life">Life</option>
          </select>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-6">App ID</th>
                <th className="py-3.5 px-6">Client / Entity</th>
                <th className="py-3.5 px-6">Coverage Product</th>
                <th className="py-3.5 px-6">Submitted</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Est. Premium</th>
                <th className="py-3.5 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {filteredApps.map((app) => (
                <tr
                  key={app.id}
                  onClick={() => handleSelectApp(app.id)}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                  id={`app-row-${app.id}`}
                >
                  <td className="py-4 px-6 font-extrabold text-blue-700 group-hover:underline">
                    #{app.id}
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-900">{app.clientName}</div>
                    <div className="text-[11px] text-slate-400">{app.state} • {app.employeesCount} Employees</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 rounded bg-slate-100 font-semibold text-slate-700">
                      {app.insuranceType}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-500">{app.submissionDate}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-bold border ${
                        app.status === 'Approved' || app.status === 'Policy Issued'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                          : app.status === 'Under Review'
                          ? 'bg-amber-100 text-amber-800 border-amber-200'
                          : 'bg-blue-100 text-blue-800 border-blue-200'
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right font-extrabold text-slate-900">
                    ${app.estimatedAnnualPremium.toLocaleString()}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button className="p-1.5 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-blue-700 group-hover:text-white transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
