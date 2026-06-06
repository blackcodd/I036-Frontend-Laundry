/*
 * Copyright (c) 2026 Srabon Das
 * All Rights Reserved.
 */


import   { motion } from "framer-motion";
import { useCartStore } from "../../context/store";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils/helpers";
import CartItem from "../../components/customer/CartItem";
import { ShoppingCart, ArrowRight, ArrowLeft } from "lucide-react";

export default function CartPage() {
  const navigate = useNavigate();
  const { items, shopId, clearCart } = useCartStore();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCharge = 50;
  const total = subtotal + deliveryCharge;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-dark-bg pt-24 pb-12 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <ShoppingCart size={64} className="text-primary mx-auto mb-4 opacity-50" />
          <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
          <p className="text-dark-muted mb-8">Add some items to get started</p>
          <button
            onClick={() => navigate("/shops")}
            className="btn-primary inline-flex items-center gap-2"
          >
            Continue Shopping
            <ArrowRight size={20} />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Your Cart 🛒</h1>
          <p className="text-dark-muted">{items.length} item{items.length !== 1 ? "s" : ""} in your cart</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-4"
          >
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </motion.div>

          {/* Billing Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card sticky top-24 h-fit"
          >
            <h2 className="text-white font-bold text-xl mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6 pb-6 border-b border-dark-lighter/20">
              <div className="flex justify-between">
                <span className="text-dark-muted">Subtotal</span>
                <span className="text-white font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-dark-muted">Delivery Charge</span>
                <span className="text-white font-semibold">{formatPrice(deliveryCharge)}</span>
              </div>
            </div>

            <div className="flex justify-between mb-6 text-lg">
              <span className="text-white font-bold">Total</span>
              <span className="text-primary font-bold text-2xl">{formatPrice(total)}</span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => navigate("/payment")}
                className="w-full btn-primary"
              >
                Proceed to Payment
              </button>
              <button
                onClick={() => navigate("/shops")}
                className="w-full btn-secondary inline-flex items-center justify-center gap-2"
              >
                <ArrowLeft size={18} />
                Continue Shopping
              </button>
              <button
                onClick={clearCart}
                className="w-full px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition border border-red-500/30"
              >
                Clear Cart
              </button>
            </div>

            {/* Info */}
            <div className="mt-6 p-4 bg-dark-lighter/30 rounded-lg text-xs text-dark-muted space-y-1">
              <p>✓ Free delivery included</p>
              <p>✓ Secure payment gateway</p>
              <p>✓ Cash on delivery available</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
