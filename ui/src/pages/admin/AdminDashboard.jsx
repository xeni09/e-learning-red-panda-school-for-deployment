import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importar para manejar la navegación
import axios from '../../services/axiosConfig';
import AdminSubMenu from '../../components/adminComponents/AdminSubMenu';

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState({ usersCount: 0, coursesCount: 0 });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);  // Estado para manejar el loading
  const navigate = useNavigate();  // Hook para redirigir a otra página

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        // Llamadas API para obtener datos de usuarios y cursos
        const [usersResponse, coursesResponse] = await Promise.all([
          axios.get('/api/users'),  // Ruta para obtener todos los usuarios
          axios.get('/api/courses'),  // Ruta para obtener todos los cursos
        ]);

        setAdminData({
          usersCount: usersResponse.data.length,
          coursesCount: coursesResponse.data.length,
        });

        setLoading(false);  // Cuando los datos se cargan, detenemos el loading
      } catch (err) {
        console.error('Error fetching admin data:', err.response ? err.response.data : err.message);
        setError(err.message);
        setLoading(false);  // Detener loading en caso de error también
      }
    };

    fetchAdminData();  // Ejecutar la función cuando se monte el componente
  }, []);

  if (loading) {
    return <p className="text-center text-xl">Loading admin data...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <>
      <AdminSubMenu />
      <div className="container mx-auto p-4 pt-20">
        <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

        {/* Section for summary data */}
        <div className="bg-white shadow-md rounded-lg p-10 my-10">
          <h2 className="text-2xl my-6">Admin Summary</h2>

          <ul>
            <li className="mb-10">
              <strong>Users:</strong> {adminData.usersCount}
              <button
                onClick={() => navigate('/admin/manage-users')}  // Redirigir a la página de Manage Users
                className="btn block"
              >
                Manage Users
              </button>
            </li>

            <li className="mb-4">
              <strong>Courses:</strong> {adminData.coursesCount}
              <button
                onClick={() => navigate('/admin/manage-courses')}  // Redirigir a la página de Manage Courses
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