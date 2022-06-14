import axios from 'axios';
import api_env from '../env/api_env';

const HOST = api_env.HOST;
const TOKEN = localStorage.getItem('token');

class EmployeeService {
    async getEmployeeById(employeeId) {
        return await axios
            .get(`${HOST}/api/employee/${employeeId}`, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            })
            .then((res) => res.data);
    }

    async getEmployees(pageNumber = 1, pageSize = 10, positionId = '') {
        let position = positionId ? `&positionId=${positionId}` : '';
        let page = pageNumber ? `pageNumber=${pageNumber}` : '';
        let size = pageSize ? `&pageSize=${pageSize}` : '';
        return await axios
            .get(`${HOST}/api/employee?${page}${size}${position}`, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            }).then((res) => res.data);
    }

    async createEmployee(employee) {
        return await axios
            .post(`${HOST}/api/employee`, employee, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            })
            .then((res) => res.data);
    }

    async importEmployee(file) {
        return await axios
            .post(`${HOST}/api/employee/import`, file, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => res.data);
    }

    async resetPassword(employeeId) {
        return await axios
            .post(
                `${HOST}/api/employee/reset-password/${employeeId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`,
                    },
                }
            )
            .then((res) => res.data);
    }

    async allowSpecialtyChange(employeeId, periodId) {
        return await axios
            .post(`${HOST}/api/employee/allow-specialty-change`,
                {
                    employeeId,
                    periodId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`,
                    }
                }
            ).then((res) => res.data);
    }
}

export default EmployeeService;
