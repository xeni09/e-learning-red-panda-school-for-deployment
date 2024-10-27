import React, { useState, useEffect } from 'react';
import EnrolledCourseContent from './EnrolledCourseContent';
import EnrolledOverviewFixedInfo from './EnrolledOverviewFixedInfo'; // Import the new component

const EnrolledCourseTabs = ({ course }) => {
  const [activeTab, setActiveTab] = useState('Overview');

  // Set up useEffect to retrieve the last active tab from local storage
  useEffect(() => {
    const savedTab = localStorage.getItem('activeTab');
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  // Update local storage whenever the active tab changes
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    localStorage.setItem('activeTab', tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left side: course description */}
            <div className="md:col-span-2">
              <p className="text-4xl mb-8">Course Overview</p>
              
              <p className='p-6 bg-gray-100 rounded-lg shadow-md sticky top-20 whitespace-pre-wrap'>
              {course.imageSrc && (
                <div className="mb-6">
                  <img 
                    src={course.imageSrc} 
                    alt={course.name} 
                    className="w-full h-auto object-cover rounded-lg" 
                  />
                </div>
              )}
              {course.description}</p>
            </div>
            
            {/* Right side: fixed info */}
            <div className="md:col-span-1">
              <EnrolledOverviewFixedInfo /> {/* Display the fixed info */}
            </div>
          </div>
        );
      case 'Content':
        return <EnrolledCourseContent courseName={course.name} sections={course.sections} />;
      
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
            onClick={() => handleTabClick(tab)}
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
