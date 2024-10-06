import React from 'react';

const getYouTubeEmbedUrl = (url) => {
  const videoIdMatch = url.match(/(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&\n?]+)/);
  return videoIdMatch
    ? `https://www.youtube.com/embed/${videoIdMatch[1]}?autoplay=1`
    : url;
};

const VideoModal = ({ videoUrl, onClose }) => {
  const embedUrl = getYouTubeEmbedUrl(videoUrl);

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
        
        {/* Iframe del video usando la URL embed de YouTube con autoplay y mute */}
        <iframe
          width="100%"
          height="400"
          src={embedUrl}
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
