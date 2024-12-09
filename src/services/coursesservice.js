import axios from '../api/axios'

const COURSE_API = 'formations'

export const fetchCourses = async () => {
  return await axios.get(COURSE_API)
}

export const fetchCourseById = async (id) => {
  return await axios.get(`${COURSE_API}/${id}`)
}