import axios from "../api/axios";

const COMMENT_API = 'comments';
const COURSE_API = 'courses'

export const fetchCommentsByCourse = async (id) => {
    return await axios.get(`/user/${COURSE_API}/${id}/${COMMENT_API}`)
}