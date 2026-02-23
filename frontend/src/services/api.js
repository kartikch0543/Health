import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const API = axios.create({
  baseURL: BASE_URL,
});

// Add token to requests
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

// AUTH
export const login = (formData) =>
  API.post("/api/auth/login", formData);

export const register = (formData) =>
  API.post("/api/auth/register", formData);

// APPOINTMENTS
export const fetchAppointments = () =>
  API.get("/api/appointments");

export const bookAppointment = (data) =>
  API.post("/api/appointments", data);

export const updateAppointment = (id, status) =>
  API.put(`/api/appointments/${id}`, { status });

export const updateTreatment = (id, data) =>
  API.put(`/api/appointments/${id}/treatment`, data);

export const fetchStats = () =>
  API.get("/api/appointments/stats");

export const rescheduleAppointment = (id, data) =>
  API.put(`/api/appointments/${id}/reschedule`, data);

export const deleteAppointment = (id) =>
  API.delete(`/api/appointments/${id}`);

export const fetchDoctors = (specialization) =>
  API.get(`/api/users/doctors?specialization=${specialization}`);