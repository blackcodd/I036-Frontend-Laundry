import { Link } from "react-router-dom";
import { useAuthStore } from "../../context/store";
import { Menu, X } from "lucide-react";
import { useState } from "react";
// import { motion } from "framer-motion";

export default function Navbar() {
  const { isAuthenticated, role, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed w-full top-0 z-50 bg-dark-bg/80 backdrop-blur-md border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">TL</span>
            </div>
            <span className="hidden sm:inline font-bold text-lg text-white">Tech_Laundry</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-dark-text hover:text-primary transition">
              Home
            </Link>

            {isAuthenticated ? (
              <>
                {role === "customer" ? (
                  <>
                    <Link to="/shops" className="text-dark-text hover:text-primary transition">
                      Shops
                    </Link>
                    <Link to="/customer/dashboard" className="text-dark-text hover:text-primary transition">
                      Dashboard
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/owner/dashboard" className="text-dark-text hover:text-primary transition">
                      Dashboard
                    </Link>
                    <Link to="/owner/orders" className="text-dark-text hover:text-primary transition">
                      Orders
                    </Link>
                  </>
                )}
                <button
                  onClick={handleLogout}
                  className="btn-primary text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-dark-text hover:text-primary transition">
                  Login
                </Link>
                <Link to="/register" className="btn-primary text-sm">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X size={24} className="text-primary" />
            ) : (
              <Menu size={24} className="text-primary" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden pb-4 space-y-2"
          >
            <Link to="/" className="block px-4 py-2 text-dark-text hover:text-primary">
              Home
            </Link>
            {isAuthenticated ? (
              <>
                {role === "customer" ? (
                  <>
                    <Link to="/shops" className="block px-4 py-2 text-dark-text hover:text-primary">
                      Shops
                    </Link>
                    <Link to="/customer/dashboard" className="block px-4 py-2 text-dark-text hover:text-primary">
                      Dashboard
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/owner/dashboard" className="block px-4 py-2 text-dark-text hover:text-primary">
                      Dashboard
                    </Link>
                    <Link to="/owner/orders" className="block px-4 py-2 text-dark-text hover:text-primary">
                      Orders
                    </Link>
                  </>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 btn-primary mt-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-4 py-2 text-dark-text hover:text-primary">
                  Login
                </Link>
                <Link to="/register" className="block px-4 py-2 btn-primary">
                  Register
                </Link>
              </>
            )}
          </motion.div>
        )}
      </div>
    </nav>
  );
}
