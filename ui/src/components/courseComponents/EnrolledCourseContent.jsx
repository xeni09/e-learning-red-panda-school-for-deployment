import React, { useState } from 'react';

const EnrolledCourseContent = ({ sections }) => {
  const [activeSection, setActiveSection] = useState(null);

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Course Sections */}
      <div className="col-span-1 md:col-span-3 mx-5">
        <h2 className="text-2xl font-bold mb-4">Course Sections</h2>
        {sections.map((section, index) => (
          <div
            key={section._id}
            className="border rounded-md p-4 mb-4 cursor-pointer"
            onClick={() => handleSectionClick(section)}
          >
            <h3 className="text-lg font-semibold">{`U${index + 1}: ${section.title}`}</h3>
            <p>{section.description}</p>
          </div>
        ))}

        {/* Active section details */}
        {activeSection && (
          <div className="border rounded-lg p-4 mt-8">
            <h3 className="text-xl font-bold">{activeSection.title}</h3>
            <p>{activeSection.description}</p>
            {activeSection.videoUrl && (
              <div className="mt-4">
                <video controls className="w-full">
                  <source src={activeSection.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sidebar with Unit Icons */}
      <div className="col-span-1">
        <h2 className="text-lg font-semibold mb-4">Units</h2>
        <div className="space-y-4">
          {sections.map((section, index) => (
            <div
              key={section._id}
              className="p-4 border rounded-lg cursor-pointer"
              onClick={() => handleSectionClick(section)}
            >
              <span className="text-xl font-bold">{`U${index + 1}`}</span>
              <p className="text-sm text-gray-600">{section.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnrolledCourseContent;
