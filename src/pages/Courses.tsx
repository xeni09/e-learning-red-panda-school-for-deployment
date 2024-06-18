// Courses.tsx
import React from "react";
import { Course } from "../types"; // Importa el tipo de datos de Course si es necesario

const Courses: React.FC = () => {
  // Aquí podrías usar estado o simplemente renderizar elementos estáticos
  const courses: Course[] = [
    { id: 1, title: "Course 1", description: "Description of Course 1" },
    { id: 2, title: "Course 2", description: "Description of Course 2" },
    { id: 3, title: "Course 3", description: "Description of Course 3" },
    // Añade más cursos según sea necesario
  ];

  return (
    <div className="container"> {/* Asegúrate de usar la clase 'container' para limitar la anchura */}
      <h1>Courses</h1>
      <div className="courses-list">
        {courses.map((course) => (
          <div key={course.id} className="course-item">
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            {/* Aquí podrías añadir más detalles del curso, enlaces, etc. */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
