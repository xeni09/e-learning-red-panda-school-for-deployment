import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminSubMenu = () => {
  return (
    <div className="flex justify-start bg-[var(--color-yellow)]">
      <div className="container py-5 ">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `mr-4 py-2 mb-4 transform transition-transform duration-200 hover:text-[var(--color-white)] hover:border-b-[2px] hover:border-[var(--color-primary)] font-bold ${
              isActive ? 'text-[var(--color-white)] border-b-[2px] border-[var(--color-primary)]' : 'text-[var(--color-white)]'
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/manage-courses"
          className={({ isActive }) =>
            `mx-2 py-2 mb-4 transform transition-transform duration-200 hover:text-[var(--color-white)] hover:border-b-[2px] hover:border-[var(--color-primary)] font-bold ${
              isActive ? 'text-[var(--color-white)] border-b-[2px] border-[var(--color-primary)]' : 'text-[var(--color-white)]'
            }`
          }
        >
          Manage Courses
        </NavLink>

        <NavLink
          to="/admin/manage-users"
          className={({ isActive }) =>
            `mx-4 py-2 mb-4 transform transition-transform duration-200 hover:text-[var(--color-white)] hover:border-b-[2px] hover:border-[var(--color-primary)] font-bold ${
              isActive ? 'text-[var(--color-white)] border-b-[2px] border-[var(--color-primary)]' : 'text-[var(--color-white)]'
            }`
          }
        >
          Manage Users
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSubMenu;
