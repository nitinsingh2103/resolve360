import React from 'react';
import { Modal } from './Modal';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'warning', // 'warning' | 'danger' | 'info' | 'success'
  isProcessing = false
}) => {
  const typeConfig = {
    danger: {
      icon: AlertTriangle,
      iconColor: 'text-red-600',
      iconBg: 'bg-red-50',
      btnClass: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500'
    },
    warning: {
      icon: AlertTriangle,
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-50',
      btnClass: 'bg-amber-600 hover:bg-amber-700 text-white focus:ring-amber-500'
    },
    success: {
      icon: CheckCircle,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-50',
      btnClass: 'bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500'
    },
    info: {
      icon: Info,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50',
      btnClass: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500'
    }
  }[type] || {
    icon: Info,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50',
    btnClass: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500'
  };

  const IconComp = typeConfig.icon;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      maxWidth="max-w-md"
      footer={(
        <>
          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-hidden disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isProcessing}
            className={`px-4 py-2 text-sm font-semibold rounded-lg shadow-xs transition-colors focus:outline-hidden focus:ring-2 focus:ring-offset-2 disabled:opacity-50 flex items-center gap-2 ${typeConfig.btnClass}`}
          >
            {isProcessing && (
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            )}
            {confirmText}
          </button>
        </>
      )}
    >
      <div className="flex items-start gap-4 py-1">
        <div className={`p-3 rounded-full ${typeConfig.iconBg} ${typeConfig.iconColor} shrink-0`}>
          <IconComp className="w-6 h-6" />
        </div>
        <div className="text-sm text-slate-600 pt-0.5 leading-relaxed">
          {message}
        </div>
      </div>
    </Modal>
  );
};
