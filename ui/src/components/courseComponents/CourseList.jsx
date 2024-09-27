const CourseList = ({ courses, onDeleteCourse, onEditCourse }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-10 my-10">
      <h2 className="text-2xl mb-4">Existing Courses</h2>
      <table className="table-auto w-full mb-6">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Teacher</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Image</th> {/* Columna para la imagen */}
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
                  src={course.imageSrc || "https://via.placeholder.com/150"} // Usar imagen por defecto si no hay imagen
                  alt={`${course.name} image`} 
                  className="w-16 h-16 object-cover rounded" 
                />
              </td>
              <td className="border px-4 py-2">
                {/* Botón de editar */}
                <button 
                  className="bg-yellow-500 text-white p-2 rounded mr-2" 
                  onClick={() => onEditCourse(course)}
                >
                  Edit
                </button>
                {/* Botón de eliminar */}
                <button 
                  className="bg-red-500 text-white p-2 rounded" 
                  onClick={() => onDeleteCourse(course._id)}
                >
                  Delete
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
