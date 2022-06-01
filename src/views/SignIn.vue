<script lang="js">
import AuthService from '../services/auth.service';
const authService = new AuthService();

export default {
  data() {
    return {
      username: '',
      password: '',
    }
  },

  methods: {
    async login() {
      if (this.validate()) return;
      await authService.getToken(this.username, this.password).then(() => {
        if (authService.isLoggedIn()) {
          this.$router.push('/');
        }
      });
    },
    validate() {
      return this.username.length === 0 || this.password.length === 0;
    },
  }
}
</script>

<template>
  <main class="--sign-in-main">
    <div class="--sign-in-form">
      <div class="--sign-in-logo">
        <img src="../assets/logos/sign_in_logo.svg" alt="Logo"/>
      </div>

      <div class="--username-form">
        <label for="username-input" class="--username-label">Username</label>
        <input id="username-input" v-model="username" class="--username-input" placeholder="Username" type="email"/>
      </div>

      <div class="--password-form">
        <label for="password-input" class="--password-label">Password</label>
        <input type="password" placeholder="Password" id="password-input" class="--password-input" v-model="password"/>
      </div>

      <div class="--buttons">
        <div class="--remember-me-form">
          <input type="checkbox" id="remember-me-input" class="--remember-me-input"/>
          <label for="remember-me-input" class="--remember-me-label">Remember me</label>
        </div>

        <div class="--sign-in-button-form">
          <button class="--sign-in-button" @click="login()">Sign in</button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.--sign-in-main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.--sign-in-form {
  width: 455px;
  height: 584px;

  background-color: #fff;
  box-shadow: 8px 8px 28px rgba(0, 0, 0, 0.5);
}

.--sign-in-logo {
  width: 345px;
  height: 154px;

  margin: 45px auto 0;
}

.--sign-in-logo img {
  width: 100%;
  height: 100%;
}

.--username-form {
  width: 359px;
  height: 88px;

  margin: 46px auto 0;
}

.--username-input {
  width: 100%;
  height: 52px;

  font-size: 18px;

  margin-top: 18px;
  padding-left: 20px;
  outline: none;
  border: 1px solid black;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.00001);
}

.--username-label {
  height: 18px;
  width: 239px;
}

.--password-form {
  width: 359px;
  height: 88px;

  margin: 31px auto 0;
}

.--password-input {
  width: 100%;
  height: 52px;

  font-size: 18px;

  margin-top: 18px;
  padding-left: 20px;
  outline: none;
  border: 1px solid black;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.00001);
}

.--password-label {
  height: 18px;
  width: 239px;
}

.--remember-me-form {
  width: 160px;
  height: 27px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.--remember-me-input {
  width: 27px;
  height: 27px;

  cursor: pointer;
}

.--remember-me-label {
  height: 18px;
  width: 75%;
}

.--sign-in-button-form {
  width: 115px;
  height: 52px;
}

.--sign-in-button {
  width: 115px;
  height: 52px;

  filter: drop-shadow(3px 3px 11px rgba(0, 0, 0, 0.38));
  background-color: #33a8d5;
  border-radius: 6px;
  border: 1px solid black;

  font-size: 18px;
}

.--sign-in-button:hover {
  cursor: pointer;
  opacity: 0.9;
}

.--sign-in-button:active {
  opacity: 0.75;
}

.--buttons {
  margin: 37px auto;
  width: 357px;
  height: 52px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
