<template>
  <div class="login">
    <modal>
      <div class="text-light">
        <img class="logo" src="@/assets/logo.png" alt="" />
        <p class="description text-center">
          Добро пожаловать на Ardent RP. Войдите в свой аккаунт или
          зарегистрируйте новый.
        </p>

        <form class="form mb-2">
          <div class="form-group">
            <input
              v-model="login"
              type="text"
              class="form-control"
              placeholder="Логин"
              required
            />
          </div>
          <div class="form-group">
            <input
              v-model="password"
              type="password"
              class="form-control"
              placeholder="Пароль"
              required
            />
          </div>
          <button
            type="submit"
            class="btn btn-block btn-primary"
            @click="signIn"
          >
            Войти
          </button>
          <p class="text-danger">{{ serverResponse }}</p>
        </form>
        <router-link to="/registration" class="nav-link text-center text-light"
          >Регистрация</router-link
        >
      </div>
    </modal>
  </div>
</template>

<script>
// @ is an alias to /src
import Modal from "@/components/Modal.vue";
import { mapGetters } from "vuex";

export default {
  name: "Login",
  components: {
    Modal,
  },
  data() {
    return {
      login: "",
      password: "",
    };
  },
  computed: {
    ...mapGetters({
      serverResponse: "auth/getAlertMessage",
    }),
  },
  methods: {
    signIn() {
      const user = {
        login: this.login,
        password: this.password,
      };

      // eslint-disable-next-line
      mp.trigger(
        "callServerEvent",
        "sLogin-processLogin",
        JSON.stringify(user)
      );
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
