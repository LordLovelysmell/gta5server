export default {
  computed: {
    isLoginPage() {
      return this.$route.name === "login"
    }
  }
}
