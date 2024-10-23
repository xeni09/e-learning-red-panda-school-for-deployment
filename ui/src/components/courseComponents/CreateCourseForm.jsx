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
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (isSubmitting) return; // Prevent multiple submissions
  
    console.log("Form submitted with values:", newCourse, temporaryImage); // Add logging here
  
    setIsSubmitting(true); // Set submitting to true before proceeding
    setIsSubmitted(true);
  
    const newErrors = {};
  
    // Validation checks (as you already have)
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
      setIsSubmitting(false); // Reset submit state
      return;
    }
  
    const formData = new FormData();
    formData.append("name", newCourse.name);
    formData.append("category", newCourse.category);
    formData.append("teacher", newCourse.teacher);
    formData.append("description", newCourse.description);
    formData.append("price", parseFloat(newCourse.price));
  
    if (temporaryImage) {
      formData.append("courseImage", temporaryImage); // Attach the image to formData
    }
  
    try {
      console.log("FormData about to be submitted:", [...formData.entries()]); // Log the FormData content
  
      await onSubmit(formData, { withCredentials: true });
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      setIsSubmitting(false); // Reset after submission
    }
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
        setTemporaryImage={setTemporaryImage}
        newCourse={newCourse}
      />

      <div className="md:col-span-2 flex justify-between mt-4">
        <button
          type="submit"
          className="btn-save"
          disabled={isSubmitting} // Disable while submitting
        >
          {isSubmitting ? "Submitting..." : courseToEdit ? "Save Changes" : "Create Course"}
        </button>
        <button type="button" onClick={onCancel} className="btn-cancel">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateCourseForm;
