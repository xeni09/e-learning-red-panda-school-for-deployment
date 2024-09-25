import axios from "axios";

// Usar la variable de entorno para la URL base del backend
const baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

// Crear una instancia de Axios con configuración predefinida
const axiosInstance = axios.create({
  baseURL, // Usar la URL del backend desde la variable de entorno
  withCredentials: true, // Habilita el uso de cookies en las solicitudes
});

// Configuración de intercepción de respuestas para manejar errores de autenticación
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
