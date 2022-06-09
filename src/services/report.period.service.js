import axios from 'axios';
import api_env from '../env/api_env';

const HOST = api_env.HOST;
const TOKEN = localStorage.getItem('token');

class ReportPeriodService {
    async getReportingPeriods(pageNumber = 1, pageSize = 10) {
        return await axios
            .get(`${HOST}/api/period?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            })
            .then((res) => res.data);
    }

    async getPeriodActive() {
        return await axios
            .get(`${HOST}/api/period/active`, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            })
            .then((res) => res.data);
    }

    async getReportingPeriodById(id) {
        return await axios
            .get(`${HOST}/api/by-period/${id}`, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            })
            .then((res) => res.data);
    }

    async createReportingPeriod(reportingPeriod) {
        return await axios
            .post(
                `${HOST}/api/period`,
                {
                    ...reportingPeriod,
                },
                {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`,
                    },
                }
            )
            .then((res) => res.data);
    }

    async updateReportingPeriod(id, reportingPeriod) {
        return await axios
            .put(
                `${HOST}/api/period/${id}`,
                {
                    ...reportingPeriod,
                },
                {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`,
                    },
                }
            )
            .then((res) => res.data);
    }

    async deleteReportingPeriod(periodId) {
        return await axios
            .delete(`${HOST}/api/period/${periodId}`, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            })
            .then((res) => res.data);
    }
}

export default ReportPeriodService;
