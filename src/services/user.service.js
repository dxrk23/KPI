export function authHeader() {
  let user = JSON.parse(localStorage.getItem('user'));

  return user && user.accessToken ? { 'x-access-token': user.accessToken } : {};
}
