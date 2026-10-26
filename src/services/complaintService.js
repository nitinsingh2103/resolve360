import { INITIAL_COMPLAINTS } from '../data/mockComplaints';
import { MOCK_BUREAUS, DEMO_OFFICERS_BY_BUREAU } from '../data/mockBureaus';
import { DEFAULT_SETTINGS } from '../data/defaultSettings';
import { getNow } from '../utils/dateUtils';

const STORAGE_KEY_COMPLAINTS = 'aicte_resolve360_complaints';
const STORAGE_KEY_SETTINGS = 'aicte_resolve360_settings';
const STORAGE_KEY_BUREAUS = 'aicte_resolve360_bureaus';

/**
 * Service Layer for AICTE Resolve360.
 * Decouples state operations from UI components and provides seamless localStorage persistence.
 */
class ComplaintService {
  constructor() {
    this.initStorage();
  }

  initStorage() {
    try {
      if (!localStorage.getItem(STORAGE_KEY_COMPLAINTS)) {
        localStorage.setItem(STORAGE_KEY_COMPLAINTS, JSON.stringify(INITIAL_COMPLAINTS));
      }
      if (!localStorage.getItem(STORAGE_KEY_SETTINGS)) {
        localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
      }
      if (!localStorage.getItem(STORAGE_KEY_BUREAUS)) {
        localStorage.setItem(STORAGE_KEY_BUREAUS, JSON.stringify(MOCK_BUREAUS));
      }
    } catch (err) {
      console.warn('LocalStorage access error or disabled:', err);
    }
  }

