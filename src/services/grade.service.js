import axios from 'axios';
import api_env from '../env/api_env';

const HOST = api_env.HOST;
const TOKEN = localStorage.getItem('token');

class GradeService {
  async UpdateGrade(employeeId, requirementId, grade) {
    return await axios.put(`${HOST}/api/grade/${employeeId}/${requirementId}`, {...grade}, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      }
    }).then(res => res.data);
  }
}

export default GradeService;