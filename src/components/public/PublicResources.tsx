import React from 'react';
import { FileText, Download, ArrowRight } from 'lucide-react';
import { INITIAL_RESOURCES } from '../../data/initialData';
import { useRouter } from '../../context/RouterContext';

export const PublicResources: React.FC = () => {
  const { navigate } = useRouter();

  const handleDownloadClick = (resTitle: string) => {
    alert(`Downloading ${resTitle} (Demo File)`);
  };

  return (
    <section id="public-resources" className="py-20 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#0F4C81] uppercase px-3.5 py-1 bg-blue-50 rounded-full border border-blue-100">
              Broker Knowledge Hub
            </span>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mt-3">
              Essential Guidelines & Forms
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Download underwriting appetite guides, census templates, and current rate schedules.
            </p>
          </div>

          <button
            onClick={() => navigate('/broker/login?redirect=resources')}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#0F4C81] hover:underline cursor-pointer"
          >
            <span>Access Complete Resource Vault</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INITIAL_RESOURCES.slice(0, 4).map((res) => (
            <div
              key={res.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
              id={`public-resource-${res.id}`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">
                    {res.category}
                  </span>
                  <span className="text-slate-400 font-mono text-[10px] uppercase">{res.fileType} • {res.fileSize}</span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 line-clamp-2">{res.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-3">{res.description}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400">Updated {res.updatedDate}</span>
                <button
                  onClick={() => handleDownloadClick(res.title)}
                  className="p-2 rounded-lg bg-slate-100 text-[#0F4C81] hover:bg-[#0F4C81] hover:text-white transition-colors cursor-pointer"
                  title="Download Resource"
                  id={`download-res-${res.id}`}
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
