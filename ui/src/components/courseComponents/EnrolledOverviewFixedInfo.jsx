import { FaThumbsUp, FaUser, FaVideo, FaFile, FaMobileAlt, FaHeadphonesAlt, FaGlobe, FaPlayCircle } from 'react-icons/fa';

const EnrolledOverviewFixedInfo = () => {
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md sticky top-20">
      <ul className="space-y-4">
        <p>This content is just a template*</p>
        <li className="flex items-center">
          <FaThumbsUp className="text-[var(--color-grey)] w-5 h-5 mr-2" />
          <span className="text-sm">98% positive ratings (188)</span>
        </li>
        <li className="flex items-center">
          <FaUser className="text-[var(--color-grey)] w-5 h-5 mr-2" />
          <span className="text-sm">4,861 students</span>
        </li>
        <li className="flex items-center">
          <FaVideo className="text-[var(--color-grey)] w-5 h-5 mr-2" />
          <span className="text-sm">16 lessons (3h 45m)</span>
        </li>
        <li className="flex items-center">
          <FaFile className="text-[var(--color-grey)] w-5 h-5 mr-2" />
          <span className="text-sm">17 additional resources (3 files)</span>
        </li>
        <li className="flex items-center">
          <FaPlayCircle className="text-[var(--color-grey)] w-5 h-5 mr-2" />
          <span className="text-sm">Online and at your own pace</span>
        </li>
        <li className="flex items-center">
          <FaMobileAlt className="text-[var(--color-grey)] w-5 h-5 mr-2" />
          <span className="text-sm">Available on the app</span>
        </li>
        <li className="flex items-center">
          <FaHeadphonesAlt className="text-[var(--color-grey)] w-5 h-5 mr-2" />
          <span className="text-sm">Audio: English</span>
        </li>
        <li className="flex items-center">
          <FaGlobe className="text-[var(--color-grey)] w-5 h-5 mr-2" />
          <span className="text-sm">English, Spanish, Portuguese, German, French, Italian, Polish, Dutch</span>
        </li>
        <li className="flex items-center">
          <FaPlayCircle className="text-[var(--color-grey)] w-5 h-5 mr-2" />
          <span className="text-sm">Level: Beginner</span>
        </li>
        <li className="flex items-center">
          <FaPlayCircle className="text-[var(--color-grey)] w-5 h-5 mr-2" />
          <span className="text-sm">Unlimited lifetime access</span>
        </li>
      </ul>
    </div>
  );
};

export default EnrolledOverviewFixedInfo;
