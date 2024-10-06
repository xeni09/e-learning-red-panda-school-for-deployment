import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';  // Correct import path

const SubMenu = () => {
  const { user } = useAuth(); // Access the current user's data from AuthProvider

  return (
    <div className="bg-[var(--color-yellow)]">
      <div className="container py-2 flex flex-col items-center md:flex-row md:justify-start md:space-x-4 space-y-2 md:space-y-0">
        <NavLink
          to="/my-account"
          className={({ isActive }) =>
            `py-2 transform transition-transform duration-200 hover:text-[var(--color-white)] hover:border-b-[2px] hover:border-[var(--color-primary)] font-bold ${
              isActive ? 'text-[var(--color-white)] border-b-[2px] border-[var(--color-primary)] inline-block' : 'text-[var(--color-white)] inline-block'
            }`
          }
        >
          My Account
        </NavLink>

        <NavLink
          to="/my-courses"
          className={({ isActive }) =>
            `py-2 transform transition-transform duration-200 hover:text-[var(--color-white)] hover:border-b-[2px] hover:border-[var(--color-primary)] font-bold ${
              isActive ? 'text-[var(--color-white)] border-b-[2px] border-[var(--color-primary)] inline-block' : 'text-[var(--color-white)] inline-block'
            }`
          }
        >
          My Courses
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `py-2 transform transition-transform duration-200 hover:text-[var(--color-white)] hover:border-b-[2px] hover:border-[var(--color-primary)] font-bold ${
              isActive ? 'text-[var(--color-white)] border-b-[2px] border-[var(--color-primary)] inline-block' : 'text-[var(--color-white)] inline-block'
            }`
          }
        >
          Settings
        </NavLink>

        {user && user.role === 'admin' && (
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `py-2 transform transition-transform duration-200 hover:text-[var(--color-white)] hover:border-b-[2px] hover:border-[var(--color-primary)] font-bold ${
                isActive ? 'text-[var(--color-white)] border-b-[2px] border-[var(--color-primary)] inline-block' : 'text-[var(--color-white)] inline-block'
              }`
            }
          >
            Admin Dashboard
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default SubMenu;
