import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; 
import axios from '../../services/axiosConfig';
import AdminSubMenu from '../../components/adminComponents/AdminSubMenu';

const CourseStudentsList = () => {
  const { courseId } = useParams();
  const [students, setStudents] = useState([]);
  const [courseName, setCourseName] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const courseResponse = await axios.get(`/api/courses/${courseId}`);
        setCourseName(courseResponse.data.name);

        const studentsResponse = await axios.get(`/api/courses/${courseId}/students`);
        setStudents(studentsResponse.data);
      } catch (error) {
        console.error("Error fetching course details and students:", error);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  return (
    <>
      <AdminSubMenu />
      <div className="container mx-auto p-6 pt-20">
        <div className="flex justify-end items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="btn"
          >
            Go Back to Manage Courses
          </button>
        </div>

        {students.length > 0 ? (
          <div className="bg-white p-10">
            <h2 className="text-3xl font-normal">Students Registered for:</h2>
            {/* Enlace al CourseDetails */}
            <Link to={`/admin/manage-courses/${courseId}`}>
              <h2 className="flex justify-start text-3xl font-bold text-[var(--color-orange)] cursor-pointer">
                "{courseName}" <p className='flex flex-col justify-evenly pl-4'> Click here to go back to this Course Info</p>
              </h2>
            </Link>

            <table className="table-auto w-full mb-6 rounded-lg">
              <thead>
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id}>
                    <td className="border px-4 py-2 text-center">{student.name}</td>
                    <td className="border px-4 py-2 text-center">{student.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No students have registered for this course yet.</p>
        )}
      </div>
    </>
  );
};

export default CourseStudentsList;
