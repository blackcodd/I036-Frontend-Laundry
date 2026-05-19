import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { mockOrders } from "../../data/mockData";
import { formatDate, getStatusBg } from "../../utils/helpers";
import { CheckCircle, Loader } from "lucide-react";

export default function OrderTrackingPage() {
  const { id } = useParams();
  const order = mockOrders.find((o) => o.id === parseInt(id));

  if (!order) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <p className="text-white text-xl">Order not found</p>
      </div>
    );
  }

  const statuses = ["pending", "progress", "delivering", "completed"];

  return (
    <div className="min-h-screen bg-dark-bg pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Track Your Order 📦</h1>
          <p className="text-dark-muted">Order #{order.id}</p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="card mb-8"
        >
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-secondary opacity-20" />

            {/* Timeline Items */}
            <div className="space-y-8 relative z-10">
              {statuses.map((status, index) => {
                const isCompleted =
                  statuses.indexOf(status) <= statuses.indexOf(order.status);
                const isCurrent = status === order.status;

                return (
                  <motion.div
                    key={status}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    {/* Status Icon */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isCompleted ? getStatusBg(status) : "bg-dark-lighter"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle size={24} className="text-white" />
                      ) : isCurrent ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Loader size={24} className="text-primary" />
                        </motion.div>
                      ) : (
                        <span className="text-dark-muted">•</span>
                      )}
                    </div>

                    {/* Status Details */}
                    <div className="pb-4">
                      <h3 className="text-white font-bold text-lg capitalize">
                        {status.replace(/([A-Z])/g, " $1").toLowerCase()}
                      </h3>
                      <p className="text-dark-muted text-sm">
                        {order.timeline.find((t) => t.status === status)?.date ||
                          "Not yet reached"}
                      </p>
                      {isCurrent && (
                        <p className="text-primary text-sm mt-1">
                          Your order is{" "}
                          {status === "progress" ? "being processed" : status}...
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Order Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card mb-8"
        >
          <h2 className="text-white font-bold text-lg mb-4">Order Details</h2>
          <div className="space-y-4">
            <div className="flex justify-between pb-4 border-b border-dark-lighter/20">
              <span className="text-dark-muted">Shop</span>
              <span className="text-white font-semibold">{order.shopName}</span>
            </div>
            <div className="flex justify-between pb-4 border-b border-dark-lighter/20">
              <span className="text-dark-muted">Items</span>
              <span className="text-white font-semibold">
                {order.items.length} item{order.items.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex justify-between pb-4 border-b border-dark-lighter/20">
              <span className="text-dark-muted">Estimated Delivery</span>
              <span className="text-white font-semibold">
                {formatDate(order.estimatedDelivery)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-dark-muted">Total Amount</span>
              <span className="text-primary font-bold text-lg">
                ৳ {order.totalPrice}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Items List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <h2 className="text-white font-bold text-lg mb-4">Items Ordered</h2>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div
                key={item.name}
                className="flex justify-between p-3 bg-dark-lighter/30 rounded-lg"
              >
                <div>
                  <p className="text-white font-semibold">{item.name}</p>
                  <p className="text-dark-muted text-sm">x {item.quantity}</p>
                </div>
                <p className="text-primary font-bold">৳ {item.price * item.quantity}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
