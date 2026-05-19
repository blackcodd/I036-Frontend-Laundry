import { motion } from "framer-motion";
import { Trash2, Plus, Minus } from "lucide-react";
import { useCartStore } from "../../context/store";
import { formatPrice } from "../../utils/helpers";

export default function CartItem({ item }) {
  const { updateItem, removeItem } = useCartStore();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex items-center gap-4 p-4 bg-dark-card rounded-lg border border-dark-lighter/20"
    >
      {/* Item Info */}
      <div className="flex-1">
        <h4 className="text-white font-semibold">{item.name}</h4>
        <p className="text-primary font-bold">{formatPrice(item.price)}</p>
      </div>

      {/* Quantity Control */}
      <div className="flex items-center gap-2 bg-dark-lighter/50 rounded-lg p-1">
        <button
          onClick={() => updateItem(item.id, Math.max(1, item.quantity - 1))}
          className="p-1 hover:bg-primary/20 rounded transition"
        >
          <Minus size={16} className="text-primary" />
        </button>
        <span className="w-8 text-center text-white">{item.quantity}</span>
        <button
          onClick={() => updateItem(item.id, item.quantity + 1)}
          className="p-1 hover:bg-primary/20 rounded transition"
        >
          <Plus size={16} className="text-primary" />
        </button>
      </div>

      {/* Total */}
      <div className="text-right">
        <p className="text-white font-bold">{formatPrice(item.price * item.quantity)}</p>
      </div>

      {/* Remove */}
      <button
        onClick={() => removeItem(item.id)}
        className="p-2 hover:bg-red-500/20 rounded transition"
      >
        <Trash2 size={18} className="text-red-400" />
      </button>
    </motion.div>
  );
}
