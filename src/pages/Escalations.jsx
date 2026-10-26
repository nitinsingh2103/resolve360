import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useComplaints } from '../context/ComplaintContext';
import { PriorityBadge } from '../components/complaints/PriorityBadge';
import { StatusBadge } from '../components/complaints/StatusBadge';
import { Modal } from '../components/common/Modal';
import { formatDate, isOverdue, isDueSoon, getDelayDuration, getDaysRemaining } from '../utils/dateUtils';
import { 
  AlertOctagon, 
  AlertTriangle, 
  Clock, 
  Flame, 
  CheckCircle2, 
  ChevronRight, 
  ShieldAlert, 
  FileText,
  UserCheck,
  Send
} from 'lucide-react';

export const Escalations = () => {
  const navigate = useNavigate();
  const { complaints, reviewEscalation } = useComplaints();

  // Active tab state: 'overdue' | 'dueSoon' | 'highPriority'
  const [activeTab, setActiveTab] = useState('overdue');

  // Escalation review modal state
  const [reviewingComplaint, setReviewingComplaint] = useState(null);
  const [actionTaken, setActionTaken] = useState('Formal Show Cause Notice Issued');
  const [reviewNotes, setReviewNotes] = useState('');
  const [reviewerName, setReviewerName] = useState('Chief Monitoring Officer');

  // 1. Overdue cases (status != Resolved/Closed and dueDate < now)
  const overdueCases = useMemo(() => {
    return complaints.filter(isOverdue).sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }, [complaints]);

  // 2. Due within 48 hours
  const dueSoonCases = useMemo(() => {
    return complaints.filter((c) => isDueSoon(c, 48)).sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }, [complaints]);

  // 3. High-priority unresolved cases (Critical or High, not resolved/closed)
  const highPriorityCases = useMemo(() => {
    return complaints
      .filter((c) => (c.priority === 'Critical' || c.priority === 'High') && c.status !== 'Resolved' && c.status !== 'Closed')
      .sort((a, b) => {
        if (a.priority === 'Critical' && b.priority !== 'Critical') return -1;
        if (a.priority !== 'Critical' && b.priority === 'Critical') return 1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
  }, [complaints]);

  const currentList = {
    overdue: overdueCases,
    dueSoon: dueSoonCases,
    highPriority: highPriorityCases
  }[activeTab];

  const handleOpenReview = (c) => {
    setReviewingComplaint(c);
    setActionTaken(c.escalation?.actionTaken || 'Formal Show Cause Notice Issued');
    setReviewNotes('');
    setReviewerName(c.escalation?.reviewedBy || 'Chief Monitoring Officer');
  };

  const handleConfirmReview = (e) => {
    e.preventDefault();
    if (!reviewingComplaint) return;

    reviewEscalation(reviewingComplaint.id, {
      actionTaken,
      notes: reviewNotes.trim(),
      reviewer: reviewerName
    });

    setReviewingComplaint(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="rounded-2xl border border-red-200 bg-gradient-to-r from-red-50 via-rose-50 to-amber-50 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-red-700 font-bold text-xs mb-1">
              <ShieldAlert className="w-4 h-4 text-red-600" />
              <span>AICTE Executive Vigilance Cell</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              SLA Breach & Case Escalation Command Center
            </h2>
            <p className="text-xs text-slate-600 max-w-2xl mt-1">
              Centralized oversight triage for overdue grievances, impending SLA expirations, and institutional non-compliance requiring executive directives.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white/80 backdrop-blur-xs px-4 py-2 text-center border border-red-200/60 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Critical Breaches</span>
              <span className="text-xl font-black text-red-600">{overdueCases.length}</span>
            </div>
            <div className="rounded-xl bg-white/80 backdrop-blur-xs px-4 py-2 text-center border border-amber-200/60 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Due 48 Hours</span>
              <span className="text-xl font-black text-amber-700">{dueSoonCases.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Segmented Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('overdue')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
            activeTab === 'overdue'
              ? 'bg-red-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <AlertOctagon className="w-4 h-4" />
          <span>Overdue Grievances</span>
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-black ${
            activeTab === 'overdue' ? 'bg-red-700 text-white' : 'bg-red-100 text-red-700'
          }`}>
            {overdueCases.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('dueSoon')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
            activeTab === 'dueSoon'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Due Within 48 Hours</span>
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-black ${
            activeTab === 'dueSoon' ? 'bg-amber-700 text-white' : 'bg-amber-100 text-amber-800'
          }`}>
            {dueSoonCases.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('highPriority')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
            activeTab === 'highPriority'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>Critical Unresolved Cases</span>
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-black ${
            activeTab === 'highPriority' ? 'bg-indigo-700 text-white' : 'bg-indigo-100 text-indigo-800'
          }`}>
            {highPriorityCases.length}
          </span>
        </button>
      </div>

      {/* Main Cases Table */}
      <div className="rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {activeTab === 'overdue' && 'Active Overdue Cases (Target SLA Breached)'}
              {activeTab === 'dueSoon' && 'Approaching Deadline Cases (Due in Next 48 Hours)'}
              {activeTab === 'highPriority' && 'High & Critical Unresolved Institutional Complaints'}
            </h3>
            <p className="text-xs text-slate-500">
              Authorized administrators can record formal review directives and audit actions.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            {currentList.length} Total Cases
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Case ID</th>
                <th className="py-3 px-4">Institution Name</th>
                <th className="py-3 px-4">Bureau</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Lapse / Status</th>
                <th className="py-3 px-4">Review Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentList.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-slate-700">No cases currently in this group</p>
                    <p className="text-xs text-slate-400">All institutional complaints meeting timeline standards.</p>
                  </td>
                </tr>
              ) : (
                currentList.map((c) => {
                  const overdue = isOverdue(c);
                  const delay = getDelayDuration(c.dueDate);
                  const daysLeft = getDaysRemaining(c.dueDate);
                  const isReviewed = Boolean(c.escalation?.reviewedAt);

                  return (
                    <tr
                      key={c.id}
                      onClick={() => navigate(`/complaints/${c.id}`)}
                      className={`hover:bg-slate-50/80 cursor-pointer transition-colors ${
                        overdue ? 'bg-red-50/15' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4 font-mono font-bold text-blue-600 whitespace-nowrap">
                        {c.id}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-800 leading-tight">
                          {c.institutionName}
                        </div>
                        <span className="text-[10px] text-slate-400">
                          {c.category}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap font-medium">
                        {c.bureau}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <PriorityBadge priority={c.priority} size="xs" />
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="font-medium text-slate-700">
                          {formatDate(c.dueDate)}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {overdue ? (
                          <span className="rounded-md bg-red-100 px-2 py-0.5 text-[11px] font-bold text-red-700">
                            {delay}
                          </span>
                        ) : (
                          <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-800">
                            {daysLeft}d remaining
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {isReviewed ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3" />
                            Reviewed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            <Clock className="w-3 h-3" />
                            Pending Review
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleOpenReview(c)}
                            className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors"
                          >
                            <UserCheck className="w-3.5 h-3.5" />
                            <span>{isReviewed ? 'Update Review' : 'Record Action'}</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Escalation Review Modal */}
      {reviewingComplaint && (
        <Modal
          isOpen={Boolean(reviewingComplaint)}
          onClose={() => setReviewingComplaint(null)}
          title={`Executive Review Directive: ${reviewingComplaint.id}`}
          subtitle={`Institution: ${reviewingComplaint.institutionName}`}
          maxWidth="max-w-xl"
        >
          <form onSubmit={handleConfirmReview} className="space-y-4 text-xs">
            <div className="rounded-xl bg-slate-50 p-3 border border-slate-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Responsible Bureau:</span>
                <span className="font-bold text-slate-800">{reviewingComplaint.bureau}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Target Due Date:</span>
                <span className="font-bold text-slate-800">{formatDate(reviewingComplaint.dueDate)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">SLA Status:</span>
                <span className="font-bold text-red-600">
                  {isOverdue(reviewingComplaint) ? getDelayDuration(reviewingComplaint.dueDate) : 'Approaching Deadline'}
                </span>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Executive Action Taken <span className="text-red-500">*</span>
              </label>
              <select
                value={actionTaken}
                onChange={(e) => setActionTaken(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-blue-500 focus:outline-hidden bg-white font-medium"
              >
                <option value="Formal Show Cause Notice Issued">Formal Show Cause Notice Issued</option>
                <option value="Nominated 2-Member Surprise Inspection Team">Nominated 2-Member Surprise Inspection Team</option>
                <option value="Summoned Vice Chancellor / Registrar for Hearing">Summoned Vice Chancellor / Registrar for Hearing</option>
                <option value="48-Hour Final Compliance Reminder Issued">48-Hour Final Compliance Reminder Issued</option>
                <option value="Interim Stay Recommended on Academic Intake">Interim Stay Recommended on Academic Intake</option>
                <option value="Direct Phone Inquiry Conducted with Trust Chairman">Direct Phone Inquiry Conducted with Trust Chairman</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Executive Reviewer Name / Title
              </label>
              <input
                type="text"
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Review Directives & Observation Notes (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Enter specific directions to the bureau officer or compliance requirements..."
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-2.5 text-xs focus:border-blue-500 focus:outline-hidden"
              />
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setReviewingComplaint(null)}
                className="rounded-lg border border-slate-300 bg-white px-3.5 py-1.5 font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-red-600 px-4 py-1.5 font-semibold text-white hover:bg-red-700 shadow-xs flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Save Escalation Action</span>
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
