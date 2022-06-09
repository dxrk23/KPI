import axios from 'axios';
import api_env from '../env/api_env';

const HOST = api_env.HOST;
const TOKEN = localStorage.getItem('token');


class PostService {
    async getPosts(pageNumber = 1, pageSize = 10) {
        return await axios
            .get(`${HOST}/api/post?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            })
            .then((res) => res.data);
    }

    async getPostById(id) {
        return await axios
            .get(`${HOST}/api/post/${id}`, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            })
            .then((res) => res.data);
    }

    async createPost(post) {
        return await axios
            .post(
                `${HOST}/api/post`,
                {
                    ...post,
                },
                {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`,
                    },
                }
            )
            .then((res) => res.data);
    }

    async updatePost(post) {
        return await axios
            .put(
                `${HOST}/api/post/${post.id}`,
                {
                    title: post.title,
                    content: post.content,
                },
                {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`,
                    },
                }
            )
            .then((res) => res.data);
    }

    async deletePost(postId) {
        return await axios
            .delete(`${HOST}/api/post/${postId}`, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            })
            .then((res) => res.data);
    }
}

export default PostService;
