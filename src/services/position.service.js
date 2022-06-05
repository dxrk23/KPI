import api_env from '../env/api_env';
import axios from 'axios';

const HOST = api_env.HOST;
const TOKEN = localStorage.getItem('token');

class PositionService {
  async getPositionsPage(pageNumber = 1, pageSize = 10) {
    return await axios
      .get(`${HOST}/api/position?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => res.data);
  }

  async createPosition(position) {
    return await axios
      .post(
        `${HOST}/api/position`,
        {
          ...position,
        },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      )
      .then((res) => res.data);
  }

  async getPositionById(id) {
    return await axios
      .get(`${HOST}/api/position/${id}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => res.data);
  }

  async updatePosition(id, position) {
    return await axios
      .put(
        `${HOST}/api/position/${id}`,
        {
          name: position,
        },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      )
      .then((res) => res.data);
  }

  async deletePosition(id) {
    return await axios
      .delete(`${HOST}/api/position/${id}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => res.data);
  }
}

export default PositionService;
