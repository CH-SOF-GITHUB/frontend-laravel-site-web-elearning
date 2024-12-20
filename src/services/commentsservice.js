import axios from "../api/axios";

const COMMENT_API = 'comments';
const COURSE_API = 'courses'

export const fetchCommentsByCourse = async (id) => {
    return await axios.get(`/user/${COURSE_API}/${id}/${COMMENT_API}`)
}

export const addCommentToCourse = async (courseId, comment) => {
    return await axios.post(`/user/${COURSE_API}/${courseId}/${COMMENT_API}`, comment)
}