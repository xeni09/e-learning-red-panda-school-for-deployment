import React, { useState, useEffect } from 'react';
import TextInput from './TextInput';
import TextareaInput from './TextareaInput';
import ImageUploader from '../sharedComponents/ImageUploader';
import { categories } from '../sharedComponents/constants'; 
import CustomDropdown from '../adminComponents/CustomDropdown';

const CreateCourseForm = ({ onSubmit, courseToEdit, onCancel }) => {
  const [newCourse, setNewCourse] = useState({
    name: '',
    category: '',
    teacher: '',
    description: '',
    price: '', 
    courseImage: null,
  });

  const [errors, setErrors] = useState({}); 
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (courseToEdit) {
      setNewCourse({
        name: courseToEdit.name || '',
        category: courseToEdit.category || '',
        teacher: courseToEdit.teacher || '',
        description: courseToEdit.description || '',
        price: courseToEdit.price || '',
        courseImage: courseToEdit.imageSrc || null, 
      });
    }
  }, [courseToEdit]);

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
    if (isSubmitted) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  // Manejar el cambio de archivo
  const handleFileChange = (file) => {
    setNewCourse({ ...newCourse, courseImage: file });
    if (isSubmitted) {
      setErrors({ ...errors, courseImage: '' });
    }
  };

  // Manejar el cambio de categoría con CustomDropdown
  const handleCategoryChange = (selectedCategory) => {
    setNewCourse({ ...newCourse, category: selectedCategory });
    if (isSubmitted) {
      setErrors({ ...errors, category: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    const newErrors = {};
  
    // Validaciones
    if (!newCourse.name) newErrors.name = "Course name is required.";
    if (!newCourse.category) newErrors.category = "Category is required.";
    if (!newCourse.teacher) newErrors.teacher = "Teacher name is required.";
    if (!newCourse.description) newErrors.description = "Description is required.";
    if (!newCourse.price) {
      newErrors.price = "Price is required.";
    } else if (isNaN(newCourse.price)) {
      newErrors.price = "Price must be a number.";
    }
    if (!newCourse.courseImage) {
      newErrors.courseImage = "Course image is required.";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Formatear el curso asegurando que el precio sea un número
    const formattedCourse = {
      ...newCourse,
      price: parseFloat(newCourse.price), 
    };

    // Crear FormData para enviar al backend
    const formData = new FormData();
    formData.append("name", formattedCourse.name);
    formData.append("category", formattedCourse.category);
    formData.append("teacher", formattedCourse.teacher);
    formData.append("description", formattedCourse.description);
    formData.append("price", formattedCourse.price);
    
    if (formattedCourse.courseImage instanceof File) {
      formData.append("courseImage", formattedCourse.courseImage);
    }

    console.log("FormData before submitting:", [...formData.entries()]);

    onSubmit(formData);  // Enviar los datos al backend
  };

  // Formatear opciones de categoría para CustomDropdown
  const categoryOptions = categories.map(category => ({ value: category, label: category }));

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
      <div>
        <TextInput
          label="Course Name*"
          name="name"
          value={newCourse.name}
          onChange={handleInputChange}
          error={errors.name}
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold w-full">Category*</label>
        <CustomDropdown
          options={categoryOptions}
          selectedOption={newCourse.category}
          onOptionSelect={handleCategoryChange}
        />
        {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
      </div>
      <div>
        <TextInput
          label="Teacher Name*"
          name="teacher"
          value={newCourse.teacher}
          onChange={handleInputChange}
          error={errors.teacher}
        />
      </div>
      <div>
        <TextInput
          label="Price*"
          name="price"
          type="number"
          value={newCourse.price}
          onChange={handleInputChange}
          error={errors.price}
        />
      </div>
      <div className="md:col-span-2">
        <TextareaInput
          label="Description*"
          name="description"
          value={newCourse.description}
          onChange={handleInputChange}
          error={errors.description}
        />
      </div>
      <div className="md:col-span-2 my-2">
        <ImageUploader onFileChange={handleFileChange} />
        {errors.courseImage && <p className="text-red-500 text-sm">{errors.courseImage}</p>}
      </div>
      <div className="md:col-span-2 flex justify-between mt-4">
        <button type="submit" className="btn px-4 py-2 rounded bg-[var(--color-green)]">
          {courseToEdit ? 'Save Changes' : 'Create Course'}
        </button>
        <button type="button" onClick={onCancel} className="btn bg-gray-500 text-white">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateCourseForm;
