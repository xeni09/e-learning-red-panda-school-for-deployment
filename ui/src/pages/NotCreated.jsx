import React from 'react';
import pandaAsustado from '../assets/panda-ai-asustado.png';

const NotCreated = () => {
  return (
    <div className='container my-16'>
      <div>
        <img 
          src={pandaAsustado} 
          alt="Panda Asustado" 
          className="object-contain w-64 h-auto align-center mx-auto" 
        />
      </div>
      <h2 className="text-center text-xl font-bold leading-9 tracking-tight text-dark-900 mt-10">
        Pages not yet created or not necessary for the project
      </h2>
      <div className="mt-10 space-y-6 text-center">
        <p className="text-2xl text-center text-[var(--color-grey)]">
          This page is a placeholder for links that are not yet created.
        </p>
      </div>
    </div>
  );
};

export default NotCreated;