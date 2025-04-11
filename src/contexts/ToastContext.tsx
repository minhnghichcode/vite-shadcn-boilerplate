import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
  duration?: number;
  visible: boolean; // For animation
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (message: string, type: ToastType, duration?: number) => void;
  removeToast: (id: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [counter, setCounter] = useState(0);

  // Clean up toasts that are no longer visible
  useEffect(() => {
    const invisibleToasts = toasts.filter(toast => !toast.visible);
    if (invisibleToasts.length > 0) {
      // Remove invisible toasts after animation completes
      const timeout = setTimeout(() => {
        setToasts(current => current.filter(t => t.visible));
      }, 300); // Match transition duration
      
      return () => clearTimeout(timeout);
    }
  }, [toasts]);

  const addToast = useCallback((message: string, type: ToastType, duration = 5000) => {
    const id = counter;
    setCounter(prev => prev + 1);
    
    // Add toast with visible flag set to true
    setToasts(prevToasts => [...prevToasts, { id, message, type, duration, visible: true }]);
    
    if (duration !== Infinity) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [counter]);

  const removeToast = useCallback((id: number) => {
    // First set visible to false (triggers animation)
    setToasts(prevToasts => 
      prevToasts.map(toast => 
        toast.id === id ? { ...toast, visible: false } : toast
      )
    );
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

interface ToastContainerProps {
  toasts: Toast[];
  removeToast: (id: number) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, removeToast }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-xs md:max-w-sm" aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            flex items-center w-full
            rounded-md shadow-lg 
            transform transition-all duration-300 ease-in-out
            ${toast.visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
            ${getToastClasses(toast.type)}
          `}
          role="alert"
        >
          <div className="flex-shrink-0 p-3 flex items-center justify-center">
            {getToastIcon(toast.type)}
          </div>
          <div className="py-3 pr-3">
            <p className="text-sm font-medium">{toast.message}</p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-auto mr-2 flex-shrink-0 p-1 bg-transparent hover:bg-background/20 rounded-full"
            aria-label="Close notification"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

function getToastIcon(type: ToastType): JSX.Element {
  switch (type) {
    case 'success':
      return <CheckCircle className="h-5 w-5" />;
    case 'error':
      return <AlertCircle className="h-5 w-5" />;
    case 'warning':
      return <AlertTriangle className="h-5 w-5" />;
    case 'info':
      return <Info className="h-5 w-5" />;
  }
}

function getToastClasses(type: ToastType): string {
  switch (type) {
    case 'success':
      return 'bg-green-600 text-white';
    case 'error':
      return 'bg-red-600 text-white';
    case 'warning':
      return 'bg-amber-500 text-white';
    case 'info':
      return 'bg-blue-600 text-white';
    default:
      return 'bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-800';
  }
}
