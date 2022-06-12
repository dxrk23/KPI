import axios from 'axios';
import api_env from '../env/api_env';

const HOST = api_env.HOST;
const TOKEN = localStorage.getItem('token');


class AdminTaskListService {
  async getAdminTaskList(pageNumber = 1, pageSize = 10) {
    return await axios.get(`${HOST}/api/admintasklist?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }).then((res) => {
      return res.data
    });
  }

  async getAdminTaskListByEmployeeIdAndPeriodId(employeeId, periodId) {
    return await axios.get(`${HOST}/api/admintasklist/${employeeId}/${periodId}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }).then((res) => {
      res.data
    });
  }
}

export default AdminTaskListService;