import React from 'react';

const SectionsList = ({ sections }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mt-6 mb-4">Course Sections</h2>
      
      {sections.map((section, index) => (
        <div key={index} className="border border-gray-300 p-4 mb-4 rounded-md shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800">{section.title}</h3>
          <p className="text-gray-600">{section.description}</p>
          {section.videoUrl && (
            <a 
              href={section.videoUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[var(--color-orange)] hover:underline mt-2 inline-block"
            >
              Watch Video
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export default SectionsList;
