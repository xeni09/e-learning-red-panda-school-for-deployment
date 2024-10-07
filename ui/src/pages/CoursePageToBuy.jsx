import React from 'react';
import { useParams } from 'react-router-dom';
import CourseTabs from '../components/courseComponents/CourseTabs';
import CourseSummary from '../components/courseComponents/CourseSummary';
import FeaturedCoursesThin from '../components/courseComponents/FeaturedCoursesThin'; 

const CoursePageToBuy = () => {
  const { courseId } = useParams();
  
  const course = {
    title: "Python Programming",
    instructor: "Pete Python",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    posterUrl: "https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217",
    price: "49.99 €"
  };
  const selectedCourseIds = [1, 2];

  return (
    <div className="container my-16 p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        
        {/* Course Summary: Primero en móviles, segundo en escritorio */}
        <div className="order-first md:order-2 col-span-1">
          <div className="sticky top-40">
            <CourseSummary 
              courseName={course.title}
              price={course.price} 
              teacherName={course.instructor} 
              posterUrl={course.posterUrl} 
            />
          </div>
        </div>

        {/* Course Content */}
        <div className="col-span-1 md:col-span-3 mx-5">
          {/* Course Header */}
          <div className="order-2 md:order-1 mb-4">
            <h2 className="">{course.title}</h2>
            <p className="text-xl text-[var(--color-grey)]">{course.instructor}</p>
          </div>

          {/* Course Video */}
          <div className="order-1 md:order-2 mb-4"> 
            <video 
              className="w-full h-auto" 
              controls 
              poster={course.posterUrl}
            >
              <source src={course.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Course Tabs */}
          <div className="order-3 md:order-4 w-full">
            <CourseTabs />
          </div>

          {/* Featured Courses */}
          <div className="order-4 md:order-5 w-full">
            <FeaturedCoursesThin 
              title="Related Courses" 
              selectedCourseIds={selectedCourseIds} 
              titleFontSize="text-4xl"
              
            />
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default CoursePageToBuy;
