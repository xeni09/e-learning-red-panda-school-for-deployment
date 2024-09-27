import React, { useEffect, useState } from 'react';
import axios from '../../services/axiosConfig';
import AdminSubMenu from '../../components/adminComponents/AdminSubMenu';
import CourseList from '../../components/courseComponents/CourseList';
import CourseForm from '../../components/courseComponents/CourseForm';

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null); // Para manejar la edición
  const [showForm, setShowForm] = useState(false); // Controlar el formulario de creación

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/api/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleCreateCourse = async (courseData) => {
    try {
      const formData = new FormData();
      
      // Añadir datos al FormData
      Object.keys(courseData).forEach(key => {
        formData.append(key, courseData[key]);
      });
  
      // Log para revisar el contenido del FormData
      console.log([...formData.entries()]);
  
      if (selectedCourse) {
        // Si estamos editando un curso
        await axios.put(`/api/courses/${selectedCourse._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setCourses(courses.map(course => 
          course._id === selectedCourse._id ? { ...course, ...courseData } : course));
        setSelectedCourse(null);
      } else {
        // Crear nuevo curso
        const response = await axios.post('/api/courses', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setCourses([...courses, response.data]);
      }
      setShowForm(false); // Ocultar el formulario después de crear/editar
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un estado fuera del rango 2xx
        console.error('Error en la respuesta del servidor:', error.response.data);
      } else if (error.request) {
        // La solicitud fue hecha pero no hubo respuesta
        console.error('No se recibió respuesta del servidor:', error.request);
      } else {
        // Algo sucedió al configurar la solicitud que provocó un error
        console.error('Error en la solicitud:', error.message);
      }
    }
  };
  
  
  

  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`/api/courses/${courseId}`);
      setCourses(courses.filter(course => course._id !== courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleEditCourse = (course) => {
    setSelectedCourse(course); // Pasar el curso a editar
    setShowForm(true); // Mostrar el formulario
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedCourse(null);
  };

  return (
    <>
      <AdminSubMenu />
      <div className="container mx-auto p-4 pt-20">
        <CourseList
          courses={courses}
          onDeleteCourse={handleDeleteCourse}
          onEditCourse={handleEditCourse}
          setShowForm={setShowForm} // Pasamos el control de mostrar el formulario
        />
        {showForm && (
          <CourseForm
            onSubmit={handleCreateCourse}
            courseToEdit={selectedCourse}
            onCancel={handleCancel}
          />
        )}
      </div>
    </>
  );
};

export default ManageCourses;
