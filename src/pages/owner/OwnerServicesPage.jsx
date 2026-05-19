import { useState } from "react";
import { motion } from "framer-motion";
import { laundryItems } from "../../data/mockData";
import { Edit2, Trash2, Plus } from "lucide-react";
import Modal from "../../components/common/Modal";
import Swal from "sweetalert2";

export default function OwnerServicesPage() {
  const [services, setServices] = useState(laundryItems);
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddService = () => {
    if (!formData.name || !formData.price || !formData.category) {
      Swal.fire({
        title: "Error!",
        text: "Please fill all fields",
        icon: "error",
        confirmButtonColor: "#06B6D4",
      });
      return;
    }

    if (editingService) {
      setServices((prev) =>
        prev.map((s) =>
          s.id === editingService.id
            ? { ...s, name: formData.name, price: parseFloat(formData.price), category: formData.category }
            : s
        )
      );
      Swal.fire({
        title: "Updated!",
        text: "Service updated successfully",
        icon: "success",
        timer: 1500,
        confirmButtonColor: "#06B6D4",
      });
    } else {
      setServices((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: formData.name,
          price: parseFloat(formData.price),
          category: formData.category,
        },
      ]);
      Swal.fire({
        title: "Success!",
        text: "Service added successfully",
        icon: "success",
        timer: 1500,
        confirmButtonColor: "#06B6D4",
      });
    }

    setServiceModalOpen(false);
    setEditingService(null);
    setFormData({ name: "", price: "", category: "" });
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      price: service.price || "",
      category: service.category,
    });
    setServiceModalOpen(true);
  };

  const handleDeleteService = (id) => {
    Swal.fire({
      title: "Confirm Delete?",
      text: "This action cannot be undone",
      icon: "warning",
      confirmButtonColor: "#06B6D4",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        setServices((prev) => prev.filter((s) => s.id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "Service deleted successfully",
          icon: "success",
          timer: 1500,
          confirmButtonColor: "#06B6D4",
        });
      }
    });
  };

  const handleAddNew = () => {
    setEditingService(null);
    setFormData({ name: "", price: "", category: "" });
    setServiceModalOpen(true);
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
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Manage Services 👕
              </h1>
              <p className="text-dark-muted">Add, edit, or remove laundry services</p>
            </div>
            <button
              onClick={handleAddNew}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Plus size={20} />
              Add Service
            </button>
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, i) => (
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
                  <p className="text-dark-muted text-sm">{service.category}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditService(service)}
                    className="p-2 hover:bg-primary/20 rounded transition"
                  >
                    <Edit2 size={18} className="text-primary" />
                  </button>
                  <button
                    onClick={() => handleDeleteService(service.id)}
                    className="p-2 hover:bg-red-500/20 rounded transition"
                  >
                    <Trash2 size={18} className="text-red-400" />
                  </button>
                </div>
              </div>

              {service.price && (
                <div className="text-primary font-bold text-2xl">
                  ৳ {service.price}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Add/Edit Modal */}
        <Modal
          isOpen={serviceModalOpen}
          onClose={() => setServiceModalOpen(false)}
          title={editingService ? "Edit Service" : "Add New Service"}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-dark-text text-sm font-medium mb-2">
                Service Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                placeholder="e.g., Shirt"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-dark-text text-sm font-medium mb-2">
                Price (৳)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleFormChange}
                placeholder="e.g., 60"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-dark-text text-sm font-medium mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleFormChange}
                className="w-full"
              >
                <option value="">Select Category</option>
                <option value="Traditional">Traditional</option>
                <option value="Formal">Formal</option>
                <option value="Casual">Casual</option>
                <option value="Miscellaneous">Miscellaneous</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddService}
                className="flex-1 btn-primary"
              >
                {editingService ? "Update" : "Add"} Service
              </button>
              <button
                onClick={() => setServiceModalOpen(false)}
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
