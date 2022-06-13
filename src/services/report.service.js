import axios from 'axios';
import api_env from '../env/api_env';

const HOST = api_env.HOST;
const TOKEN = localStorage.getItem('token');

class ReportService {
  async generateReport(periodId) {
    return await axios.get(`${HOST}/api/report/${periodId}`, {
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      }
    });
  }
}

export default ReportService;
