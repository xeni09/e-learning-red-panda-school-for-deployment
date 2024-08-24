import React from 'react';
import { NavLink } from 'react-router-dom';

const SubMenu = () => {
  return (



    <div className="flex justify-start bg-[var(--color-yellow)] ">
      
      <div className="container py-5">
      <NavLink
        to="/my-account"
        className="pr-4 py-2 mb-4 rounded transform transition-transform duration-200 hover:scale-105"
        activeClassName="font-bold border-b-2"
        style={({ isActive }) => ({
          color: isActive ? 'var(--color-white)' : 'var(--color-black)',
          backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
          borderColor: isActive ? 'var(--color-primary-dark)' : 'transparent',
        })}
      >
        My Account
      </NavLink>

      <NavLink
        to="/my-courses"
        className="px-4 py-2 mb-4 rounded transform transition-transform duration-200 hover:scale-105"
        activeClassName="font-bold border-b-2"
        style={({ isActive }) => ({
          color: isActive ? 'var(--color-white)' : 'var(--color-black)',
          backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
          borderColor: isActive ? 'var(--color-primary-dark)' : 'transparent',
        })}
      >
        My Courses
      </NavLink>


      <NavLink
        to="/settings"
        className="px-4 py-2 mb-4 rounded transform transition-transform duration-200 hover:scale-105"
        activeClassName="font-bold border-b-2"
        style={({ isActive }) => ({
          color: isActive ? 'var(--color-white)' : 'var(--color-black)',
          backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
          borderColor: isActive ? 'var(--color-primary-dark)' : 'transparent',
        })}
      >
        Settings
      </NavLink>
      </div>
    </div>
  );
};

export default SubMenu;