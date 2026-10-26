import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend, // { value: '+12%', isPositive: true, neutral: false }
  colorScheme = 'blue', // 'blue' | 'amber' | 'emerald' | 'red' | 'indigo' | 'purple'
  onClick = null
}) => {
  const schemeClasses = {
    blue: {
      bgIcon: 'bg-blue-50 text-blue-600 border-blue-100',
      borderHover: 'hover:border-blue-300',
      valueColor: 'text-slate-900',
      glow: 'group-hover:shadow-blue-500/10'
    },
    amber: {
      bgIcon: 'bg-amber-50 text-amber-600 border-amber-100',
      borderHover: 'hover:border-amber-300',
      valueColor: 'text-amber-900',
      glow: 'group-hover:shadow-amber-500/10'
    },
    indigo: {
      bgIcon: 'bg-indigo-50 text-indigo-600 border-indigo-100',
      borderHover: 'hover:border-indigo-300',
      valueColor: 'text-indigo-950',
      glow: 'group-hover:shadow-indigo-500/10'
    },
    emerald: {
      bgIcon: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      borderHover: 'hover:border-emerald-300',
      valueColor: 'text-emerald-950',
      glow: 'group-hover:shadow-emerald-500/10'
    },
    red: {
      bgIcon: 'bg-red-50 text-red-600 border-red-100',
      borderHover: 'hover:border-red-300',
      valueColor: 'text-red-950',
      glow: 'group-hover:shadow-red-500/10'
    },
    purple: {
      bgIcon: 'bg-purple-50 text-purple-600 border-purple-100',
      borderHover: 'hover:border-purple-300',
      valueColor: 'text-purple-950',
      glow: 'group-hover:shadow-purple-500/10'
    }
  }[colorScheme] || {
    bgIcon: 'bg-blue-50 text-blue-600 border-blue-100',
    borderHover: 'hover:border-blue-300',
    valueColor: 'text-slate-900',
    glow: 'group-hover:shadow-blue-500/10'
  };

  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl bg-white p-5 shadow-xs border border-slate-200/90 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${schemeClasses.borderHover} ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {title}
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className={`text-3xl font-extrabold tracking-tight ${schemeClasses.valueColor}`}>
              {value}
            </span>
            {trend && (
              <span
                className={`inline-flex items-center text-xs font-semibold ${
                  trend.neutral
                    ? 'text-slate-500'
                    : trend.isPositive
                      ? 'text-emerald-600'
                      : 'text-red-600'
                }`}
              >
                {trend.neutral ? (
                  <Minus className="w-3 h-3 mr-0.5" />
                ) : trend.isPositive ? (
                  <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
                )}
                {trend.value}
              </span>
            )}
          </div>
        </div>

        <div className={`rounded-xl p-3 border ${schemeClasses.bgIcon} transition-transform group-hover:scale-105 shrink-0`}>
          <Icon className="h-6 w-6 stroke-[2]" />
        </div>
      </div>

      {subtitle && (
        <div className="mt-3 flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
          <span>{subtitle}</span>
          {onClick && (
            <span className="text-blue-600 font-semibold group-hover:underline">
              View &rarr;
            </span>
          )}
        </div>
      )}
    </div>
  );
};
