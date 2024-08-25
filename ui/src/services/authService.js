// Función para autenticar al usuario
export const authenticateUser = async (credentials) => {
  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      if (data.error === "User not found") {
        throw new Error("This email has no account created");
      } else if (data.error === "Incorrect password") {
        throw new Error("Incorrect password");
      } else {
        throw new Error("Authentication error");
      }
    }

    const token = data.token;
    const userId = data.userId; // Asumiendo que el userId viene en la respuesta

    // Almacenar el token en localStorage
    localStorage.setItem("token", token);

    // Obtener los datos del usuario
    const userData = await getUserData(userId, token);

    return { token, userData };
  } catch (error) {
    throw new Error(error.message || "Authentication error");
  }
};

// Función para obtener los datos del usuario
export const getUserData = async (userId, token) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/users/user/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// Función para actualizar los datos del usuario
export const updateUserData = async (userId, formData, token) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/users/user/${userId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update user data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
};
