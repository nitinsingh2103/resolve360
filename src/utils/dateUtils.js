/**
 * Date and time utilities for AICTE Resolve360
 */

// Anchor date: Current reference timestamp
export const getNow = () => new Date('2026-10-26T22:20:00+05:30');

export const formatDate = (dateString, includeTime = false) => {
  if (!dateString) return 'N/A';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return 'Invalid Date';
    
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      ...(includeTime ? { hour: '2-digit', minute: '2-digit', hour12: true } : {})
    };
    return d.toLocaleDateString('en-IN', options);
  } catch {
    return dateString;
  }
};

export const formatRelativeTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = getNow();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return formatDate(dateString);
};

export const isOverdue = (complaint) => {
  if (!complaint || !complaint.dueDate) return false;
  if (complaint.status === 'Resolved' || complaint.status === 'Closed') return false;
  const due = new Date(complaint.dueDate);
  const now = getNow();
  return due.getTime() < now.getTime();
};

export const isDueSoon = (complaint, hours = 48) => {
  if (!complaint || !complaint.dueDate) return false;
  if (complaint.status === 'Resolved' || complaint.status === 'Closed') return false;
  const due = new Date(complaint.dueDate);
  const now = getNow();
  const diffHours = (due.getTime() - now.getTime()) / (1000 * 60 * 60);
  return diffHours >= 0 && diffHours <= hours;
};

export const getDelayDuration = (dueDateString) => {
  if (!dueDateString) return '';
  const due = new Date(dueDateString);
  const now = getNow();
  const diffTime = now.getTime() - due.getTime();
  if (diffTime <= 0) return 'On schedule';
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays === 0) {
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} overdue`;
  }
  return `${diffDays} day${diffDays > 1 ? 's' : ''} overdue`;
};

export const getDaysRemaining = (dueDateString) => {
  if (!dueDateString) return null;
  const due = new Date(dueDateString);
  const now = getNow();
  const diffTime = due.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
