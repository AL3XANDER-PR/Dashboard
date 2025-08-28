// apiClient.ts
import { useAuthStore } from "@/store/auth.store";
import axios from "axios";

const Axios = axios.create({
  baseURL: `${import.meta.env.VITE_BaseURL}`, // Base de tu API
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // opcional, si manejas cookies/CSRF
});

// Interceptor de request: añade AT
Axios.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor de response: refresca si 401
Axios.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    if (
      err.response?.status === 401 &&
      !original._retry &&
      original.url !== "/auth/refresh"
    ) {
      original._retry = true;
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BaseURL}/auth/refresh`,
          {
            withCredentials: true,
          }
        );
        console.log("💻 - res:", res);
        const { accessToken } = res.data;
        useAuthStore.getState().setUser(res.data.user);
        useAuthStore.getState().setAccessToken(res.data.accessToken);
        original.headers.Authorization = `Bearer ${accessToken}`;
        return Axios(original); // reintentar
      } catch (e) {
        console.log("💻 - e:", e);
        useAuthStore.getState().logout();
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);

export default Axios;
