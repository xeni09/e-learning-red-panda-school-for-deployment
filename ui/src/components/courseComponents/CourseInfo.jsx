import React, { useState, useEffect } from 'react';
import CustomDropdown from '../adminComponents/CustomDropdown';
import { categories } from '../sharedComponents/constants'; 
import axios from '../../services/axiosConfig';
import CourseImageUploadAndCrop from './CourseImageUploadAndCrop'; 

const CourseInfo = ({ courseId }) => {
  const [courseData, setCourseData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingImage, setIsChangingImage] = useState(false);
  const [temporaryImage, setTemporaryImage] = useState(null); // Temporary image as a file

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`/api/courses/${courseId}`);
        setCourseData(response.data);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };
    fetchCourseDetails();
  }, [courseId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append("name", courseData.name);
      formData.append("category", courseData.category);
      formData.append("teacher", courseData.teacher);
      formData.append("description", courseData.description);
      formData.append("price", courseData.price);

      // If a new image was uploaded, add it to the FormData
      if (temporaryImage) {
        formData.append("courseImage", temporaryImage, 'croppedImage.jpeg');
      }

      // Send the request to update the course
      const response = await axios.put(`/api/courses/${courseId}`, formData);
      setCourseData(response.data); // Update with the new course data
      setIsEditing(false);
      setIsChangingImage(false);
    } catch (error) {
      console.error('Error saving course details:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setIsChangingImage(false);
  };

  if (!courseData) {
    return <p>Loading course details...</p>;
  }

  return (
    <div className="bg-white rounded-md">
      <div className="mb-0 p-4">
        <img
          src={
            temporaryImage 
              ? URL.createObjectURL(temporaryImage)
              : `http://localhost:3000${courseData.imageSrc}`
          }
          alt={courseData.name}
          className="w-full h-auto object-cover rounded-md"
        />
      </div>

      {isEditing && (
  <div className="p-4">
    {!isChangingImage && (
      // Directamente mostrar el componente de carga y recorte de imagen
      <CourseImageUploadAndCrop
        errors={{}} 
        setTemporaryImage={(file) => {
          setTemporaryImage(file); 
        }} 
      />
    )}
  </div>
)}


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-md rounded-lg p-6 mb-6">
        <div>
          <label className="block mb-2 font-medium text-gray-700">Course Name</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={courseData.name}
              onChange={handleInputChange}
              className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          ) : (
            <p className="border px-4 py-2 w-full rounded-md bg-gray-100">{courseData.name}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Category</label>
          {isEditing ? (
            <CustomDropdown
              options={categories.map(cat => ({ value: cat, label: cat }))}
              selectedOption={courseData.category}
              onOptionSelect={(value) => setCourseData({ ...courseData, category: value })}
            />
          ) : (
            <p className="border px-4 py-2 w-full rounded-md bg-gray-100">{courseData.category}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Teacher Name</label>
          {isEditing ? (
            <input
              type="text"
              name="teacher"
              value={courseData.teacher}
              onChange={handleInputChange}
              className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          ) : (
            <p className="border px-4 py-2 w-full rounded-md bg-gray-100">{courseData.teacher}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Price</label>
          {isEditing ? (
            <div className="relative">
              <input
                type="number"
                name="price"
                value={courseData.price}
                onChange={handleInputChange}
                className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300 pr-8"
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">€</span>
            </div>
          ) : (
            <p className="border px-4 py-2 w-full rounded-md bg-gray-100">{`${courseData.price} €`}</p>
          )}
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block mb-2 font-medium text-gray-700">Description</label>
          {isEditing ? (
            <textarea
              name="description"
              value={courseData.description}
              onChange={handleInputChange}
              className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:ring "
            />
          ) : (
            <p className="border px-4 py-2 w-full rounded-md bg-gray-100" style={{ whiteSpace: 'pre-line' }}>
              {courseData.description}
            </p>
          )}
        </div>
        <div className="flex justify-start space-x-4">
        {isEditing ? (
          <>
            <button onClick={handleSaveChanges} className="btn-save">Save Changes</button>
            <button onClick={handleCancelEdit} className="btn-cancel">Cancel</button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)} className="btn transition duration-300">Edit Course</button>
        )}
      </div>
      </div>

      
    </div>
  );
};

export default CourseInfo;
