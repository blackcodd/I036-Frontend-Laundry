import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-40"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-dark-card rounded-xl p-6 max-w-lg w-full mx-4 z-50 border border-primary/20"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white font-bold text-lg">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-dark-lighter rounded transition"
          >
            <X size={20} className="text-dark-muted" />
          </button>
        </div>

        {/* Content */}
        {children}
      </motion.div>
    </>
  );
}
