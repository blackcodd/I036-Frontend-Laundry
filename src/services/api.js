
/*
 * Copyright (c) 2026 Srabon Das
 * All Rights Reserved.
 */

import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add JWT token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth endpoints
export const authAPI = {
  login: (email, password) =>
    apiClient.post("/auth/login", { email, password }),
  register: (email, password, role, name) =>
    apiClient.post("/auth/register", { email, password, role, name }),
};

// Shops endpoints
export const shopsAPI = {
  getAll: () => apiClient.get("/shops"),
  getById: (id) => apiClient.get(`/shops/${id}`),
  getNearby: (latitude, longitude) =>
    apiClient.get("/shops/nearby", { params: { latitude, longitude } }),
};

// Orders endpoints
export const ordersAPI = {
  create: (orderData) => apiClient.post("/orders", orderData),
  getCustomerOrders: () => apiClient.get("/orders/customer"),
  getOwnerOrders: () => apiClient.get("/orders/owner"),
  updateStatus: (orderId, status) =>
    apiClient.patch(`/orders/${orderId}/status`, { status }),
  getTracking: (orderId) => apiClient.get(`/orders/${orderId}/tracking`),
};

// Services endpoints
export const servicesAPI = {
  getAll: () => apiClient.get("/services"),
  getByShop: (shopId) => apiClient.get(`/services/shop/${shopId}`),
  create: (serviceData) => apiClient.post("/services", serviceData),
  update: (serviceId, data) =>
    apiClient.put(`/services/${serviceId}`, data),
  delete: (serviceId) => apiClient.delete(`/services/${serviceId}`),
};

// Payment endpoints
export const paymentAPI = {
  process: (paymentData) =>
    apiClient.post("/payments/process", paymentData),
  verify: (transactionId) =>
    apiClient.get(`/payments/verify/${transactionId}`),
};

export default apiClient;
