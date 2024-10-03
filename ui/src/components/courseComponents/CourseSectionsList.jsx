import React, { useState } from 'react';
import VideoModal from '../../components/sharedComponents/VideoModal';
import SectionItem from './SectionItem';
import axios from 'axios';
import { useParams } from 'react-router-dom';



const CourseSectionsList = ({ sections, onEditSection, onDeleteSection }) => {
  const { courseId } = useParams(); 
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');


  const [sectionList, setSectionList] = useState(sections);

  const handleSaveClick = async (updatedSection, index) => {
    const formData = new FormData();

    // Añadir los datos de la sección al formData
    formData.append('title', updatedSection.title);
    formData.append('description', updatedSection.description);
    formData.append('videoUrl', updatedSection.videoUrl);

    // Si hay una imagen recortada, añádela
    if (updatedSection.thumbnail instanceof File) {
      formData.append('thumbnail', updatedSection.thumbnail);
    }

    try {
      // Asegúrate de pasar el courseId y sectionId en la URL de la solicitud
      await axios.put(`/api/courses/${courseId}/sections/${updatedSection._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Actualiza el estado del frontend
      const updatedSections = [...sectionList];
      updatedSections[index] = updatedSection;
      setSectionList(updatedSections); // Actualizar las secciones
    } catch (error) {
      console.error('Error updating section:', error);
    }
  };
  
  
  

  const handleWatchVideoClick = (videoUrl) => {
    setCurrentVideoUrl(videoUrl);
    setShowVideoModal(true);
  };

  const handleCloseModal = () => {
    setShowVideoModal(false);
    setCurrentVideoUrl('');
  };

  return (
    <div>
      <p className="text-3xl font-semibold my-4">Course Sections</p>

      {sectionList.map((section, index) => (
        <SectionItem
          key={index}
          section={section}
          onDeleteClick={() => onDeleteSection(index)}
          onSaveClick={(updatedSection) => handleSaveClick(updatedSection, index)}
        />
      ))}

      {showVideoModal && (
        <VideoModal videoUrl={currentVideoUrl} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default CourseSectionsList;
