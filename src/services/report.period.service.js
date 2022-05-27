import axios from "axios";
import api_env from "../env/api_env";

const HOST = api_env.HOST;
const TOKEN = localStorage.getItem("token");

class ReportPeriodService {
    async getReportingPeriods(pageNumber = 1, pageSize = 10) {
        return await axios.get(`${HOST}/api/reportingPeriod?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        }).then(res => res.data);
    }

    async getReportingPeriodById(id) {
        return await axios.get(`${HOST}/api/reportingPeriod/${id}`, {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        }).then(res => res.data);
    }

    async createReportingPeriod(reportingPeriod) {
        return await axios.post(`${HOST}/api/reportingPeriod`, {
            ...reportingPeriod,
        }, {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        }).then(res => res.data);
    }

    async updateReportingPeriod(id, reportingPeriod) {
        return await axios.put(`${HOST}/api/reportingPeriod/${id}`, {
            ...reportingPeriod,
        }, {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        }).then(res => res.data);
    }
}

export default ReportPeriodService;