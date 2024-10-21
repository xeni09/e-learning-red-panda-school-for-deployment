import axios from "axios";

// Usar la variable de entorno para la URL base del backend en producción o localhost en desarrollo
const baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

// Crear una instancia de Axios con configuración predefinida
const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized, redirecting to login...");
      // Redirigir solo si estás en una página protegida
      const protectedRoutes = ["/dashboard", "/my-account", "/admin"];
      if (protectedRoutes.includes(window.location.pathname)) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
