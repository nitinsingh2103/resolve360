import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
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
  getStatusDistribution, 
  getMonthlyTrends 
} from '../../utils/metrics';

// Custom sleek tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur-xs text-xs">
        <p className="font-bold text-slate-900 mb-1">{label}</p>
        {payload.map((entry, index) => (
          <div key={`tooltip-${index}`} className="flex items-center gap-2 py-0.5">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: entry.color || entry.fill }}
            />
            <span className="text-slate-600 font-medium">{entry.name}:</span>
            <span className="font-bold text-slate-900">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const ComplaintCharts = ({ complaints, bureauStats }) => {
  const statusData = getStatusDistribution(complaints);
  const monthlyTrendsData = getMonthlyTrends(complaints);

  // Bureau distribution data for bar chart
  const bureauData = (bureauStats || []).map((b) => ({
    name: b.name.replace(' and ', ' & ').split(' ')[0] + '...',
    fullName: b.name,
    total: b.total,
    resolved: b.resolved,
    pending: b.pending,
    overdue: b.overdue,
    color: b.color
  }));

  // Overdue by bureau horizontal data
  const overdueByBureauData = (bureauStats || [])
    .map((b) => ({
      name: b.code || b.name.substring(0, 8),
      fullName: b.name,
      overdue: b.overdue,
      total: b.total
    }))
    .sort((a, b) => b.overdue - a.overdue);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 1. Line Chart: Received vs Resolved */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              Monthly Intake vs Resolution Trend
            </h3>
            <p className="text-xs text-slate-500">
              Six-month longitudinal trajectory across all AICTE cells
            </p>
          </div>
          <span className="rounded-md bg-blue-50 px-2 py-1 text-[11px] font-semibold text-blue-700">
            6-Month Trajectory
          </span>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyTrendsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="top" 
                align="right" 
                wrapperStyle={{ fontSize: 11, paddingBottom: 12 }} 
              />
              <Line
                type="monotone"
                dataKey="received"
                name="Cases Received"
                stroke="#2563eb"
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#2563eb' }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="resolved"
                name="Cases Resolved"
                stroke="#10b981"
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#10b981' }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Bar Chart: Complaints by Bureau */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              Caseload Breakdown by Bureau
            </h3>
            <p className="text-xs text-slate-500">
              Active intake, pending investigation and resolved cases
            </p>
          </div>
          <span className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-600">
            5 Bureaus
          </span>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bureauData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" align="right" wrapperStyle={{ fontSize: 11, paddingBottom: 12 }} />
              <Bar dataKey="pending" name="Pending / In Progress" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="resolved" name="Resolved" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Donut Chart: Status Distribution */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              Complaint Status Distribution
            </h3>
            <p className="text-xs text-slate-500">
              Real-time proportion of cases across lifecycle states
            </p>
          </div>
          <span className="rounded-md bg-indigo-50 px-2 py-1 text-[11px] font-semibold text-indigo-700">
            Lifecycle
          </span>
        </div>

        <div className="h-72 w-full pt-4 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<CustomTooltip />} />
              <Pie
                data={statusData}
                innerRadius={65}
                outerRadius={95}
                paddingAngle={4}
                dataKey="value"
                nameKey="name"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend
                verticalAlign="bottom"
                layout="horizontal"
                wrapperStyle={{ fontSize: 11, paddingTop: 10 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 4. Horizontal Bar Chart: Overdue Cases by Bureau */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span>Overdue Breaches by Bureau</span>
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            </h3>
            <p className="text-xs text-slate-500">
              Cases that have breached their prescribed resolution SLA target
            </p>
          </div>
          <span className="rounded-md bg-red-50 px-2 py-1 text-[11px] font-semibold text-red-700">
            Urgent Attention
          </span>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={overdueByBureauData}
              layout="vertical"
              margin={{ top: 10, right: 20, left: 20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 11, fill: '#64748b' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="overdue"
                name="Overdue Complaints"
                fill="#ef4444"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
