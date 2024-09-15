import React, { useEffect, useState } from 'react';
import axios from '../../services/axiosConfig';
import AdminSubMenu from './AdminSubMenu';  // Include the AdminSubMenu

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    name: '',
    category: '',
    teacher: '',
    description: '',
    participants: 0,
    price: '',
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  const handleCreateCourse = async () => {
    if (!newCourse.name || !newCourse.category || !newCourse.teacher || !newCourse.price) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('/api/courses', newCourse);
      setCourses([...courses, response.data]);
      setNewCourse({
        name: '',
        category: '',
        teacher: '',
        description: '',
        participants: 0,
        price: '',
      });
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  return (
    <>
      <AdminSubMenu />  {/* Submenu at the top */}
      <div className="container mx-auto p-4 pt-20">
        <h1 className="text-3xl font-bold mb-6">Manage Courses</h1>

        {/* Section for listing existing courses */}
        <div className="bg-white shadow-md rounded-lg p-10 my-10">
          <h2 className="text-2xl mb-4">Existing Courses</h2>
          <table className="table-auto w-full mb-6">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Teacher</th>
                <th className="px-4 py-2">Participants</th>
                <th className="px-4 py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course._id}>
                  <td className="border px-4 py-2">{course._id}</td>
                  <td className="border px-4 py-2">{course.name}</td>
                  <td className="border px-4 py-2">{course.category}</td>
                  <td className="border px-4 py-2">{course.teacher}</td>
                  <td className="border px-4 py-2">{course.participants}</td>
                  <td className="border px-4 py-2">{course.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section for creating new course */}
        <div className="bg-white shadow-md rounded-lg p-10 my-10">
          <h2 className="text-2xl mb-4">Create New Course</h2>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              value={newCourse.name}
              onChange={handleInputChange}
              placeholder="Course Name"
              className="input mb-2 w-full p-2 border rounded"
            />
            <input
              type="text"
              name="category"
              value={newCourse.category}
              onChange={handleInputChange}
              placeholder="Category"
              className="input mb-2 w-full p-2 border rounded"
            />
            <input
              type="text"
              name="teacher"
              value={newCourse.teacher}
              onChange={handleInputChange}
              placeholder="Teacher"
              className="input mb-2 w-full p-2 border rounded"
            />
            <textarea
              name="description"
              value={newCourse.description}
              onChange={handleInputChange}
              placeholder="Description"
              className="textarea mb-2 w-full p-2 border rounded"
            />
            <input
              type="number"
              name="participants"
              value={newCourse.participants}
              onChange={handleInputChange}
              placeholder="Participants"
              className="input mb-2 w-full p-2 border rounded"
            />
            <input
              type="text"
              name="price"
              value={newCourse.price}
              onChange={handleInputChange}
              placeholder="Price"
              className="input mb-2 w-full p-2 border rounded"
            />
            <button onClick={handleCreateCourse} className="btn bg-blue-600 text-white px-4 py-2 rounded">
              Create Course
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageCourses;
