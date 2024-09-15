import axios from "./axiosConfig";

export const getCourses = async () => {
  return await axios.get("/api/courses"); // Fetch all courses
};

export const createCourse = async (courseData) => {
  return await axios.post("/api/courses", courseData); // Create a new course
};
