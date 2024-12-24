import axios from "../api/axios";

const COURSE_API = "courses";

export const fetchCourses = async () => {
  return await axios.get(COURSE_API);
};

export const fetchCoursesByUser = async () => {
  return await axios.get(`/user/${COURSE_API}`);
};

export const fetchCourseById = async (id) => {
  return await axios.get(`/user/${COURSE_API}/${id}`);
};
