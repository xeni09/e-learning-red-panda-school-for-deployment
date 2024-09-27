import React, { useEffect, useState } from 'react';
import axios from '../../services/axiosConfig';
import AdminSubMenu from '../../components/adminComponents/AdminSubMenu';  
import CourseList from '../../components/courseComponents/CourseList';  
import CourseForm from '../../components/courseComponents/CourseForm';

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/api/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleCreateCourse = async (newCourse) => {
    try {
      const formData = new FormData();
      Object.keys(newCourse).forEach(key => {
        formData.append(key, newCourse[key]);
      });

      const response = await axios.post('/api/courses', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setCourses([...courses, response.data]);
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`/api/courses/${courseId}`);
      setCourses(courses.filter(course => course._id !== courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleEditCourse = (course) => {
    setSelectedCourse(course); // Set the course to be edited in the form
  };

  return (
    <>
      <AdminSubMenu />
      <div className="container mx-auto p-4 pt-20">
        <h1 className="text-3xl font-bold mb-6">Manage Courses</h1>
        <CourseList 
          courses={courses} 
          onDeleteCourse={handleDeleteCourse} 
          onEditCourse={handleEditCourse} 
        />
        <CourseForm 
          onSubmit={handleCreateCourse} 
          courseToEdit={selectedCourse} // Pass the course to edit
        />
      </div>
    </>
  );
};


export default ManageCourses;
