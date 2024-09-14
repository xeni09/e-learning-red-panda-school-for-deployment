import { useState, useEffect } from "react";
import { updateUserData } from "../services/authService";

const useSettingsForm = (user, updateUser) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedPassword, setEditedPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (user) {
      setEditedName(user.name);
      setEditedEmail(user.email);
      console.log("User ID in useEffect:", user._id); // Cambiar a user._id
    }
  }, [user]);

  const saveChanges = async () => {
    // Cambiar de user.id a user._id
    if (!user._id) {
      setError("Invalid user ID");
      return;
    }

    if (editedPassword && editedPassword !== repeatPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const updatedUserData = {
        name: editedName,
        email: editedEmail,
        password: editedPassword || undefined, // Solo enviar la contraseña si está presente
      };

      await updateUserData(user._id, updatedUserData); // Cambiar a user._id
      await updateUser(); // Actualiza el contexto del usuario
      setSuccess("");
      setEditedPassword("");
      setRepeatPassword("");
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update account:", err.message);
      setError("Failed to update account");
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditedName(user.name);
    setEditedEmail(user.email);
    setEditedPassword("");
    setRepeatPassword("");
    setError(null);
  };

  return {
    isEditing,
    setIsEditing,
    editedName,
    setEditedName,
    editedEmail,
    setEditedEmail,
    editedPassword,
    setEditedPassword,
    repeatPassword,
    setRepeatPassword,
    loading,
    error,
    success,
    saveChanges,
    cancelEdit,
  };
};

export default useSettingsForm;