  getComplaints() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_COMPLAINTS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (err) {
      console.error('Error fetching complaints from localStorage:', err);
    }
    return INITIAL_COMPLAINTS;
  }

  saveComplaints(complaints) {
    try {
      localStorage.setItem(STORAGE_KEY_COMPLAINTS, JSON.stringify(complaints));
    } catch (err) {
      console.error('Error saving complaints to localStorage:', err);
    }
  }

  getComplaintById(id) {
    const list = this.getComplaints();
    return list.find((c) => c.id === id) || null;
  }

  createComplaint(formData, actor = 'Bureau Admin') {
    const complaints = this.getComplaints();
    const nowIso = getNow().toISOString();

    // Generate unique sequential ID
    const currentYear = new Date().getFullYear();
    const seq = String(complaints.length + 1).padStart(3, '0');
    const newId = `AICTE-${currentYear}-${seq}`;

    // Calculate default due date if not provided (default 10 days)
    const dueDate = formData.dueDate || new Date(Date.now() + 10 * 86400000).toISOString();

    // Default assigned officer from bureau if not specified
    const officers = DEMO_OFFICERS_BY_BUREAU[formData.bureau] || ['Desk Officer'];
    const assignedOfficer = formData.assignedOfficer || officers[0];

    const newComplaint = {
      id: newId,
      institutionName: formData.institutionName.trim(),
      institutionCode: formData.institutionCode?.trim() || `1-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      category: formData.category,
      description: formData.description.trim(),
      bureau: formData.bureau,
      assignedOfficer,
      priority: formData.priority || 'Medium',
      status: formData.status || 'Submitted',
      createdAt: nowIso,
      dueDate,
      updatedAt: nowIso,
      resolutionNotes: '',
      escalation: {
        isEscalated: formData.priority === 'Critical',
        reason: formData.priority === 'Critical' ? 'Automatic flag for Critical priority intake.' : '',
        reviewedBy: null,
        reviewedAt: null,
        actionTaken: null
      },
      comments: formData.initialNote ? [{
        id: `c-${Date.now()}`,
        author: actor,
        role: 'Administrator',
        timestamp: nowIso,
        text: formData.initialNote,
        internalOnly: false
      }] : [],
      history: [
        {
          id: `h-${Date.now()}`,
          timestamp: nowIso,
          action: 'Complaint Registered',
          actor,
          details: `Registered and routed to ${formData.bureau} bureau.`
        }
      ]
    };

    const updated = [newComplaint, ...complaints];
    this.saveComplaints(updated);
    return newComplaint;
  }

  updateComplaint(id, updates, actor = 'Bureau Officer') {
    const complaints = this.getComplaints();
    const nowIso = getNow().toISOString();
    let updatedComplaint = null;

    const nextList = complaints.map((c) => {
      if (c.id === id) {
        const historyEntries = [...(c.history || [])];

        // Track changes in history
        if (updates.status && updates.status !== c.status) {
          historyEntries.push({
            id: `h-${Date.now()}-status`,
            timestamp: nowIso,
            action: 'Status Transition',
            actor,
            details: `Status updated from "${c.status}" to "${updates.status}".`
          });
        }

        if (updates.bureau && updates.bureau !== c.bureau) {
          historyEntries.push({
            id: `h-${Date.now()}-bureau`,
            timestamp: nowIso,
            action: 'Bureau Reassignment',
            actor,
            details: `Reassigned from "${c.bureau}" to "${updates.bureau}". Assigned to: ${updates.assignedOfficer || c.assignedOfficer}`
          });
        }

        if (updates.priority && updates.priority !== c.priority) {
          historyEntries.push({
            id: `h-${Date.now()}-priority`,
            timestamp: nowIso,
            action: 'Priority Changed',
            actor,
            details: `Priority modified from "${c.priority}" to "${updates.priority}".`
          });
        }

        updatedComplaint = {
          ...c,
          ...updates,
          updatedAt: nowIso,
          history: historyEntries
        };
        return updatedComplaint;
      }
      return c;
    });

    this.saveComplaints(nextList);
    return updatedComplaint;
  }

  addComment(id, { text, author = 'Desk Officer', role = 'Bureau Officer', internalOnly = false }) {
    const complaints = this.getComplaints();
    const nowIso = getNow().toISOString();
    let updatedComplaint = null;

    const nextList = complaints.map((c) => {
      if (c.id === id) {
        const newComment = {
          id: `c-${Date.now()}`,
          author,
          role,
          timestamp: nowIso,
          text: text.trim(),
          internalOnly
        };

        const newHistory = [
          ...(c.history || []),
          {
            id: `h-${Date.now()}`,
            timestamp: nowIso,
            action: internalOnly ? 'Internal Note Added' : 'Comment Added',
            actor: author,
            details: internalOnly ? 'Added confidential internal observation.' : 'Added communication update.'
          }
        ];

        updatedComplaint = {
          ...c,
          updatedAt: nowIso,
          comments: [...(c.comments || []), newComment],
          history: newHistory
        };
        return updatedComplaint;
      }
      return c;
    });

    this.saveComplaints(nextList);
    return updatedComplaint;
  }

  reviewEscalation(id, { actionTaken, notes, reviewer = 'Chief Monitoring Officer' }) {
    const complaints = this.getComplaints();
    const nowIso = getNow().toISOString();
    let updatedComplaint = null;

    const nextList = complaints.map((c) => {
      if (c.id === id) {
        const newHistory = [
          ...(c.history || []),
          {
            id: `h-${Date.now()}`,
            timestamp: nowIso,
            action: 'Escalation Reviewed',
            actor: reviewer,
            details: `Action Taken: ${actionTaken}. ${notes ? `Notes: ${notes}` : ''}`
          }
        ];

        const existingEscalation = c.escalation || { isEscalated: true };

        updatedComplaint = {
          ...c,
          updatedAt: nowIso,
          escalation: {
            ...existingEscalation,
            isEscalated: true,
            reviewedBy: reviewer,
            reviewedAt: nowIso,
            actionTaken: actionTaken || 'Reviewed and directives issued'
          },
          comments: notes ? [
            ...(c.comments || []),
            {
              id: `c-${Date.now()}`,
              author: reviewer,
              role: 'Executive Reviewer',
              timestamp: nowIso,
              text: `[Escalation Directive]: ${actionTaken}. Notes: ${notes}`,
              internalOnly: true
            }
          ] : (c.comments || []),
          history: newHistory
        };
        return updatedComplaint;
      }
      return c;
    });

    this.saveComplaints(nextList);
    return updatedComplaint;
  }

  getBureaus() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_BUREAUS);
      if (data) return JSON.parse(data);
    } catch (err) {
      console.warn('Error reading bureaus:', err);
    }
    return MOCK_BUREAUS;
  }

  getSettings() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (data) return JSON.parse(data);
    } catch (err) {
      console.warn('Error reading settings:', err);
    }
    return DEFAULT_SETTINGS;
  }

  saveSettings(newSettings) {
    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(newSettings));
    } catch (err) {
      console.error('Error saving settings:', err);
    }
  }

  resetDemoData() {
    try {
      localStorage.setItem(STORAGE_KEY_COMPLAINTS, JSON.stringify(INITIAL_COMPLAINTS));
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
      localStorage.setItem(STORAGE_KEY_BUREAUS, JSON.stringify(MOCK_BUREAUS));
      return true;
    } catch (err) {
      console.error('Error resetting demo data:', err);
      return false;
    }
  }
}

export const complaintService = new ComplaintService();
