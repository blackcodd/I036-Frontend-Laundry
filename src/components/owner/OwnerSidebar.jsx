import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../../context/store";
import { LogOut, Home, Package, Settings, TrendingUp } from "lucide-react";

export default function OwnerSidebar() {
  const location = useLocation();
  const { logout } = useAuthStore();
  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { path: "/owner/dashboard", icon: Home, label: "Dashboard" },
    { path: "/owner/orders", icon: Package, label: "Orders" },
    { path: "/owner/services", icon: Settings, label: "Services" },
    { path: "/owner/analytics", icon: TrendingUp, label: "Analytics" },
  ];

  return (
    <aside className="w-64 bg-dark-card border-r border-primary/20 p-6 min-h-screen fixed left-0 top-16 hidden md:block overflow-y-auto">
      <div className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive(item.path)
                  ? "bg-primary text-white"
                  : "text-dark-muted hover:bg-dark-lighter"
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Logout */}
      <div className="border-t border-dark-lighter/20 mt-6 pt-6">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
