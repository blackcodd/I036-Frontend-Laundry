import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./context/store";

// Layout
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import CustomerSidebar from "./components/customer/CustomerSidebar";
import OwnerSidebar from "./components/owner/OwnerSidebar";

// Public Pages
import HomePage from "./pages/public/HomePage";
import LoginPage from "./pages/public/LoginPage";
import RegisterPage from "./pages/public/RegisterPage";

// Customer Pages
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import ShopsPage from "./pages/customer/ShopsPage";
import ShopDetailsPage from "./pages/customer/ShopDetailsPage";
import CartPage from "./pages/customer/CartPage";
import PaymentPage from "./pages/customer/PaymentPage";
import OrderTrackingPage from "./pages/customer/OrderTrackingPage";
import CustomerOrdersPage from "./pages/customer/CustomerOrdersPage";
import CustomerProfilePage from "./pages/customer/CustomerProfilePage";

// Owner Pages
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import OwnerOrdersPage from "./pages/owner/OwnerOrdersPage";
import OwnerServicesPage from "./pages/owner/OwnerServicesPage";

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, role } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default function AppRoutes() {
  const { isAuthenticated, role } = useAuthStore();

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Customer Routes */}
            <Route
              path="/customer/dashboard"
              element={
                <ProtectedRoute requiredRole="customer">
                  <div className="flex">
                    <CustomerSidebar />
                    <div className="flex-1 md:ml-64">
                      <CustomerDashboard />
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />
            <Route path="/shops" element={<ShopsPage />} />
            <Route path="/shop/:id" element={<ShopDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route
              path="/tracking/:id"
              element={
                <ProtectedRoute requiredRole="customer">
                  <OrderTrackingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/orders"
              element={
                <ProtectedRoute requiredRole="customer">
                  <div className="flex">
                    <CustomerSidebar />
                    <div className="flex-1 md:ml-64">
                      <CustomerOrdersPage />
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/profile"
              element={
                <ProtectedRoute requiredRole="customer">
                  <CustomerProfilePage />
                </ProtectedRoute>
              }
            />

            {/* Owner Routes */}
            <Route
              path="/owner/dashboard"
              element={
                <ProtectedRoute requiredRole="owner">
                  <div className="flex">
                    <OwnerSidebar />
                    <div className="flex-1 md:ml-64">
                      <OwnerDashboard />
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/owner/orders"
              element={
                <ProtectedRoute requiredRole="owner">
                  <div className="flex">
                    <OwnerSidebar />
                    <div className="flex-1 md:ml-64">
                      <OwnerOrdersPage />
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/owner/services"
              element={
                <ProtectedRoute requiredRole="owner">
                  <div className="flex">
                    <OwnerSidebar />
                    <div className="flex-1 md:ml-64">
                      <OwnerServicesPage />
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />

            {/* Catch All */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
