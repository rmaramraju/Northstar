import React, { useState } from 'react';
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Download,
  MessageSquare,
  HelpCircle,
  ArrowLeft,
  Send,
  Building,
  Upload,
} from 'lucide-react';
import { useRouter } from '../../context/RouterContext';
import { INITIAL_APPLICATIONS } from '../../data/initialData';
import { ApplicationStatus } from '../../types';

const STAGES: ApplicationStatus[] = [
  'Quote Requested',
  'Application Started',
  'Documents Submitted',
  'Under Review',
  'Approved',
  'Policy Issued',
];

export const ApplicationDetailView: React.FC = () => {
  const { selectedAppId, navigate } = useRouter();

  const application = INITIAL_APPLICATIONS.find((a) => a.id === selectedAppId) || INITIAL_APPLICATIONS[0];

  const [comments, setComments] = useState(application.comments);
  const [newComment, setNewComment] = useState('');

  const currentStageIdx = STAGES.indexOf(application.status);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const added = {
      id: `cm_${Date.now()}`,
      author: 'Sarah Jenkins (Broker)',
      role: 'Broker' as const,
      content: newComment,
      timestamp: 'Just now',
    };

    setComments([...comments, added]);
    setNewComment('');
  };

  const handleDownloadDoc = (docName: string) => {
    alert(`Downloading ${docName}`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8" id="application-details">
      
      {/* Back Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/broker/applications')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Applications List</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              navigate('/broker/support');
            }}
            className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold cursor-pointer flex items-center gap-1.5"
          >
            <HelpCircle className="w-4 h-4 text-blue-700" />
            <span>Contact Support Desk</span>
          </button>
        </div>
      </div>

      {/* Main App Summary Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl font-extrabold text-blue-700">Application #{application.id}</span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                {application.status}
              </span>
              <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-700">
                {application.insuranceType}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">{application.clientName}</h1>
            <p className="text-xs text-slate-500 mt-1">
              Submitted on {application.submissionDate} • Last Activity: {application.lastUpdated}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-right space-y-1">
            <div className="text-xs text-slate-500">Estimated Annual Premium</div>
            <div className="text-2xl font-extrabold text-slate-900">${application.estimatedAnnualPremium.toLocaleString()}</div>
            <div className="text-[11px] text-emerald-700 font-semibold">Underwriter Assigned: David Vance</div>
          </div>
        </div>

        {/* Timeline Progress Stage Bar */}
        <div className="space-y-3" id="application-status-timeline">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            6-Stage Underwriting Progress Timeline
          </div>
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 overflow-x-auto">
            <div className="min-w-[750px] flex items-center justify-between relative">
              <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-slate-200 -translate-y-1/2 z-0" />
              {STAGES.map((stg, idx) => {
                const isPassed = idx <= currentStageIdx;
                const isCurrent = idx === currentStageIdx;
                return (
                  <div key={stg} className="relative z-10 flex flex-col items-center gap-2">
                    <div
                      className={`w-9 h-9 rounded-full text-xs font-bold flex items-center justify-center ring-4 ring-white shadow-xs transition-all ${
                        isPassed
                          ? 'bg-blue-700 text-white'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {isPassed ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                    </div>
                    <span className={`text-[11px] font-bold text-center max-w-[95px] leading-tight ${isCurrent ? 'text-blue-800 font-extrabold' : 'text-slate-600'}`}>
                      {stg}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      {/* Grid: Details, Documents, Actions, Comments */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Client & Coverage Parameters */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Application Details & Risk Profile
            </h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block">Client Contact Email</span>
                <span className="font-semibold text-slate-900">{application.clientEmail}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Phone</span>
                <span className="font-semibold text-slate-900">{application.clientPhone}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Primary Address</span>
                <span className="font-semibold text-slate-900">{application.companyAddress}, {application.state} {application.zipCode}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Employees Count</span>
                <span className="font-semibold text-slate-900">{application.employeesCount} FTEs</span>
              </div>
              <div>
                <span className="text-slate-500 block">Target Effective Date</span>
                <span className="font-semibold text-slate-900">{application.effectiveDate}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Incumbent Carrier</span>
                <span className="font-semibold text-slate-900">{application.currentProvider || 'N/A'}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 text-xs">
              <span className="text-slate-500 block mb-1">Additional Endorsement Requirements:</span>
              <p className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-medium">
                {application.additionalRequirements}
              </p>
            </div>
          </div>

          {/* Submitted Documents */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Submitted Documents ({application.documents.length})</h3>
              <label className="text-xs font-bold text-blue-700 hover:underline cursor-pointer flex items-center gap-1">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Additional File</span>
                <input type="file" className="hidden" onChange={() => alert('Document uploaded!')} />
              </label>
            </div>

            <div className="space-y-3">
              {application.documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{doc.name}</div>
                      <div className="text-[11px] text-slate-500">{doc.type} • {doc.size} • Uploaded {doc.uploadedAt}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownloadDoc(doc.name)}
                    className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 cursor-pointer"
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Outstanding Actions & Comments */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Outstanding Action Items */}
          {application.outstandingActions.length > 0 && (
            <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6 space-y-4">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <span>Outstanding Actions Required</span>
              </div>

              {application.outstandingActions.map((act) => (
                <div key={act.id} className="bg-white p-4 rounded-xl border border-amber-200 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{act.title}</span>
                    <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 font-bold text-[10px]">
                      Due {act.dueDate}
                    </span>
                  </div>
                  <p className="text-slate-600">{act.description}</p>
                  <button
                    onClick={() => alert(`Marking action completed: ${act.title}`)}
                    className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
                  >
                    Resolve & Upload Form
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Underwriter & Broker Comments */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <span>Underwriting Discussion</span>
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {comments.map((cm) => (
                <div
                  key={cm.id}
                  className={`p-3.5 rounded-xl border text-xs space-y-1 ${
                    cm.role === 'Underwriter'
                      ? 'bg-blue-50/70 border-blue-200'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between font-semibold">
                    <span className={cm.role === 'Underwriter' ? 'text-blue-900' : 'text-slate-900'}>
                      {cm.author}
                    </span>
                    <span className="text-[10px] text-slate-400">{cm.timestamp}</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{cm.content}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddComment} className="flex gap-2 pt-2">
              <input
                type="text"
                placeholder="Type a note for underwriter..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-600"
              />
              <button
                type="submit"
                className="p-2 rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
};
