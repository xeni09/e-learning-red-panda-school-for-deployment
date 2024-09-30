import React, { useState, useEffect } from 'react';
import CustomDropdown from '../../components/adminComponents/CustomDropdown';
import { categories } from '../sharedComponents/constants';
import axios from '../../services/axiosConfig'; // Asegúrate de tener esto configurado

const CourseInfo = ({ courseId }) => {
  const [courseData, setCourseData] = useState({
    name: '',
    category: '',
    teacher: '',
    price: '',
    imageUrl: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  // Cargar la información del curso cuando el componente se monta
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`/api/courses/${courseId}`);
        console.log('Course data fetched:', response.data); // Añade este log para verificar los datos
        setCourseData(response.data);
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };
  
    fetchCourseDetails();
  }, [courseId]);
  

  // Manejar los cambios en los campos del formulario
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

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-semibold mb-4">Course Information</h2>

      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-700">Course Name</label>
        <input
          type="text"
          name="name"
          value={courseData.name}
          onChange={handleInputChange}
          disabled={!isEditing}
          className={`border px-4 py-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300 ${isEditing ? '' : 'bg-gray-100'}`}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-700">Category</label>
        {isEditing ? (
          <CustomDropdown
            options={categories.map(cat => ({ value: cat, label: cat }))}
            selectedOption={courseData.category}
            onOptionSelect={(value) => setCourseData({ ...courseData, category: value })}
          />
        ) : (
          <input
            type="text"
            name="category"
            value={courseData.category}
            disabled
            className="border px-4 py-2 w-full rounded-md bg-gray-100"
          />
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-700">Teacher</label>
        <input
          type="text"
          name="teacher"
          value={courseData.teacher}
          onChange={handleInputChange}
          disabled={!isEditing}
          className={`border px-4 py-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300 ${isEditing ? '' : 'bg-gray-100'}`}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-700">Price</label>
        <div className="relative">
          <input
            type="text"
            name="price"
            value={courseData.price}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`border px-4 py-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300 pr-8 ${isEditing ? '' : 'bg-gray-100'}`}
          />
          <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">€</span>
        </div>
      </div>

      {/* Mostrar la imagen del curso */}
      {courseData.imageUrl && (
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">Course Image</label>
          <img
            src={courseData.imageUrl}
            alt={courseData.name}
            className="w-32 h-32 object-cover rounded-md"
          />
        </div>
      )}

      {/* Botones de editar/guardar */}
      <div className="flex justify-end space-x-4">
        {isEditing ? (
          <>
            <button
              onClick={handleSaveChanges}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500 transition duration-300"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Edit Course
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseInfo;
