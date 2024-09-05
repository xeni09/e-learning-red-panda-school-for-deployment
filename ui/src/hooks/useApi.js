import { useState, useCallback } from "react";
import axios from "../services/axiosConfig";

const useApi = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (additionalOptions = {}) => {
      setLoading(true);
      setError(null);

      try {
        // Merge options and additionalOptions
        const mergedOptions = {
          ...options,
          ...additionalOptions,
        };

        // Configuración de la solicitud Axios
        const response = await axios({
          url,
          method: mergedOptions.method || "GET",
          headers: mergedOptions.headers || {}, // Usa headers si los necesitas
          data: mergedOptions.method !== "GET" ? mergedOptions.body : undefined, // Solo envía body si no es GET
        });

        setData(response.data); // Almacena la respuesta
      } catch (error) {
        // Manejo de errores detallado
        if (error.response) {
          console.error("API responded with error:", error.response);
          setError(error.response.data || "An error occurred");
        } else if (error.request) {
          console.error("No response received:", error.request);
          setError("No response from server");
        } else {
          console.error("Error in request setup:", error.message);
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    },
    [url, options]
  );

  return { data, loading, error, execute };
};

export default useApi;
