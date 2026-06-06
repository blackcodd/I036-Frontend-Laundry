/*
 * Copyright (c) 2026 Srabon Das
 * All Rights Reserved.
 */


import { motion } from "framer-motion";
import { useAuthStore } from "../../context/store";
import { useCartStore } from "../../context/store";
import { TrendingUp, ShoppingCart, CheckCircle, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { mockOrders } from "../../data/mockData";

export default function CustomerDashboard() {
  const { user } = useAuthStore();
  const { items } = useCartStore();

  const stats = [
    { icon: ShoppingCart, label: "Total Orders", value: mockOrders.length, color: "from-blue-500 to-cyan-500" },
    { icon: CheckCircle, label: "Completed", value: 5, color: "from-green-500 to-emerald-500" },
    { icon: DollarSign, label: "Total Spent", value: "৳ 2,450", color: "from-purple-500 to-pink-500" },
    { icon: TrendingUp, label: "Reward Points", value: "245", color: "from-yellow-500 to-orange-500" },
  ];

  return (
    <div className="min-h-screen bg-dark-bg pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Welcome, {user?.name}! 👋</h1>
          <p className="text-dark-muted">Here's your laundry dashboard</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                  <Icon size={24} className="text-white" />
                </div>
                <p className="text-dark-muted text-sm mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 gap-6 mb-12"
        >
          <div className="card bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/50">
            <h3 className="text-white font-bold text-lg mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Link to="/shops" className="btn-primary block text-center">
                Find Laundry Shops
              </Link>
              <Link to="/customer/orders" className="btn-secondary block text-center">
                View All Orders
              </Link>
            </div>
          </div>

          {items.length > 0 && (
            <Link to="/cart" className="card bg-gradient-to-br from-accent/10 to-cyan-500/10 border-accent/50 hover:border-accent">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-dark-muted text-sm">Items in Cart</p>
                  <p className="text-3xl font-bold text-accent">{items.length}</p>
                </div>
                <ShoppingCart size={40} className="text-accent/50" />
              </div>
            </Link>
          )}
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card"
        >
          <h3 className="text-white font-bold text-lg mb-4">Recent Orders</h3>
          {mockOrders.length > 0 ? (
            <div className="space-y-3">
              {mockOrders.slice(0, 3).map((order) => (
                <div key={order.id} className="flex justify-between items-center p-3 bg-dark-lighter/30 rounded-lg">
                  <div>
                    <p className="text-white font-semibold">#{order.id}</p>
                    <p className="text-dark-muted text-sm">{order.shopName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-primary font-bold">৳ {order.totalPrice}</p>
                    <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-dark-muted">No orders yet. Start by finding a shop!</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
