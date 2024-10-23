import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../../services/axiosConfig';
import AdminSubMenu from '../../components/adminComponents/AdminSubMenu'; 
import SectionInfo from '../../components/courseSectionComponents/SectionInfo';
import CourseSectionsList from '../../components/courseSectionComponents/CourseSectionsList'; 

const CourseSectionDetails = () => {
  const { courseId, sectionId } = useParams();
  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState([]); // Para manejar las secciones
  const [currentSection, setCurrentSection] = useState(null); // Maneja la sección actual

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get(`/api/courses/${courseId}`);
        const allSections = response.data.sections || [];

        // Encuentra la sección actual basada en el sectionId
        const current = allSections.find(section => section._id === sectionId);
        setCurrentSection(current);

        // Mantener todas las secciones, incluidas las actuales
        setSections(allSections);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching course or section details:', error);
        setLoading(false);
      }
    };

    fetchSections();
  }, [courseId, sectionId]);

  // Función para actualizar una sección específica en la lista de secciones
  const handleSectionUpdate = (updatedSection) => {
    const updatedSections = sections.map((section) =>
      section._id === updatedSection._id ? updatedSection : section
    );
    setSections(updatedSections);

    // Si la sección actual es la que se actualizó, también actualizamos el estado de la sección actual
    if (updatedSection._id === sectionId) {
      setCurrentSection(updatedSection);
    }
  };

  if (loading) {
    return <p>Loading section details...</p>;
  }

  return (
    <>
      <AdminSubMenu />

      <div className="container mx-auto p-4 pt-20">
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center w-full pb-10">
          <h2 className="">Section Details <span className='text-lg'>(Editor view)</span></h2>
          
          <Link to={`/admin/manage-courses/${courseId}`} className="text-[var(--color-orange)] hover:underline">
            &larr; Back to Course Details
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {/* Muestra la información de la sección actual */}
            {currentSection && (
              <SectionInfo 
                courseId={courseId} 
                sectionId={sectionId} 
                onSectionUpdate={handleSectionUpdate} // Pasamos la función para actualizar la sección
              />
            )}
          </div>

          <div>
            {/* Lista de todas las secciones, incluidas la sección actual */}
            {sections.length > 0 && (
              <CourseSectionsList 
                sections={sections}
                currentSectionId={sectionId}  // Pasamos el ID de la sección actual
                onEditSection={handleSectionUpdate} // Pasamos la función para actualizar la lista de secciones
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseSectionDetails;
