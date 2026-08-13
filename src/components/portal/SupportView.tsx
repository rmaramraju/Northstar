import React, { useState } from 'react';
import { HelpCircle, PhoneCall, Send, ChevronDown, ChevronUp, CheckCircle2, Search } from 'lucide-react';
import { INITIAL_FAQS } from '../../data/initialData';

export const SupportView: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Underwriting');
  const [priority, setPriority] = useState('Medium');
  const [message, setMessage] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  // Callback state
  const [showCallbackModal, setShowCallbackModal] = useState(false);
  const [callbackPhone, setCallbackPhone] = useState('(415) 892-3401');
  const [callbackTime, setCallbackTime] = useState('Today at 2:00 PM EST');

  // FAQ Search
  const [faqSearch, setFaqSearch] = useState('');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq_1');

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    setTicketSubmitted(true);
  };

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Callback requested! Senior underwriter will call ${callbackPhone} at ${callbackTime}.`);
    setShowCallbackModal(false);
  };

  const filteredFaqs = INITIAL_FAQS.filter((f) =>
    f.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
    f.answer.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8" id="support-form">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Broker Support Desk</h1>
          <p className="text-xs text-slate-500 mt-1">
            Connect directly with designated underwriters, request emergency callback, or search guidelines.
          </p>
        </div>

        <button
          onClick={() => setShowCallbackModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer shrink-0"
        >
          <PhoneCall className="w-4 h-4" />
          <span>Request Underwriter Callback</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Support Ticket Form */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Submit Underwriting Inquiry</h2>
            <p className="text-xs text-slate-500">Tickets are responded to by assigned regional vice presidents within 1 business hour.</p>
          </div>

          {ticketSubmitted ? (
            <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-3 text-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="text-base font-bold">Support Inquiry Received!</h3>
              <p className="text-xs text-emerald-800">
                Ticket #TK-88902 has been routed to Senior Underwriter David Vance. A notification email has been dispatched.
              </p>
              <button
                onClick={() => setTicketSubmitted(false)}
                className="px-4 py-2 bg-emerald-700 text-white font-bold text-xs rounded-lg cursor-pointer"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitTicket} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Subject / Application Ref *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rate endorsement query for #NS-10482"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                  >
                    <option value="Underwriting">Underwriting / Risk</option>
                    <option value="Claims">Claims Filing</option>
                    <option value="Commissions">Commissions & ACH</option>
                    <option value="Policy Change">Policy Change / Endorsement</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Priority Level</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent / Binder Pending</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Message Details *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Provide complete context..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-sm cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Ticket to Underwriting</span>
              </button>
            </form>
          )}
        </div>

        {/* FAQs */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Broker Knowledge Base</h2>
            <span className="text-xs text-slate-400">Frequently Asked Questions</span>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div key={faq.id} className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full p-4 bg-slate-50/80 hover:bg-slate-100 flex items-center justify-between font-bold text-slate-900 text-left cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />}
                  </button>

                  {isOpen && (
                    <div className="p-4 bg-white border-t border-slate-200 text-slate-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Callback Request Modal */}
      {showCallbackModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <PhoneCall className="w-5 h-5 text-emerald-600" />
                <span>Request Underwriter Callback</span>
              </h3>
              <button onClick={() => setShowCallbackModal(false)} className="text-slate-400 hover:text-slate-600 text-xs font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleCallbackSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Direct Phone Number</label>
                <input
                  type="text"
                  required
                  value={callbackPhone}
                  onChange={(e) => setCallbackPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Preferred Time Window</label>
                <select
                  value={callbackTime}
                  onChange={(e) => setCallbackTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900"
                >
                  <option value="ASAP (Next 15 Minutes)">ASAP (Next 15 Minutes)</option>
                  <option value="Today at 2:00 PM EST">Today at 2:00 PM EST</option>
                  <option value="Today at 4:30 PM EST">Today at 4:30 PM EST</option>
                  <option value="Tomorrow Morning (9:00 AM EST)">Tomorrow Morning (9:00 AM EST)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-700 text-white font-bold text-xs cursor-pointer"
              >
                Confirm Phone Callback Schedule
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
