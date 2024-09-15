import axios from "./axiosConfig";

export const getUsers = async () => {
  return await axios.get("/api/users"); // Fetch all users
};

export const updateUserRole = async (userId, role) => {
  return await axios.put(`/api/users/${userId}`, { role }); // Update a user's role
};

export const deleteUser = async (userId) => {
  return await axios.delete(`/api/users/${userId}`); // Delete a user
};
