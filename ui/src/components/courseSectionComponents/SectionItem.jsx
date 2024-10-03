import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import VideoModal from '../sharedComponents/VideoModal';
import CourseImageUploadAndCrop from '../courseComponents/CourseImageUploadAndCrop';

const getYouTubeVideoId = (url) => {
  if (!url) return null; // Si la URL es nula o vacía, retorna null

  const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

const SectionItem = ({ section, onEditClick, onDeleteClick, onSaveClick }) => {
  const { courseId } = useParams();
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedSection, setEditedSection] = useState(section);
  const [croppingImage, setCroppingImage] = useState(null); // Imagen para recortar
  const [croppedImage, setCroppedImage] = useState(section.thumbnail || null); // Imagen recortada
  const [temporaryImage, setTemporaryImage] = useState(null);

  const videoId = getYouTubeVideoId(section.videoUrl); // Obtener el ID de YouTube, si existe

  const thumbnailUrl = croppedImage 
  ? croppedImage 
  : videoId
  ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
  : section.thumbnail || 'https://via.placeholder.com/150?text=No+Thumbnail';


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
    const updatedSection = {
      ...editedSection,
      thumbnail: temporaryImage || croppedImage || section.thumbnail, // Usar la imagen recortada o la original
    };
    onSaveClick(updatedSection); // Pasar la sección actualizada al padre
    setIsEditing(false);
  };
  
  

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedSection(section);
    setCroppedImage(section.thumbnail); // Restablecer la imagen si se cancela la edición
  };

  // Manejar la carga de archivos
  const handleFileChange = (file) => {
    setCroppingImage(file); 
  };
  

  // Manejar la imagen recortada
  const handleCropComplete = (croppedImageUrl) => {
    setCroppedImage(croppedImageUrl); // Guardar la imagen recortada final
    setCroppingImage(null); // Limpiar la imagen cargada para recortar
  };

  // Confirmación antes de eliminar
  const handleDeleteClick = () => {
    const confirmed = window.confirm("Are you sure you want to delete this section?");
    if (confirmed) {
      onDeleteClick(); // Llamar a la función de eliminación si el usuario confirma
    }
  };

  return (
    <div className="flex flex-col md:flex-row border border-gray-300 p-4 mb-4 bg-white rounded-md shadow-sm">
      <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-4">
        {section.videoUrl || croppedImage ? (
          <img
            src={thumbnailUrl}
            alt="Video Thumbnail"
            className="w-full md:w-32 h-auto md:h-24 object-cover rounded-md cursor-pointer"
            onClick={() => setIsEditing(true)}
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
            <label htmlFor="title" className="block text-gray-700 font-medium">Title:</label>
            <input
              type="text"
              name="title"
              value={editedSection.title}
              onChange={handleInputChange}
              className="border-gray-200 px-4 py-2 w-full bg-gray-100 rounded-md"
            />

            <div>
              <label htmlFor="description" className="block text-gray-700 mt-2 font-medium">Description:</label>
              <textarea
                name="description"
                value={editedSection.description}
                onChange={handleInputChange}
                className="border-gray-200 px-4 py-2 w-full bg-gray-100 rounded-md"
              />
            </div>

            <label htmlFor="videoUrl" className="block text-gray-700 font-medium mt-1">Video URL</label>
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
              setTemporaryImage={setTemporaryImage}
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
            <label htmlFor="description" className="block text-gray-700 mt-2 text-xs">Title</label>
            <h3 className="text-xl font-semibold text-gray-800">{section.title}</h3>
            <label htmlFor="description" className="block text-gray-700 mt-2 text-xs">Description</label>
            <p className="text-gray-600 bg-gray-100 p-3 rounded-md mb-6" style={{ whiteSpace: 'pre-wrap' }}>
              {section.description}
            </p>
            <label htmlFor="description" className="block text-gray-700 mt-2 text-xs">Video</label>
            {section.videoUrl && (
              <button onClick={handleWatchVideoClick} className="block text-[var(--color-orange)] hover:underline">
                Watch Video
              </button>
            )}

<Link to={`/admin/manage-courses/${courseId}/section/${section._id}`} className='btn'>
  Go to Section
</Link>


            <button onClick={() => setIsEditing(true)} className="btn ml-0">
              Quick Edit
            </button>
            <button onClick={handleDeleteClick} className="btn-delete ml-0">
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