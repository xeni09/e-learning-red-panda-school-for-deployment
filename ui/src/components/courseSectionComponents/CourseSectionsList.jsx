import React, { useState } from 'react';
import VideoModal from '../sharedComponents/VideoModal';
import SectionItem from './SectionItem';
import axios from 'axios';
import { useParams } from 'react-router-dom';



const CourseSectionsList = ({ sections, onEditSection, onDeleteSection }) => {
  const { courseId } = useParams(); 
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');

  const handleSaveClick = async (updatedSection, index) => {
    const formData = new FormData();

    formData.append('title', updatedSection.title);
    formData.append('description', updatedSection.description);
    formData.append('videoUrl', updatedSection.videoUrl);

    if (updatedSection.thumbnail instanceof File) {
      formData.append('thumbnail', updatedSection.thumbnail);
    }

    try {
      await axios.put(`/api/courses/${courseId}/sections/${updatedSection._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Ya no necesitas actualizar `sectionList`, porque el componente padre actualizará las secciones
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
