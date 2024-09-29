import React from 'react';
import CustomDropdown from '../../components/adminComponents/CustomDropdown'; 
import { categories } from '../sharedComponents/constants';

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

      <td className="border px-4 py-2">
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

      <td className="border px-4 py-2">
        {editingCourseId === course._id ? (
          <input
            type="text"
            name="teacher"
            value={editFormData.teacher}
            onChange={handleInputChange}
            className="input mb-2 w-full p-2 border rounded"
          />
        ) : (
          course.teacher
        )}
      </td>

      <td className="border px-4 py-2">
        {editingCourseId === course._id ? (
          <input
            type="number"
            name="price"
            value={editFormData.price}
            onChange={handleInputChange}
            className="input mb-2 w-full p-2 border rounded"
          />
        ) : (
          course.price
        )}
      </td>

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
  );
};

export default CourseRow;
