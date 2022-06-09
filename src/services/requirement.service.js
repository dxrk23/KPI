import axios from 'axios';
import api_env from '../env/api_env';

const HOST = api_env.HOST;
const TOKEN = localStorage.getItem('token');

class RequirementService {
    async createRequirement(requirement) {
        return await axios.post(`${HOST}/api/requirement`, {...requirement}, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        }).then(response => response.data);
    }

    async deleteRequirement(id) {
        return await axios.delete(`${HOST}/api/requirement/${id}`, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        }).then(response => response.data);
    }

    async updateRequirement(id, requirement) {
        return await axios.put(`${HOST}/api/requirement/${id}`, {...requirement}, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        }).then(response => response.data);
    }

    async getRequirementById(id) {
        return await axios.get(`${HOST}/api/requirement/${id}`, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        }).then(response => response.data);
    }

    async getRequirementBySpecialityAndPeriodId(specialityId, periodId) {
        return await axios.get(`${HOST}/api/requirement/${specialityId}/${periodId}`, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        }).then(response => response.data);
    }

    async getRequirementForEmployee(employeeId, periodId) {
        return await axios.get(`${HOST}/api/requirement/for-employee/${employeeId}/${periodId}`, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        }).then(response => response.data);
    }
}

export default RequirementService;