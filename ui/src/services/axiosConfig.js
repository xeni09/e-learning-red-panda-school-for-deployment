import axios from "axios";

axios.defaults.withCredentials = true; // Asegúrate de que Axios siempre envíe las cookies

// Crear una instancia de Axios con configuración predefinida
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // Cambia según la URL de tu API
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
