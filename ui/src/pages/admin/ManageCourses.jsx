import React, { useEffect, useState } from 'react';
import axios from '../../services/axiosConfig';
import AdminSubMenu from '../../components/adminComponents/AdminSubMenu';
import CourseList from '../../components/courseComponents/CourseList';
import CreateCourseForm from '../../components/courseComponents/CreateCourseForm';

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null); // Para manejar la edición
  const [showForm, setShowForm] = useState(false); // Controlar el formulario de edición
  const [showCreateCourseForm, setShowCreateCourseForm] = useState(false); // Controlar el formulario de creación

  const toggleForm = () => {
    setShowCreateCourseForm(prevState => !prevState);  // Alternar el formulario de creación
  };

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

  const handleCreateCourse = async (formData) => { // Recibimos formData directamente
    try {
      console.log([...formData.entries()]); // Verifica el contenido de FormData antes de enviarlo
  
      if (selectedCourse) {
        // Si estamos editando un curso
        const response = await axios.put(`/api/courses/${selectedCourse._id}`, formData, {
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
  
      toggleForm();  // Ocultar el formulario después de crear/editar el curso
    } catch (error) {
      if (error.response) {
        console.error('Error en la respuesta del servidor:', error.response.data);
      } else if (error.request) {
        console.error('No se recibió respuesta del servidor:', error.request);
      } else {
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
    setShowForm(true); // Mostrar el formulario de edición
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedCourse(null);
  };

  return (
    <>
      <AdminSubMenu />
      <div className="container mx-auto p-4 pt-20">
        <h1 className="text-3xl font-bold mb-6">Manage Courses</h1>

        <CourseList
          courses={courses}
          onDeleteCourse={handleDeleteCourse}
          onEditCourse={handleEditCourse}
          toggleForm={toggleForm} // Pasamos la función para controlar el botón de creación
          showCreateCourseForm={showCreateCourseForm} // Estado para alternar el texto del botón
          handleCreateCourse={handleCreateCourse} // Para manejar la creación del curso
          selectedCourse={selectedCourse} // Para pasar el curso seleccionado para edición
          handleCancel={handleCancel} // Función para cancelar el formulario
        />

        
      </div>
    </>
  );
};

export default ManageCourses;
