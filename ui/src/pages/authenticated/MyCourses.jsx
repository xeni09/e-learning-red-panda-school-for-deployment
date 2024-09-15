import React from 'react';
import SubMenu from '../../components/layoutComponents/SubMenu';

const MyCourses = () => {
  return (
    <>
      <SubMenu />
      <div className="container mx-auto p-4 pt-20">
      <h2>My Courses</h2>
      <p className="text-xl">Here you can find all your purchased courses.</p>
    </div>
    </>
  );
};

export default MyCourses;