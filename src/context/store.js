import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  role: localStorage.getItem("role") || null,

  login: (user, token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    set({ user, token, isAuthenticated: true, role });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    set({ user: null, token: null, isAuthenticated: false, role: null });
  },

  updateUser: (userData) => set((state) => ({ user: { ...state.user, ...userData } })),
}));

export const useCartStore = create((set) => ({
  items: JSON.parse(localStorage.getItem("cart")) || [],
  shopId: localStorage.getItem("shopId") || null,

  addToCart: (item, shopId) =>
    set((state) => {
      if (state.shopId && state.shopId !== shopId) {
        localStorage.setItem("cart", JSON.stringify([item]));
        localStorage.setItem("shopId", shopId);
        return { items: [item], shopId };
      }
      const existingItem = state.items.find((i) => i.id === item.id);
      let newItems;
      if (existingItem) {
        newItems = state.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      } else {
        newItems = [...state.items, item];
      }
      localStorage.setItem("cart", JSON.stringify(newItems));
      localStorage.setItem("shopId", shopId);
      return { items: newItems, shopId };
    }),

  updateItem: (itemId, quantity) =>
    set((state) => {
      const newItems = state.items.map((i) =>
        i.id === itemId ? { ...i, quantity } : i
      );
      localStorage.setItem("cart", JSON.stringify(newItems));
      return { items: newItems };
    }),

  removeItem: (itemId) =>
    set((state) => {
      const newItems = state.items.filter((i) => i.id !== itemId);
      localStorage.setItem("cart", JSON.stringify(newItems));
      return { items: newItems };
    }),

  clearCart: () => {
    localStorage.removeItem("cart");
    localStorage.removeItem("shopId");
    set({ items: [], shopId: null });
  },
}));

export const useOrderStore = create((set) => ({
  orders: [],
  selectedOrder: null,

  setOrders: (orders) => set({ orders }),
  setSelectedOrder: (order) => set({ selectedOrder: order }),

  addOrder: (order) =>
    set((state) => ({ orders: [...state.orders, order] })),

  updateOrder: (orderId, updatedData) =>
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderId ? { ...o, ...updatedData } : o
      ),
    })),
}));
