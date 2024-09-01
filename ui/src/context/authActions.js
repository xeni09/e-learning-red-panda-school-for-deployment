export const loginUser = async (token, setIsAuthenticated, setUser) => {
  try {
    localStorage.setItem("token", token); // Store the token in localStorage

    const response = await fetch("http://localhost:3000/api/auth/verifyToken", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      const fetchedUser = data.user;

      console.log("Fetched User:", fetchedUser);

      setIsAuthenticated(true);
      setUser(fetchedUser);
      localStorage.setItem("user", JSON.stringify(fetchedUser)); // Store the user in localStorage
      localStorage.setItem("isAuthenticated", "true"); // Ensure isAuthenticated is stored
      return true;
    } else {
      console.error("Failed to fetch user data:", response.statusText);
      logoutUser(setIsAuthenticated, setUser); // Log out if the token is invalid or user data can't be fetched
      return false;
    }
  } catch (error) {
    console.error("Failed to login:", error);
    logoutUser(setIsAuthenticated, setUser); // Log out on error
    return false;
  }
};

export const logoutUser = (setIsAuthenticated, setUser) => {
  setIsAuthenticated(false);
  setUser(null);
  localStorage.removeItem("token"); // Remove the token from localStorage
  localStorage.removeItem("user"); // Remove the user from localStorage
  localStorage.setItem("isAuthenticated", "false"); // Ensure isAuthenticated is updated
};
