import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { mockOrders } from "../../data/mockData";
import { getStatusColor } from "../../utils/helpers";
import { Eye } from "lucide-react";

export default function CustomerOrdersPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-dark-bg pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">My Orders 📋</h1>
          <p className="text-dark-muted">Track all your laundry orders</p>
        </motion.div>

        {/* Orders Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="card overflow-x-auto"
        >
          {mockOrders.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-lighter/20">
                  <th className="text-left py-4 px-4 text-dark-muted font-semibold">
                    Order ID
                  </th>
                  <th className="text-left py-4 px-4 text-dark-muted font-semibold">
                    Shop
                  </th>
                  <th className="text-left py-4 px-4 text-dark-muted font-semibold">
                    Items
                  </th>
                  <th className="text-left py-4 px-4 text-dark-muted font-semibold">
                    Amount
                  </th>
                  <th className="text-left py-4 px-4 text-dark-muted font-semibold">
                    Status
                  </th>
                  <th className="text-left py-4 px-4 text-dark-muted font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-lighter/20">
                {mockOrders.map((order, i) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-dark-lighter/20 transition"
                  >
                    <td className="py-4 px-4 text-white font-semibold">
                      #{order.id}
                    </td>
                    <td className="py-4 px-4 text-dark-muted">{order.shopName}</td>
                    <td className="py-4 px-4 text-dark-muted">
                      {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                    </td>
                    <td className="py-4 px-4 text-primary font-bold">
                      ৳ {order.totalPrice}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => navigate(`/tracking/${order.id}`)}
                        className="flex items-center gap-1 text-primary hover:text-accent transition"
                      >
                        <Eye size={18} />
                        <span className="text-sm">Track</span>
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-12">
              <p className="text-4xl mb-4">📭</p>
              <p className="text-dark-muted mb-4">No orders yet</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
