import axios from 'axios';
import api_env from '../env/api_env';

const HOST = api_env.HOST;
const TOKEN = localStorage.getItem('token');

class FileService {
  async uploadFile(file) {
    return await axios
      .post(
        `${HOST}/api/file`,
        file,
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      )
      .then((res) => res.data);
  }

  async downloadFile(id) {
    return await axios
      .get(`${HOST}/api/file/${id}`, {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => {
        return res
      });
  }
}

export default FileService;
