import axios from "axios";
import api_env from "../env/api_env";

const HOST = api_env.HOST;
const TOKEN = localStorage.getItem("token");

class CommentService {
    async getComments(commentsID, pageNumber = 1, pageSize = 10) {
        return await axios.get(`${HOST}/api/comment/list/${commentsID}?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        }).then(res => res.data);
    }

    async createComment(comment) {
        return await axios.post(`${HOST}/api/comment`, {
            ...comment,
        }, {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        }).then(res => res.data);
    }

    async updateComment(commentId, comment) {
        return await axios.put(`${HOST}/api/comment/${commentId}`, {
            ...comment,
        }, {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        }).then(res => res.data);
    }

    async deleteComment(commentId) {
        return await axios.delete(`${HOST}/api/comment/${commentId}`, {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        }).then(res => res.data);
    }
}

export default CommentService;