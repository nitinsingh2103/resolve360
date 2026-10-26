import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PriorityBadge } from '../complaints/PriorityBadge';
import { StatusBadge } from '../complaints/StatusBadge';
import { formatDate, isOverdue, isDueSoon, getDaysRemaining } from '../../utils/dateUtils';
import { AlertCircle, Clock, ChevronRight, ShieldAlert, Calendar } from 'lucide-react';

export const PriorityCases = ({ complaints }) => {
  const navigate = useNavigate();

  // Filter urgent: Critical or High, not resolved/closed
  const priorityCases = complaints
    .filter(
      (c) =>
        (c.priority === 'Critical' || c.priority === 'High') &&
        c.status !== 'Resolved' &&
        c.status !== 'Closed'
    )
    .sort((a, b) => {
      // Overdue first, then by dueDate ascending
      const aOverdue = isOverdue(a);
      const bOverdue = isOverdue(b);
      if (aOverdue && !bOverdue) return -1;
      if (!aOverdue && bOverdue) return 1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    })
    .slice(0, 5);

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-red-50 text-red-600">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              Priority Action Cases
            </h3>
            <p className="text-xs text-slate-500">
              Critical and high-priority grievances requiring immediate executive review
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate('/escalations')}
          className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 group"
        >
          <span>View Escalation Center</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      <div className="mt-4 divide-y divide-slate-100">
        {priorityCases.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400">
            No critical or high priority cases requiring attention.
          </div>
        ) : (
          priorityCases.map((c) => {
            const overdue = isOverdue(c);
            const dueSoon = isDueSoon(c, 48);
            const daysLeft = getDaysRemaining(c.dueDate);

            return (
              <div
                key={c.id}
                onClick={() => navigate(`/complaints/${c.id}`)}
                className="py-3 px-2 rounded-xl hover:bg-slate-50/80 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 group-hover:border-blue-300">
                      {c.id}
                    </span>
                    <PriorityBadge priority={c.priority} size="xs" />
                    <StatusBadge status={c.status} size="xs" />
                    {overdue && (
                      <span className="inline-flex items-center gap-1 rounded bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700">
                        <AlertCircle className="w-3 h-3" />
                        OVERDUE
                      </span>
                    )}
                    {!overdue && dueSoon && (
                      <span className="inline-flex items-center gap-1 rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                        <Clock className="w-3 h-3" />
                        Due in 48h
                      </span>
                    )}
                  </div>

                  <h4 className="text-xs font-bold text-slate-800 truncate group-hover:text-blue-600 transition-colors">
                    {c.institutionName}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                    {c.description}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 text-xs">
                  <div className="text-left sm:text-right">
                    <div className="flex items-center sm:justify-end gap-1 text-[11px] font-medium text-slate-500">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>Due: {formatDate(c.dueDate)}</span>
                    </div>
                    <span className={`text-[10px] font-bold block ${
                      overdue ? 'text-red-600' : daysLeft <= 2 ? 'text-amber-600' : 'text-slate-400'
                    }`}>
                      {overdue ? 'Breached SLA' : `${daysLeft} days remaining`}
                    </span>
                  </div>

                  <div className="hidden sm:flex p-1.5 rounded-lg text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
