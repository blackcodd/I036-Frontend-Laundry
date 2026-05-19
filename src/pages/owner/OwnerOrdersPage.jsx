import { useState } from "react";
import { motion } from "framer-motion";
import { mockShopOrders } from "../../data/mockData";
import { getStatusColor } from "../../utils/helpers";
import { Edit2, Trash2, Plus, CheckCircle } from "lucide-react";
import Modal from "../../components/common/Modal";
import Swal from "sweetalert2";

export default function OwnerOrdersPage() {
  const [orders, setOrders] = useState(mockShopOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState("pending");

  const statusOptions = ["pending", "progress", "delivering", "completed"];

  const handleStatusChange = (orderId, status) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    setStatusModalOpen(false);
    Swal.fire({
      title: "Success!",
      text: "Order status updated",
      icon: "success",
      timer: 1500,
      confirmButtonColor: "#06B6D4",
    });
  };

  return (
    <div className="min-h-screen bg-dark-bg pt-24 pb-12 md:ml-64">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Manage Orders 📦</h1>
          <p className="text-dark-muted">Handle customer orders and update status</p>
        </motion.div>

        {/* Orders Grid */}
        <div className="space-y-4">
          {orders.map((order, i) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card"
            >
              <div className="grid md:grid-cols-5 gap-4 items-center">
                {/* Order ID */}
                <div>
                  <p className="text-dark-muted text-sm">Order ID</p>
                  <p className="text-white font-bold"># {order.id}</p>
                </div>

                {/* Customer */}
                <div>
                  <p className="text-dark-muted text-sm">Customer</p>
                  <p className="text-white font-semibold">{order.customerName}</p>
                </div>

                {/* Amount */}
                <div>
                  <p className="text-dark-muted text-sm">Amount</p>
                  <p className="text-primary font-bold">৳ {order.totalPrice}</p>
                </div>

                {/* Current Status */}
                <div>
                  <p className="text-dark-muted text-sm">Status</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setNewStatus(order.status);
                      setStatusModalOpen(true);
                    }}
                    className="p-2 hover:bg-primary/20 rounded transition"
                    title="Update Status"
                  >
                    <Edit2 size={18} className="text-primary" />
                  </button>
                  <button
                    onClick={() => {
                      Swal.fire({
                        title: "Confirm?",
                        text: "This action cannot be undone",
                        icon: "warning",
                        confirmButtonColor: "#06B6D4",
                        showCancelButton: true,
                      }).then((res) => {
                        if (res.isConfirmed) {
                          setOrders((prev) =>
                            prev.filter((o) => o.id !== order.id)
                          );
                        }
                      });
                    }}
                    className="p-2 hover:bg-red-500/20 rounded transition"
                    title="Delete Order"
                  >
                    <Trash2 size={18} className="text-red-400" />
                  </button>
                </div>
              </div>

              {/* Items Preview */}
              <div className="mt-4 pt-4 border-t border-dark-lighter/20">
                <p className="text-dark-muted text-sm mb-2">Items:</p>
                <div className="flex flex-wrap gap-2">
                  {order.items.map((item) => (
                    <span key={item.name} className="px-2 py-1 bg-dark-lighter/30 rounded text-xs text-dark-muted">
                      {item.name} x {item.quantity}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Status Update Modal */}
        <Modal
          isOpen={statusModalOpen}
          onClose={() => setStatusModalOpen(false)}
          title="Update Order Status"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-dark-text text-sm font-medium mb-3">
                New Status
              </label>
              <div className="space-y-2">
                {statusOptions.map((status) => (
                  <label
                    key={status}
                    className="flex items-center p-3 border border-dark-lighter/30 rounded-lg cursor-pointer hover:border-primary/50 transition"
                  >
                    <input
                      type="radio"
                      name="status"
                      value={status}
                      checked={newStatus === status}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="ml-3 text-white capitalize font-semibold">
                      {status.replace(/([A-Z])/g, " $1").toLowerCase()}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() =>
                  handleStatusChange(selectedOrder?.id, newStatus)
                }
                className="flex-1 btn-primary"
              >
                Update Status
              </button>
              <button
                onClick={() => setStatusModalOpen(false)}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
