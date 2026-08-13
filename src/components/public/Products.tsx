import React from 'react';
import { HeartPulse, Building, HeartHandshake, ShieldAlert, Users, ArrowRight } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';
import { useAuth } from '../../context/AuthContext';
import { InsuranceType } from '../../types';

interface ProductItem {
  type: InsuranceType;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  highlights: string[];
  capacity: string;
  popular?: boolean;
}

const PRODUCTS: ProductItem[] = [
  {
    type: 'Health Insurance',
    title: 'Health Insurance',
    icon: HeartPulse,
    description: 'Group medical, PPO/HMO options, level-funded plans, and individual health coverage for small to enterprise employers.',
    highlights: ['Level-funded & fully insured', 'Nationwide PPO Networks', 'Integrated HSA/FSA options'],
    capacity: 'Groups up to 5,000 lives',
  },
  {
    type: 'Commercial Insurance',
    title: 'Commercial Insurance',
    icon: Building,
    description: 'Comprehensive general liability, commercial auto, excess casualty, and umbrella protection tailored for middle-market risks.',
    highlights: ['Broad primary liability limits', 'Flexible deductible tiers', 'Custom risk endorsements'],
    capacity: 'Up to $25M primary limits',
    popular: true,
  },
  {
    type: 'Life Insurance',
    title: 'Life Insurance',
    icon: HeartHandshake,
    description: 'Key person term life, executive buy-sell funding, group term life, and individual universal life coverage.',
    highlights: ['Accelerated underwriting available', 'Key person valuation support', 'Conversion privileges'],
    capacity: 'Up to $50M per executive',
  },
  {
    type: 'Property & Casualty',
    title: 'Property & Casualty',
    icon: ShieldAlert,
    description: 'Commercial property, business interruption, inland marine, cargo, and catastrophic peril coverage.',
    highlights: ['High-value building schedules', 'Equipment breakdown included', 'Wind/Quake endorsements'],
    capacity: 'Up to $100M TIV per location',
  },
  {
    type: 'Employee Benefits',
    title: 'Employee Benefits',
    icon: Users,
    description: 'Turnkey benefit packages spanning dental, vision, short/long-term disability, voluntary life, and wellness incentives.',
    highlights: ['Dual & triple option plans', 'Consolidated billing portal', 'Dedicated enrollment guides'],
    capacity: 'Turnkey for 10+ employees',
  },
];

export const Products: React.FC = () => {
  const { navigate } = useRouter();
  const { isAuthenticated } = useAuth();

  const handleProductQuote = (type: InsuranceType) => {
    if (isAuthenticated) {
      navigate(`/broker/quote?type=${encodeURIComponent(type)}`);
    } else {
      navigate(`/broker/login?redirect=quote&type=${encodeURIComponent(type)}`);
    }
  };

  return (
    <section id="product-cards" className="py-20 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold tracking-widest text-[#0F4C81] uppercase px-3.5 py-1 bg-blue-50 rounded-full border border-blue-100">
            Our Insurance Suite
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Institutional Coverage Built for B2B Brokers
          </h2>
          <p className="text-base text-slate-500">
            Access leading carrier appetites with streamlined digital submission tools and competitive commission structures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((prod) => {
            const Icon = prod.icon;
            return (
              <div
                key={prod.type}
                className={`relative bg-white rounded-2xl p-7 border transition-all duration-200 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 ${
                  prod.popular
                    ? 'border-[#0F4C81] ring-2 ring-[#0F4C81]/10 shadow-md'
                    : 'border-slate-200 shadow-xs hover:border-slate-300'
                }`}
                id={`product-card-${prod.type.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              >
                {prod.popular && (
                  <div className="absolute -top-3 right-6 bg-[#0F4C81] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                    Most Requested
                  </div>
                )}

                <div className="space-y-5">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 text-[#0F4C81] flex items-center justify-center border border-slate-100">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1.5">{prod.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{prod.description}</p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Product Highlights</div>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {prod.highlights.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0F4C81]"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs text-slate-400 font-medium">{prod.capacity}</div>
                  <button
                    onClick={() => handleProductQuote(prod.type)}
                    id={`get-quote-btn-${prod.type.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C81] hover:underline group cursor-pointer"
                  >
                    <span>Get a Quote</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
