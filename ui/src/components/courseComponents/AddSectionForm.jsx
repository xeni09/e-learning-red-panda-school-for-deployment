import React, { useState } from 'react';
import CourseImageUploadAndCrop from '../../components/courseComponents/CourseImageUploadAndCrop';

const AddSectionForm = ({ newSection, setNewSection, handleAddSection }) => {
  const [croppingImage, setCroppingImage] = useState(null); // Imagen para recortar
  const [croppedImage, setCroppedImage] = useState(null); // Imagen recortada final

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSection((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setCroppingImage(reader.result); // Mostrar la imagen cargada para recortar
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = (croppedImageUrl) => {
    setCroppedImage(croppedImageUrl); // Guardar la imagen recortada final
    setCroppingImage(null); // Limpiar la imagen cargada para recortar
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleAddSection({ ...newSection, thumbnail: croppedImage }); // Pasar los datos de la sección con la imagen recortada
  };

  return (
    <form onSubmit={handleFormSubmit} className="mb-6">
      <h3 className="text-2xl font-semibold mb-4">Add New Section</h3>

      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-700">Section Title</label>
        <input 
          type="text" 
          name="title"
          value={newSection.title}
          onChange={handleInputChange}
          className="border px-4 py-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-700">Description</label>
        <textarea 
          name="description"
          value={newSection.description}
          onChange={handleInputChange}
          className="border px-4 py-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-700">Video URL (simulación)</label>
        <input 
          type="text" 
          name="videoUrl"
          value={newSection.videoUrl}
          onChange={handleInputChange}
          className="border px-4 py-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Componente de subida y recorte de imagen */}
      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-700">Upload Section Image</label>
        <CourseImageUploadAndCrop
          handleFileChange={handleFileChange}
          handleCropComplete={handleCropComplete}
          croppingImage={croppingImage}
          croppedImage={croppedImage}
          errors={{}} // Pasar los errores si es necesario
        />
      </div>

      <button 
        type="submit" 
        className="btn"
      >
        Add Section
      </button>
    </form>
  );
};

export default AddSectionForm;
