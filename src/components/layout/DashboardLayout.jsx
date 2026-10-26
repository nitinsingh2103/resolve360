import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ComplaintFormModal } from '../complaints/ComplaintFormModal';
import { ShieldCheck, Info } from 'lucide-react';

export const DashboardLayout = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isNewComplaintOpen, setIsNewComplaintOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        {/* Top Header */}
        <Header
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onOpenNewComplaint={() => setIsNewComplaintOpen(true)}
        />

        {/* Prototype Banner Notification */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white px-4 sm:px-8 py-2 text-xs flex items-center justify-between border-b border-blue-950/40 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-emerald-400/30" />
            <span className="font-semibold text-blue-200">
              SIH26264 Active Demonstration Environment:
            </span>
            <span className="text-slate-200 hidden sm:inline">
              Simulated institutional grievance records across 5 AICTE Bureaus & Cells.
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-blue-200">
            <span className="hidden md:inline">Storage: Browser Local Cache</span>
            <span className="bg-blue-800/60 px-2 py-0.5 rounded font-mono text-[10px] text-blue-300">FastAPI Ready</span>
          </div>
        </div>

        {/* Dynamic Route Page Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet context={{ onOpenNewComplaint: () => setIsNewComplaintOpen(true) }} />
        </main>

        {/* Clean Enterprise Footer */}
        <footer className="border-t border-slate-200 bg-white px-4 sm:px-8 py-4 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span className="font-semibold text-slate-700">AICTE Resolve360</span>
            <span>— Smart India Hackathon Prototype (SIH26264)</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 text-[11px]">
            <span>All University & Institutional Complaints Isolated</span>
            <span>•</span>
            <span>Demo Data Mode</span>
          </div>
        </footer>
      </div>

      {/* Global New Complaint Modal */}
      <ComplaintFormModal
        isOpen={isNewComplaintOpen}
        onClose={() => setIsNewComplaintOpen(false)}
      />
    </div>
  );
};
