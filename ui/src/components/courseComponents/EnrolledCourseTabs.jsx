import React, { useState } from 'react';
import EnrolledCourseContent from './EnrolledCourseContent';
import EnrolledOverviewFixedInfo from './EnrolledOverviewFixedInfo'; // Import the new component

const EnrolledCourseTabs = ({ course }) => {
  const [activeTab, setActiveTab] = useState('Overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left side: course description */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
              <p>{course.description}</p>
            </div>
            
            {/* Right side: fixed info */}
            <div className="md:col-span-1">
              <EnrolledOverviewFixedInfo /> {/* Display the fixed info */}
            </div>
          </div>
        );
      case 'Content':
        return <EnrolledCourseContent sections={course.sections} />;
      case 'Instructor':
        return <div>Instructor: {course.teacher}</div>;
      case 'Review':
        return <div>Reviews will be available soon...</div>;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Tab navigation */}
      <div className="flex flex-wrap justify-start space-x-4 lg:space-x-6 border-b border-gray-300 mb-10">
        {['Overview', 'Content', 'Instructor', 'Review'].map(tab => (
          <button
            key={tab}
            className={`relative px-4 py-2 lg:px-6 lg:py-3 text-sm lg:text-lg whitespace-nowrap ${activeTab === tab ? 'font-bold text-[var(--color-orange)]' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
            <span className={`absolute bottom-0 left-0 right-0 ${activeTab === tab ? 'bg-[var(--color-orange)] h-1' : ''}`}></span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="mt-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default EnrolledCourseTabs;
