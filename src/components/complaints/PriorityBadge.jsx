import React from 'react';
import { AlertTriangle, Flame, ShieldAlert, ArrowDown } from 'lucide-react';

const PRIORITY_CONFIGS = {
  'Critical': {
    label: 'Critical',
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-200',
    dot: 'bg-red-600 animate-pulse',
    icon: Flame
  },
  'High': {
    label: 'High',
    bg: 'bg-amber-50',
    text: 'text-amber-800',
    border: 'border-amber-200',
    dot: 'bg-amber-500',
    icon: ShieldAlert
  },
  'Medium': {
    label: 'Medium',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    dot: 'bg-blue-500',
    icon: AlertTriangle
  },
  'Low': {
    label: 'Low',
    bg: 'bg-slate-50',
    text: 'text-slate-600',
    border: 'border-slate-200',
    dot: 'bg-slate-400',
    icon: ArrowDown
  }
};

export const PriorityBadge = ({ priority, size = 'sm', showIcon = true }) => {
  const config = PRIORITY_CONFIGS[priority] || PRIORITY_CONFIGS['Medium'];
  const IconComponent = config.icon;

  const sizeClasses = size === 'xs'
    ? 'px-2 py-0.5 text-xs'
    : size === 'lg'
      ? 'px-3.5 py-1.5 text-sm font-semibold'
      : 'px-2.5 py-1 text-xs font-semibold';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${config.bg} ${config.text} ${config.border} ${sizeClasses} shadow-xs whitespace-nowrap`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {showIcon && <IconComponent className="w-3 h-3 stroke-[2.2]" />}
      <span>{config.label}</span>
    </span>
  );
};
