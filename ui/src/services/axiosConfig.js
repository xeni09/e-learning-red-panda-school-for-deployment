import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

// Crear una instancia de Axios con configuración predefinida
const axiosInstance = axios.create({
  baseURL,
  withCredentials: true, // Asegura que las cookies se envíen con cada solicitud
});

// Interceptor para manejar respuestas 401
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized, redirecting to login...");
      window.location.href = "/login"; // Redirigir a la página de inicio de sesión para cualquier error 401
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
