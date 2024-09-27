import React from 'react';

const CourseList = ({ courses, onDeleteCourse, onEditCourse, setShowForm }) => {
  // Función para manejar la eliminación con confirmación
  const handleDelete = (courseId) => {
    const confirmed = window.confirm('Are you sure you want to delete this course?');
    if (confirmed) {
      onDeleteCourse(courseId);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-10 my-10">
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <h2 className="text-xl font-bold">Courses List</h2>
        <button className="btn mt-4 md:mt-0" onClick={() => setShowForm(true)}>
          Create New Course
        </button>
      </div>
      
      <table className="table-auto w-full mb-6">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Teacher</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course._id}>
              <td className="border px-4 py-2">{course.customId}</td>
              <td className="border px-4 py-2">{course.name}</td>
              <td className="border px-4 py-2">{course.category}</td>
              <td className="border px-4 py-2">{course.teacher}</td>
              <td className="border px-4 py-2">{course.price}</td>
              <td className="border px-4 py-2">
                <img
                  src={`http://localhost:3000${course.imageSrc}`}
                  alt={course.name}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="border px-4 py-2">
                <button
                  className="btn bg-red-500 text-white p-2 rounded"
                  onClick={() => handleDelete(course._id)} // Confirmación al eliminar
                >
                  Delete
                </button>
                <button
                  className="btn p-2 rounded ml-2"
                  onClick={() => onEditCourse(course)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseList;
