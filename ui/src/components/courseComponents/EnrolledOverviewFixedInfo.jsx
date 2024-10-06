import { FaThumbsUp, FaUser, FaVideo, FaFile, FaMobileAlt, FaHeadphonesAlt, FaGlobe, FaPlayCircle } from 'react-icons/fa';

const EnrolledOverviewFixedInfo = () => {
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md sticky top-20">
      <ul className="space-y-4">
        <p>This content is just a template*</p>
        <li className="flex items-center">
          <FaThumbsUp className="text-[var(--color-grey)] w-5 h-5 mr-2" />
          <span className="text-sm">98% valoraciones positivas (188)</span>
        </li>
        <li className="flex items-center">
          <FaUser className="text-[var(--color-grey)] w-5 h-5 mr-2" />
          <span className="text-sm">4.861 estudiantes</span>
        </li>
        <li className="flex items-center">
          <FaVideo className="text-[var(--color-grey)] w-5 h-5 mr-2" />
          <span className="text-sm">16 lecciones (3h 45m)</span>
        </li>
        <li className="flex items-center">
          <FaFile className="text-[var(--color-grey)] w-5 h-5 mr-2" />
          <span className="text-sm">17 recursos adicionales (3 archivos)</span>
        </li>
        <li className="flex items-center">
          <FaPlayCircle className="text-[var(--color-grey)] w-5 h-5 mr-2" />
          <span className="text-sm">Online y a tu ritmo</span>
        </li>
        <li className="flex items-center">
          <FaMobileAlt className="text-[var(--color-grey)] w-5 h-5 mr-2" />
          <span className="text-sm">Disponible en la app</span>
        </li>
        <li className="flex items-center">
          <FaHeadphonesAlt className="text-[var(--color-grey)] w-5 h-5 mr-2" />
          <span className="text-sm">Audio: Inglés</span>
        </li>
        <li className="flex items-center">
          <FaGlobe className="text-[var(--color-grey)] w-5 h-5 mr-2" />
          <span className="text-sm">Inglés, Español, Portugués, Alemán, Francés, Italiano, Polaco, Neerlandés</span>
        </li>
        <li className="flex items-center">
          <FaPlayCircle className="text-[var(--color-grey)] w-5 h-5 mr-2" />
          <span className="text-sm">Nivel: Iniciación</span>
        </li>
        <li className="flex items-center">
          <FaPlayCircle className="text-[var(--color-grey)] w-5 h-5 mr-2" />
          <span className="text-sm">Acceso ilimitado para siempre</span>
        </li>
      </ul>
    </div>
  );
};

export default EnrolledOverviewFixedInfo;
