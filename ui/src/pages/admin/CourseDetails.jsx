import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../../services/axiosConfig';
import SectionsList from '../../components/courseComponents/SectionsList'; // Manteniendo secciones

const CourseDetails = () => {
  const { courseId } = useParams(); // Obtener el ID del curso desde la URL
  const [courseData, setCourseData] = useState(null); // Estado para los datos del curso
  const [sections, setSections] = useState([]); // Para las secciones del curso (puedes adaptarlo)

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`/api/courses/${courseId}`);
        console.log('Course data fetched:', response.data); // Verifica la imagen
        setCourseData(response.data);
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };
  
    fetchCourseDetails();
  }, [courseId]);
  

  // Muestra un mensaje de carga mientras los datos del curso se obtienen
  if (!courseData) {
    return <p>Loading course details...</p>;
  }

  return (
    <div className="container mx-auto p-4 pt-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Course Details</h1>
        <Link to="/admin/manage-courses" className="text-[var(--color-orange)] hover:underline">
          &larr; Back to Courses List
        </Link>
      </div>

      {/* Mostrar la imagen en full width */}
      <div className="mb-6">
      <img
    src={`http://localhost:3000${courseData.imageSrc}`} // Concatenar la URL base del servidor
    alt={courseData.name}
    className="w-full h-auto object-cover rounded-md"
  />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-md rounded-lg p-6 mb-6">
        <div>
          <label className="block mb-2 font-medium text-gray-700">Course Name</label>
          <p className="border px-4 py-2 w-full rounded-md bg-gray-100">{courseData.name}</p>
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Category</label>
          <p className="border px-4 py-2 w-full rounded-md bg-gray-100">{courseData.category}</p>
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Teacher Name</label>
          <p className="border px-4 py-2 w-full rounded-md bg-gray-100">{courseData.teacher}</p>
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Price</label>
          <p className="border px-4 py-2 w-full rounded-md bg-gray-100">{`${courseData.price} €`}</p>
        </div>
      </div>

      {/* Mantener la funcionalidad para añadir secciones */}
      <SectionsList sections={sections} />
    </div>
  );
};

export default CourseDetails;
