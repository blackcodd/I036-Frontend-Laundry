import { motion } from "framer-motion";

export default function LoadingSkeleton({ count = 1 }) {
  return (
    <div className="space-y-4">
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-20 bg-dark-card rounded-lg"
          />
        ))}
    </div>
  );
}
