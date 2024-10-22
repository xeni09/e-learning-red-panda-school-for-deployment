import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../services/axiosConfig';
import AdminSubMenu from '../../components/adminComponents/AdminSubMenu';

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState({ usersCount: 0, coursesCount: 0 });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        // Llamadas API para obtener datos de usuarios y cursos
        const [usersResponse, coursesResponse] = await Promise.all([
          axios.get('/api/users'),
          axios.get('/api/courses'),
        ]);

        setAdminData({
          usersCount: usersResponse.data.length,
          coursesCount: coursesResponse.data.length,
        });
      } catch (err) {
        console.error('Error fetching admin data:', err.response ? err.response.data : err.message);
        if (err.response && err.response.status === 401) {
          navigate('/login');
        } else {
          setError(err.message);
        }
      }
    };

    fetchAdminData();
  }, [navigate]); // Esta dependencia vacía asegura que la llamada solo ocurra cuando el componente se monte

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <>
      <AdminSubMenu />
      <div className="container mx-auto p-4 pt-20">
        <h2>Admin Dashboard</h2>

        <div className="bg-white shadow-md rounded-lg p-10 my-10">
          <ul>
            <li className="mb-10">
              <strong>Users:</strong> {adminData.usersCount}
              <button
                onClick={() => navigate('/admin/manage-users')}
                className="btn block"
              >
                Manage Users
              </button>
            </li>

            <li className="mb-4">
              <strong>Courses:</strong> {adminData.coursesCount}
              <button
                onClick={() => navigate('/admin/manage-courses')}
                className="btn block"
              >
                Manage Courses
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;