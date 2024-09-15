import React, { useState } from 'react';
import CustomDropdown from '../../components/adminComponents/CustomDropdown';

const CreateUserForm = ({ onCreateUser }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
  const [error, setError] = useState(''); // Estado para manejar el error
  const [success, setSuccess] = useState(''); // Estado para manejar el éxito

  const roleOptions = [
    { value: 'user', label: 'User' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'admin', label: 'Admin' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRoleChange = (selectedRole) => {
    setFormData((prevData) => ({ ...prevData, role: selectedRole }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Limpia el mensaje de error/success después de un tiempo
  const clearMessages = () => {
    setTimeout(() => {
      setError('');
      setSuccess('');
    }, 5000); // 5 segundos
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Resetear mensajes de éxito y error antes de la validación
    setError('');
    setSuccess('');

    // Validar campos antes de enviar
    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required.');
      clearMessages();
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('The email format is invalid. Please enter a valid email.');
      clearMessages();
      return;
    }

    try {
      const response = await onCreateUser(formData);
      if (response.error) {
        setError(response.error); // Muestra el error si lo hay
        clearMessages();
      } else {
        setSuccess('User created successfully.');
        // Limpiar el formulario después de crear el usuario
        setFormData({ name: '', email: '', password: '', role: 'user' });
        clearMessages(); // Limpia el mensaje después de unos segundos
      }
    } catch (err) {
      setError('An error occurred while creating the user.');
      clearMessages();
    }
  };

  return (
    <div className="my-10">
      <p className="text-3xl font-bold mb-4">Create New User</p>

      {error && <p className="text-red-500 mb-4">{error}</p>} {/* Mostrar error */}
      {success && <p className="text-green-500 mb-4">{success}</p>} {/* Mostrar mensaje de éxito */}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-[var(--color-yellow)]"
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-[var(--color-yellow)]"
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-[var(--color-yellow)]"
          />
        </div>
        <div className="flex items-center space-x-2">
          <label htmlFor="role" className="text-sm">Role:</label>
          <CustomDropdown
            options={roleOptions}
            selectedOption={formData.role}
            onOptionSelect={handleRoleChange}
          />
        </div>
        <div className="md:col-span-2">
          <button
            type="submit"
            className="btn px-4 py-2 rounded w-full bg-[var(--color-green)]"          >
            Create User
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserForm;
