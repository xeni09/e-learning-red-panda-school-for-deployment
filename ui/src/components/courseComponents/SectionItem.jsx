import React, { useState } from 'react';
import VideoModal from '../../components/sharedComponents/VideoModal';

const getYouTubeVideoId = (url) => {
  const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

const SectionItem = ({ section, onEditClick, onDeleteClick, onSaveClick }) => {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Estado de edición
  const [editedSection, setEditedSection] = useState(section); // Estado para manejar los cambios en la sección

  const videoId = getYouTubeVideoId(section.videoUrl);
  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : 'https://via.placeholder.com/150?text=Video';

  const handleWatchVideoClick = () => {
    setShowVideoModal(true);
  };

  const handleCloseModal = () => {
    setShowVideoModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedSection((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    onSaveClick(editedSection); // Llama a la función de guardado
    setIsEditing(false); // Salir del modo edición
  };

  const handleCancelClick = () => {
    setIsEditing(false); // Salir del modo edición
    setEditedSection(section); // Revertir cambios
  };

  return (
    <div className="flex border border-gray-300 p-4 mb-4 rounded-md shadow-sm">
      <div className="flex-shrink-0 mr-4">
        {section.videoUrl ? (
          <img
            src={thumbnailUrl}
            alt="Video Thumbnail"
            className="w-32 h-24 object-cover rounded-md"
          />
        ) : (
          <div className="w-32 h-24 bg-gray-200 flex items-center justify-center rounded-md">
            <span>No video</span>
          </div>
        )}
      </div>

      <div className="flex-grow">
        {isEditing ? (
          <>
          <label htmlFor="title" className="block text-gray-700 font-medium ">
                  Title
                </label>
            <input
              type="text"
              name="title"
              value={editedSection.title}
              onChange={handleInputChange}
              className="border px-4 py-2 w-full rounded-md "
            />
             <label htmlFor="description" className="block text-gray-700  mt-2 font-medium ">
                  Description
                </label>
            <textarea
              name="description"
              value={editedSection.description}
              onChange={handleInputChange}
              className="border px-4 py-2 w-full rounded-md "
            />

              <label htmlFor="videoUrl" className="block text-gray-700 font-medium mt-1">
                  Video URL
                </label>
            <input
              type="text"
              placeholder='Video URL'
              name="videoUrl"
              value={editedSection.videoUrl}
              onChange={handleInputChange}
              className="border px-4 py-2 w-full rounded-md mb-2"
            />
            <div className="flex space-x-4">
              <button onClick={handleSaveClick} className="btn-save">Save</button>
              <button onClick={handleCancelClick} className="btn-cancel">Cancel</button>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-xl font-semibold text-gray-800">{section.title}</h3>
            <p className="text-gray-600">{section.description}</p>
            {section.videoUrl && (
              <button
                onClick={handleWatchVideoClick}
                className="block text-[var(--color-orange)] hover:underline mt-2"
              >
                Watch Video
              </button>
            )}
            <button onClick={() => setIsEditing(true)} className="btn ml-0">
              Edit 
            </button>
            <button onClick={onDeleteClick} className="btn-delete ml-0">
              Delete
            </button>
          </>
        )}
      </div>

      {showVideoModal && (
        <VideoModal videoUrl={section.videoUrl} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default SectionItem;
