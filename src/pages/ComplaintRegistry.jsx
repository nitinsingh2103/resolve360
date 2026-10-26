import React, { useState, useMemo } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useComplaints } from '../context/ComplaintContext';
import { StatusBadge } from '../components/complaints/StatusBadge';
import { PriorityBadge } from '../components/complaints/PriorityBadge';
import { Pagination } from '../components/common/Pagination';
import { ComplaintEditModal } from '../components/complaints/ComplaintEditModal';
import { formatDate, isOverdue, getDaysRemaining } from '../utils/dateUtils';
import { exportComplaintsToCsv } from '../utils/exportCsv';
import { COMPLAINT_CATEGORIES, COMPLAINT_PRIORITIES, COMPLAINT_STATUSES } from '../data/mockBureaus';
import {
  Search,
  Filter,
  Plus,
  Download,
  Eye,
  Edit,
  ArrowUpDown,
  AlertCircle,
  Building,
  CheckCircle,
  X,
  RotateCcw
} from 'lucide-react';

export const ComplaintRegistry = () => {
  const navigate = useNavigate();
  const { complaints, bureaus, filters, setFilters, filteredComplaints } = useComplaints();
  const { onOpenNewComplaint } = useOutletContext() || {};

  // Table pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Sorting state
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc'); // 'asc' | 'desc'

  // Edit modal state
  const [editingComplaint, setEditingComplaint] = useState(null);

  // Sorting comparator
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedComplaints = useMemo(() => {
    const list = [...filteredComplaints];
    return list.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (sortField === 'createdAt' || sortField === 'dueDate' || sortField === 'updatedAt') {
        aVal = new Date(aVal || 0).getTime();
        bVal = new Date(bVal || 0).getTime();
      } else if (sortField === 'priority') {
        const priorityWeight = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
        aVal = priorityWeight[aVal] || 0;
        bVal = priorityWeight[bVal] || 0;
      } else if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = (bVal || '').toLowerCase();
      }

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredComplaints, sortField, sortDirection]);

  // Paginated items
  const paginatedComplaints = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedComplaints.slice(start, start + pageSize);
  }, [sortedComplaints, currentPage, pageSize]);

  // Reset filters helper
  const handleResetFilters = () => {
    setFilters({
      search: '',
      bureau: 'ALL',
      category: 'ALL',
      status: 'ALL',
      priority: 'ALL',
      onlyOverdue: false
    });
    setCurrentPage(1);
  };

  const hasActiveFilters = 
    filters.search || 
    filters.bureau !== 'ALL' || 
    filters.category !== 'ALL' || 
    filters.status !== 'ALL' || 
    filters.priority !== 'ALL' || 
    filters.onlyOverdue;

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      {/* Top Controls: Title, Search, Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Institutional Complaint Registry
          </h2>
          <p className="text-xs text-slate-500">
            Total of {complaints.length} registered institutional grievances across all bureaus
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => exportComplaintsToCsv(sortedComplaints, 'AICTE_Complaint_Registry_Filtered.csv')}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export CSV ({sortedComplaints.length})</span>
          </button>

          <button
            type="button"
            onClick={onOpenNewComplaint}
            className="flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2 text-xs font-bold text-white shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>New Complaint</span>
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-4.5 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          {/* Search Input */}
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by ID, Institution, or keyword..."
              value={filters.search}
              onChange={(e) => {
                setFilters((prev) => ({ ...prev, search: e.target.value }));
                setCurrentPage(1);
              }}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2 pl-9 pr-8 text-xs font-medium text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-hidden"
            />
            {filters.search && (
              <button
                type="button"
                onClick={() => setFilters((prev) => ({ ...prev, search: '' }))}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Bureau Filter */}
          <div>
            <select
              value={filters.bureau}
              onChange={(e) => {
                setFilters((prev) => ({ ...prev, bureau: e.target.value }));
                setCurrentPage(1);
              }}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2 px-3 text-xs font-medium text-slate-700 focus:border-blue-500 focus:bg-white focus:outline-hidden"
            >
              <option value="ALL">All Bureaus / Cells</option>
              {bureaus.map((b) => (
                <option key={b.name} value={b.name}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={filters.category}
              onChange={(e) => {
                setFilters((prev) => ({ ...prev, category: e.target.value }));
                setCurrentPage(1);
              }}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2 px-3 text-xs font-medium text-slate-700 focus:border-blue-500 focus:bg-white focus:outline-hidden"
            >
              <option value="ALL">All Categories</option>
              {COMPLAINT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={filters.status}
              onChange={(e) => {
                setFilters((prev) => ({ ...prev, status: e.target.value }));
                setCurrentPage(1);
              }}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2 px-3 text-xs font-medium text-slate-700 focus:border-blue-500 focus:bg-white focus:outline-hidden"
            >
              <option value="ALL">All Statuses</option>
              {COMPLAINT_STATUSES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Priority Filter */}
          <div>
            <select
              value={filters.priority}
              onChange={(e) => {
                setFilters((prev) => ({ ...prev, priority: e.target.value }));
                setCurrentPage(1);
              }}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2 px-3 text-xs font-medium text-slate-700 focus:border-blue-500 focus:bg-white focus:outline-hidden"
            >
              <option value="ALL">All Priorities</option>
              {COMPLAINT_PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p} Priority
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Second filter row: Overdue quick filter + reset */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={filters.onlyOverdue}
                onChange={(e) => {
                  setFilters((prev) => ({ ...prev, onlyOverdue: e.target.checked }));
                  setCurrentPage(1);
                }}
                className="h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-500"
              />
              <span className={`font-semibold ${filters.onlyOverdue ? 'text-red-600' : 'text-slate-600'}`}>
                Show Overdue Cases Only
              </span>
            </label>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-500">
              Found <strong className="text-slate-800">{filteredComplaints.length}</strong> matching records
            </span>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-800"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th
                  onClick={() => handleSort('id')}
                  className="py-3.5 px-4 cursor-pointer hover:bg-slate-100/70 select-none whitespace-nowrap"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Complaint ID</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('institutionName')}
                  className="py-3.5 px-4 cursor-pointer hover:bg-slate-100/70 select-none min-w-[200px]"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Institution</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3.5 px-3 whitespace-nowrap">Category</th>
                <th className="py-3.5 px-3 whitespace-nowrap">Bureau</th>
                <th className="py-3.5 px-3 whitespace-nowrap">Officer</th>
                <th
                  onClick={() => handleSort('priority')}
                  className="py-3.5 px-3 cursor-pointer hover:bg-slate-100/70 select-none whitespace-nowrap"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Priority</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('createdAt')}
                  className="py-3.5 px-3 cursor-pointer hover:bg-slate-100/70 select-none whitespace-nowrap"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Submitted</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('dueDate')}
                  className="py-3.5 px-3 cursor-pointer hover:bg-slate-100/70 select-none whitespace-nowrap"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Due Date</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('status')}
                  className="py-3.5 px-3 cursor-pointer hover:bg-slate-100/70 select-none whitespace-nowrap"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Status</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3.5 px-4 text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedComplaints.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Search className="w-8 h-8 text-slate-300" />
                      <p className="text-sm font-semibold text-slate-600">No matching complaints found</p>
                      <p className="text-xs text-slate-400">Try adjusting your search criteria or resetting filters.</p>
                      {hasActiveFilters && (
                        <button
                          type="button"
                          onClick={handleResetFilters}
                          className="mt-2 text-xs font-semibold text-blue-600 hover:underline"
                        >
                          Clear all filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedComplaints.map((c) => {
                  const overdue = isOverdue(c);
                  const daysLeft = getDaysRemaining(c.dueDate);

                  return (
                    <tr
                      key={c.id}
                      onClick={() => navigate(`/complaints/${c.id}`)}
                      className={`hover:bg-blue-50/40 cursor-pointer transition-colors ${
                        overdue ? 'bg-red-50/20' : ''
                      }`}
                    >
                      <td className="py-3 px-4 font-mono font-bold text-blue-600 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span>{c.id}</span>
                          {overdue && (
                            <span title="Overdue Case" className="text-red-600">
                              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-800 leading-tight">
                          {c.institutionName}
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">
                          ID: {c.institutionCode || 'N/A'}
                        </span>
                      </td>

                      <td className="py-3 px-3 text-slate-600 max-w-[150px] truncate" title={c.category}>
                        {c.category}
                      </td>

                      <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                        <span className="rounded-md bg-slate-100 px-2 py-0.5 font-medium text-slate-700 text-[11px]">
                          {c.bureau}
                        </span>
                      </td>

                      <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                        {c.assignedOfficer || 'Unassigned'}
                      </td>

                      <td className="py-3 px-3 whitespace-nowrap">
                        <PriorityBadge priority={c.priority} size="xs" />
                      </td>

                      <td className="py-3 px-3 text-slate-500 whitespace-nowrap font-medium">
                        {formatDate(c.createdAt)}
                      </td>

                      <td className="py-3 px-3 whitespace-nowrap">
                        <div className="text-slate-700 font-medium">
                          {formatDate(c.dueDate)}
                        </div>
                        {overdue ? (
                          <span className="text-[10px] font-bold text-red-600">
                            OVERDUE
                          </span>
                        ) : (c.status === 'Resolved' || c.status === 'Closed') ? (
                          <span className="text-[10px] font-bold text-emerald-600">
                            Completed
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400">
                            {daysLeft}d left
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-3 whitespace-nowrap">
                        <StatusBadge status={c.status} size="xs" />
                      </td>

                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={() => navigate(`/complaints/${c.id}`)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            title="View Full Case Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setEditingComplaint(c)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                            title="Edit Case Attributes"
                          >
                            <Edit className="w-4 h-4" />
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

        {/* Pagination Controls */}
        <Pagination
          currentPage={currentPage}
          totalItems={sortedComplaints.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setCurrentPage(1);
          }}
          pageSizeOptions={[10, 20, 50]}
        />
      </div>

      {/* Edit Complaint Modal */}
      {editingComplaint && (
        <ComplaintEditModal
          isOpen={Boolean(editingComplaint)}
          onClose={() => setEditingComplaint(null)}
          complaint={editingComplaint}
        />
      )}
    </div>
  );
};
