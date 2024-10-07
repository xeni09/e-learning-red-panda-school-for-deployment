export const loginUser = async (token, setIsAuthenticated, setUser) => {
  try {
    // Llamar a la API para verificar el token y obtener los datos del usuario
    const response = await fetch("http://localhost:3000/api/auth/verifyToken", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      const fetchedUser = data.user;

      console.log("Fetched User:", fetchedUser); // Log para verificar los datos obtenidos

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

export const logoutUser = (setIsAuthenticated, setUser) => {
  setIsAuthenticated(false);
  setUser(null);
  localStorage.removeItem("token"); // Elimina solo el token de `localStorage`
  localStorage.setItem("isAuthenticated", "false"); // Actualiza el estado de autenticación
};
