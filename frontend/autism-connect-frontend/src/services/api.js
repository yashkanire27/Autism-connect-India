import axios from "axios";

// Central Axios instance. Every request automatically carries the JWT
// (if the user is logged in), and every 401 response logs the user out.
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("aci_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("aci_token");
      localStorage.removeItem("aci_user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ---------- Auth ----------
export const authApi = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  forgotPassword: (data) => api.post("/auth/forgot-password", data),
  resetPassword: (data) => api.post("/auth/reset-password", data),
  logout: () => api.post("/auth/logout"),
};

// ---------- Children ----------
export const childApi = {
  create: (data) => api.post("/children", data),
  myChildren: () => api.get("/children/my-children"),
  getById: (id) => api.get(`/children/${id}`),
  update: (id, data) => api.put(`/children/${id}`, data),
  remove: (id) => api.delete(`/children/${id}`),
};

// ---------- Activities ----------
export const activityApi = {
  getAll: (params) => api.get("/activities", { params }),
  getById: (id) => api.get(`/activities/${id}`),
  create: (data) => api.post("/activities", data),
  update: (id, data) => api.put(`/activities/${id}`, data),
  remove: (id) => api.delete(`/activities/${id}`),
};

export default api;
