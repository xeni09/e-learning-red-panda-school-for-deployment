import React, { useState, useEffect } from 'react';
import CustomDropdown from '../adminComponents/CustomDropdown';

// Function to get YouTube video ID from URL
const getYouTubeVideoId = (url) => {
  const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

const EnrolledCourseContent = ({ courseName, sections }) => {
  const [activeSection, setActiveSection] = useState(sections[0]);

  useEffect(() => {
    // Retrieve the last active section from local storage
    const savedSectionId = localStorage.getItem(`${courseName}-activeSection`);
    if (savedSectionId) {
      const savedSection = sections.find((section) => section._id === savedSectionId);
      if (savedSection) {
        setActiveSection(savedSection);
      }
    }
  }, [courseName, sections]);

  const handleSectionClick = (section) => {
    setActiveSection(section);
    localStorage.setItem(`${courseName}-activeSection`, section._id);
  };

  const handleNextUnit = () => {
    const currentIndex = sections.findIndex((section) => section === activeSection);
    if (currentIndex < sections.length - 1) {
      const nextSection = sections[currentIndex + 1];
      setActiveSection(nextSection);
      localStorage.setItem(`${courseName}-activeSection`, nextSection._id);
    }
  };

  const handlePreviousUnit = () => {
    const currentIndex = sections.findIndex((section) => section === activeSection);
    if (currentIndex > 0) {
      const previousSection = sections[currentIndex - 1];
      setActiveSection(previousSection);
      localStorage.setItem(`${courseName}-activeSection`, previousSection._id);
    }
  };

  const currentIndex = sections.findIndex((section) => section === activeSection);

  const handleOptionSelect = (selectedValue) => {
    const selectedSection = sections.find((section) => section._id === selectedValue);
    setActiveSection(selectedSection);
    localStorage.setItem(`${courseName}-activeSection`, selectedSection._id);
  };

  const options = sections.map((section, index) => ({
    value: section._id,
    label: `U${index + 1}: ${section.title}`,
  }));

  const videoId = getYouTubeVideoId(activeSection.videoUrl);

  return (
    <div>
      <div className="mb-6">
        <p className="text-4xl mb-4">Content</p>
      </div>

      <div className="sm:block md:hidden mb-4 m-6">
        <CustomDropdown
          options={options}
          selectedOption={activeSection._id}
          onOptionSelect={handleOptionSelect}
          className="full-width bg-gray-100"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-1 md:col-span-3 order-2 md:order-none mx-5">
          {activeSection && (
            <div className="p-6 bg-gray-100 rounded-lg shadow-md sticky top-20">
              <p className="text-3xl pb-3">{activeSection.title}</p>

              {activeSection.sectionImage && (
                <div className="my-4">
                  <img
                    src={activeSection.sectionImage}
                    alt={activeSection.title}
                    className="w-full h-auto object-cover rounded-md"
                  />
                </div>
              )}

              {activeSection.videoUrl && (
                <div className="mt-4">
                  {videoId ? (
                    <iframe
                      width="100%"
                      height="400px"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className='rounded-md my-6'
                    ></iframe>
                  ) : (
                    <video controls className="w-full mb-5 rounded-md">
                      <source src={activeSection.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              )}

              <p className='whitespace-pre-wrap'>{activeSection.description}</p>

              <div className="flex justify-between mt-4">
                <div className="w-1/2 flex justify-start">
                  {currentIndex > 0 && (
                    <button
                      className="btn-cancel"
                      onClick={handlePreviousUnit}
                    >
                      Previous Unit
                    </button>
                  )}
                </div>

                <div className="w-1/2 flex justify-end">
                  {currentIndex < sections.length - 1 && (
                    <button className="btn" onClick={handleNextUnit}>
                      Next Unit
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="xs:hidden md:block col-span-1 order-1 md:order-none">
          <h2 className="text-lg font-semibold mb-4">Units</h2>
          <div className="space-y-4">
            {sections.map((section, index) => (
              <div
                key={section._id}
                className={`p-4 border rounded-lg cursor-pointer ${activeSection === section ? 'bg-gray-200' : ''}`}
                onClick={() => handleSectionClick(section)}
              >
                <span className="text-xl font-bold">{`U${index + 1}`}</span>
                <p className="text-sm text-gray-600">{section.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrolledCourseContent;
