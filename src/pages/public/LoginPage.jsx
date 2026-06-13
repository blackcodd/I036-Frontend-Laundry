import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../../context/store";
import { Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("customer");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mock validation
    if (!formData.email || !formData.password) {
      Swal.fire({
        title: "Error!",
        text: "Please fill all fields",
        icon: "error",
        confirmButtonColor: "#06B6D4",
      });
      return;
    }

    try {

      // Mock login - replace with actual API call
       const res= await login(formData.email,formData.password);
       console.log(res);
       setRole(res.role);
       
      Swal.fire({
        title: "Success!",
        text: res.massage ,
        icon: "success",
        confirmButtonColor: "#06B6D4",
      });

      if (role === "customer") {
        navigate("/customer/dashboard");
      } else {
        navigate("/owner/dashboard");
      }
    }
     catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Login failed. Please try again.",
        icon: "error",
        confirmButtonColor: "#06B6D4",
      });
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="glass card">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-dark-muted">Sign in to your Tech_Laundry account</p>
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

            {/* Submit */}
            <button type="submit" className="w-full btn-primary py-3 font-semibold">
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-dark-lighter/20" />
            <span className="text-dark-muted text-sm">OR</span>
            <div className="flex-1 h-px bg-dark-lighter/20" />
          </div>

          {/* Demo Credentials */}
          <div className="bg-dark-lighter/20 rounded-lg p-4 mb-4">
            <p className="text-dark-muted text-xs mb-2">Demo Credentials:</p>
            <p className="text-primary text-sm font-mono">demo@techlaundry.com</p>
            <p className="text-primary text-sm font-mono">password123</p>
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-dark-muted text-sm">
              Don't have an account?{" "}
              <a href="/register" className="text-primary hover:text-accent font-semibold transition">
                Register here
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
