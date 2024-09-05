// /services/axiosConfig.js
import axios from "axios";

// Configuración global de Axios para incluir cookies en todas las solicitudes
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // Cambia esta URL a la de tu backend en producción
  withCredentials: true, // Asegura que las cookies se envíen y reciban automáticamente
});

export default axiosInstance;
