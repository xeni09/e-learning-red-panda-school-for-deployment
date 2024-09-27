import React, { useState } from 'react';
import CustomDropdown from '../../components/adminComponents/CustomDropdown';

const CreateUserForm = ({ onCreateUser }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
  const [formErrors, setFormErrors] = useState({ name: '', email: '', password: '' }); // Errores específicos por campo
  const [error, setError] = useState(''); // Estado para errores generales
  const [success, setSuccess] = useState(''); // Estado para manejar el éxito

  const roleOptions = [
    { value: 'user', label: 'User' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'admin', label: 'Admin' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' })); // Limpia el error específico al cambiar el input
  };

  const handleRoleChange = (selectedRole) => {
    setFormData((prevData) => ({ ...prevData, role: selectedRole }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required.';
    if (!formData.email) {
      errors.email = 'Email is required.';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address.'; // Error de formato de email
    }
    if (!formData.password) errors.password = 'Password is required.';
    return errors;
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
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors); // Mostrar los errores específicos por campo
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
        setFormErrors({ name: '', email: '', password: '' }); // Limpiar los errores
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

      {error && <p className="text-red-500 mb-4">{error}</p>} {/* Mostrar error general */}
      {success && <p className="text-green-500 mb-4">{success}</p>} {/* Mostrar mensaje de éxito */}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-[var(--color-yellow)]"
          />
          {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>} {/* Mostrar error de nombre */}
        </div>
        <div>
          <label htmlFor="email" className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-[var(--color-yellow)]"
          />
          {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>} {/* Mostrar error de email */}
        </div>
        <div>
          <label htmlFor="password" className="block mb-1 font-semibold">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-[var(--color-yellow)]"
          />
          {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>} {/* Mostrar error de contraseña */}
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
            className="btn px-4 py-2 rounded w-full bg-[var(--color-green)]"
          >
            Create User
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserForm;
