import { motion } from "framer-motion";
import { Loader } from "lucide-react";

export default function ShopCard({ shop, onViewDetails }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="card cursor-pointer group"
      onClick={onViewDetails}
    >
      {/* Shop Image */}
      <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
        <img
          src={shop.image}
          alt={shop.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
        />
        <div className="absolute top-3 right-3 bg-primary/90 px-3 py-1 rounded-full text-sm font-semibold">
          ⭐ {shop.rating}
        </div>
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            shop.isOpen
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }`}>
            {shop.isOpen ? "Open" : "Closed"}
          </span>
        </div>
      </div>

      {/* Shop Info */}
      <h3 className="text-white font-bold text-lg mb-2">{shop.name}</h3>
      <p className="text-dark-muted text-sm mb-3">{shop.address}</p>

      {/* Details */}
      <div className="space-y-2 text-sm text-dark-muted mb-4">
        <p>📍 {shop.distance} km away</p>
        <p>⭐ {shop.reviews} reviews</p>
        <p>🕐 {shop.hours}</p>
      </div>

      {/* CTA Button */}
      <button className="w-full btn-primary text-sm">
        View Details
      </button>
    </motion.div>
  );
}
