import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    ({ type = 'info', title = '', message = '', duration = 4000 }) => {
      const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const newToast = { id, type, title, message };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
      return id;
    },
    [removeToast]
  );

  const success = useCallback(
    (message, title = 'Success') => addToast({ type: 'success', title, message }),
    [addToast]
  );

  const error = useCallback(
    (message, title = 'Error') => addToast({ type: 'error', title, message, duration: 6000 }),
    [addToast]
  );

  const warning = useCallback(
    (message, title = 'Warning') => addToast({ type: 'warning', title, message }),
    [addToast]
  );

  const info = useCallback(
    (message, title = 'Info') => addToast({ type: 'info', title, message }),
    [addToast]
  );

  return (
    <ToastContext.Provider value={{ addToast, removeToast, success, error, warning, info }}>
      {children}
      
      {/* Toast Notification Container */}
      <div className="fixed top-5 right-5 z-50 flex flex-col space-y-3 max-w-md w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((toast) => {
          const isSuccess = toast.type === 'success';
          const isError = toast.type === 'error';
          const isWarning = toast.type === 'warning';
          
          let borderColor = 'border-blue-500/30';
          let bgColor = 'bg-slate-900/95';
          let textColor = 'text-blue-400';
          let Icon = Info;

          if (isSuccess) {
            borderColor = 'border-emerald-500/40';
            bgColor = 'bg-slate-900/95';
            textColor = 'text-emerald-400';
            Icon = CheckCircle2;
          } else if (isError) {
            borderColor = 'border-rose-500/40';
            bgColor = 'bg-slate-900/95';
            textColor = 'text-rose-400';
            Icon = AlertCircle;
          } else if (isWarning) {
            borderColor = 'border-amber-500/40';
            bgColor = 'bg-slate-900/95';
            textColor = 'text-amber-400';
            Icon = AlertTriangle;
          }

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-start p-4 rounded-xl shadow-2xl backdrop-blur-md border ${borderColor} ${bgColor} text-slate-100 transition-all duration-300 transform translate-y-0 opacity-100 animate-in slide-in-from-top-2`}
              role="alert"
            >
              <div className={`p-1 rounded-lg shrink-0 mr-3 ${textColor}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0 pr-2">
                {toast.title && (
                  <h4 className="text-sm font-semibold tracking-wide text-white">
                    {toast.title}
                  </h4>
                )}
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed break-words">
                  {toast.message}
                </p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="shrink-0 p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
