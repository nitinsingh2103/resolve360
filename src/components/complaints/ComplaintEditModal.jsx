import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { useComplaints } from '../../context/ComplaintContext';
import { COMPLAINT_CATEGORIES, COMPLAINT_PRIORITIES, DEMO_OFFICERS_BY_BUREAU, COMPLAINT_STATUSES } from '../../data/mockBureaus';
import { AlertCircle, Check } from 'lucide-react';

export const ComplaintEditModal = ({ isOpen, onClose, complaint }) => {
  const { bureaus, updateComplaint } = useComplaints();

  const [formData, setFormData] = useState({
    institutionName: '',
    institutionCode: '',
    category: '',
    bureau: '',
    assignedOfficer: '',
    priority: 'Medium',
    status: 'In Progress',
    dueDate: '',
    description: '',
    resolutionNotes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);

  useEffect(() => {
    if (complaint && isOpen) {
      setFormData({
        institutionName: complaint.institutionName || '',
        institutionCode: complaint.institutionCode || '',
        category: complaint.category || COMPLAINT_CATEGORIES[0],
        bureau: complaint.bureau || (bureaus[0]?.name || 'Approval and Accreditation'),
        assignedOfficer: complaint.assignedOfficer || '',
        priority: complaint.priority || 'Medium',
        status: complaint.status || 'Submitted',
        dueDate: complaint.dueDate ? new Date(complaint.dueDate).toISOString().split('T')[0] : '',
        description: complaint.description || '',
        resolutionNotes: complaint.resolutionNotes || ''
      });
      setErrors({});
      setSuccessMsg(null);
    }
  }, [complaint, isOpen, bureaus]);

  const handleBureauChange = (newBureau) => {
    const officers = DEMO_OFFICERS_BY_BUREAU[newBureau] || ['Desk Officer'];
    setFormData((prev) => ({
      ...prev,
      bureau: newBureau,
      assignedOfficer: officers[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.institutionName.trim()) {
      setErrors({ institutionName: 'Institution name cannot be blank.' });
      return;
    }

    setIsSubmitting(true);
    try {
      updateComplaint(complaint.id, {
        ...formData,
        dueDate: new Date(formData.dueDate).toISOString()
      });

      setSuccessMsg(`Complaint ${complaint.id} successfully updated!`);
      setTimeout(() => {
        setIsSubmitting(false);
        onClose();
      }, 700);
    } catch (err) {
      console.error(err);
      setErrors({ form: 'Failed to update case record.' });
      setIsSubmitting(false);
    }
  };

  const officersList = DEMO_OFFICERS_BY_BUREAU[formData.bureau] || ['Desk Officer'];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Edit Complaint: ${complaint?.id}`}
      subtitle="Modify case attributes, reassign bureau/officer, or adjust timeline dates"
      maxWidth="max-w-2xl"
    >
      {successMsg ? (
        <div className="py-8 text-center animate-in zoom-in-95">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-2">
            <Check className="h-6 w-6 stroke-[3]" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">{successMsg}</h4>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {errors.form && (
            <div className="rounded-lg bg-red-50 p-2.5 text-red-700 flex items-center gap-2 border border-red-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errors.form}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Institution Name
              </label>
              <input
                type="text"
                value={formData.institutionName}
                onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-blue-500 focus:outline-hidden"
              />
              {errors.institutionName && (
                <p className="mt-1 text-[11px] text-red-600">{errors.institutionName}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                AICTE Permanent Code
              </label>
              <input
                type="text"
                value={formData.institutionCode}
                onChange={(e) => setFormData({ ...formData, institutionCode: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-blue-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Assigned Bureau
              </label>
              <select
                value={formData.bureau}
                onChange={(e) => handleBureauChange(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-blue-500 focus:outline-hidden bg-white"
              >
                {bureaus.map((b) => (
                  <option key={b.id || b.name} value={b.name}>
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
                value={formData.assignedOfficer}
                onChange={(e) => setFormData({ ...formData, assignedOfficer: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-blue-500 focus:outline-hidden bg-white"
              >
                {officersList.map((off) => (
                  <option key={off} value={off}>
                    {off}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-blue-500 focus:outline-hidden bg-white font-medium"
              >
                {COMPLAINT_STATUSES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-blue-500 focus:outline-hidden bg-white font-medium"
              >
                {COMPLAINT_PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Target SLA Due Date
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-blue-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Grievance Description
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full rounded-lg border border-slate-300 p-2.5 text-xs focus:border-blue-500 focus:outline-hidden"
            />
          </div>

          {(formData.status === 'Resolved' || formData.status === 'Closed') && (
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Resolution Summary & Orders Issued
              </label>
              <textarea
                rows={2}
                placeholder="Enter final resolution directives, refund confirmation, or closing note."
                value={formData.resolutionNotes}
                onChange={(e) => setFormData({ ...formData, resolutionNotes: e.target.value })}
                className="w-full rounded-lg border border-emerald-300 bg-emerald-50/20 p-2.5 text-xs focus:border-emerald-500 focus:outline-hidden"
              />
            </div>
          )}

          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-blue-600 px-5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-blue-700"
            >
              {isSubmitting ? 'Saving Changes...' : 'Save Modifications'}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
