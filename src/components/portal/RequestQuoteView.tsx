import React, { useState } from 'react';
import {
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Upload,
  FileText,
  AlertCircle,
  Building,
  Shield,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { InsuranceType } from '../../types';
import { useRouter } from '../../context/RouterContext';

export const RequestQuoteView: React.FC = () => {
  const { navigate } = useRouter();

  // Query param prefill
  const queryParams = new URLSearchParams(window.location.search);
  const initialType = (queryParams.get('type') as InsuranceType) || 'Commercial';

  const [step, setStep] = useState<number>(1);

  // Form State
  const [insuranceType, setInsuranceType] = useState<InsuranceType>(initialType);
  const [companyName, setCompanyName] = useState('Apex Horizon Logistics');
  const [contactName, setContactName] = useState('Marcus Vance');
  const [email, setEmail] = useState('m.vance@apexhorizon.com');
  const [phone, setPhone] = useState('(415) 555-0199');
  const [address, setAddress] = useState('750 Battery St, Floor 4');
  const [state, setState] = useState('CA');
  const [zipCode, setZipCode] = useState('94111');

  // Step 3 Coverage
  const [coverageAmount, setCoverageAmount] = useState('$5,000,000 General Liability + Excess');
  const [industrySector, setIndustrySector] = useState('Transportation & Logistics');
  const [annualRevenue, setAnnualRevenue] = useState('$12,500,000');
  const [deductibleLevel, setDeductibleLevel] = useState('$10,000 per claim');

  // Step 4 Additional
  const [employeesCount, setEmployeesCount] = useState('85');
  const [currentProvider, setCurrentProvider] = useState('Travelers Commercial');
  const [effectiveDate, setEffectiveDate] = useState('2026-10-01');
  const [additionalRequirements, setAdditionalRequirements] = useState('Requires primary and non-contributory endorsement with waiver of subrogation.');

  // Step 5 Files
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; size: string }>>([
    { name: 'Loss_Runs_3yr_ApexHorizon.pdf', size: '2.1 MB' },
    { name: 'Statement_of_Values_2026.xlsx', size: '940 KB' },
  ]);

  // Errors state for Form Analytics simulation
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [consentTerms, setConsentTerms] = useState(false);

  const validateStep = (currentStep: number): boolean => {
    const errors: Record<string, string> = {};

    if (currentStep === 2) {
      if (!companyName.trim()) errors.companyName = 'Company name is required';
      if (!contactName.trim()) errors.contactName = 'Contact name is required';
      if (!email.trim() || !email.includes('@')) errors.email = 'Valid email is required';
      if (!phone.trim()) errors.phone = 'Phone number is required';
      if (!zipCode.trim() || zipCode.length < 5) errors.zipCode = 'Valid 5-digit ZIP code is required';
    }

    if (currentStep === 3) {
      if (!coverageAmount) errors.coverageAmount = 'Coverage amount selection required';
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 6));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newFile = {
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      };
      setUploadedFiles((prev) => [...prev, newFile]);
    }
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentTerms) {
      setFieldErrors({ consentTerms: 'You must confirm terms consent prior to submission' });
      return;
    }

    alert('Quote Application Submitted Successfully! Application ID: #NS-10520');
    navigate('/broker/applications/NS-10482');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8" id="application-form">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Digital Underwriting Desk</span>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
            Request a Wholesale Insurance Quote
          </h1>
          <p className="text-xs text-slate-500">
            Complete the 6-step questionnaire below for instant underwriter assignment and rate calculation.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-50 border border-blue-100 text-blue-800 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>Fast-Track Submission</span>
        </div>
      </div>

      {/* Stepper Progress Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs overflow-x-auto">
        <div className="min-w-[650px] flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -translate-y-1/2 z-0" />
          {[
            { num: 1, label: 'Type' },
            { num: 2, label: 'Client Info' },
            { num: 3, label: 'Coverage' },
            { num: 4, label: 'Additional' },
            { num: 5, label: 'Documents' },
            { num: 6, label: 'Review' },
          ].map((s) => {
            const isDone = step > s.num;
            const isCurrent = step === s.num;
            return (
              <div key={s.num} className="relative z-10 flex flex-col items-center gap-1.5 cursor-pointer" onClick={() => isDone && setStep(s.num)}>
                <div
                  className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center transition-all ${
                    isDone
                      ? 'bg-emerald-600 text-white'
                      : isCurrent
                      ? 'bg-blue-700 text-white ring-4 ring-blue-100'
                      : 'bg-slate-100 text-slate-500 border border-slate-200'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-5 h-5" /> : s.num}
                </div>
                <span className={`text-[11px] font-semibold ${isCurrent ? 'text-blue-800' : 'text-slate-500'}`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content Steps */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        
        {/* STEP 1: Insurance Type */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Step 1: Select Insurance Product</h2>
              <p className="text-xs text-slate-500">Choose the line of coverage for this quote request.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { type: 'Health', desc: 'Group medical, level-funded & PPO networks' },
                { type: 'Commercial', desc: 'General liability, auto, & umbrella limits' },
                { type: 'Life', desc: 'Key person, executive term & group life' },
                { type: 'Property & Casualty', desc: 'Commercial building, SOV & CAT perils' },
                { type: 'Employee Benefits', desc: 'Turnkey medical, dental, vision & disability' },
              ].map((item) => {
                const selected = insuranceType === item.type;
                return (
                  <div
                    key={item.type}
                    onClick={() => setInsuranceType(item.type as InsuranceType)}
                    className={`p-5 rounded-xl border cursor-pointer transition-all ${
                      selected
                        ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-600/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                    id={`select-type-${item.type.toLowerCase().replace(/[^a-z]/g, '')}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-sm">{item.type}</span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selected ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}`}>
                        {selected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: Client Info */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Step 2: Business & Client Information</h2>
              <p className="text-xs text-slate-500">Enter the primary entity details for underwriting risk assessment.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Company / Entity Name *</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  id="field-company-name"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
                {fieldErrors.companyName && <span className="text-xs text-red-600 mt-1 block">{fieldErrors.companyName}</span>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Primary Contact Name *</label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  id="field-contact-name"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                />
                {fieldErrors.contactName && <span className="text-xs text-red-600 mt-1 block">{fieldErrors.contactName}</span>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Contact Email *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="field-email"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                />
                {fieldErrors.email && <span className="text-xs text-red-600 mt-1 block">{fieldErrors.email}</span>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Phone Number *</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  id="field-phone"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                />
                {fieldErrors.phone && <span className="text-xs text-red-600 mt-1 block">{fieldErrors.phone}</span>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Street Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  id="field-address"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">State</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  id="field-state"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                >
                  {['CA', 'NY', 'TX', 'FL', 'IL', 'WA', 'OR', 'AZ', 'CO', 'GA'].map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">ZIP Code *</label>
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  id="field-zip"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                />
                {fieldErrors.zipCode && <span className="text-xs text-red-600 mt-1 block">{fieldErrors.zipCode}</span>}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Coverage Info */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Step 3: Coverage Specifications</h2>
              <p className="text-xs text-slate-500">Configure parameters for {insuranceType} risk limits.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Desired Coverage Amount / Limit *</label>
                <select
                  value={coverageAmount}
                  onChange={(e) => setCoverageAmount(e.target.value)}
                  id="field-coverage-amount"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                >
                  <option value="$1,000,000 General Liability">$1,000,000 Primary Limit</option>
                  <option value="$2,000,000 General Liability">$2,000,000 Aggregate Limit</option>
                  <option value="$5,000,000 General Liability + Excess">$5,000,000 GL + Excess Umbrella</option>
                  <option value="$10,000,000 Comprehensive High Limit">$10,000,000 High-Capacity Facility</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Industry / Risk Sector</label>
                <select
                  value={industrySector}
                  onChange={(e) => setIndustrySector(e.target.value)}
                  id="field-industry-sector"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                >
                  <option value="Transportation & Logistics">Transportation & Logistics</option>
                  <option value="Healthcare & BioTech">Healthcare & BioTech</option>
                  <option value="Commercial Real Estate">Commercial Real Estate</option>
                  <option value="Manufacturing & Distribution">Manufacturing & Distribution</option>
                  <option value="Technology & Professional Services">Technology & Professional Services</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Estimated Annual Revenue / Payroll</label>
                <input
                  type="text"
                  value={annualRevenue}
                  onChange={(e) => setAnnualRevenue(e.target.value)}
                  id="field-annual-revenue"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Preferred SIR / Deductible</label>
                <select
                  value={deductibleLevel}
                  onChange={(e) => setDeductibleLevel(e.target.value)}
                  id="field-deductible-level"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                >
                  <option value="$2,500 per claim">$2,500 Deductible</option>
                  <option value="$5,000 per claim">$5,000 Deductible</option>
                  <option value="$10,000 per claim">$10,000 Deductible</option>
                  <option value="$25,000 Self-Insured Retention">$25,000 SIR</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Additional Info */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Step 4: Additional Underwriting Parameters</h2>
              <p className="text-xs text-slate-500">Provide employee counts, prior carrier history, and requested endorsements.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Total Full-Time Employees</label>
                <input
                  type="number"
                  value={employeesCount}
                  onChange={(e) => setEmployeesCount(e.target.value)}
                  id="field-employees-count"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Current Insurance Provider</label>
                <input
                  type="text"
                  value={currentProvider}
                  onChange={(e) => setCurrentProvider(e.target.value)}
                  id="field-current-provider"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Target Effective Date</label>
                <input
                  type="date"
                  value={effectiveDate}
                  onChange={(e) => setEffectiveDate(e.target.value)}
                  id="field-effective-date"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Special Endorsements / Requirements</label>
                <textarea
                  rows={3}
                  value={additionalRequirements}
                  onChange={(e) => setAdditionalRequirements(e.target.value)}
                  id="field-additional-requirements"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Documents */}
        {step === 5 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Step 5: Underwriting Document Attachments</h2>
              <p className="text-xs text-slate-500">Upload 3-year loss runs, SOV spreadsheets, or census data for rapid binding.</p>
            </div>

            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center space-y-4 hover:border-blue-500 bg-slate-50/50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Drag & drop loss runs, SOVs, or census files</div>
                <div className="text-xs text-slate-500 mt-1">Supports PDF, XLSX, DOCX up to 25MB each</div>
              </div>
              <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-700 text-white font-semibold text-xs cursor-pointer hover:bg-blue-800 transition-colors">
                <span>Browse Files</span>
                <input type="file" onChange={handleFileUpload} className="hidden" id="upload-doc-input" />
              </label>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">Uploaded Attachments ({uploadedFiles.length})</div>
              {uploadedFiles.map((file, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-100 border border-slate-200 text-xs">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-700" />
                    <span className="font-semibold text-slate-900">{file.name}</span>
                    <span className="text-slate-500">({file.size})</span>
                  </div>
                  <span className="text-emerald-700 font-bold">Uploaded</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 6: Review & Submit */}
        {step === 6 && (
          <form onSubmit={handleSubmitApplication} className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Step 6: Review & Submit Quote Request</h2>
              <p className="text-xs text-slate-500">Confirm details before routing to senior underwriter desk.</p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 border-b border-slate-200 pb-3">
                <div><span className="text-slate-500">Product Line:</span> <strong className="text-slate-900">{insuranceType}</strong></div>
                <div><span className="text-slate-500">Entity:</span> <strong className="text-slate-900">{companyName}</strong></div>
                <div><span className="text-slate-500">Contact:</span> <strong className="text-slate-900">{contactName} ({email})</strong></div>
                <div><span className="text-slate-500">Target Effective Date:</span> <strong className="text-slate-900">{effectiveDate}</strong></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><span className="text-slate-500">Coverage Limit:</span> <strong className="text-slate-900">{coverageAmount}</strong></div>
                <div><span className="text-slate-500">Estimated Annual Premium:</span> <strong className="text-emerald-700 font-bold">$38,500 (Indicative)</strong></div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-2">
              <label className="flex items-start gap-2 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={consentTerms}
                  onChange={(e) => setConsentTerms(e.target.checked)}
                  id="consent-checkbox"
                  className="mt-0.5 rounded border-amber-400 text-blue-700 focus:ring-0"
                />
                <span>I confirm that I am an appointed licensed broker representing {companyName} and that all attached loss runs and censuses are true and accurate.</span>
              </label>
              {fieldErrors.consentTerms && (
                <div className="text-xs text-red-600 font-bold pl-6">{fieldErrors.consentTerms}</div>
              )}
            </div>

            <button
              type="submit"
              id="submit-application"
              className="w-full py-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-base shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Shield className="w-5 h-5" />
              <span>Submit Application to Underwriting Desk</span>
            </button>
          </form>
        )}

        {/* Step Action Buttons */}
        {step < 6 && (
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrev}
              disabled={step === 1}
              className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100 disabled:opacity-30 cursor-pointer flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Step</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              id={`quote-next-step-${step}`}
              className="px-6 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-sm cursor-pointer flex items-center gap-1.5"
            >
              <span>Next Step ({step + 1}/6)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
