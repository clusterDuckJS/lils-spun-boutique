import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, Heart, ShoppingBag, X } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ title, message, type = 'info', icon }) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    const newToast = { id, title, message, type, icon };
    
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {/* Toast container */}
      <div 
        aria-live="polite" 
        className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 p-4 bg-brand-navy text-brand-ivory rounded-lg shadow-dropdown border border-brand-champagne/30 animate-in slide-in-from-bottom-2 duration-300"
          >
            <div className="shrink-0 mt-0.5 text-brand-champagne">
              {toast.type === 'cart' && <ShoppingBag className="w-5 h-5" />}
              {toast.type === 'wishlist' && <Heart className="w-5 h-5 fill-brand-rose text-brand-rose" />}
              {toast.type !== 'cart' && toast.type !== 'wishlist' && <CheckCircle2 className="w-5 h-5" />}
            </div>
            <div className="flex-1">
              <h4 className="font-serif text-sm font-medium tracking-wide text-brand-ivory">{toast.title}</h4>
              {toast.message && <p className="text-xs text-brand-ivory/80 mt-0.5">{toast.message}</p>}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-brand-ivory/60 hover:text-brand-ivory p-0.5 transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
