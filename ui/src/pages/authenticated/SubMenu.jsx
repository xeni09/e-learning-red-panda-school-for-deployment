import React from 'react';
import { NavLink } from 'react-router-dom';

const SubMenu = () => {
  return (
    <div className="flex justify-start bg-[var(--color-yellow)]">
      <div className="container py-5 ">
        <NavLink
          to="/my-account"
          className={({ isActive }) =>
            `mr-4 py-2 mb-4 transform transition-transform duration-200 hover:text-[var(--color-white)] hover:border-b-[2px] hover:border-[var(--color-primary)] font-bold ${
              isActive ? 'text-[var(--color-white)] border-b border-[var(--color-primary)]' : 'text-[var(--color-white)]'
            }`
          }
        >
          My Account
        </NavLink>

        <NavLink
          to="/my-courses"
          className={({ isActive }) =>
            `mx-2 py-2 mb-4 transform transition-transform duration-200 hover:text-[var(--color-white)] hover:border-b-[2px] hover:border-[var(--color-primary)] font-bold ${
              isActive ? 'text-[var(--color-white)] border-b-[2px] border-[var(--color-primary)]' : 'text-[var(--color-white)]'
            }`
          }
        >
          My Courses
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `mx-4 py-2 mb-4 transform transition-transform duration-200 hover:text-[var(--color-white)] hover:border-b-[2px] hover:border-[var(--color-primary)] font-bold ${
              isActive ? 'text-[var(--color-white)] border-b-[2px] border-[var(--color-primary)]' : 'text-[var(--color-white)]'
            }`
          }
        >
          Settings
        </NavLink>
      </div>
    </div>
  );
};

export default SubMenu;