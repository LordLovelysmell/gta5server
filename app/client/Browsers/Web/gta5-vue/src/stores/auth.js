const module = {
  namespaced: true,
  state: {
    alertMessage: null,
  },
  mutations: {
    setAlertMessage(state, message) {
      state.alertMessage = message;
    },
  },
  getters: {
    getAlertMessage(state) {
      return state.alertMessage
    }
  }
}

export default module
