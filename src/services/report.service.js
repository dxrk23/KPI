import axios from "axios";
import api_env from "../env/api_env";

const HOST = api_env.HOST;
const TOKEN = localStorage.getItem("token");

class ReportService {
    async createReport(data) {
        return await axios.post(`${HOST}/api/report`, data, {
            headers: {
                Authorization: `Bearer ${TOKEN}`
            }
        });
    }

    async getOpenReports(pageNumber = 1, pageSize = 10) {
        return await axios.get(`${HOST}/api/report?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
            headers: {
                Authorization: `Bearer ${TOKEN}`
            }
        });
    }

    async acceptReport(reportId, value) {
        return await axios.post(`${HOST}/api/report/accept`, {
            reportId,
            value
        }, {
            headers: {
                Authorization: `Bearer ${TOKEN}`
            }
        });
    }

    async getOwnReports(pageNumber = 1, pageSize = 10) {
        return await axios.get(`${HOST}/api/report/owned?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
            headers: {
                Authorization: `Bearer ${TOKEN}`
            }
        });
    }
}

export default ReportService;