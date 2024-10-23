import axios from "./axiosConfig";

// Función para autenticar al usuario
export const authenticateUser = async (credentials) => {
  try {
    const response = await axios.post("/api/auth/login", credentials);

    const data = response.data;

    // Retornar solo los datos del usuario
    return { userData: data.user };
  } catch (error) {
    console.error("Error during authenticateUser:", error);

    if (error.response && error.response.data.error) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Authentication error");
    }
  }
};

// Función para obtener los datos del usuario desde las cookies
export const getUserDataFromToken = async () => {
  try {
    const response = await axios.get("/api/auth/verifyToken");
    return response.data.user;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new Error(`Failed to fetch user data: ${error.message}`);
  }
};

// Función para actualizar los datos del usuario
export const updateUserData = async (userId, formData) => {
  try {
    const response = await axios.put(`/api/users/user/${userId}`, formData);
    return response.data;
  } catch (error) {
    console.error("Error updating user data:", error);
    throw new Error("Failed to update user data");
  }
};
