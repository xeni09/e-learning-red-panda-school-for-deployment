import React from 'react';
import CustomDropdown from '../../components/adminComponents/CustomDropdown'; 
import { categories } from '../sharedComponents/constants';
import { Link } from 'react-router-dom';

const CourseRow = ({
  course,
  editingCourseId,
  editFormData,
  setEditFormData,
  handleInputChange,
  handleCategoryChange,
  handleSaveChanges,
  handleCancelEdit,
  onEditCourse,
  handleDelete
}) => {
  return (
    <tr key={course._id}>
      <td className="border px-4 py-2 text-center">{course.customId}</td>

      <td className="border px-4 py-2 text-center">
        {editingCourseId === course._id ? (
          <input
            type="text"
            name="name"
            value={editFormData.name}
            onChange={handleInputChange}
            className="input text-center w-full p-2 border border-gray-300 "
          />
        ) : (
          // Enlace a los detalles del curso
          <Link to={`/admin/manage-courses/${course._id}`} className="text-blue-500">
            {course.name}
          </Link>
        )}
      </td>

      <td className="border px-4 py-2 text-center">
        {editingCourseId === course._id ? (
          <CustomDropdown
            options={categories.map(cat => ({ value: cat, label: cat }))}
            selectedOption={editFormData.category}
            onOptionSelect={handleCategoryChange}
          />
        ) : (
          course.category
        )}
      </td>

      <td className="border px-4 py-2 text-center">
        {editingCourseId === course._id ? (
          <input
            type="text"
            name="teacher"
            value={editFormData.teacher}
            onChange={handleInputChange}
            className="input text-center w-full p-2 border border-gray-300 "
          />
        ) : (
          course.teacher
        )}
      </td>

      <td className="border px-4 py-2 text-center">
        {editingCourseId === course._id ? (
          <div className="relative">
            <input
              type="text"
              name="price"
              value={editFormData.price}
              onChange={handleInputChange}
              className="input text-center w-full p-2 pr-8 border border-gray-300 " 
            />
            <span className="absolute inset-y-0 right-0 pr-3 pb-2 flex items-center text-gray-500">€</span> 
          </div>
        ) : (
          `${course.price} €`
        )}
      </td>

      <td className="border px-4 py-2 text-center">
        <img
          src={`http://localhost:3000${course.imageSrc}`}
          alt={course.name}
          className="w-16 h-16 object-cover mx-auto"
        />
      </td>

      <td className="border px-2 py-0 text-center">
        {editingCourseId === course._id ? (
          <div className="flex flex-col lg:flex-row justify-center space-x-1">
            <button
              onClick={() => handleSaveChanges(course._id)}
              className="btn-save "
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="btn-cancel bg-gray-400 "
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row justify-center ">
            <button
              className="btn"
              onClick={() => onEditCourse(course)}
            >
              Edit
            </button>
            <button
              className="btn-delete"
              onClick={() => handleDelete(course._id)}
            >
              Delete
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default CourseRow;
