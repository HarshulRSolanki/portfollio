import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-[var(--accent-primary)] shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-[var(--accent-secondary)] shrink-0" />,
    info: <Info className="w-5 h-5 text-[var(--accent-primary)] shrink-0" />
  };

  const borderColors = {
    success: 'border-[var(--accent-primary)]',
    error: 'border-[var(--accent-secondary)]',
    info: 'border-[var(--border-color)]'
  };

  return (
    <div className="fixed top-20 right-4 sm:right-6 z-50 max-w-sm w-[calc(100%-2rem)] sm:w-full transition-all animate-bounce-subtle">
      <div
        className={`flex items-start gap-3 p-4 rounded-xl bg-[var(--bg-card)]/95 backdrop-blur-md border ${borderColors[toast.type || 'info']} shadow-2xl text-[var(--text-primary)]`}
      >
        {icons[toast.type || 'info']}
        <div className="flex-1 text-sm">
          {toast.title && <h4 className="font-semibold text-[var(--text-primary)] mb-0.5">{toast.title}</h4>}
          <p className="text-[var(--text-secondary)] leading-relaxed">{toast.message}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors p-1 -mr-1"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
