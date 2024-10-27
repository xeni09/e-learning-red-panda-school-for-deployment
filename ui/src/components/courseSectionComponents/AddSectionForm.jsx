import React, { useState, useEffect } from 'react';
import SectionImageUploadAndCrop from './SectionImageUploadAndCrop';

const AddSectionForm = ({ handleAddSection, sectionToEdit }) => {
  const [newSection, setNewSection] = useState({
    title: '',
    description: '',
    videoUrl: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [temporaryImage, setTemporaryImage] = useState(null);

  useEffect(() => {
    if (sectionToEdit) {
      setNewSection({
        title: sectionToEdit.title || '',
        description: sectionToEdit.description || '',
        videoUrl: sectionToEdit.videoUrl || '',
      });
      setTemporaryImage(sectionToEdit.sectionImage || null);
    }
  }, [sectionToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSection({ ...newSection, [name]: value });
    if (isSubmitted) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const newErrors = {};

    if (!newSection.title) newErrors.title = "Section title is required.";
    if (!newSection.description) newErrors.description = "Description is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();
    formData.append("title", newSection.title);
    formData.append("description", newSection.description);
    formData.append("videoUrl", newSection.videoUrl);

    if (temporaryImage) {
      formData.append("sectionImage", temporaryImage);
    }

    handleAddSection(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-white rounded-md p-4">
      <p className="text-2xl font-semibold mb-4">Add New Section</p>

      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-700">Section Title*</label>
        <input 
          type="text" 
          name="title"
          value={newSection.title}
          onChange={handleInputChange}
          className={`field ${errors.title ? 'border-red-500' : ''}`}
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-700">Section Description*</label>
        <textarea 
          name="description"
          value={newSection.description}
          onChange={handleInputChange}
          className={`field p-3 ${errors.description ? 'border-red-500' : ''}`}
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-700">Video URL (optional)</label>
        <input 
          type="text" 
          name="videoUrl"
          value={newSection.videoUrl}
          onChange={handleInputChange}
          className="field"
        />
      </div>

      <SectionImageUploadAndCrop
        setTemporaryImage={setTemporaryImage} // Actualizar la imagen seleccionada
        errors={errors}
      />

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
