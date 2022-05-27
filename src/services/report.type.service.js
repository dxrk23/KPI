import axios from "axios";
import api_env from "../env/api_env";

const HOST = api_env.HOST;
const TOKEN = localStorage.getItem("token");

class ReportTypeService {
    async getReportTypes(pageNumber = 1, pageSize = 10) {
        return await axios.get(`${HOST}/api/reportType?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        }).then(res => res.data);
    }

    async getReportTypeById(id) {
        return await axios.get(`${HOST}/api/reportType/${id}`, {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        }).then(res => res.data);
    }

    async createReportType(reportType) {
        return await axios.post(`${HOST}/api/reportType`, {
            ...reportType,
        }, {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        }).then(res => res.data);
    }

    async updateReportType(id, reportType) {
        return await axios.put(`${HOST}/api/reportType/${id}`, {
            ...reportType,
        }, {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        }).then(res => res.data);
    }

    async deleteReportType(id) {
        return await axios.delete(`${HOST}/api/reportType/${id}`, {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        }).then(res => res.data);
    }
}

export default ReportTypeService;