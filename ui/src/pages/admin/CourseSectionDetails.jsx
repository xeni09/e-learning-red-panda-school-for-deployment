import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CourseSectionDetails = () => {
  const { courseId, sectionId } = useParams();
  const [section, setSection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSectionDetails = async () => {
      try {
        const response = await axios.get(`/api/courses/${courseId}/sections/${sectionId}`);
        setSection(response.data);
      } catch (error) {
        console.error('Error fetching section details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSectionDetails();
  }, [courseId, sectionId]);

  if (loading) {
    return <p>Loading section details...</p>;
  }

  if (!section) {
    return <p>Section not found</p>;
  }

  return (
    <div>
      <h2>{section.title}</h2>
      <p>{section.description}</p>
      {section.videoUrl && <a href={section.videoUrl} target="_blank" rel="noopener noreferrer">Watch Video</a>}
      {section.thumbnail && <img src={section.thumbnail} alt={section.title} />}
    </div>
  );
};

export default CourseSectionDetails;
