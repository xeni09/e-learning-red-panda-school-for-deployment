import React, { useState, useEffect } from 'react';
import CustomDropdown from '../../components/adminComponents/CustomDropdown'; // Si tienes un dropdown para categorías
import { categories } from '../sharedComponents/constants'; // Las categorías predefinidas
import axios from '../../services/axiosConfig';

const CourseInfo = ({ courseId }) => {
  const [courseData, setCourseData] = useState(null); // Estado para los datos del curso
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar el modo edición

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`/api/courses/${courseId}`);
        setCourseData(response.data);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };
    fetchCourseDetails();
  }, [courseId]);

  // Manejar cambios en los campos de edición
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Guardar los cambios
  const handleSaveChanges = async () => {
    try {
      await axios.put(`/api/courses/${courseId}`, courseData);
      setIsEditing(false); // Salir del modo de edición
    } catch (error) {
      console.error('Error saving course details:', error);
    }
  };

  // Cancelar edición
  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  if (!courseData) {
    return <p>Loading course details...</p>; // Mostrar un mensaje de carga mientras los datos se obtienen
  }

  return (
    <div>
      {/* Mostrar la imagen en full width */}
      <div className="mb-6">
        <img
          src={`http://localhost:3000${courseData.imageSrc}`} // Concatenar la URL base del servidor
          alt={courseData.name}
          className="w-full h-auto object-cover rounded-md"
        />
      </div>

      {/* Mostrar la información en dos columnas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-md rounded-lg p-6 mb-6">
        <div>
          <label className="block mb-2 font-medium text-gray-700">Course Name</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={courseData.name}
              onChange={handleInputChange}
              className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          ) : (
            <p className="border px-4 py-2 w-full rounded-md bg-gray-100">{courseData.name}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Category</label>
          {isEditing ? (
            <CustomDropdown
              options={categories.map(cat => ({ value: cat, label: cat }))}
              selectedOption={courseData.category}
              onOptionSelect={(value) => setCourseData({ ...courseData, category: value })}
            />
          ) : (
            <p className="border px-4 py-2 w-full rounded-md bg-gray-100">{courseData.category}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Teacher Name</label>
          {isEditing ? (
            <input
              type="text"
              name="teacher"
              value={courseData.teacher}
              onChange={handleInputChange}
              className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          ) : (
            <p className="border px-4 py-2 w-full rounded-md bg-gray-100">{courseData.teacher}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Price</label>
          {isEditing ? (
            <div className="relative">
              <input
                type="number"
                name="price"
                value={courseData.price}
                onChange={handleInputChange}
                className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300 pr-8"
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">€</span>
            </div>
          ) : (
            <p className="border px-4 py-2 w-full rounded-md bg-gray-100">{`${courseData.price} €`}</p>
          )}
        </div>

        {/* Campo de Descripción */}
<div className="col-span-1 md:col-span-2">
  <label className="block mb-2 font-medium text-gray-700">Description</label>
  {isEditing ? (
    <textarea
      name="description"
      value={courseData.description}
      onChange={handleInputChange}
      className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300"
    />
  ) : (
    <p className="border px-4 py-2 w-full rounded-md bg-gray-100" style={{ whiteSpace: 'pre-line' }}>
      {courseData.description}
    </p>
  )}
</div>

      </div>

      {/* Botones para editar o guardar cambios */}
      <div className="flex justify-start space-x-4">
        {isEditing ? (
          <>
            <button
              onClick={handleSaveChanges}
              className="btn-save "
            >
              Save Changes
            </button>
            <button
              onClick={handleCancelEdit}
              className="btn-cancel"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="btn transition duration-300"
          >
            Edit Course
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseInfo;
