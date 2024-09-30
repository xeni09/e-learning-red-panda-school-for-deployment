import React, { useEffect, useState } from 'react';
import axios from '../../services/axiosConfig';
import AdminSubMenu from '../../components/adminComponents/AdminSubMenu';
import CourseList from '../../components/courseComponents/CourseList';
// import CreateCourseForm from '../../components/courseComponents/CreateCourseForm';

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showCreateCourseForm, setShowCreateCourseForm] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    category: '',
    teacher: '',
    description: '',
    price: '',
  });
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
  
  

  const handleDeleteCourse = async (courseId, shouldDeleteImage) => {
    try {
      await axios.delete(`/api/courses/${courseId}`, { data: { deleteImage: shouldDeleteImage } });
      setCourses(courses.filter(course => course._id !== courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleEditCourse = (course) => {
    setEditingCourseId(course._id); // Establece el curso que se va a editar
    setEditFormData({
      name: course.name,
      category: course.category,
      teacher: course.teacher,
      description: course.description,
      price: course.price,
    });
  };

  const handleSaveChanges = async (courseId) => {
    try {
      const updatedCourse = { ...editFormData };
      console.log("Saving course with ID:", courseId); // <-- Log para verificar el courseId
      await axios.put(`/api/courses/${courseId}`, updatedCourse);
      setCourses(courses.map(course =>
        course._id === courseId ? { ...course, ...updatedCourse } : course
      ));
      setEditingCourseId(null); // Limpiar la edición después de guardar
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };
  

  const handleCancelEdit = () => {
    setEditingCourseId(null);
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
          toggleForm={toggleForm}
          showCreateCourseForm={showCreateCourseForm}
          handleCreateCourse={handleCreateCourse}
          selectedCourse={selectedCourse}
          handleCancel={handleCancel}
          editingCourseId={editingCourseId} // Paso el ID del curso en edición
          editFormData={editFormData}
          setEditFormData={setEditFormData}
          handleSaveChanges={handleSaveChanges} // Función para guardar cambios
          handleCancelEdit={handleCancelEdit} // Función para cancelar la edición
        />
      </div>
    </>
  );
};

export default ManageCourses;