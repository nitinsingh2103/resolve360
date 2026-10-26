import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBadge } from '../complaints/StatusBadge';
import { PriorityBadge } from '../complaints/PriorityBadge';
import { formatDate, isOverdue } from '../../utils/dateUtils';
import { ArrowRight, Eye, AlertCircle } from 'lucide-react';

export const RecentComplaints = ({ complaints }) => {
  const navigate = useNavigate();

  // Sort by createdAt descending, slice 7 recent items
  const recent = [...complaints]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 7);

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs overflow-hidden">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">
            Recent Institutional Grievances
          </h3>
          <p className="text-xs text-slate-500">
            Latest incoming cases registered through the central oversight intake
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/complaints')}
          className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 group"
        >
          <span>View All in Registry</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      <div className="overflow-x-auto -mx-5 -mb-5 mt-2">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
            <tr>
              <th className="py-3 px-5">Case ID</th>
              <th className="py-3 px-4">Institution Name</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Assigned Bureau</th>
              <th className="py-3 px-4">Priority</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Submitted</th>
              <th className="py-3 px-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {recent.map((c) => {
              const overdue = isOverdue(c);
              return (
                <tr
                  key={c.id}
                  onClick={() => navigate(`/complaints/${c.id}`)}
                  className="hover:bg-blue-50/40 cursor-pointer transition-colors group"
                >
                  <td className="py-3.5 px-5 font-mono font-bold text-blue-600 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <span>{c.id}</span>
                      {overdue && (
                        <span title="Overdue case" className="text-red-500">
                          <AlertCircle className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800 max-w-[200px] truncate">
                    {c.institutionName}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 max-w-[170px] truncate">
                    {c.category}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 font-medium text-slate-700 text-[11px]">
                      {c.bureau}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <PriorityBadge priority={c.priority} size="xs" />
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <StatusBadge status={c.status} size="xs" />
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap font-medium">
                    {formatDate(c.createdAt)}
                  </td>
                  <td className="py-3.5 px-5 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/complaints/${c.id}`);
                      }}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 group-hover:text-blue-800 hover:underline p-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
