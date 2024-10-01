import React, { useState } from 'react';
import VideoModal from '../../components/sharedComponents/VideoModal';
import CourseImageUploadAndCrop from '../../components/courseComponents/CourseImageUploadAndCrop';

const getYouTubeVideoId = (url) => {
  const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

const SectionItem = ({ section, onEditClick, onDeleteClick, onSaveClick }) => {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedSection, setEditedSection] = useState(section);
  const [croppingImage, setCroppingImage] = useState(null); // Imagen para recortar
  const [croppedImage, setCroppedImage] = useState(section.thumbnail || null); // Imagen recortada

  const videoId = getYouTubeVideoId(section.videoUrl);
  const thumbnailUrl = croppedImage || (videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : 'https://via.placeholder.com/150?text=Video'); // Placeholder si no es un video de YouTube

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
    // Guardar la sección con la imagen recortada
    onSaveClick({ ...editedSection, thumbnail: croppedImage });
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedSection(section);
    setCroppedImage(section.thumbnail); // Restablecer la imagen si se cancela la edición
  };

  // Manejar la carga de archivos
  const handleFileChange = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setCroppingImage(reader.result); // Mostrar la imagen cargada para recortar
    };
    reader.readAsDataURL(file);
  };

  // Manejar la imagen recortada
  const handleCropComplete = (croppedImageUrl) => {
    setCroppedImage(croppedImageUrl); // Guardar la imagen recortada final
    setCroppingImage(null); // Limpiar la imagen cargada para recortar
  };

  return (
    <div className="flex flex-col md:flex-row border border-gray-300 p-4 mb-4 bg-white rounded-md shadow-sm">
      <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-4">
        {section.videoUrl ? (
          <img
            src={thumbnailUrl}
            alt="Video Thumbnail"
            className="w-full md:w-32 h-auto md:h-24 object-cover rounded-md cursor-pointer"
            onClick={() => setIsEditing(true)} // Permitir cambiar el thumbnail al hacer clic
          />
        ) : (
          <div className="w-full md:w-32 h-24 bg-gray-200 flex items-center justify-center rounded-md cursor-pointer" onClick={() => setIsEditing(true)}>
            <span>No video</span>
          </div>
        )}
      </div>

      <div className="flex-grow">
        {isEditing ? (
          <>
            <label htmlFor="title" className="block text-gray-700 font-medium">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={editedSection.title}
              onChange={handleInputChange}
              className="border-gray-200 px-4 py-2 w-full bg-gray-100 rounded-md"
            />

            <div>
              <label htmlFor="description" className="block text-gray-700 mt-2 font-medium">
                Description
              </label>
              <textarea
                name="description"
                value={editedSection.description}
                onChange={handleInputChange}
                className="border-gray-200 px-4 py-2 w-full bg-gray-100 rounded-md"
              />
            </div>

            <label htmlFor="videoUrl" className="block text-gray-700 font-medium mt-1">
              Video URL
            </label>
            <input
              type="text"
              placeholder="Video URL"
              name="videoUrl"
              value={editedSection.videoUrl}
              onChange={handleInputChange}
              className="border-gray-200 px-4 py-2 w-full bg-gray-100 rounded-md"
            />

            {/* Componente para subir y recortar la imagen */}
            <CourseImageUploadAndCrop
              handleFileChange={handleFileChange}
              handleCropComplete={handleCropComplete}
              croppingImage={croppingImage}
              croppedImage={croppedImage}
              errors={{}}
            />

            <div className="flex space-x-4 mt-4">
              <button onClick={handleSaveClick} className="btn-save">Save</button>
              <button onClick={handleCancelClick} className="btn-cancel">Cancel</button>
            </div>
          </>
        ) : (
          <>
            <label htmlFor="description" className="block text-gray-700 mt-2 text-xs">
              Title
            </label>
            <h3 className="text-xl font-semibold text-gray-800">{section.title}</h3>
            <label htmlFor="description" className="block text-gray-700 mt-2 text-xs">
              Description
            </label>
            <p className="text-gray-600 bg-gray-100 p-3 rounded-md mb-6" style={{ whiteSpace: 'pre-wrap' }}>
              {section.description}
            </p>
            <label htmlFor="description" className="block text-gray-700 mt-2 text-xs">
              Video
            </label>
            {section.videoUrl && (
              <button onClick={handleWatchVideoClick} className="block text-[var(--color-orange)] hover:underline">
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
