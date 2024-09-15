import React, { useEffect, useState } from 'react';
import axios from '../../services/axiosConfig';
import AdminSubMenu from '../../components/adminComponents/AdminSubMenu';

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/dashboard');
        console.log('Response from backend:', response);
        setAdminData(response.data);
      } catch (err) {
        console.error('Error fetching admin data:', err.response ? err.response.data : err.message);
        setError(err.message);
      }
    };

    fetchAdminData();
  }, []);

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
          <h2 className="text-2xl mb-4">Admin Summary</h2>
          {adminData ? (
            <ul>
              <li className="mb-4">
                <strong>Users:</strong> {adminData.usersCount}
              </li>
              <li className="mb-4">
                <strong>Courses:</strong> {adminData.coursesCount}
              </li>
              <li className="mb-4">
                <strong>Revenue:</strong> ${adminData.revenue}
              </li>
            </ul>
          ) : (
            <p>Loading admin data...</p>
          )}
        </div>

        {/* You can add more sections here */}
      </div>
    </>
  );
};

export default AdminDashboard;
