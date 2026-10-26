import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useComplaints } from '../context/ComplaintContext';
import { StatusBadge } from '../components/complaints/StatusBadge';
import { PriorityBadge } from '../components/complaints/PriorityBadge';
import { Modal } from '../components/common/Modal';
import { formatDate, formatRelativeTime, isOverdue, getDaysRemaining, getDelayDuration } from '../utils/dateUtils';
import { COMPLAINT_STATUSES, DEMO_OFFICERS_BY_BUREAU } from '../data/mockBureaus';
import { 
  ArrowLeft, 
  Building, 
  Calendar, 
  Clock, 
  User, 
  ShieldAlert, 
  CheckCircle2, 
  MessageSquare, 
  History, 
  Send, 
  Edit, 
  AlertTriangle, 
  Lock, 
  FileCheck,
  RotateCcw,
  Sparkles,
  Tag
} from 'lucide-react';

export const ComplaintDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { complaints, bureaus, updateStatus, addComment, reassignBureau } = useComplaints();

  // Find complaint
  const complaint = complaints.find((c) => c.id === id);

  // Local state for actions
  const [commentText, setCommentText] = useState('');
  const [isInternalComment, setIsInternalComment] = useState(false);
  const [isAddingComment, setIsAddingComment] = useState(false);

  // Status Change Modal State
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [targetStatus, setTargetStatus] = useState('');
  const [resolutionNotesInput, setResolutionNotesInput] = useState('');

  // Reassignment Modal State
  const [isReassignModalOpen, setIsReassignModalOpen] = useState(false);
  const [selectedBureau, setSelectedBureau] = useState('');
  const [selectedOfficer, setSelectedOfficer] = useState('');

  if (!complaint) {
    return (
      <div className="py-16 text-center space-y-4">
        <div className="p-4 rounded-full bg-slate-100 text-slate-500 w-16 h-16 mx-auto flex items-center justify-center">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-800">Case Record Not Found</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          No grievance matching identifier <code className="font-mono font-bold">{id}</code> exists in the active registry.
        </p>
        <button
          type="button"
          onClick={() => navigate('/complaints')}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Complaint Registry</span>
        </button>
      </div>
    );
  }

  const overdue = isOverdue(complaint);
  const delay = getDelayDuration(complaint.dueDate);
  const daysLeft = getDaysRemaining(complaint.dueDate);

  // Handle Comment Submission
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setIsAddingComment(true);
    addComment(complaint.id, {
      text: commentText.trim(),
      internalOnly: isInternalComment
    });
    setCommentText('');
    setIsAddingComment(false);
  };

  // Open Status Transition
  const handleOpenStatusChange = (newStatus) => {
    setTargetStatus(newStatus);
    setResolutionNotesInput(complaint.resolutionNotes || '');
    setIsStatusModalOpen(true);
  };

  // Confirm Status Transition
  const handleConfirmStatusChange = () => {
    updateStatus(complaint.id, targetStatus, resolutionNotesInput);
    setIsStatusModalOpen(false);
  };

  // Open Reassign Modal
  const handleOpenReassign = () => {
    setSelectedBureau(complaint.bureau);
    setSelectedOfficer(complaint.assignedOfficer);
    setIsReassignModalOpen(true);
  };

  // Handle Bureau change in modal
  const handleBureauSelectChange = (bureauName) => {
    setSelectedBureau(bureauName);
    const officers = DEMO_OFFICERS_BY_BUREAU[bureauName] || ['Desk Officer'];
    setSelectedOfficer(officers[0]);
  };

  const handleConfirmReassign = () => {
    reassignBureau(complaint.id, selectedBureau, selectedOfficer);
    setIsReassignModalOpen(false);
  };

  const bureauOfficers = DEMO_OFFICERS_BY_BUREAU[selectedBureau] || ['Desk Officer'];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Navigation & Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/complaints')}
            className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors"
            title="Back to Registry"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-lg font-black text-blue-700">
                {complaint.id}
              </span>
              <StatusBadge status={complaint.status} size="sm" />
              <PriorityBadge priority={complaint.priority} size="sm" />
              {overdue && (
                <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-bold text-red-700">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {delay}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Lodge Reference: {complaint.institutionCode || 'AICTE-REG-2026'} • Submitted {formatDate(complaint.createdAt, true)}
            </p>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleOpenReassign}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            Reassign Bureau
          </button>

          {complaint.status !== 'Resolved' && complaint.status !== 'Closed' && (
            <button
              type="button"
              onClick={() => handleOpenStatusChange('Resolved')}
              className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-3.5 py-2 text-xs font-bold text-white shadow-xs transition-colors"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Mark as Resolved</span>
            </button>
          )}

          {/* Status Dropdown */}
          <div className="relative">
            <select
              value={complaint.status}
              onChange={(e) => handleOpenStatusChange(e.target.value)}
              className="rounded-xl border border-blue-600 bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700 focus:outline-hidden cursor-pointer"
            >
              {COMPLAINT_STATUSES.map((st) => (
                <option key={st} value={st}>
                  Status: {st}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid: Details Left (2/3), Timeline & Comments Right (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Institution, Details, Resolution Note */}
        <div className="lg:col-span-2 space-y-6">
          {/* Institution Card */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="p-3 rounded-xl bg-blue-50 text-blue-700 border border-blue-100 shrink-0 mt-0.5">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Target Educational Institution
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                    {complaint.institutionName}
                  </h3>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500 font-medium">
                    <span>AICTE Code: <strong className="text-slate-700 font-mono">{complaint.institutionCode || 'N/A'}</strong></span>
                    <span>•</span>
                    <span>Category: <strong className="text-slate-700">{complaint.category}</strong></span>
                  </div>
                </div>
              </div>

              <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 shrink-0">
                Verified Institute
              </span>
            </div>

            {/* Description Block */}
            <div className="mt-5 pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Grievance Particulars & Summary
              </h4>
              <div className="rounded-xl bg-slate-50 p-4 text-xs text-slate-800 leading-relaxed font-normal border border-slate-200/70 whitespace-pre-line">
                {complaint.description}
              </div>
            </div>

            {/* Escalation Alert if flagged */}
            {complaint.escalation?.isEscalated && (
              <div className="mt-4 rounded-xl bg-red-50 p-4 border border-red-200 text-xs">
                <div className="flex items-center gap-2 text-red-800 font-bold mb-1">
                  <ShieldAlert className="w-4 h-4 text-red-600" />
                  <span>Escalation Directive Recorded</span>
                </div>
                <p className="text-red-700 leading-relaxed">
                  {complaint.escalation.reason || 'Case flagged for executive review due to SLA target lapse.'}
                </p>
                {complaint.escalation.actionTaken && (
                  <div className="mt-2 pt-2 border-t border-red-200/60 text-red-900 font-medium">
                    <strong>Action Recorded:</strong> {complaint.escalation.actionTaken}
                    {complaint.escalation.reviewedBy && (
                      <span className="block text-[11px] text-red-600 mt-0.5">
                        Reviewed by: {complaint.escalation.reviewedBy} on {formatDate(complaint.escalation.reviewedAt, true)}
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Operational Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Bureau & Officer Assignment Card */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                Assigned Department & Officer
              </h4>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Responsible Bureau / Cell</span>
                  <span className="font-bold text-slate-800 text-sm">{complaint.bureau}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Designated Investigating Officer</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <User className="w-4 h-4 text-slate-400" />
                    <span className="font-semibold text-slate-700">{complaint.assignedOfficer || 'Desk Officer'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline SLA Card */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                SLA Compliance & Deadlines
              </h4>
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-[11px]">Submission Date:</span>
                  <span className="font-semibold text-slate-800">{formatDate(complaint.createdAt, true)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-[11px]">Target Resolution Date:</span>
                  <span className="font-bold text-slate-800">{formatDate(complaint.dueDate)}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-slate-400 text-[11px]">Current SLA Status:</span>
                  <span className={`font-bold ${
                    overdue ? 'text-red-600' : (complaint.status === 'Resolved' || complaint.status === 'Closed') ? 'text-emerald-600' : 'text-blue-600'
                  }`}>
                    {overdue ? delay : (complaint.status === 'Resolved' || complaint.status === 'Closed') ? 'Completed' : `${daysLeft} days remaining`}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Resolution Notes Display (If exists) */}
          {complaint.resolutionNotes && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5 shadow-xs">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-2">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <span>Formal Resolution & Closing Directives</span>
              </div>
              <p className="text-xs text-emerald-900 leading-relaxed font-medium">
                {complaint.resolutionNotes}
              </p>
            </div>
          )}

          {/* Comments & Internal Communications */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-slate-600" />
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Case Communications & Directives ({(complaint.comments || []).length})
                </h4>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">
                Internal AICTE Audit Trail
              </span>
            </div>

            {/* Comment List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {(complaint.comments || []).length === 0 ? (
                <p className="text-center py-6 text-xs text-slate-400">
                  No communication notes appended to this file yet.
                </p>
              ) : (
                complaint.comments.map((cm) => (
                  <div
                    key={cm.id}
                    className={`p-3.5 rounded-xl text-xs space-y-1.5 ${
                      cm.internalOnly
                        ? 'bg-amber-50/70 border border-amber-200 text-amber-950'
                        : 'bg-slate-50 border border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{cm.author}</span>
                        <span className="text-[10px] text-slate-500 font-medium">({cm.role})</span>
                        {cm.internalOnly && (
                          <span className="inline-flex items-center gap-1 rounded bg-amber-200 px-1.5 py-0.2 text-[9px] font-bold text-amber-900">
                            <Lock className="w-2.5 h-2.5" />
                            Internal Observation
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {formatDate(cm.timestamp, true)}
                      </span>
                    </div>
                    <p className="leading-relaxed whitespace-pre-line text-[11px]">
                      {cm.text}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Add Comment Form */}
            <form onSubmit={handleAddComment} className="pt-3 border-t border-slate-100 space-y-2">
              <textarea
                rows={2}
                placeholder="Add directive, inspection update, or administrative note..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-hidden"
              />
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isInternalComment}
                    onChange={(e) => setIsInternalComment(e.target.checked)}
                    className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600"
                  />
                  <span>Mark as internal observation only (not visible to institute)</span>
                </label>

                <button
                  type="submit"
                  disabled={!commentText.trim() || isAddingComment}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 disabled:opacity-40 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Directive</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Col: Complete Audit Timeline */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
              <History className="w-4 h-4 text-blue-600" />
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                Audit & Status Timeline
              </h4>
            </div>

            <div className="mt-4 relative pl-4 border-l-2 border-blue-100 space-y-6">
              {(complaint.history || []).map((h, idx) => (
                <div key={h.id || idx} className="relative group">
                  {/* Timeline dot */}
                  <div className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-blue-600 ring-4 ring-white" />

                  <div className="text-xs">
                    <span className="font-bold text-slate-900 block leading-tight">
                      {h.action}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5 font-medium">
                      {formatDate(h.timestamp, true)} • {h.actor || 'System'}
                    </span>
                    {h.details && (
                      <p className="text-[11px] text-slate-600 mt-1 leading-relaxed bg-slate-50 p-2 rounded-lg border border-slate-100">
                        {h.details}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Status Transition Modal */}
      <Modal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        title={`Update Status: ${complaint.id}`}
        subtitle={`Transitioning case from "${complaint.status}" to "${targetStatus}"`}
        maxWidth="max-w-md"
      >
        <div className="space-y-4 text-xs">
          <p className="text-slate-600 leading-relaxed">
            Updating the status will immediately record a timestamped event into the institutional audit timeline.
          </p>

          {(targetStatus === 'Resolved' || targetStatus === 'Closed') && (
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Resolution Summary & Orders Issued <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                placeholder="Enter details of compliance, sanction orders, refund confirmation, or closing reasons..."
                value={resolutionNotesInput}
                onChange={(e) => setResolutionNotesInput(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-2.5 text-xs focus:border-blue-500 focus:outline-hidden"
              />
            </div>
          )}

          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsStatusModalOpen(false)}
              className="rounded-lg border border-slate-300 bg-white px-3.5 py-1.5 font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmStatusChange}
              className="rounded-lg bg-blue-600 px-4 py-1.5 font-semibold text-white hover:bg-blue-700 shadow-xs"
            >
              Confirm Transition
            </button>
          </div>
        </div>
      </Modal>

      {/* Reassign Bureau Modal */}
      <Modal
        isOpen={isReassignModalOpen}
        onClose={() => setIsReassignModalOpen(false)}
        title={`Reassign Bureau: ${complaint.id}`}
        subtitle="Transfer ownership and investigation responsibility to another AICTE division"
        maxWidth="max-w-md"
      >
        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Select Bureau / Cell
            </label>
            <select
              value={selectedBureau}
              onChange={(e) => handleBureauSelectChange(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-blue-500 focus:outline-hidden bg-white"
            >
              {bureaus.map((b) => (
                <option key={b.name} value={b.name}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Designated Officer
            </label>
            <select
              value={selectedOfficer}
              onChange={(e) => setSelectedOfficer(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-blue-500 focus:outline-hidden bg-white"
            >
              {bureauOfficers.map((off) => (
                <option key={off} value={off}>
                  {off}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsReassignModalOpen(false)}
              className="rounded-lg border border-slate-300 bg-white px-3.5 py-1.5 font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmReassign}
              className="rounded-lg bg-blue-600 px-4 py-1.5 font-semibold text-white hover:bg-blue-700 shadow-xs"
            >
              Reassign Case
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
