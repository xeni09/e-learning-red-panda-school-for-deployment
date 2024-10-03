import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../../services/axiosConfig';
import CourseInfo from '../../components/courseComponents/CourseInfo'; 
import CourseSectionsList from '../../components/courseComponents/CourseSectionsList'; 
import AddSectionForm from '../../components/courseComponents/AddSectionForm'; 
import AdminSubMenu from '../../components/adminComponents/AdminSubMenu'; 

const CourseDetails = () => {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [sections, setSections] = useState([]);
  const [newSection, setNewSection] = useState({ title: '', description: '', videoUrl: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [showAddSectionForm, setShowAddSectionForm] = useState(false); // Estado para controlar la visibilidad del formulario

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`/api/courses/${courseId}`);
        setCourseData(response.data);
        setSections(response.data.sections || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching course details:", error);
        setIsLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const handleAddSection = async (formData) => {
    try {
      // Aquí se envía una solicitud POST a la ruta para agregar una nueva sección
      const response = await axios.post(`/api/courses/${courseId}/sections`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // Actualiza el estado con las nuevas secciones devueltas por el servidor
      setSections([...sections, response.data]);
  
      // Limpiar el formulario
      setNewSection({ title: '', description: '', videoUrl: '' });
      setShowAddSectionForm(false); // Ocultar el formulario después de agregar la sección
    } catch (error) {
      console.error('Error adding section:', error);
    }
  };
  

  const handleEditSection = async (updatedSection, index) => {
    try {
      const updatedSections = [...sections];
      updatedSections[index] = updatedSection;
  
      const formData = new FormData();
      formData.append("title", updatedSection.title);
      formData.append("description", updatedSection.description);
      formData.append("videoUrl", updatedSection.videoUrl);
  
      // Si hay una imagen recortada, añádela al FormData
      if (updatedSection.thumbnail instanceof File) {
        formData.append("thumbnail", updatedSection.thumbnail);
      }
  
      await axios.put(`/api/courses/${courseId}/sections/${updatedSection._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      setSections(updatedSections);
    } catch (error) {
      console.error('Error updating section:', error);
    }
  };
  

  const handleDeleteSection = async (index) => {
    try {
      const updatedSections = sections.filter((_, i) => i !== index);
      const updatedCourse = { ...courseData, sections: updatedSections };

      await axios.put(`/api/courses/${courseId}`, updatedCourse);

      setSections(updatedSections);
    } catch (error) {
      console.error('Error deleting section:', error);
    }
  };

  if (isLoading) {
    return <p>Loading course details...</p>;
  }

  return (
    <>
      <AdminSubMenu /> 

      <div className="container mx-auto p-4 pt-20">
        <div className="flex justify-between items-center mb-6">
          <h1 className="">Course Details <span className='text-lg'>(Editor view)</span></h1>
          
          <Link to="/admin/manage-courses" className="text-[var(--color-orange)] hover:underline">
            &larr; Back to Courses List
          </Link>
        </div>
      <div className='mb-10'>
      <p className="text-lg">To add a video to a section, you can use the following videos as a reference (copyright free):</p>


        <a href="https://www.youtube.com/watch?v=RK1RRVR9A2g&t=9s" className="text-[var(--color-orange)] hover:underline">https://www.youtube.com/watch?v=RK1RRVR9A2g&t=9s</a>
        <br />
        <a href="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4" className="text-[var(--color-orange)] hover:underline">https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4</a>

      </div>



        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <CourseInfo courseId={courseId} />
          </div>

          <div>
            <CourseSectionsList 
              sections={sections}
              onEditSection={handleEditSection} 
              onDeleteSection={handleDeleteSection} 
            />

            <button
              onClick={() => setShowAddSectionForm(!showAddSectionForm)}
              className="btn-orange"
            >
              {showAddSectionForm ? 'Hide Section Form' : 'Add New Section'}
            </button>

            {showAddSectionForm && (
  <AddSectionForm 
    handleAddSection={handleAddSection}
  />
)}

          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
