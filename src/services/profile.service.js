import axios from 'axios';
import api_env from '../env/api_env';

const HOST = api_env.HOST;
const TOKEN = localStorage.getItem('token');

class ProfileService {
    async getProfile() {
        const response = await axios.get(`${HOST}/api/profile`, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        });
        return response.data;
    }

    async updateProfile(data) {
        const response = await axios.put(`${HOST}/api/profile`, {...data}, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        });
        return response.data;
    }

    async changePassword(data) {
        const response = await axios.put(`${HOST}/api/profile/change-password`, {...data}, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        });
        return response.data;
    }

    async getSpecialtyByPeriod(periodId) {
        const response = await axios.get(`${HOST}/api/profile/specialty/${periodId}`, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        });
        return response.data;
    }

    async setSpecialty(data) {
        const response = await axios.post(`${HOST}/api/profile/specialty`, {...data}, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        });
        return response.data;
    }
}

export default ProfileService;