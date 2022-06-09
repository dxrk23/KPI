import axios from 'axios';
import api_env from '../env/api_env';

const HOST = api_env.HOST;
const TOKEN = localStorage.getItem('token');

class IndicatorService {
    async getIndicators(pageNumber = 1, pageSize = 10) {
        const response = await axios.get(`${HOST}/api/indicator?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        });
        return response.data;
    }

    async createIndicator(indicator) {
        const response = await axios.post(`${HOST}/api/indicator`, {...indicator}, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        });
        return response.data;
    }

    async getIndicator(id) {
        const response = await axios.get(`${HOST}/api/indicator/${id}`, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        });
        return response.data;
    }

    async updateIndicator(id, indicator) {
        const response = await axios.put(`${HOST}/api/indicator/${id}`, {...indicator}, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        });
        return response.data;
    }

    async deleteIndicator(id) {
        const response = await axios.delete(`${HOST}/api/indicator/${id}`, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        });
        return response.data;
    }
}

export default IndicatorService;
