import axios from 'axios';
import api_env from '../env/api_env';

const HOST = api_env.HOST;
const TOKEN = localStorage.getItem('token');

class CommentService {
    async getComments(blockId, pageNumber = 1, pageSize = 10) {
        const url = `${HOST}/api/comment/block/${blockId}/?pageNumber=${pageNumber}&pageSize=${pageSize}`;
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        });
        return response.data;
    }

    async getComment(commentId) {
        const url = `${HOST}/api/comment/${commentId}`;
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        });
        return response.data;
    }

    async updateComment(commentId, comment) {
        const url = `${HOST}/api/comment/${commentId}`;
        const response = await axios.put(url, {...comment}, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        });
        return response.data;
    }

    async deleteComment(commentId) {
        const url = `${HOST}/api/comment/${commentId}`;
        const response = await axios.delete(url, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        });
        return response.data;
    }

    async createComment(comment) {
        const url = `${HOST}/api/comment/`;
        const response = await axios.post(url, {...comment}, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        });
        return response.data;
    }
}

export default CommentService;
