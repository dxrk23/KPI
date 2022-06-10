import axios from 'axios';
import api_env from '../env/api_env';

const HOST = api_env.HOST;
const TOKEN = localStorage.getItem('token');

class SpecialityService {
    createSpeciality(speciality) {
        return axios.post(`${HOST}/api/specialty`, {...speciality}, {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        }).then(response => response.data);
    }

    getSpecialitiesOfPosition(positionId) {
        return axios.get(`${HOST}/api/specialty/by-position/${positionId}`, {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        }).then(response => response.data);;
    }

    getSpecialitiesById(specialityId) {
        return axios.get(`${HOST}/api/specialty/${specialityId}`, {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        }).then(response => response.data);;
    }

    updateSpeciality(specialityId, speciality) {
        return axios.put(`${HOST}/api/specialty/${specialityId}`, {...speciality}, {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        }).then(response => response.data);
    }

    deleteSpeciality(specialityId) {
        return axios.delete(`${HOST}/api/specialty/${specialityId}`, {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        }).then(response => response.data);
    }
}

export default SpecialityService;