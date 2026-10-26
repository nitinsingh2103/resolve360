import React from 'react';
import { 
  Clock, 
  Search, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle2, 
  Archive 
} from 'lucide-react';

const STATUS_CONFIGS = {
  'Submitted': {
    label: 'Submitted',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    dot: 'bg-blue-500',
    icon: Clock
  },
  'Under Review': {
    label: 'Under Review',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
    dot: 'bg-amber-500',
    icon: Search
  },
  'In Progress': {
    label: 'In Progress',
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    border: 'border-indigo-200',
    dot: 'bg-indigo-500',
    icon: RefreshCw
  },
  'Awaiting Information': {
    label: 'Awaiting Info',
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    border: 'border-rose-200',
    dot: 'bg-rose-500',
    icon: AlertCircle
  },
  'Resolved': {
    label: 'Resolved',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    dot: 'bg-emerald-500',
    icon: CheckCircle2
  },
  'Closed': {
    label: 'Closed',
    bg: 'bg-slate-100',
    text: 'text-slate-700',
    border: 'border-slate-300',
    dot: 'bg-slate-400',
    icon: Archive
  }
};

export const StatusBadge = ({ status, size = 'sm', showIcon = true }) => {
  const config = STATUS_CONFIGS[status] || STATUS_CONFIGS['Submitted'];
  const IconComponent = config.icon;

  const sizeClasses = size === 'xs'
    ? 'px-2 py-0.5 text-xs'
    : size === 'lg'
      ? 'px-3.5 py-1.5 text-sm font-semibold'
      : 'px-2.5 py-1 text-xs font-medium';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${config.bg} ${config.text} ${config.border} ${sizeClasses} shadow-xs whitespace-nowrap`}
      title={`Current Status: ${config.label}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {showIcon && <IconComponent className="w-3 h-3 stroke-[2.2]" />}
      <span>{config.label}</span>
    </span>
  );
};
