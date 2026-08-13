import React, { useState } from 'react';
import {
  LayoutDashboard,
  FileText,
  ShieldCheck,
  FolderDown,
  HelpCircle,
  LogOut,
  Bell,
  X,
  ExternalLink,
  Plus,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from '../../context/RouterContext';

interface PortalLayoutProps {
  children: React.ReactNode;
}

export const PortalLayout: React.FC<PortalLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const { currentPath, navigate } = useRouter();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const navigationItems = [
    { name: 'Dashboard', path: '/broker/dashboard', icon: LayoutDashboard },
    { name: 'Applications', path: '/broker/applications', icon: FileText },
    { name: 'Policies', path: '/broker/policies', icon: ShieldCheck },
    { name: 'Resources', path: '/broker/resources', icon: FolderDown },
    { name: 'Support', path: '/broker/support', icon: HelpCircle },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getInitials = (name?: string) => {
    if (!name) return 'JM';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-800">
      
      {/* Top Sleek Header */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-8 shrink-0 z-30 shadow-xs sticky top-0">
        <div className="flex items-center gap-8">
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => navigate('/broker/dashboard')}
            id="portal-brand-logo"
          >
            <div className="w-8 h-8 bg-[#0F4C81] rounded-lg flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <div className="w-4 h-4 border-2 border-white rotate-45"></div>
            </div>
            <span className="text-xl font-bold text-[#0F4C81] tracking-tight">
              NORTHSTAR <span className="font-light text-slate-400">INSURANCE</span>
            </span>
          </div>

          <button
            onClick={() => navigate('/')}
            className="hidden lg:flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#0F4C81] px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 transition-colors cursor-pointer font-medium"
          >
            <span>Public Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full text-xs font-semibold text-slate-600">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Broker Portal Active
          </div>

          {/* Notifications Menu */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
              id="portal-notifications-btn"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#0F4C81] ring-2 ring-white" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-3 text-slate-800 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Broker Alerts</span>
                  <span className="text-[10px] text-[#0F4C81] font-semibold cursor-pointer">Mark all read</span>
                </div>
                <div className="divide-y divide-slate-100 text-xs">
                  <div className="p-3 hover:bg-slate-50 cursor-pointer">
                    <div className="font-semibold text-slate-900">Application #NS-10482 Approved</div>
                    <div className="text-slate-500 mt-0.5">Underwriter approved commercial policy options.</div>
                    <div className="text-[10px] text-slate-400 mt-1">10 mins ago</div>
                  </div>
                  <div className="p-3 hover:bg-slate-50 cursor-pointer">
                    <div className="font-semibold text-slate-900">Action Required: Driver MVR</div>
                    <div className="text-slate-500 mt-0.5">Please upload signed consent forms for Apex Logistics.</div>
                    <div className="text-[10px] text-slate-400 mt-1">2 hours ago</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Bar */}
          <div className="flex items-center gap-3 border-l pl-4 border-slate-200">
            <div
              onClick={() => setShowProfileModal(true)}
              className="flex items-center gap-3 cursor-pointer group"
              id="broker-profile-menu"
            >
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold leading-none text-slate-900 group-hover:text-[#0F4C81] transition-colors">
                  {user?.name || 'Jonathan Miller'}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Premier Broker #{user?.npn || '8821'}
                </p>
              </div>
              <div className="w-9 h-9 bg-slate-200 rounded-full border border-white shadow-xs flex items-center justify-center text-[#0F4C81] font-bold text-xs group-hover:bg-[#0F4C81] group-hover:text-white transition-colors">
                {getInitials(user?.name)}
              </div>
            </div>

            <button
              onClick={handleLogout}
              id="broker-logout-btn"
              className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Log Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Portal Container */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Sleek Sidebar */}
        <aside className="w-60 bg-white border-r border-slate-200 flex flex-col shrink-0 hidden md:flex">
          <div className="p-6">
            <button
              onClick={() => navigate('/broker/quote')}
              id="request-quote-btn"
              className="w-full py-3 bg-[#0F4C81] hover:bg-[#0d416e] text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Request a Quote</span>
            </button>
          </div>

          <nav className="flex-1 px-4 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                currentPath === item.path ||
                (item.path !== '/broker/dashboard' && currentPath.startsWith(item.path));

              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  id={`sidebar-link-${item.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-colors cursor-pointer text-left ${
                    isActive
                      ? 'bg-slate-50 text-[#0F4C81]'
                      : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#0F4C81] opacity-90' : 'opacity-50'}`} />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Broker Rewards Status Block */}
          <div className="p-4 border-t border-slate-100 mt-auto">
            <div className="bg-[#F1F5F9] rounded-xl p-4 text-xs">
              <p className="font-bold mb-1 text-slate-800">Broker Rewards Status</p>
              <div className="w-full h-1.5 bg-white rounded-full overflow-hidden mb-2">
                <div className="w-[72%] h-full bg-[#0F4C81]"></div>
              </div>
              <p className="text-slate-500 text-[11px]">720/1000 points to Platinum</p>
            </div>
          </div>
        </aside>

        {/* Mobile Nav Header */}
        <div className="md:hidden bg-white border-b border-slate-200 p-2 flex overflow-x-auto gap-2 text-xs font-semibold w-full">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer ${
                currentPath === item.path ? 'bg-[#0F4C81] text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Main Content View */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>

      </div>

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setShowProfileModal(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#0F4C81] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                {getInitials(user?.name)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{user?.name}</h3>
                <p className="text-xs text-[#0F4C81] font-bold">{user?.agencyName}</p>
                <p className="text-xs text-slate-500">National Producer #{user?.npn}</p>
              </div>
            </div>

            <div className="space-y-3 text-xs border-t border-slate-100 pt-4">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Email:</span>
                <span className="font-semibold text-slate-900">{user?.email}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Primary Domicile State:</span>
                <span className="font-semibold text-slate-900">{user?.licenseState}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Appointed Authority:</span>
                <span className="font-semibold text-emerald-700">Commercial, Health, Life, P&C</span>
              </div>
            </div>

            <button
              onClick={() => setShowProfileModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#0F4C81] text-white font-bold text-xs cursor-pointer hover:bg-[#0d416e]"
            >
              Close Profile
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
