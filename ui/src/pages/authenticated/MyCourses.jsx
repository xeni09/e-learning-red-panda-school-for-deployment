import React from 'react';
import Sidebar from './SubMenu';

const MyCourses = () => {
  return (
    <>
      <Sidebar />

   
      <div className="container ">
      <h2>My Courses</h2>
      <p>Here you can find all your purchased courses.</p>
    </div>
    </>
  );
};

export default MyCourses;