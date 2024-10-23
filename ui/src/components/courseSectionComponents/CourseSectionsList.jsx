import React, { useState } from 'react';
import VideoModal from '../sharedComponents/VideoModal';
import SectionItem from './SectionItem';
import axios from '../../services/axiosConfig';
import { useParams } from 'react-router-dom';

const CourseSectionsList = ({ sections, onEditSection, onDeleteSection, currentSectionId }) => {
  const { courseId } = useParams(); 
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');

  const handleSaveClick = async (updatedSection, index) => {
    const formData = new FormData();
  
    formData.append('title', updatedSection.title);
    formData.append('description', updatedSection.description);
    formData.append('videoUrl', updatedSection.videoUrl);
  
    if (updatedSection.sectionImage instanceof File) {
      formData.append('sectionImage', updatedSection.sectionImage);
    } else if (updatedSection.sectionImage) {
      formData.append('sectionImage', updatedSection.sectionImage); // Mantener la URL de la imagen existente
    } else {
      formData.append('sectionImage', 'remove'); // Marcar la imagen como eliminada
    }
  
    try {
      const response = await axios.put(
        `/api/courses/${courseId}/sections/${updatedSection._id}`,
        formData
      );
  
      onEditSection(response.data, index);  // Actualizar la sección en el estado global
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
      <p className="text-3xl font-semibold mb-4">Course Sections</p>

      {sections.map((section, index) => (
        <SectionItem
          key={index}
          section={section}
          isActive={section._id === currentSectionId} // Comparar la sección actual con la que está seleccionada
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
