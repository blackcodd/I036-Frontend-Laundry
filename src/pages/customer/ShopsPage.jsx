import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { mockShops } from "../../data/mockData";
import ShopCard from "../../components/common/ShopCard";
import { Search, MapPin } from "lucide-react";

export default function ShopsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("distance");

  const filteredShops = mockShops
    .filter(
      (shop) =>
        shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.address.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "distance") return a.distance - b.distance;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="min-h-screen bg-dark-bg pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Find Laundry Shops 🔍</h1>
          <p className="text-dark-muted">Discover nearby laundry services in your area</p>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="card mb-8"
        >
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-muted" size={20} />
                <input
                  type="text"
                  placeholder="Search shops by name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10"
                />
              </div>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full"
              >
                <option value="distance">Sort by Distance</option>
                <option value="rating">Sort by Rating</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Shops Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {filteredShops.length > 0 ? (
            filteredShops.map((shop, i) => (
              <motion.div
                key={shop.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <ShopCard
                  shop={shop}
                  onViewDetails={() => navigate(`/shop/${shop.id}`)}
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-12"
            >
              <p className="text-4xl mb-4">😕</p>
              <p className="text-dark-muted text-lg">No shops found matching your search</p>
            </motion.div>
          )}
        </div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="card text-center bg-gradient-to-r from-primary/5 to-secondary/5"
        >
          <MapPin size={32} className="text-primary mx-auto mb-2" />
          <p className="text-dark-muted mb-2">
            Showing {filteredShops.length} shop{filteredShops.length !== 1 ? "s" : ""} near you
          </p>
          <p className="text-sm text-dark-muted">All prices are in BDT (Bangladeshi Taka)</p>
        </motion.div>
      </div>
    </div>
  );
}
