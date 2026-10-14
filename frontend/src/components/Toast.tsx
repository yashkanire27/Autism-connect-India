import React, { useEffect } from 'react';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const iconMap = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
    info: <Info className="w-5 h-5 text-sky-600" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-600" />
  };

  const borderMap = {
    success: 'border-emerald-200 bg-emerald-50/90 text-emerald-950',
    info: 'border-sky-200 bg-sky-50/90 text-sky-950',
    warning: 'border-amber-200 bg-amber-50/90 text-amber-950'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className={`flex items-start gap-3 p-4 rounded-2xl border shadow-lg backdrop-blur-md max-w-sm ${borderMap[toast.type]}`}>
        <div className="shrink-0 mt-0.5">{iconMap[toast.type]}</div>
        <div className="flex-1 text-sm">
          <p className="font-semibold">{toast.title}</p>
          <p className="mt-0.5 text-xs opacity-90">{toast.message}</p>
        </div>
        <button
          onClick={onClose}
          className="shrink-0 p-1 hover:bg-black/5 rounded-full transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4 opacity-70" />
        </button>
      </div>
    </div>
  );
};
