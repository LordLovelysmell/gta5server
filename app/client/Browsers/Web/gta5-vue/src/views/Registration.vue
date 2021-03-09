<template>
  <div class="login">
    <modal>
      <div class="text-light">
        <img class="logo" src="@/assets/logo.png" alt="" />
        <h4 class="text-center mb-3">Регистрация</h4>

        <form class="form mb-2">
          <div class="form-group">
            <input
              v-model="login"
              type="text"
              :class="['form-control', { 'is-valid': login.length > 0 }]"
              placeholder="Логин"
              required
            />
          </div>
          <div class="form-group">
            <input
              v-model="password"
              type="password"
              :class="['form-control', { 'is-valid': password.length > 0 }]"
              placeholder="Пароль"
              required
            />
          </div>
          <div class="form-group">
            <input
              v-model="passwordConfirm"
              type="password"
              :class="['form-control', validityClass]"
              placeholder="Подтвердите пароль"
              @blur="defineValidityClass"
              required
            />
          </div>
          <button
            type="submit"
            class="btn btn-block btn-primary"
            :class="{ disabled: !isValid }"
            :aria-disabled="!isValid"
            :disabled="!isValid"
            @click="register"
          >
            Зарегистрироваться
          </button>
        </form>
        <router-link to="/login" class="nav-link text-center text-light"
          >Авторизация</router-link
        >
      </div>
    </modal>
  </div>
</template>

<script>
// @ is an alias to /src
import Modal from "@/components/Modal.vue";

export default {
  name: "Registration",
  components: {
    Modal,
  },
  data() {
    return {
      login: "",
      password: "",
      passwordConfirm: "",
      validityClass: "",
    };
  },
  computed: {
    isValid() {
      return (
        this.login.length &&
        this.password.length &&
        this.password === this.passwordConfirm
      );
    },
  },
  methods: {
    register(e) {
      e.preventDefault();

      if (!this.isValid) {
        return;
      }

      const user = {
        login: this.login,
        password: this.password,
      };

      // eslint-disable-next-line
      mp.trigger(
        "callServerEvent",
        "server/basic/auth/signUp",
        JSON.stringify(user)
      );
    },
    defineValidityClass() {
      if (!this.password.length) {
        return;
      }
      this.validityClass =
        this.passwordConfirm.length > 0 &&
        this.passwordConfirm === this.password
          ? "is-valid"
          : "is-invalid";
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  position: relative;
}
.description {
  max-width: 300px;
  margin: 0 auto 20px;
}
.logo {
  width: 300px;
  margin: 0 auto 15px;
  display: block;
}
</style>
