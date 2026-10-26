import React, { useState, useMemo } from 'react';
import { useComplaints } from '../context/ComplaintContext';
import { 
  getStatusDistribution, 
  getMonthlyTrends, 
  getCategoryDistribution, 
  calculateMetrics,
  calculateBureauStats
} from '../utils/metrics';
import { exportComplaintsToCsv } from '../utils/exportCsv';
import { formatDate, isOverdue } from '../utils/dateUtils';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { 
  BarChart3, 
  Download, 
  Filter, 
  Calendar, 
  Building, 
  CheckCircle2, 
  AlertTriangle,
  Clock,
  RotateCcw
} from 'lucide-react';

export const Reports = () => {
  const { complaints, bureaus } = useComplaints();

  // Filter state for reports
  const [selectedBureau, setSelectedBureau] = useState('ALL');
  const [timeRange, setTimeRange] = useState('ALL'); // 'ALL' | '30' | '90' | '180'

  // Filtered dataset for reports
  const filteredData = useMemo(() => {
    return complaints.filter((c) => {
      // Bureau filter
      if (selectedBureau !== 'ALL' && c.bureau !== selectedBureau) {
        return false;
      }

      // Time range filter
      if (timeRange !== 'ALL') {
        const days = Number(timeRange);
        const refDate = new Date('2026-10-26T22:20:00+05:30');
        const itemDate = new Date(c.createdAt);
        const diffDays = (refDate - itemDate) / (1000 * 60 * 60 * 24);
        if (diffDays > days) return false;
      }

      return true;
    });
  }, [complaints, selectedBureau, timeRange]);

  const reportMetrics = useMemo(() => calculateMetrics(filteredData), [filteredData]);
  const bureauAnalytics = useMemo(() => calculateBureauStats(filteredData, bureaus), [filteredData, bureaus]);
  const monthlyTrends = useMemo(() => getMonthlyTrends(filteredData), [filteredData]);
  const categoryData = useMemo(() => getCategoryDistribution(filteredData), [filteredData]);
  const statusData = useMemo(() => getStatusDistribution(filteredData), [filteredData]);

  const handleExport = () => {
    const filename = `AICTE_Resolve360_Report_${selectedBureau.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`;
    exportComplaintsToCsv(filteredData, filename);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header and Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Institutional Grievance Reports & Analytics
          </h2>
          <p className="text-xs text-slate-500">
            Cross-departmental audit analytics, category distributions, and SLA resolution velocity
          </p>
        </div>

        <button
          type="button"
          onClick={handleExport}
          className="flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2 text-xs font-bold text-white shadow-xs transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Export Filtered Report (CSV)</span>
        </button>
      </div>

      {/* Filter Controls Bar */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 font-bold text-slate-700">
            <Filter className="w-4 h-4 text-blue-600" />
            <span>Scope Filters:</span>
          </div>

          {/* Bureau selector */}
          <div className="flex items-center gap-1.5">
            <label className="text-slate-500">Bureau:</label>
            <select
              value={selectedBureau}
              onChange={(e) => setSelectedBureau(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 focus:border-blue-500 focus:outline-hidden"
            >
              <option value="ALL">All Bureaus ({complaints.length})</option>
              {bureaus.map((b) => (
                <option key={b.name} value={b.name}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          {/* Time range selector */}
          <div className="flex items-center gap-1.5">
            <label className="text-slate-500">Period:</label>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 focus:border-blue-500 focus:outline-hidden"
            >
              <option value="ALL">All Historical Records</option>
              <option value="30">Past 30 Days</option>
              <option value="90">Past 90 Days</option>
              <option value="180">Past 6 Months</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium">
            Dataset: <strong className="text-slate-800">{filteredData.length}</strong> complaints analyzed
          </span>
          {(selectedBureau !== 'ALL' || timeRange !== 'ALL') && (
            <button
              type="button"
              onClick={() => {
                setSelectedBureau('ALL');
                setTimeRange('ALL');
              }}
              className="text-blue-600 font-bold hover:underline flex items-center gap-1 ml-2"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Scope
            </button>
          )}
        </div>
      </div>

      {/* High-level KPI Summary Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Filtered Cases</span>
          <span className="text-2xl font-black text-slate-900 mt-1 block">{reportMetrics.total}</span>
          <span className="text-[11px] text-slate-500">Across chosen criteria</span>
        </div>

        <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-emerald-600 block">Resolved / Closed</span>
          <span className="text-2xl font-black text-emerald-700 mt-1 block">{reportMetrics.resolved}</span>
          <span className="text-[11px] text-emerald-600 font-bold">{reportMetrics.resolutionRate}% success rate</span>
        </div>

        <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-red-600 block">Overdue Violations</span>
          <span className="text-2xl font-black text-red-600 mt-1 block">{reportMetrics.overdue}</span>
          <span className="text-[11px] text-red-600 font-medium">Breached SLA threshold</span>
        </div>

        <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-purple-600 block">Avg Turnaround</span>
          <span className="text-2xl font-black text-purple-700 mt-1 block">{reportMetrics.avgResolutionDays}d</span>
          <span className="text-[11px] text-slate-500">Target threshold: 14 days</span>
        </div>
      </div>

      {/* Main Charts: Trends & Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trajectory */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
          <h3 className="font-bold text-slate-900 text-sm mb-1">
            Intake vs Resolution Volume (Monthly)
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Longitudinal trend of complaints registered against closed determinations
          </p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-xl border border-slate-200 bg-white p-2.5 shadow-lg text-xs">
                          <p className="font-bold text-slate-900 mb-1">{label}</p>
                          {payload.map((e, idx) => (
                            <div key={idx} className="flex justify-between gap-4 text-slate-600">
                              <span>{e.name}:</span>
                              <strong className="text-slate-900">{e.value}</strong>
                            </div>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend verticalAlign="top" align="right" wrapperStyle={{ fontSize: 11, paddingBottom: 10 }} />
                <Line type="monotone" dataKey="received" name="Received" stroke="#2563eb" strokeWidth={2} />
                <Line type="monotone" dataKey="resolved" name="Resolved" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Complaints by Category */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
          <h3 className="font-bold text-slate-900 text-sm mb-1">
            Distribution by Grievance Category
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Frequency of institutional issues reported across technical campuses
          </p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categoryData}
                layout="vertical"
                margin={{ top: 5, right: 20, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis
                  type="category"
                  dataKey="category"
                  tick={{ fontSize: 10, fill: '#475569' }}
                  width={130}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip />
                <Bar dataKey="count" name="Complaints" fill="#6366f1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bureau Resolution Performance Table */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
        <h3 className="font-bold text-slate-900 text-sm mb-1">
          Bureau-Wise SLA Performance & Resolution Analysis
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Detailed metrics reflecting operational turnaround across departments
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Bureau / Cell</th>
                <th className="py-3 px-4">Officer in Charge</th>
                <th className="py-3 px-4 text-center">Total Volume</th>
                <th className="py-3 px-4 text-center">Active Queue</th>
                <th className="py-3 px-4 text-center">Resolved</th>
                <th className="py-3 px-4 text-center">Overdue</th>
                <th className="py-3 px-4 text-center">Resolution Rate</th>
                <th className="py-3 px-4 text-right">Avg Turnaround</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bureauAnalytics.map((b) => (
                <tr key={b.name} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-800">
                    {b.name}
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {b.head}
                  </td>
                  <td className="py-3 px-4 text-center font-bold text-slate-900">
                    {b.total}
                  </td>
                  <td className="py-3 px-4 text-center text-indigo-700 font-semibold">
                    {b.pending + b.inProgress}
                  </td>
                  <td className="py-3 px-4 text-center text-emerald-700 font-semibold">
                    {b.resolved}
                  </td>
                  <td className="py-3 px-4 text-center font-bold">
                    <span className={b.overdue > 0 ? 'text-red-600' : 'text-slate-400'}>
                      {b.overdue}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="font-bold text-slate-800">{b.resolutionRate}%</span>
                  </td>
                  <td className="py-3 px-4 text-right font-medium text-slate-700">
                    {b.avgResolutionDays} days
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
