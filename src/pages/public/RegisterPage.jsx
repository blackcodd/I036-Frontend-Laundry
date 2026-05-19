import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../../context/store";
import { Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("customer");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      Swal.fire({
        title: "Error!",
        text: "Please fill all fields",
        icon: "error",
        confirmButtonColor: "#06B6D4",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        title: "Error!",
        text: "Passwords do not match",
        icon: "error",
        confirmButtonColor: "#06B6D4",
      });
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      login(
        { email: formData.email, name: formData.name, role },
        "mock-token-" + Date.now(),
        role
      );

      Swal.fire({
        title: "Success!",
        text: "Account created successfully",
        icon: "success",
        confirmButtonColor: "#06B6D4",
      });

      if (role === "customer") {
        navigate("/customer/dashboard");
      } else {
        navigate("/owner/dashboard");
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Registration failed. Please try again.",
        icon: "error",
        confirmButtonColor: "#06B6D4",
      });
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4 pt-20 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="glass card">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-dark-muted">Join Tech_Laundry today</p>
          </div>

          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {["customer", "owner"].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`py-3 rounded-lg font-semibold transition ${
                  role === r
                    ? "bg-primary text-white"
                    : "bg-dark-lighter/30 text-dark-muted hover:bg-dark-lighter/50"
                }`}
              >
                {r === "customer" ? "👤 Customer" : "🏪 Shop Owner"}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-dark-text text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-dark-text text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-dark-text text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-muted hover:text-primary transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-dark-text text-sm font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full"
              />
            </div>

            {/* Submit */}
            <button type="submit" className="w-full btn-primary py-3 font-semibold">
              Create Account
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-dark-muted text-sm">
              Already have an account?{" "}
              <a href="/login" className="text-primary hover:text-accent font-semibold transition">
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
