import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaThumbsUp } from 'react-icons/fa';

const CourseForSaleCard = ({ id, category, teacher, name, description, imageSrc, imageAlt, participants, positiveReviews, price }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/course/${id}`);
  };

  return (
    <div className="border rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 flex flex-col bg-[var(--color-white)]" onClick={handleCardClick}>
      <img src={imageSrc} alt={imageAlt} className="w-full h-64 object-cover rounded-t-lg" />
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex flex-wrap w-full justify-between items-center">
          <p className="font-semibold text-[var(--color-grey)]">{category}</p>
          <p className="text-sm text-[var(--color-grey)]">{teacher}</p>
        </div>
        <h3 className="font-bold mt-2 text-left">{name}</h3>
        <p className="text-[var(--color-black)] mt-0 text-sm sm:text-base text-left">{description}</p>
        <div className="flex flex-wrap w-full justify-between items-center mt-4 pt-6">
          <div className="flex items-center">
            <FaUser className="w-5 h-5 text-[var(--color-grey)]" />
            <p className="ml-2 text-sm text-[var(--color-grey)] font-light">{participants} Students</p>
          </div>
          <div className="flex items-center">
            <FaThumbsUp className="w-5 h-5 text-[var(--color-grey)]" />
            <p className="ml-2 text-sm text-[var(--color-grey)] font-light">{positiveReviews}% Reviews</p>
          </div>
        </div>
        <div className="mt-auto">
          <button className="btn-fullwidth" style={{ backgroundColor: 'var(--color-yellow)' }}>
            {price} €
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseForSaleCard;
