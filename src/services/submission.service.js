import axios from 'axios';
import api_env from '../env/api_env';

const HOST = api_env.HOST;
const TOKEN = localStorage.getItem('token');

class SubmissionService {
  async getSubmissionByRequirementId(requirementId) {
    return await axios.get(`${HOST}/api/submission/${requirementId}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      }
    }).then(res => res.data).catch(error => {
      if (error.response.status === 404) {
        return null;
      }
    });
  }

  async postSubmission(submission) {
    return await axios.post(`${HOST}/api/submission`, {...submission}, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      }
    }).then(res => res.data);
  }
}

export default SubmissionService;