const baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export const loginUser = async (setIsAuthenticated, setUser) => {
  try {
    // Llamar a la API para verificar el token y obtener los datos del usuario
    const response = await fetch(`${baseURL}/api/auth/verifyToken`, {
      method: "GET",
      credentials: "include", // Asegura que las cookies se envíen con la solicitud
    });

    if (response.ok) {
      const data = await response.json();
      const fetchedUser = data.user;

      setIsAuthenticated(true);
      setUser(fetchedUser); // Actualiza el estado global con los datos del usuario
      return true;
    } else {
      console.error("Failed to fetch user data:", response.statusText);
      logoutUser(setIsAuthenticated, setUser); // Cerrar sesión si la respuesta no es válida
      return false;
    }
  } catch (error) {
    console.error("Failed to login:", error);
    logoutUser(setIsAuthenticated, setUser); // Cerrar sesión si ocurre un error
    return false;
  }
};

export const logoutUser = async (setIsAuthenticated, setUser) => {
  try {
    // Llamar al backend para eliminar la cookie de sesión
    await fetch(`${baseURL}/api/auth/logout`, {
      method: "POST",
      credentials: "include", // Incluir cookies en la solicitud
    });
  } catch (error) {
    console.error("Failed to log out:", error);
  } finally {
    // Actualiza el estado global después de cerrar sesión
    setIsAuthenticated(false);
    setUser(null);
  }
};
