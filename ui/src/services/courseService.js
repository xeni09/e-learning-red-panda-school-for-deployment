import axios from "./axiosConfig";

export const getCourses = async () => {
  return await axios.get("/api/courses", {
    withCredentials: true,
  });
};

export const createCourse = async (courseData) => {
  return await axios.post("/api/courses", courseData, {
    withCredentials: true,
  });
};
