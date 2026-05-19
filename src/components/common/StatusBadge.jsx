import { motion } from "framer-motion";
import { getStatusColor } from "../../utils/helpers";

export default function StatusBadge({ status }) {
  const colors = getStatusColor(status);
  const labels = {
    pending: "Pending",
    progress: "In Progress",
    delivering: "Out for Delivery",
    completed: "Completed",
    rejected: "Rejected",
  };

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`px-3 py-1 rounded-full text-xs font-semibold border ${colors}`}
    >
      {labels[status] || status}
    </motion.span>
  );
}
