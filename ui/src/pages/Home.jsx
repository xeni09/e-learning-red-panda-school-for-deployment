import React from "react";
import { Link } from "react-router-dom";
import Section from "../components/Section";
import heroBanner from "../assets/hero-banner2.png";
import alpaca from '../assets/images/alpaca.webp';
import cat from '../assets/images/cat.jpeg';
import python from '../assets/images/python.jpg';
import CourseCardGrid from '../components/CourseCard';
import Feedback from '../components/Feedback';
import CallToAction from "../components/CallToAction";


const courses = [
  {
    id: 1,
    category: 'Programming',
    teacher: 'Alpaca McFluff',
    name: 'Alpaca Algorithms',
    description: 'Learn the fundamentals of algorithms with the fluffiest coder around.',
    imageSrc: alpaca,
    imageAlt: 'An alpaca representing the Programming course',
    participants: 150,
    positiveReviews: 98,
    price: '59.99',
  },
  {
    id: 2,
    category: 'Design',
    teacher: 'Catnip Whiskers',
    name: 'Cat Creations',
    description: 'Unleash your creativity with design principles taught by a curious cat.',
    imageSrc: cat,
    imageAlt: 'A cat representing the Design course',
    participants: 90,
    positiveReviews: 93,
    price: '49.99',
  },
  {
    id: 5,
    category: 'Programming',
    teacher: 'Python Pete',
    name: 'Python Programming',
    description: 'Dive into Python programming with the expertise of Python Pete.',
    imageSrc: python,
    imageAlt: 'A python representing the Programming course',
    participants: 130,
    positiveReviews: 94,
    price: '59.99',
  },
];


const Home = () => {
  return (
    <>
      <Section
        backgroundColor="orange"
        titleColor="white"
        textColor="white"
        image={heroBanner}
        title="The Best Online Platform for Education."
        text={<>
          Online courses from the world's leading experts.
          <br />
          Join 17 million learners today.
        </>}
        imagePosition="right"
        imageSize={500}
        buttonBgColor={"yellow"}
        buttonTextColor={"white"}
        buttonText={"Let's Get Started"}
        buttonLink="/courses"
        showStatsSection={true}
      />
      
      <div className="container mx-auto p-4 py-20">
        <h1 className="  font-bold text-[var(--color-black)] text-center pb-16">Featured Courses</h1>
        <CourseCardGrid courses={courses.slice(0, 3)} />
      </div>
      <h2 className="   font-bold text-center my-4">Ready to learn more?</h2>
      <div className="text-center mb-20 m-4">
        <Link to="/courses" className="btn">
         Explore all courses
        </Link>
        
      </div>
      <Feedback />
      <CallToAction />
    </>
  );
};

export default Home;