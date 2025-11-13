import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

let toastId = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info", duration = 3000) => {
    const id = toastId++;
    const toast = { id, message, type, duration };

    setToasts((prev) => [...prev, toast]);

    // Auto-remove toast after duration
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const success = useCallback(
    (message, duration) => {
      return addToast(message, "success", duration);
    },
    [addToast]
  );

  const error = useCallback(
    (message, duration) => {
      return addToast(message, "error", duration);
    },
    [addToast]
  );

  const warning = useCallback(
    (message, duration) => {
      return addToast(message, "warning", duration);
    },
    [addToast]
  );

  const info = useCallback(
    (message, duration) => {
      return addToast(message, "info", duration);
    },
    [addToast]
  );

  const value = {
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-4 right-4 z-[1070] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

const Toast = ({ toast, onClose }) => {
  const { message, type } = toast;

  const typeConfig = {
    success: {
      icon: CheckCircle,
      bgColor: "bg-success",
      textColor: "text-white",
      iconColor: "text-white",
    },
    error: {
      icon: AlertCircle,
      bgColor: "bg-error",
      textColor: "text-white",
      iconColor: "text-white",
    },
    warning: {
      icon: AlertTriangle,
      bgColor: "bg-warning",
      textColor: "text-white",
      iconColor: "text-white",
    },
    info: {
      icon: Info,
      bgColor: "bg-info",
      textColor: "text-white",
      iconColor: "text-white",
    },
  };

  const config = typeConfig[type] || typeConfig.info;
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`
        ${config.bgColor} ${config.textColor}
        px-4 py-3 rounded-lg shadow-xl
        flex items-center gap-3
        pointer-events-auto
      `}
    >
      <Icon className={`w-5 h-5 flex-shrink-0 ${config.iconColor}`} />
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="flex-shrink-0 p-1 hover:bg-white/20 rounded transition-colors"
        aria-label="Close toast"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export default ToastContext;
