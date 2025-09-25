import axios from "axios";

// Make sure this points to your backend, not Vite dev server
const API_URL = import.meta.env.VITE_API_URL;
const axiosInstance = axios.create({ baseURL: API_URL });

// Add JWT token automatically
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

// Auth APIs
export const registerUser = async (data) => {
  const res = await axiosInstance.post("/auth/register", data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await axiosInstance.post("/auth/login", data);
  return res.data;
};

// Task APIs
export const getTasks = async () => {
  const res = await axiosInstance.get("/tasks");
  return res.data;
};

export const createTask = async (data) => {
  const res = await axiosInstance.post("/tasks", data);
  return res.data;
};

export const updateTask = async (id, data) => {
  const res = await axiosInstance.put(`/tasks/${id}`, data);
  return res.data;
};

export const deleteTask = async (id) => {
  const res = await axiosInstance.delete(`/tasks/${id}`);
  return res.data;
};
