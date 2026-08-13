import React, { useState } from 'react';
import { FolderDown, Search, Download, FileText, Filter } from 'lucide-react';
import { INITIAL_RESOURCES } from '../../data/initialData';

export const ResourcesView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filtered = INITIAL_RESOURCES.filter((res) => {
    const matchesSearch =
      res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter === 'All' || res.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleDownload = (resTitle: string) => {
    alert(`Downloading ${resTitle}`);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Broker Resource Vault</h1>
          <p className="text-xs text-slate-500 mt-1">
            Download underwriting appetite guides, rate sheets, loss run forms, and commission guidelines.
          </p>
        </div>
      </div>

      {/* Filter controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center gap-4 justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-600 w-full sm:w-auto"
          >
            <option value="All">All Categories</option>
            <option value="Product Guides">Product Guides</option>
            <option value="Rate Sheets">Rate Sheets</option>
            <option value="Application Forms">Application Forms</option>
            <option value="Claims Information">Claims Information</option>
            <option value="Broker Guides">Broker Guides</option>
          </select>
        </div>
      </div>

      {/* Resources Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((res) => (
          <div key={res.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold">
                  {res.category}
                </span>
                <span className="text-slate-400 font-mono uppercase">{res.fileType} • {res.fileSize}</span>
              </div>

              <h3 className="text-base font-bold text-slate-900">{res.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{res.description}</p>
            </div>

            <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">{res.downloadCount} downloads</span>
              <button
                onClick={() => handleDownload(res.title)}
                className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download File</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
