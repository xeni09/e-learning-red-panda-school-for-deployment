import React, { useState } from 'react';
import VideoModal from '../../components/sharedComponents/VideoModal';
import SectionItem from './SectionItem';

const CourseSectionsList = ({ sections, onEditSection, onDeleteSection }) => {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');

  const handleSaveClick = (updatedSection, index) => {
    onEditSection(updatedSection, index); // Guardar sección editada
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
      <h2 className="text-2xl font-semibold my-4">Course Sections</h2>

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
