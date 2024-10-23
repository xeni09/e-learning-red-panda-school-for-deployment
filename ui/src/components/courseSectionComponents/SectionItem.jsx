import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import VideoModal from '../sharedComponents/VideoModal';
import SectionImageUploadAndCrop from './SectionImageUploadAndCrop';

// Si la URL es nula o vacía, retorna null
const getYouTubeVideoId = (url) => {
  if (!url) return null; 

  const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

const SectionItem = ({ section, onEditClick, onDeleteClick, onSaveClick, isActive }) => {
  const { courseId } = useParams();
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedSection, setEditedSection] = useState(section);
  const [croppingImage, setCroppingImage] = useState(null); 
  const [croppedImage, setCroppedImage] = useState(section.sectionImage || null); 
  const [temporaryImage, setTemporaryImage] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false); // Estado para controlar si está expandido


  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const videoId = getYouTubeVideoId(section.videoUrl);

  const sectionImageUrl = section.sectionImage
    ? section.sectionImage 
    : croppedImage
    ? croppedImage
    : videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : 'https://via.placeholder.com/150?text=No+sectionImage';

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
      sectionImage: temporaryImage || croppedImage || section.sectionImage,
    };
  
    onSaveClick(updatedSection);
    setCroppedImage(updatedSection.sectionImage);

    setIsEditing(false);
  };
  
  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedSection(section);
    setCroppedImage(section.sectionImage); 
  };

  const handleFileChange = (file) => {
    setCroppingImage(file); 
  };

  const handleCropComplete = (croppedImageUrl) => {
    setCroppedImage(croppedImageUrl); 
    setCroppingImage(null); 
  };

  const handleDeleteClick = () => {
    const confirmed = window.confirm("Are you sure you want to delete this section?");
    if (confirmed) {
      onDeleteClick();
    }
  };

  return (
    <div className={`border-md p-4 mb-4 bg-white rounded-md shadow-sm ${isActive ? 'bg-gray-200' : ''}`}> {/* Agregamos una clase para resaltar la sección activa */}
      <div className="flex flex-col md:flex-row border-md ">
        <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-4">
        {(section.videoUrl || croppedImage) && (
  <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-4">
    <img
      src={sectionImageUrl}
      alt="Video sectionImage"
      className="w-full md:w-32 h-auto md:h-24 object-cover rounded-md cursor-pointer"
      onClick={() => setIsEditing(true)}
    />
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

              <label htmlFor="videoUrl" className="block text-gray-700 font-medium mt-1">Video URL (Optional)</label>
              <input
                type="text"
                placeholder="Video URL"
                name="videoUrl"
                value={editedSection.videoUrl}
                onChange={handleInputChange}
                className="border-gray-200 px-4 py-2 w-full bg-gray-100 rounded-md mb-5"
              />

              <SectionImageUploadAndCrop
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
              <label htmlFor="title" className="block text-gray-700 mt-2 text-xs">Title</label>
              <h3 className="text-xl font-semibold text-gray-800">{section.title}</h3>
              <label htmlFor="description" className="block text-gray-700 mt-2 text-xs">Description</label>
              
              

              <p className="text-gray-600 bg-gray-100 py-1 px-3 rounded-md mb-1"
   style={{
    display: isExpanded ? 'block' : '-webkit-box',

     WebkitLineClamp: isExpanded ? 'none' : 2,  // Limitar a 2 líneas cuando no está expandido
     WebkitBoxOrient: 'vertical',
     overflow: isExpanded ? 'visible' : 'hidden',
     
   }}>
  {section.description}
</p>

              


        {/* Botón para expandir o reducir la descripción */}
        <div className="flex justify-end">

        <button 
          onClick={toggleExpand} 
          className="text-[var(--color-orange)] hover:underline"
        >
          {isExpanded ? 'Read less' : 'Read more'}
        </button>
        </div>

              



              <label htmlFor="video" className="block text-gray-700 mt-2 text-xs">Video (optional)</label>
              {section.videoUrl && (
                <button onClick={handleWatchVideoClick} className="block text-[var(--color-orange)] hover:underline mb-2">
                  Watch Video
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {!isEditing && (
        <div className="flex flex-col md:flex-row pt-6">
          <Link to={`/admin/manage-courses/${courseId}/section/${section._id}`} className="btn mt-1 xl:mr-2o">
            Go to Section
          </Link>

          <button onClick={() => setIsEditing(true)} className="btn mt-1 xl:mr-1">
            Quick Edit
          </button>
          <button onClick={handleDeleteClick} className="btn-delete mt-1 xl:mr-2">
            Delete
          </button>
        </div>
      )}

      {showVideoModal && (
        <VideoModal videoUrl={section.videoUrl} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default SectionItem;
