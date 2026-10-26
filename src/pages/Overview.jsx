import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useComplaints } from '../context/ComplaintContext';
import { StatCard } from '../components/dashboard/StatCard';
import { ComplaintCharts } from '../components/dashboard/ComplaintCharts';
import { PriorityCases } from '../components/dashboard/PriorityCases';
import { RecentComplaints } from '../components/dashboard/RecentComplaints';
import { 
  FileText, 
  Clock, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  Timer, 
  Plus, 
  Download,
  ShieldCheck,
  Building2,
  TrendingUp
} from 'lucide-react';
import { exportComplaintsToCsv } from '../utils/exportCsv';

export const Overview = () => {
  const navigate = useNavigate();
  const { complaints, metrics, bureauStats } = useComplaints();
  const { onOpenNewComplaint } = useOutletContext() || {};

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner & Quick Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 rounded-2xl text-white shadow-md relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-300 mb-2 border border-blue-400/20">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>AICTE Central Monitoring Command</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Integrated Bureau Complaint Operations
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
            Real-time institutional grievance triage, SLA tracking, and inter-bureau resolution velocity across technical colleges nationwide.
          </p>
        </div>

        <div className="flex items-center gap-2.5 relative z-10 shrink-0">
          <button
            type="button"
            onClick={() => exportComplaintsToCsv(complaints, 'AICTE_Executive_Dashboard_Summary.csv')}
            className="flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur-xs transition-colors border border-white/15"
          >
            <Download className="w-4 h-4" />
            <span>Export Snapshot</span>
          </button>

          <button
            type="button"
            onClick={onOpenNewComplaint}
            className="flex items-center gap-2 rounded-xl bg-blue-500 hover:bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-md transition-colors"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>New Complaint</span>
          </button>
        </div>

        {/* Decorative background circle */}
        <div className="absolute right-0 top-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />
      </div>

      {/* KPI Cards (All dynamically computed from mock complaint records) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Total Complaints */}
        <StatCard
          title="Total Complaints"
          value={metrics.total}
          subtitle="All active registry cases"
          icon={FileText}
          colorScheme="blue"
          trend={{ value: '+8%', isPositive: true }}
          onClick={() => navigate('/complaints')}
        />

        {/* Pending Complaints */}
        <StatCard
          title="Pending Complaints"
          value={metrics.pending}
          subtitle="Under Review / Info Needed"
          icon={Clock}
          colorScheme="amber"
          trend={{ value: 'Active', neutral: true }}
          onClick={() => navigate('/complaints')}
        />

        {/* In Progress */}
        <StatCard
          title="In Progress"
          value={metrics.inProgress}
          subtitle="Under active investigation"
          icon={RefreshCw}
          colorScheme="indigo"
          onClick={() => navigate('/complaints')}
        />

        {/* Resolved Complaints */}
        <StatCard
          title="Resolved Cases"
          value={metrics.resolved}
          subtitle={`${metrics.resolutionRate}% resolution rate`}
          icon={CheckCircle2}
          colorScheme="emerald"
          trend={{ value: `${metrics.resolutionRate}%`, isPositive: true }}
          onClick={() => navigate('/complaints')}
        />

        {/* Overdue Complaints */}
        <StatCard
          title="Overdue Complaints"
          value={metrics.overdue}
          subtitle="Breached target SLA date"
          icon={AlertTriangle}
          colorScheme="red"
          trend={{ value: `${metrics.overdue} cases`, isPositive: false }}
          onClick={() => navigate('/escalations')}
        />

        {/* Average Resolution Time */}
        <StatCard
          title="Avg Resolution"
          value={`${metrics.avgResolutionDays}d`}
          subtitle="Mean calendar turnaround"
          icon={Timer}
          colorScheme="purple"
          trend={{ value: '-1.4d', isPositive: true }}
        />
      </div>

      {/* Visualizations Section (Recharts) */}
      <ComplaintCharts complaints={complaints} bureauStats={bureauStats} />

      {/* Priority Cases & Recent Complaints */}
      <div className="grid grid-cols-1 gap-6">
        <PriorityCases complaints={complaints} />
        <RecentComplaints complaints={complaints} />
      </div>
    </div>
  );
};
