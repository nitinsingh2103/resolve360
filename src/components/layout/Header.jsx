import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  Search, 
  Bell, 
  Plus, 
  ChevronDown, 
  RotateCcw, 
  Shield, 
  User, 
  LogOut,
  AlertTriangle,
  CheckCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { useComplaints } from '../../context/ComplaintContext';
import { isOverdue } from '../../utils/dateUtils';

export const Header = ({ onOpenMobileSidebar, onOpenNewComplaint }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { complaints, settings, resetAllData, filters, setFilters } = useComplaints();

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Title mapping
  const pageTitles = {
    '/': 'Overview & Executive Monitoring',
    '/complaints': 'Complaint Registry & Case Records',
    '/bureaus': 'Bureau Monitoring & Performance',
    '/escalations': 'Escalation & Overdue Command Center',
    '/reports': 'Reports & Cross-Bureau Analytics',
    '/settings': 'System Settings & SLA Configurations'
  };

  const getPageTitle = () => {
    if (location.pathname.startsWith('/complaints/')) {
      return 'Case Investigation & Timeline';
    }
    return pageTitles[location.pathname] || 'Complaint Monitoring';
  };

  // Derive notifications from overdue & critical items
  const overdueComplaints = complaints.filter(isOverdue).slice(0, 5);
  const criticalComplaints = complaints.filter(c => c.priority === 'Critical' && c.status !== 'Resolved' && c.status !== 'Closed').slice(0, 4);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setFilters(prev => ({ ...prev, search: searchQuery.trim() }));
      navigate('/complaints');
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 sm:px-8 backdrop-blur-md transition-all shadow-xs">
      {/* Left section: Hamburger & Breadcrumb */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 lg:hidden focus:outline-hidden"
          aria-label="Open navigation sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>

        <div className="hidden sm:block">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-0.5">
            <span>AICTE Central Portal</span>
            <span>/</span>
            <span className="text-blue-600 font-semibold uppercase tracking-wider text-[11px]">
              Monitoring Cell
            </span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 leading-none">
            {getPageTitle()}
          </h1>
        </div>
      </div>

      {/* Middle section: Global Search Bar */}
      <div className="hidden md:flex flex-1 max-w-md mx-6">
        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by Complaint ID or Institution (press Enter)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2 pl-10 pr-4 text-xs font-medium text-slate-800 placeholder-slate-400 transition-all focus:border-blue-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-100"
          />
        </form>
      </div>

      {/* Right actions: New Complaint Button, Notification bell, User avatar */}
      <div className="flex items-center gap-3">
        {/* New Complaint Button */}
        <button
          type="button"
          onClick={onOpenNewComplaint}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">New Complaint</span>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notificationRef}>
          <button
            type="button"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative rounded-xl p-2.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors focus:outline-hidden"
            aria-label="View notifications"
          >
            <Bell className="h-5 w-5" />
            {overdueComplaints.length > 0 && (
              <span className="absolute top-2 right-2 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
              </span>
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-84 sm:w-96 rounded-2xl bg-white p-4 shadow-xl border border-slate-100 ring-1 ring-black/5 z-50 animate-in fade-in-50 zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-900 text-sm">System Alerts</h4>
                  <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700">
                    {overdueComplaints.length + criticalComplaints.length} Action Items
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/escalations')}
                  className="text-[11px] font-semibold text-blue-600 hover:underline"
                >
                  View All
                </button>
              </div>

              <div className="mt-2 divide-y divide-slate-100 max-h-80 overflow-y-auto">
                {overdueComplaints.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => {
                      setNotificationsOpen(false);
                      navigate(`/complaints/${c.id}`);
                    }}
                    className="flex items-start gap-3 py-3 px-1 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-red-50 text-red-600 shrink-0 mt-0.5">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-xs text-slate-900 truncate">
                          {c.id}
                        </span>
                        <span className="text-[10px] text-red-600 font-bold bg-red-50 px-1.5 py-0.5 rounded">
                          Overdue
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 line-clamp-1 mt-0.5">
                        {c.institutionName}
                      </p>
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        Assigned: {c.bureau}
                      </span>
                    </div>
                  </div>
                ))}

                {criticalComplaints.map((c) => (
                  <div
                    key={`crit-${c.id}`}
                    onClick={() => {
                      setNotificationsOpen(false);
                      navigate(`/complaints/${c.id}`);
                    }}
                    className="flex items-start gap-3 py-3 px-1 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600 shrink-0 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-xs text-slate-900 truncate">
                          {c.id}
                        </span>
                        <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-1.5 py-0.5 rounded">
                          Critical Priority
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 line-clamp-1 mt-0.5">
                        {c.category}
                      </p>
                    </div>
                  </div>
                ))}

                {overdueComplaints.length === 0 && criticalComplaints.length === 0 && (
                  <div className="py-6 text-center text-xs text-slate-400">
                    No active critical alerts. All cases on schedule.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2.5 rounded-xl p-1.5 hover:bg-slate-100 transition-colors focus:outline-hidden"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 font-bold text-white text-xs shadow-xs">
              {settings?.userProfile?.avatar || 'AM'}
            </div>
            <div className="hidden xl:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-800 leading-tight">
                {settings?.userProfile?.name || 'Dr. Alok K. Mishra'}
              </span>
              <span className="text-[11px] text-slate-500 font-medium leading-tight">
                AICTE Officer
              </span>
            </div>
            <ChevronDown className="hidden xl:block h-4 w-4 text-slate-400" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white p-3 shadow-xl border border-slate-100 ring-1 ring-black/5 z-50 animate-in fade-in-50 zoom-in-95 duration-150 text-xs">
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="font-bold text-slate-900">
                  {settings?.userProfile?.name}
                </p>
                <p className="text-[11px] text-slate-500 truncate">
                  {settings?.userProfile?.email}
                </p>
                <div className="mt-1.5 inline-flex items-center gap-1 rounded bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
                  <Shield className="w-3 h-3" />
                  {settings?.userProfile?.adminLevel || 'Chief Monitoring Officer'}
                </div>
              </div>

              <div className="mt-2 space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    setProfileOpen(false);
                    navigate('/settings');
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 font-medium text-slate-700 hover:bg-slate-50"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  Officer Profile & SLA Rules
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Reset all demo complaints and settings to original state?')) {
                      resetAllData();
                      setProfileOpen(false);
                    }
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 font-medium text-amber-700 hover:bg-amber-50"
                >
                  <RotateCcw className="w-4 h-4 text-amber-600" />
                  Reset Prototype Data
                </button>
              </div>

              <div className="mt-2 pt-2 border-t border-slate-100 px-3 py-1 text-[11px] text-slate-400 text-center">
                SIH26264 Prototype Session
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
