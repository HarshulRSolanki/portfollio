import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-[#007BA7] shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-[#FF2D75] shrink-0" />,
    info: <Info className="w-5 h-5 text-[#007BA7] shrink-0" />
  };

  const borderColors = {
    success: 'border-[#007BA7]/60',
    error: 'border-[#FF2D75]/60',
    info: 'border-[#252525]'
  };

  return (
    <div className="fixed top-20 right-4 sm:right-6 z-50 max-w-sm w-[calc(100%-2rem)] sm:w-full transition-all animate-bounce-subtle">
      <div className={`flex items-start gap-3 p-4 rounded-xl bg-[#141414]/95 backdrop-blur-md border ${borderColors[toast.type || 'info']} shadow-2xl shadow-black/70 text-[#FFFFFF]`}>
        {icons[toast.type || 'info']}
        <div className="flex-1 text-sm">
          {toast.title && <h4 className="font-semibold text-white mb-0.5">{toast.title}</h4>}
          <p className="text-[#A1A1AA] leading-relaxed">{toast.message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-[#A1A1AA] hover:text-white transition-colors p-1 -mr-1"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
