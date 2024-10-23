import React, { useState } from 'react';
import CustomDropdown from '../adminComponents/CustomDropdown';

// Función para obtener el ID de YouTube desde la URL del video
const getYouTubeVideoId = (url) => {
  const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

const EnrolledCourseContent = ({ courseName, sections }) => {
  const [activeSection, setActiveSection] = useState(sections[0]); // Inicializar con la primera sección

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  const handleNextUnit = () => {
    const currentIndex = sections.findIndex((section) => section === activeSection);
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1]);
    }
  };

  const handlePreviousUnit = () => {
    const currentIndex = sections.findIndex((section) => section === activeSection);
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1]);
    }
  };

  const currentIndex = sections.findIndex((section) => section === activeSection);

  // Definir handleOptionSelect para actualizar la sección activa
  const handleOptionSelect = (selectedValue) => {
    const selectedSection = sections.find((section) => section._id === selectedValue);
    setActiveSection(selectedSection);
  };

  const options = sections.map((section, index) => ({
    value: section._id,
    label: `U${index + 1}: ${section.title}`,
  }));

  // Lógica para manejar videos de YouTube y videos locales
  const videoId = getYouTubeVideoId(activeSection.videoUrl);

  return (
    <div>
      <div className="mb-6">
        <p className="text-4xl mb-4">Content</p>
      </div>

      {/* Dropdown visible solo en móviles */}
      <div className="sm:block md:hidden mb-4 m-6">
        <CustomDropdown
          options={options}
          selectedOption={activeSection._id}
          onOptionSelect={handleOptionSelect}
          className="full-width bg-gray-100"
        />
      </div>

      {/* Layout de columnas para secciones y sidebar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Secciones del curso */}
        <div className="col-span-1 md:col-span-3 order-2 md:order-none mx-5">
          {activeSection && (
            <div className="p-6 bg-gray-100 rounded-lg shadow-md sticky top-20">
              <p className="text-3xl pb-3">{activeSection.title}</p>

              {/* Mostrar la imagen si existe */}
              {activeSection.sectionImage && (
                <div className="my-4">
                  <img
                    src={activeSection.sectionImage}
                    alt={activeSection.title}
                    className="w-full h-auto object-cover rounded-md"
                  />
                </div>
              )}

              {/* Mostrar el video si existe */}
              {activeSection.videoUrl && (
                <div className="mt-4">
                  {/* Si es un video de YouTube */}
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
                    /* Si es un video MP4 */
                    <video controls className="w-full">
                      <source src={activeSection.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              )}

              <p className='whitespace-pre-wrap'>{activeSection.description}</p>

              {/* Botones "Previous Unit" y "Next Unit" */}
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

        {/* Sidebar visible solo en pantallas más grandes */}
        <div className=" xs:hidden md:block col-span-1 order-1 md:order-none">
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
