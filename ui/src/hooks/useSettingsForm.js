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
      console.log("User ID:", user.id);
    }
  }, [user]);

  const saveChanges = async () => {
    if (!user.id) {
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
        password: editedPassword || undefined,
      };

      await updateUserData(user.id, updatedUserData);
      await updateUser();
      setSuccess("Account updated successfully");
      setEditedPassword("");
      setRepeatPassword("");
      setIsEditing(false);
    } catch (err) {
      setError("Failed to update account");
      setSuccess("");
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
