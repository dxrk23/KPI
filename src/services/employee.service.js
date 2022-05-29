import axios from "axios";
import api_env from "../env/api_env";

const HOST = api_env.HOST;
const TOKEN = localStorage.getItem("token");

class EmployeeService {
    async getEmployeeById(employeeId) {
        return await axios.get(`${HOST}/api/employee/${employeeId}`, {
            headers: {
                Authorization: `Bearer ${TOKEN}`
            }
        }).then(res => res.data);
    }

    async getEmployees(positionId = '', pageNumber = 1, pageSize = 10) {
        let position = positionId ? `&positionId=${positionId}` : '';
        let page = pageNumber ? `&pageNumber=${pageNumber}` : '';
        let size = pageSize ? `pageSize=${pageSize}` : '';
        return await axios.get(`${HOST}/api/employee?${size}${page}${position}`, {
            headers: {
                Authorization: `Bearer ${TOKEN}`
            }
        }).then(res => res.data);
    }

    async resetPassword(employeeId) {
        return await axios.post(`${HOST}/api/employee/resetPassword/${employeeId}`, {}, {
            headers: {
                Authorization: `Bearer ${TOKEN}`
            }
        }).then(res => res.data);
    }
}

export default EmployeeService;