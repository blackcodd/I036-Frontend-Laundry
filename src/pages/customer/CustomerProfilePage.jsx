import { motion } from "framer-motion";
import { useAuthStore } from "../../context/store";
import { User, Mail, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function CustomerProfilePage() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "warning",
      confirmButtonColor: "#06B6D4",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        logout();
        navigate("/");
      }
    });
  };

  return (
    <div className="min-h-screen bg-dark-bg pt-24 pb-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Profile 👤</h1>
          <p className="text-dark-muted">Manage your account information</p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card mb-8"
        >
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-dark-lighter/20">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <User size={40} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{user?.name || "User"}</h2>
              <p className="text-dark-muted">{user?.email || "Email"}</p>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3">
              <Mail size={20} className="text-primary" />
              <div>
                <p className="text-dark-muted text-sm">Email</p>
                <p className="text-white font-semibold">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full px-6 py-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/20 transition inline-flex items-center justify-center gap-2"
          >
            <LogOut size={20} />
            Logout
          </button>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-3 gap-4"
        >
          {[
            { label: "Total Orders", value: "5" },
            { label: "Completed", value: "3" },
            { label: "Member Since", value: "Jan 2025" },
          ].map((stat, i) => (
            <div key={i} className="card">
              <p className="text-dark-muted text-sm mb-2">{stat.label}</p>
              <p className="text-2xl font-bold text-primary">{stat.value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
