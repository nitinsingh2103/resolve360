import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { useComplaints } from '../../context/ComplaintContext';
import { COMPLAINT_CATEGORIES, COMPLAINT_PRIORITIES, DEMO_OFFICERS_BY_BUREAU } from '../../data/mockBureaus';
import { AlertCircle, Check, Building, FileText, Calendar, Shield, User } from 'lucide-react';

export const ComplaintFormModal = ({ isOpen, onClose }) => {
  const { bureaus, createComplaint } = useComplaints();

  const [formData, setFormData] = useState({
    institutionName: '',
    institutionCode: '',
    category: COMPLAINT_CATEGORIES[0],
    bureau: bureaus[0]?.name || 'Approval and Accreditation',
    assignedOfficer: '',
    priority: 'Medium',
    dueDate: '',
    description: '',
    initialNote: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);

  // Set default due date (10 days from today)
  useEffect(() => {
    if (isOpen) {
      const defaultDate = new Date();
      defaultDate.setDate(defaultDate.getDate() + 10);
      const isoFormatted = defaultDate.toISOString().split('T')[0];

      const initialBureau = bureaus[0]?.name || 'Approval and Accreditation';
      const officers = DEMO_OFFICERS_BY_BUREAU[initialBureau] || ['Desk Officer'];

      setFormData({
        institutionName: '',
        institutionCode: '',
        category: COMPLAINT_CATEGORIES[0],
        bureau: initialBureau,
        assignedOfficer: officers[0],
        priority: 'Medium',
        dueDate: isoFormatted,
        description: '',
        initialNote: ''
      });
      setErrors({});
      setSuccessMsg(null);
    }
  }, [isOpen, bureaus]);

  // Update assigned officer options when bureau changes
  const handleBureauChange = (newBureau) => {
    const officers = DEMO_OFFICERS_BY_BUREAU[newBureau] || ['Desk Officer'];
    setFormData((prev) => ({
      ...prev,
      bureau: newBureau,
      assignedOfficer: officers[0]
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.institutionName.trim()) {
      newErrors.institutionName = 'Institution name is required';
    } else if (formData.institutionName.trim().length < 5) {
      newErrors.institutionName = 'Institution name must be at least 5 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Complaint details & summary is required';
    } else if (formData.description.trim().length < 15) {
      newErrors.description = 'Please provide detailed complaint description (min 15 chars)';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Resolution target due date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const created = createComplaint({
        ...formData,
        dueDate: new Date(formData.dueDate).toISOString()
      });

      setSuccessMsg(`Complaint ${created.id} registered and routed successfully!`);
      setTimeout(() => {
        setIsSubmitting(false);
        onClose();
      }, 1000);
    } catch (err) {
      console.error(err);
      setErrors({ form: 'Failed to create complaint record. Please try again.' });
      setIsSubmitting(false);
    }
  };

  const officersList = DEMO_OFFICERS_BY_BUREAU[formData.bureau] || ['Desk Officer'];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Register Institutional Complaint"
      subtitle="Lodges and routes a verified institution-related grievance to authorized AICTE cells"
      maxWidth="max-w-2xl"
    >
      {successMsg ? (
        <div className="py-8 text-center animate-in zoom-in-95">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-3">
            <Check className="h-7 w-7 stroke-[3]" />
          </div>
          <h4 className="text-base font-bold text-slate-900">Case Created Successfully</h4>
          <p className="text-xs text-slate-600 mt-1">{successMsg}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {errors.form && (
            <div className="rounded-lg bg-red-50 p-3 text-red-700 flex items-center gap-2 border border-red-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errors.form}</span>
            </div>
          )}

          {/* Institution Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">
                Institution Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. National Institute of Tech & Sciences, Delhi"
                  value={formData.institutionName}
                  onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                  className={`w-full rounded-lg border pl-9 pr-3 py-2 text-xs focus:outline-hidden ${
                    errors.institutionName ? 'border-red-400 bg-red-50/30' : 'border-slate-300 focus:border-blue-500'
                  }`}
                />
              </div>
              {errors.institutionName && (
                <p className="mt-1 text-[11px] text-red-600 font-medium">{errors.institutionName}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                AICTE Permanent ID / Code
              </label>
              <input
                type="text"
                placeholder="e.g. 1-48201948"
                value={formData.institutionCode}
                onChange={(e) => setFormData({ ...formData, institutionCode: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-blue-500 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Category & Bureau */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Complaint Category <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-blue-500 focus:outline-hidden bg-white"
              >
                {COMPLAINT_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Assigned Bureau / Cell <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.bureau}
                onChange={(e) => handleBureauChange(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-blue-500 focus:outline-hidden bg-white font-medium"
              >
                {bureaus.map((b) => (
                  <option key={b.id || b.name} value={b.name}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Officer, Priority, Due Date */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Designated Officer
              </label>
              <div className="relative">
                <User className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                <select
                  value={formData.assignedOfficer}
                  onChange={(e) => setFormData({ ...formData, assignedOfficer: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 pl-8 pr-2 py-2 text-xs focus:border-blue-500 focus:outline-hidden bg-white"
                >
                  {officersList.map((off) => (
                    <option key={off} value={off}>
                      {off}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Priority Level <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Shield className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 pl-8 pr-2 py-2 text-xs focus:border-blue-500 focus:outline-hidden bg-white font-semibold"
                >
                  {COMPLAINT_PRIORITIES.map((p) => (
                    <option key={p} value={p}>
                      {p} Priority
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Target SLA Due Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className={`w-full rounded-lg border pl-8 pr-2 py-2 text-xs focus:outline-hidden ${
                    errors.dueDate ? 'border-red-400 bg-red-50/30' : 'border-slate-300 focus:border-blue-500'
                  }`}
                />
              </div>
              {errors.dueDate && (
                <p className="mt-1 text-[11px] text-red-600 font-medium">{errors.dueDate}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Grievance Details & Specific Allegation <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <textarea
                rows={3}
                placeholder="Provide accurate description of violation, affected student/faculty count, regulation breached, etc."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className={`w-full rounded-lg border p-3 text-xs focus:outline-hidden ${
                  errors.description ? 'border-red-400 bg-red-50/30' : 'border-slate-300 focus:border-blue-500'
                }`}
              />
            </div>
            {errors.description && (
              <p className="mt-1 text-[11px] text-red-600 font-medium">{errors.description}</p>
            )}
          </div>

          {/* Initial Internal Note */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Initial Desk Directive / Routing Note (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Verified with state admission committee challan receipt."
              value={formData.initialNote}
              onChange={(e) => setFormData({ ...formData, initialNote: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-blue-500 focus:outline-hidden"
            />
          </div>

          {/* Buttons */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Registering...</span>
                </>
              ) : (
                <span>Register Complaint</span>
              )}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
