import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useComplaints } from '../context/ComplaintContext';
import { StatusBadge } from '../components/complaints/StatusBadge';
import { PriorityBadge } from '../components/complaints/PriorityBadge';
import { formatDate, isOverdue } from '../utils/dateUtils';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { 
  Building2, 
  Users, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ArrowRight, 
  Mail, 
  Phone, 
  Info,
  TrendingUp,
  FileText
} from 'lucide-react';

export const BureauMonitoring = () => {
  const navigate = useNavigate();
  const { complaints, bureaus, bureauStats, setFilters } = useComplaints();

  const [selectedBureauName, setSelectedBureauName] = useState(bureaus[0]?.name || 'Approval and Accreditation');

  // Chart data
  const workloadChartData = (bureauStats || []).map((b) => ({
    name: b.name.replace(' and ', ' & ').split(' ')[0] + '...',
    fullName: b.name,
    'Total Assigned': b.total,
    'Resolved': b.resolved,
    'Pending': b.pending + b.inProgress,
    'Overdue': b.overdue
  }));

  // Filter complaints for the selected bureau drilldown
  const activeBureauComplaints = complaints.filter((c) => c.bureau === selectedBureauName);
  const activeBureauInfo = bureauStats.find((b) => b.name === selectedBureauName) || bureauStats[0];

  const handleNavigateToRegistry = (bureauName) => {
    setFilters((prev) => ({
      ...prev,
      bureau: bureauName,
      search: '',
      status: 'ALL',
      priority: 'ALL',
      onlyOverdue: false
    }));
    navigate('/complaints');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner & SIH Notice */}
      <div className="rounded-2xl border border-blue-200/80 bg-blue-50/50 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-800 font-bold text-xs mb-1">
            <Info className="w-4 h-4 text-blue-600" />
            <span>Illustrative Demonstration Departments</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Inter-Bureau Performance & Operational Velocity
          </h2>
          <p className="text-xs text-slate-600 max-w-2xl mt-0.5">
            Cross-departmental monitoring of complaint allocation, resolution efficiency, SLA compliance, and pending queues across AICTE administrative cells.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-xl bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 border border-slate-200 shadow-2xs">
            5 Active Monitoring Cells
          </span>
        </div>
      </div>

      {/* Workload Comparison Chart */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              Bureau Workload & Resolution Comparison
            </h3>
            <p className="text-xs text-slate-500">
              Comparative volume of assigned cases, completed grievances, and active SLA breaches
            </p>
          </div>
          <span className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-700">
            Real-Time Metric
          </span>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={workloadChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-lg text-xs">
                        <p className="font-bold text-slate-900 mb-1">{payload[0]?.payload?.fullName || label}</p>
                        {payload.map((entry, index) => (
                          <div key={index} className="flex items-center justify-between gap-4 py-0.5">
                            <span className="text-slate-600 font-medium">{entry.name}:</span>
                            <span className="font-bold text-slate-900">{entry.value}</span>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend verticalAlign="top" align="right" wrapperStyle={{ fontSize: 11, paddingBottom: 10 }} />
              <Bar dataKey="Total Assigned" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Resolved" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Pending" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Overdue" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bureau Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {(bureauStats || []).map((b) => {
          const isSelected = selectedBureauName === b.name;

          return (
            <div
              key={b.id || b.name}
              onClick={() => setSelectedBureauName(b.name)}
              className={`rounded-2xl bg-white p-5 shadow-xs border transition-all cursor-pointer ${
                isSelected
                  ? 'border-blue-600 ring-2 ring-blue-500/20 shadow-md'
                  : 'border-slate-200/90 hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className="p-2.5 rounded-xl text-white font-bold text-xs"
                    style={{ backgroundColor: b.color || '#2563eb' }}
                  >
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      {b.code}
                    </span>
                    <h3 className="text-sm font-extrabold text-slate-900 leading-tight">
                      {b.name}
                    </h3>
                  </div>
                </div>

                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 shrink-0">
                  SLA: {b.slaDaysDefault}d
                </span>
              </div>

              {/* Bureau Head info */}
              <div className="text-[11px] text-slate-500 mb-4 pb-3 border-b border-slate-100 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span>Head: <strong>{b.head}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{b.email}</span>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                <div className="rounded-xl bg-slate-50 p-2.5">
                  <span className="text-[10px] text-slate-400 font-semibold block">Total Assigned</span>
                  <span className="text-base font-bold text-slate-900">{b.total}</span>
                </div>

                <div className="rounded-xl bg-emerald-50 p-2.5">
                  <span className="text-[10px] text-emerald-700 font-semibold block">Resolved</span>
                  <span className="text-base font-bold text-emerald-800">{b.resolved}</span>
                </div>

                <div className="rounded-xl bg-indigo-50 p-2.5">
                  <span className="text-[10px] text-indigo-700 font-semibold block">Pending Queue</span>
                  <span className="text-base font-bold text-indigo-800">{b.pending + b.inProgress}</span>
                </div>

                <div className={`rounded-xl p-2.5 ${b.overdue > 0 ? 'bg-red-50 text-red-700' : 'bg-slate-50 text-slate-700'}`}>
                  <span className="text-[10px] font-semibold block">Overdue</span>
                  <span className="text-base font-bold">{b.overdue}</span>
                </div>
              </div>

              {/* Progress Bar & Avg Days */}
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Resolution Rate</span>
                  <span className="font-bold text-slate-800">{b.resolutionRate}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${b.resolutionRate}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                  <span>Avg Turnaround: <strong>{b.avgResolutionDays} days</strong></span>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigateToRegistry(b.name);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 group"
                >
                  <span>Filter in Registry ({b.total})</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <span className={`text-[11px] font-semibold ${isSelected ? 'text-blue-600' : 'text-slate-400'}`}>
                  {isSelected ? 'Active Selection' : 'Click to View'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Bureau Drilldown Table */}
      {activeBureauInfo && (
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-sm">
                  Active Grievance Caseload: {activeBureauInfo.name}
                </h3>
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-800">
                  {activeBureauComplaints.length} Records
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {activeBureauInfo.description}
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleNavigateToRegistry(activeBureauInfo.name)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 shrink-0"
            >
              <span>Open in Registry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto mt-3">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Case ID</th>
                  <th className="py-3 px-4">Institution Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Officer</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {activeBureauComplaints.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-slate-400">
                      No complaints currently assigned to this bureau.
                    </td>
                  </tr>
                ) : (
                  activeBureauComplaints.map((c) => {
                    const overdue = isOverdue(c);

                    return (
                      <tr
                        key={c.id}
                        onClick={() => navigate(`/complaints/${c.id}`)}
                        className="hover:bg-blue-50/40 cursor-pointer transition-colors"
                      >
                        <td className="py-3 px-4 font-mono font-bold text-blue-600 whitespace-nowrap">
                          {c.id}
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-800 max-w-[220px] truncate">
                          {c.institutionName}
                        </td>
                        <td className="py-3 px-4 text-slate-600 max-w-[170px] truncate">
                          {c.category}
                        </td>
                        <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                          {c.assignedOfficer || 'Desk Officer'}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <PriorityBadge priority={c.priority} size="xs" />
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className={`font-medium ${overdue ? 'text-red-600 font-bold' : 'text-slate-600'}`}>
                            {formatDate(c.dueDate)}
                          </span>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <StatusBadge status={c.status} size="xs" />
                        </td>
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/complaints/${c.id}`);
                            }}
                            className="font-semibold text-blue-600 hover:underline"
                          >
                            Investigate &rarr;
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
