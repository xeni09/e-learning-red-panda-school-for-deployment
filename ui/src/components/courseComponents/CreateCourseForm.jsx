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

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [croppingImage, setCroppingImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

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

  const handleFileChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCroppingImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryChange = (selectedCategory) => {
    setNewCourse({ ...newCourse, category: selectedCategory });
    if (isSubmitted) {
      setErrors({ ...errors, category: '' });
    }
  };

  const handleCropComplete = (croppedImageDataUrl) => {
    setCroppedImage(croppedImageDataUrl);
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
    if (!croppedImage) {
      newErrors.courseImage = "Course image is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formattedCourse = {
      ...newCourse,
      price: parseFloat(newCourse.price),
    };

    const formData = new FormData();
    formData.append("name", formattedCourse.name);
    formData.append("category", formattedCourse.category);
    formData.append("teacher", formattedCourse.teacher);
    formData.append("description", formattedCourse.description);
    formData.append("price", formattedCourse.price);

    if (croppedImage) {
      const blob = dataURLtoBlob(croppedImage);
      formData.append("courseImage", blob, 'croppedImage.jpeg');
    }

    onSubmit(formData);
  };

  const dataURLtoBlob = (dataurl) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
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
        handleFileChange={handleFileChange}
        handleCropComplete={handleCropComplete}
        errors={errors}
        croppingImage={croppingImage}
      />

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
