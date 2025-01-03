import axios from "../api/axios";

const COURSE_API = "courses";

const ENROLL_COURSE_APi = "enrolled_courses";

const ENROLL_COURSE_BY_USER_API = "enrollments";

export const fetchCourses = async () => {
  return await axios.get(COURSE_API);
};

export const fetchCoursesByUser = async () => {
  return await axios.get(`/user/${COURSE_API}`);
};

export const fetchCourseById = async (id) => {
  return await axios.get(`/user/${COURSE_API}/${id}`);
};

export const fetchEnrolledCourses = async () => {
  return await axios.get(`/user/${ENROLL_COURSE_APi}`);
}

export const fetchEnrolledCoursesByUser = async () => {
  return await axios.get(`/user/${ENROLL_COURSE_BY_USER_API}`);
};