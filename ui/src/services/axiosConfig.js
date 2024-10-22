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
      // Redirigir solo si estás en una página protegida
      const protectedRoutes = ["/dashboard", "/my-account", "/admin"];
      if (
        protectedRoutes.some((route) =>
          window.location.pathname.startsWith(route)
        )
      ) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
