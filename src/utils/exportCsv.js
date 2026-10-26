import { formatDate, isOverdue } from './dateUtils';

/**
 * Generates and downloads a CSV file containing the provided complaint records.
 */
export const exportComplaintsToCsv = (complaints, filename = 'AICTE_Resolve360_Complaints_Report.csv') => {
  if (!complaints || complaints.length === 0) {
    alert('No complaint records available to export.');
    return;
  }

  const headers = [
    'Complaint ID',
    'Institution Name',
    'Institution Code',
    'Category',
    'Assigned Bureau',
    'Assigned Officer',
    'Priority',
    'Status',
    'Is Overdue',
    'Submission Date',
    'Due Date',
    'Last Updated',
    'Resolution Notes',
    'Escalation Reason'
  ];

  const escapeCsv = (str) => {
    if (str === null || str === undefined) return '""';
    const cleanStr = String(str).replace(/"/g, '""');
    return `"${cleanStr}"`;
  };

  const rows = complaints.map((c) => [
    escapeCsv(c.id),
    escapeCsv(c.institutionName),
    escapeCsv(c.institutionCode || 'N/A'),
    escapeCsv(c.category),
    escapeCsv(c.bureau),
    escapeCsv(c.assignedOfficer || 'Unassigned'),
    escapeCsv(c.priority),
    escapeCsv(c.status),
    escapeCsv(isOverdue(c) ? 'YES (OVERDUE)' : 'NO'),
    escapeCsv(formatDate(c.createdAt, true)),
    escapeCsv(formatDate(c.dueDate, false)),
    escapeCsv(formatDate(c.updatedAt, true)),
    escapeCsv(c.resolutionNotes || ''),
    escapeCsv(c.escalation?.isEscalated ? (c.escalation.reason || 'Escalated') : 'None')
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
