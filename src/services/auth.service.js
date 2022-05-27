import axios from 'axios';
import api_env from '../env/api_env';

const HOST = api_env.HOST;


class AuthService {
    async getToken(email = api_env.sysAdminEmail, password = api_env.sysAdminPassword) {
        const token = await axios.post(`${HOST}/api/token`, {
            email,
            password,
        }).then(res => res.data.accessToken);

        localStorage.setItem('token', token);
        console.log(token);
        return token;
    }

    async signOut() {
        localStorage.removeItem('token');
    }
}

export default AuthService;
