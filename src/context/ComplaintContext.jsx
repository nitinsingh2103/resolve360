import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { complaintService } from '../services/complaintService';
import { calculateMetrics, calculateBureauStats } from '../utils/metrics';
import { isOverdue } from '../utils/dateUtils';

const ComplaintContext = createContext(null);

export const ComplaintProvider = ({ children }) => {
  const [complaints, setComplaints] = useState([]);
  const [bureaus, setBureaus] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  // Global search & filter state used across pages if needed
  const [filters, setFilters] = useState({
    search: '',
    bureau: 'ALL',
    category: 'ALL',
    status: 'ALL',
    priority: 'ALL',
    onlyOverdue: false
  });

  const loadData = useCallback(() => {
    setLoading(true);
    const loadedComplaints = complaintService.getComplaints();
    const loadedBureaus = complaintService.getBureaus();
    const loadedSettings = complaintService.getSettings();

    setComplaints(loadedComplaints);
    setBureaus(loadedBureaus);
    setSettings(loadedSettings);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Derived real-time metrics
  const metrics = useMemo(() => calculateMetrics(complaints), [complaints]);
  const bureauStats = useMemo(() => calculateBureauStats(complaints, bureaus), [complaints, bureaus]);

  // Derived filtered complaints
  const filteredComplaints = useMemo(() => {
    return complaints.filter((item) => {
      // Search text
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesId = item.id?.toLowerCase().includes(query);
        const matchesInst = item.institutionName?.toLowerCase().includes(query);
        const matchesDesc = item.description?.toLowerCase().includes(query);
        const matchesCat = item.category?.toLowerCase().includes(query);
        if (!matchesId && !matchesInst && !matchesDesc && !matchesCat) {
          return false;
        }
      }

      // Bureau filter
      if (filters.bureau !== 'ALL' && item.bureau !== filters.bureau) {
        return false;
      }

      // Category filter
      if (filters.category !== 'ALL' && item.category !== filters.category) {
        return false;
      }

      // Status filter
      if (filters.status !== 'ALL' && item.status !== filters.status) {
        return false;
      }

      // Priority filter
      if (filters.priority !== 'ALL' && item.priority !== filters.priority) {
        return false;
      }

      // Overdue toggle
      if (filters.onlyOverdue && !isOverdue(item)) {
        return false;
      }

      return true;
    });
  }, [complaints, filters]);

  // Action mutations
  const createComplaint = useCallback((formData) => {
    const actor = settings?.userProfile?.name || 'Bureau Admin';
    const newRecord = complaintService.createComplaint(formData, actor);
    setComplaints((prev) => [newRecord, ...prev]);
    return newRecord;
  }, [settings]);

  const updateComplaint = useCallback((id, updates) => {
    const actor = settings?.userProfile?.name || 'Bureau Officer';
    const updated = complaintService.updateComplaint(id, updates, actor);
    if (updated) {
      setComplaints((prev) => prev.map((c) => (c.id === id ? updated : c)));
    }
    return updated;
  }, [settings]);

  const updateStatus = useCallback((id, newStatus, resolutionNotes = '') => {
    const actor = settings?.userProfile?.name || 'Bureau Officer';
    const updates = { status: newStatus };
    if (newStatus === 'Resolved' || newStatus === 'Closed') {
      if (resolutionNotes) updates.resolutionNotes = resolutionNotes;
    }
    const updated = complaintService.updateComplaint(id, updates, actor);
    if (updated) {
      setComplaints((prev) => prev.map((c) => (c.id === id ? updated : c)));
    }
    return updated;
  }, [settings]);

  const addComment = useCallback((id, commentPayload) => {
    const author = settings?.userProfile?.name || 'Desk Officer';
    const role = settings?.userProfile?.role || 'Bureau Officer';
    const updated = complaintService.addComment(id, {
      ...commentPayload,
      author: commentPayload.author || author,
      role: commentPayload.role || role
    });
    if (updated) {
      setComplaints((prev) => prev.map((c) => (c.id === id ? updated : c)));
    }
    return updated;
  }, [settings]);

  const reviewEscalation = useCallback((id, escalationData) => {
    const reviewer = settings?.userProfile?.name || 'Chief Monitoring Officer';
    const updated = complaintService.reviewEscalation(id, {
      ...escalationData,
      reviewer
    });
    if (updated) {
      setComplaints((prev) => prev.map((c) => (c.id === id ? updated : c)));
    }
    return updated;
  }, [settings]);

  const reassignBureau = useCallback((id, newBureau, newOfficer) => {
    const actor = settings?.userProfile?.name || 'Bureau Admin';
    const updated = complaintService.updateComplaint(id, {
      bureau: newBureau,
      assignedOfficer: newOfficer
    }, actor);
    if (updated) {
      setComplaints((prev) => prev.map((c) => (c.id === id ? updated : c)));
    }
    return updated;
  }, [settings]);

  const saveSettings = useCallback((newSettings) => {
    complaintService.saveSettings(newSettings);
    setSettings(newSettings);
  }, []);

  const resetAllData = useCallback(() => {
    complaintService.resetDemoData();
    loadData();
  }, [loadData]);

  const value = {
    complaints,
    bureaus,
    settings,
    loading,
    metrics,
    bureauStats,
    filters,
    setFilters,
    filteredComplaints,
    createComplaint,
    updateComplaint,
    updateStatus,
    addComment,
    reviewEscalation,
    reassignBureau,
    saveSettings,
    resetAllData,
    refreshData: loadData
  };

  return (
    <ComplaintContext.Provider value={value}>
      {children}
    </ComplaintContext.Provider>
  );
};

export const useComplaints = () => {
  const context = useContext(ComplaintContext);
  if (!context) {
    throw new Error('useComplaints must be used within a ComplaintProvider');
  }
  return context;
};
