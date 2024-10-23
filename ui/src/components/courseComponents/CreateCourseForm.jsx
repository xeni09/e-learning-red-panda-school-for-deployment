import React, { useState, useEffect } from 'react';
import CourseFormFields from './CourseFormFields';
import CourseImageUploadAndCrop from './CourseImageUploadAndCrop';

const CreateCourseForm = ({ onSubmit, courseToEdit, onCancel }) => {
  const [newCourse, setNewCourse] = useState({
    name: '',
    category: '',
    teacher: '',
    description: '',
    price: '',
    courseImage: null,
  });

  const [temporaryImage, setTemporaryImage] = useState(null); // Estado para la imagen temporal
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
    if (isSubmitted) {
      setErrors({ ...errors, [name]: '' });
    }
  };

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

    if (!newCourse.name) newErrors.name = "Course name is required.";
    if (!newCourse.category) newErrors.category = "Category is required.";
    if (!newCourse.teacher) newErrors.teacher = "Teacher name is required.";
    if (!newCourse.description) newErrors.description = "Description is required.";
    if (!newCourse.price) {
      newErrors.price = "Price is required.";
    } else if (isNaN(newCourse.price)) {
      newErrors.price = "Price must be a number.";
    }

    if (!newCourse.courseImage && !temporaryImage) {
      newErrors.courseImage = "Course image is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formattedCourse = {
      ...newCourse,
      price: parseFloat(newCourse.price),
      courseImage: temporaryImage || newCourse.courseImage,
    };

    const formData = new FormData();
    formData.append("name", formattedCourse.name);
    formData.append("category", formattedCourse.category);
    formData.append("teacher", formattedCourse.teacher);
    formData.append("description", formattedCourse.description);
    formData.append("price", formattedCourse.price);

    if (temporaryImage) {
      formData.append("courseImage", temporaryImage); // Añadir imagen temporal si existe
    }

    onSubmit(formData, { withCredentials: true });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
      <CourseFormFields
        newCourse={newCourse}
        handleInputChange={handleInputChange}
        handleCategoryChange={handleCategoryChange}
        errors={errors}
      />

      <CourseImageUploadAndCrop
        errors={errors}
        setTemporaryImage={setTemporaryImage} // Pasar setTemporaryImage para actualizar la imagen temporal
        newCourse={newCourse} 
      />

      <div className="md:col-span-2 flex justify-between mt-4">
        <button type="submit" className="btn-save">
          {courseToEdit ? 'Save Changes' : 'Create Course'}
        </button>
        <button type="button" onClick={onCancel} className="btn-cancel">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateCourseForm;
