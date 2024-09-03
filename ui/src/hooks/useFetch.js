import { useState, useCallback } from "react";

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (additionalOptions = {}) => {
      setLoading(true);
      setError(null);

      try {
        // Merge options and additionalOptions, handling GET requests properly
        const mergedOptions = {
          ...options,
          ...additionalOptions,
          headers: {
            "Content-Type": "application/json",
            ...options.headers,
            ...additionalOptions.headers,
          },
        };

        // Only include body if it's not a GET request
        if (
          mergedOptions.method &&
          mergedOptions.method.toUpperCase() !== "GET"
        ) {
          mergedOptions.body = JSON.stringify(
            additionalOptions.body || options.body
          );
        } else {
          delete mergedOptions.body;
        }

        const response = await fetch(url, mergedOptions);

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Network response was not ok: ${response.status} ${response.statusText} - ${errorText}`
          );
        }

        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [url, options]
  );

  return { data, loading, error, execute };
};

export default useFetch;
