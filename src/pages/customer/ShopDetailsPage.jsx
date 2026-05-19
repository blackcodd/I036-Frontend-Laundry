import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { mockShops } from "../../data/mockData";
import { useCartStore } from "../../context/store";
import { Plus, Minus, MapPin, Clock, Phone, Star } from "lucide-react";
import Swal from "sweetalert2";

export default function ShopDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const shop = mockShops.find((s) => s.id === parseInt(id));
  const { addToCart } = useCartStore();
  const [quantities, setQuantities] = useState({});

  if (!shop) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">😕</p>
          <p className="text-white text-xl">Shop not found</p>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (itemId, value) => {
    setQuantities((prev) => ({ ...prev, [itemId]: value }));
  };

  const handleAddToCart = (item) => {
    const quantity = quantities[item.id] || 1;
    addToCart({ ...item, quantity }, shop.id);
    Swal.fire({
      title: "Added!",
      text: `${item.name} added to cart`,
      icon: "success",
      timer: 1500,
      confirmButtonColor: "#06B6D4",
    });
    setQuantities((prev) => ({ ...prev, [item.id]: 1 }));
  };

  return (
    <div className="min-h-screen bg-dark-bg pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Shop Hero */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <div className="relative h-64 rounded-xl overflow-hidden mb-6">
            <img
              src={shop.image}
              alt={shop.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute bottom-4 left-4 right-4">
              <h1 className="text-4xl font-bold text-white mb-2">{shop.name}</h1>
              <div className="flex gap-4 flex-wrap">
                <span className="flex items-center gap-1 text-yellow-400">
                  ⭐ {shop.rating} ({shop.reviews} reviews)
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  shop.isOpen
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}>
                  {shop.isOpen ? "Open" : "Closed"}
                </span>
              </div>
            </div>
          </div>

          {/* Shop Info Grid */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="card">
              <div className="flex items-center gap-3 mb-2">
                <MapPin size={20} className="text-primary" />
                <p className="text-dark-muted text-sm">Address</p>
              </div>
              <p className="text-white font-semibold">{shop.address}</p>
            </div>
            <div className="card">
              <div className="flex items-center gap-3 mb-2">
                <Clock size={20} className="text-primary" />
                <p className="text-dark-muted text-sm">Hours</p>
              </div>
              <p className="text-white font-semibold">{shop.hours}</p>
            </div>
            <div className="card">
              <div className="flex items-center gap-3 mb-2">
                <Phone size={20} className="text-primary" />
                <p className="text-dark-muted text-sm">Phone</p>
              </div>
              <p className="text-white font-semibold">{shop.phone}</p>
            </div>
          </div>
        </motion.div>

        {/* Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Our Services</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {shop.services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="card"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-white font-bold text-lg">{service.name}</h3>
                    <p className="text-primary font-bold text-xl">৳ {service.price}</p>
                  </div>
                  <span className="text-3xl">👕</span>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-3 mb-4">
                  <button
                    onClick={() =>
                      handleQuantityChange(
                        service.id,
                        Math.max(1, (quantities[service.id] || 1) - 1)
                      )
                    }
                    className="p-2 bg-dark-lighter rounded hover:bg-dark-lighter/70 transition"
                  >
                    <Minus size={18} className="text-primary" />
                  </button>
                  <span className="w-12 text-center font-bold text-white">
                    {quantities[service.id] || 1}
                  </span>
                  <button
                    onClick={() =>
                      handleQuantityChange(
                        service.id,
                        (quantities[service.id] || 1) + 1
                      )
                    }
                    className="p-2 bg-dark-lighter rounded hover:bg-dark-lighter/70 transition"
                  >
                    <Plus size={18} className="text-primary" />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={() => handleAddToCart(service)}
                  className="w-full btn-primary text-sm"
                >
                  Add to Cart
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="card mb-8"
        >
          <h3 className="text-white font-bold text-lg mb-4">About</h3>
          <p className="text-dark-muted leading-relaxed">{shop.description}</p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex gap-4 justify-center"
        >
          <button
            onClick={() => navigate("/shops")}
            className="btn-secondary"
          >
            Back to Shops
          </button>
        </motion.div>
      </div>
    </div>
  );
}
