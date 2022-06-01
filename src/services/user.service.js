import axios from "axios";
import api_env from "../env/api_env";

const HOST = api_env.HOST;
const TOKEN = localStorage.getItem("token");

class UserService {
    async updatePassword(passwords) {
        return await axios.post(`${HOST}/api/profile/password`, {
            ...passwords,
        }, {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        }).then(res => res.data);
    }

    async updateDetail(details) {
        return await axios.post(`${HOST}/api/profile/detail`, {
            ...details,
        }, {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        }).then(res => res.data);
    }
}

export default UserService;