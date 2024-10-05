import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminSubMenu = () => {
  return (
    <div className="bg-[var(--color-yellow)]">
      <div className="container py-2 flex flex-col items-center md:flex-row md:justify-start md:space-x-4 space-y-2 md:space-y-0">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `py-2 transform transition-transform duration-200 hover:text-[var(--color-white)] hover:border-b-[2px] hover:border-[var(--color-primary)] font-bold ${
              isActive ? 'text-[var(--color-white)] border-b-[2px] border-[var(--color-primary)] inline-block' : 'text-[var(--color-white)] inline-block'
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/manage-courses"
          className={({ isActive }) =>
            `py-2 transform transition-transform duration-200 hover:text-[var(--color-white)] hover:border-b-[2px] hover:border-[var(--color-primary)] font-bold ${
              isActive ? 'text-[var(--color-white)] border-b-[2px] border-[var(--color-primary)] inline-block' : 'text-[var(--color-white)] inline-block'
            }`
          }
        >
          Manage Courses
        </NavLink>

        <NavLink
          to="/admin/manage-users"
          className={({ isActive }) =>
            `py-2 transform transition-transform duration-200 hover:text-[var(--color-white)] hover:border-b-[2px] hover:border-[var(--color-primary)] font-bold ${
              isActive ? 'text-[var(--color-white)] border-b-[2px] border-[var(--color-primary)] inline-block' : 'text-[var(--color-white)] inline-block'
            }`
          }
        >
          Manage Users
        </NavLink>


        <NavLink
          to="/my-account"  // Cambia esta ruta si es necesario
          className={({ isActive }) =>
            `py-2 transform transition-transform duration-200 hover:text-[var(--color-white)] hover:border-b-[2px] hover:border-[var(--color-primary)] font-bold ${
              isActive ? 'text-[var(--color-white)] border-b-[2px] border-[var(--color-primary)] inline-block' : 'text-[var(--color-white)] inline-block'
            }`
          }
        >
          Back to My Account
        </NavLink>




      </div>
    </div>
  );
};

export default AdminSubMenu;
