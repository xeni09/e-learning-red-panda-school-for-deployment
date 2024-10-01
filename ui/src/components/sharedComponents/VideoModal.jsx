import React from 'react';

const VideoModal = ({ videoUrl, onClose }) => {
  // Añadimos ?autoplay=1 al videoUrl si no lo tiene para activar autoplay
  const autoPlayUrl = videoUrl.includes('?') ? `${videoUrl}&autoplay=1` : `${videoUrl}?autoplay=1`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-3xl w-full relative">
        {/* Botón de cierre con mejor visibilidad */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full hover:bg-opacity-75 transition"
        >
          Close
        </button>
        
        {/* Iframe del video con autoplay */}
        <iframe
          width="100%"
          height="400"
          src={autoPlayUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Course Video"
        />
      </div>
    </div>
  );
};

export default VideoModal;
