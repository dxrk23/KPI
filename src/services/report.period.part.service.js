import axios from 'axios';
import api_env from '../env/api_env';

const HOST = api_env.HOST;
const TOKEN = localStorage.getItem('token');

class ReportPeriodPartService {
    async getPeriodPartById(period_id) {
        const response = await axios.get(`${HOST}/api/periodPart/${period_id}`, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        });
        return response.data;
    }

    async createPeriodPart(data) {
        const response = await axios.post(`${HOST}/api/periodPart/`, {...data}, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        });
        return response.data;
    }

    async getPeriodPartByPeriodId(period_id) {
        const response = await axios.get(`${HOST}/api/periodPart/by-period/${period_id}`, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        });
        return response.data;
    }

    async updatePeriodPart(periodPartId, data) {
        const response = await axios.put(`${HOST}/api/periodPart/${periodPartId}`, {...data}, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        });
        return response.data;
    }

    async deletePeriodPart(periodPartId) {
        const response = await axios.delete(`${HOST}/api/periodPart/${periodPartId}`, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        });
        return response.data;
    }
}

export default ReportPeriodPartService;