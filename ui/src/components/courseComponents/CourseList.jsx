import React from 'react';
import CreateCourseForm from '../../components/courseComponents/CreateCourseForm';

const CourseList = ({
  courses,
  onDeleteCourse,
  onEditCourse,
  toggleForm,
  showCreateCourseForm,
  handleCreateCourse,
  selectedCourse,
  handleCancel,
  editingCourseId,
  setEditingCourseId,
  editFormData,
  setEditFormData,
  handleSaveChanges,
  handleCancelEdit
}) => {
  
  // Función para manejar la eliminación con confirmación
  const handleDelete = (courseId) => {
    const confirmed = window.confirm('Are you sure you want to delete this course?');
    if (confirmed) {
      onDeleteCourse(courseId);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prevData => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-10 my-10">
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <h2 className="text-xl font-bold">Courses List</h2>
  
        <button className="btn mt-4 md:mt-0" onClick={toggleForm}>
          {showCreateCourseForm ? 'Hide Create New Course' : 'Create New Course'}
        </button>
      </div>

      {/* Mostrar el formulario de creación de cursos si está activo */}
      {showCreateCourseForm && (
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 mb-6 shadow-md">
          <CreateCourseForm
            onSubmit={handleCreateCourse}
            courseToEdit={selectedCourse}
            onCancel={handleCancel}
          />
        </div>
      )}

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

              <td className="border px-4 py-2">
                {editingCourseId === course._id ? (
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleInputChange}
                    className="input mb-2 w-full p-2 border rounded"
                  />
                ) : (
                  course.name
                )}
              </td>

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
                {editingCourseId === course._id ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleSaveChanges(course._id)}
                      className="btn px-4 py-2 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="btn bg-gray-400 px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      className="btn p-2 rounded mr-2"
                      onClick={() => onEditCourse(course)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn bg-red-500 text-white p-2 rounded"
                      onClick={() => handleDelete(course._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseList;