const user = JSON.parse(localStorage.getItem('user'));

class userUtil {
  static isUserRoot() {
    return user.posType === 'Root';
  }

  static getUserPositionId() {
    return user.posId;
  }

  static getUserId() {
    return user.sub;
  }

  static getUserFullName() {
    return `${user.lastName} ${user.firstName} ${user.middleName ?? ''}`;
  }
}

export default userUtil;