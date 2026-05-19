import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../../context/store";
import { TrendingUp, Package, CheckCircle, Clock } from "lucide-react";
import { mockShopOrders } from "../../data/mockData";
import { getStatusColor } from "../../utils/helpers";

export default function OwnerDashboard() {
  const { user } = useAuthStore();

  const stats = [
    { icon: Package, label: "Total Orders", value: mockShopOrders.length, color: "from-blue-500 to-cyan-500" },
    { icon: Clock, label: "Pending", value: 2, color: "from-yellow-500 to-orange-500" },
    { icon: CheckCircle, label: "Completed", value: 8, color: "from-green-500 to-emerald-500" },
    { icon: TrendingUp, label: "Revenue", value: "৳ 12,450", color: "from-purple-500 to-pink-500" },
  ];

  return (
    <div className="min-h-screen bg-dark-bg pt-24 pb-12 md:ml-64">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome, {user?.name}! 👋
          </h1>
          <p className="text-dark-muted">Shop Management Dashboard</p>
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

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <h3 className="text-white font-bold text-lg mb-6">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-lighter/20">
                  <th className="text-left py-3 px-4 text-dark-muted font-semibold text-sm">
                    Order ID
                  </th>
                  <th className="text-left py-3 px-4 text-dark-muted font-semibold text-sm">
                    Customer
                  </th>
                  <th className="text-left py-3 px-4 text-dark-muted font-semibold text-sm">
                    Items
                  </th>
                  <th className="text-left py-3 px-4 text-dark-muted font-semibold text-sm">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 text-dark-muted font-semibold text-sm">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-lighter/20">
                {mockShopOrders.map((order, i) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <td className="py-3 px-4 text-white font-semibold"># {order.id}</td>
                    <td className="py-3 px-4 text-dark-muted">{order.customerName}</td>
                    <td className="py-3 px-4 text-dark-muted">{order.items.length}</td>
                    <td className="py-3 px-4 text-primary font-bold">৳ {order.totalPrice}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
