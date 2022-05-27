import axios from "axios";
import api_env from "../env/api_env";

const HOST = api_env.HOST;
const TOKEN = localStorage.getItem("token");

class CommentService {
    async getComments(pageNumber = 1, pageSize = 10, commentsID) {
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
}

export default CommentService;