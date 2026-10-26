import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Building2, 
  AlertOctagon, 
  BarChart3, 
  Settings, 
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';
import { useComplaints } from '../../context/ComplaintContext';

export const Sidebar = ({ isMobileOpen, onCloseMobile }) => {
  const { metrics } = useComplaints();

  const navItems = [
    {
      to: '/',
      label: 'Overview',
      icon: LayoutDashboard,
      badge: null
    },
    {
      to: '/complaints',
      label: 'Complaint Registry',
      icon: FileText,
      badge: metrics?.total > 0 ? metrics.total : null,
      badgeColor: 'bg-blue-100 text-blue-800'
    },
    {
      to: '/bureaus',
      label: 'Bureau Monitoring',
      icon: Building2,
      badge: null
    },
    {
      to: '/escalations',
      label: 'Escalations',
      icon: AlertOctagon,
      badge: metrics?.overdue > 0 ? `${metrics.overdue} Overdue` : null,
      badgeColor: 'bg-red-500 text-white font-bold animate-pulse'
    },
    {
      to: '/reports',
      label: 'Reports & Analytics',
      icon: BarChart3,
      badge: null
    },
    {
      to: '/settings',
      label: 'Settings',
      icon: Settings,
      badge: null
    }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-slate-900 text-slate-100 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } border-r border-slate-800 shadow-xl`}
      >
        {/* Brand Header */}
        <div className="flex h-20 items-center gap-3.5 px-6 border-b border-slate-800/80 bg-slate-950/40">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-500 shadow-md shadow-blue-900/30 ring-1 ring-white/10 shrink-0">
            <ShieldCheck className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-tight text-white text-base">
                AICTE Resolve360
              </span>
              <span className="rounded bg-blue-500/20 px-1.5 py-0.5 text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                SIH
              </span>
            </div>
            <span className="text-[11px] font-medium text-slate-400 tracking-wide truncate max-w-[170px]">
              Grievance Oversight Dashboard
            </span>
          </div>
        </div>

        {/* Administration Label */}
        <div className="px-6 pt-5 pb-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Central Management
          </p>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1.5 px-3 py-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `group flex items-center justify-between rounded-xl px-3.5 py-3 text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-950/40'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon className={`h-5 w-5 transition-colors ${
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'
                      }`} />
                      <span>{item.label}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {item.badge && (
                        <span className={`rounded-full px-2 py-0.5 text-[11px] ${item.badgeColor || 'bg-slate-700 text-slate-200'}`}>
                          {item.badge}
                        </span>
                      )}
                      {isActive && <ChevronRight className="h-4 w-4 text-blue-200/70" />}
                    </div>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Hackathon Context & Meta */}
        <div className="p-4 m-3 rounded-xl bg-slate-950/60 border border-slate-800/70 text-xs">
          <div className="flex items-center gap-2 text-blue-400 font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Problem Statement: SIH26264</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed mb-2.5">
            Integrated institutional complaint tracking system for AICTE Bureaus.
          </p>
          <div className="flex items-center justify-between pt-2 border-t border-slate-800/70 text-[10px] text-slate-400">
            <span className="flex items-center gap-1 text-slate-400">
              <Info className="w-3 h-3 text-slate-400" />
              Demo Data Mode
            </span>
            <span className="font-mono text-emerald-400">v1.0.0-rc</span>
          </div>
        </div>
      </aside>
    </>
  );
};
