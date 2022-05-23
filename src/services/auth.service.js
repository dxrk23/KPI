import axios from 'axios';
import api_env from '../env/api_env';

const API_URL = api_env.URL;

import { fakeUsers } from '../api/user'

class AuthService {
  login(user) {
    // return axios
    //   .post(API_URL, {
    //     username: user.username,
    //     password: user.password,
    //   })
    //   .then((response) => {
    //     if (response.data.accessToken) {
    //       localStorage.setItem('user', JSON.stringify(response.data));
    //     }
    //     return response.data;
    //   });

    let loggedUser = fakeUsers.filter((fakeUser) => {
      return user.username === fakeUser.username && user.password === fakeUser.password;
    });

    if (loggedUser.length) {
      localStorage.setItem('user', JSON.stringify(loggedUser[0]));
    }
  }

  logout() {
    localStorage.removeItem('user');
  }
}

export default AuthService;
