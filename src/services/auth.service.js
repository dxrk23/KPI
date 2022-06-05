import axios from 'axios';
import api_env from '../env/api_env';

const HOST = api_env.HOST;

class AuthService {
  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  async getToken(email, password) {
    const token = await axios
      .post(`${HOST}/api/token`, {
        email,
        password,
      })
      .then((res) => res.data.accessToken);

    let user = this.parseJwt(token);

    localStorage.setItem('token', token);
    localStorage.setItem('user', user);
  }

  parseJwt(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
  }

  async signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}

export default AuthService;
