const module = {
  namespaced: true,
  state: {
    atmData: null,
    currentNumpadInput: '',
  },
  mutations: {
    setATMData(state, serializedData) {
      const { bank_account_id, character_id, bank_card_id, balance, pin_code, is_default } = JSON.parse(serializedData)
      state.atmData = Object.assign({}, state.atmData, {
        bank_account_id,
        character_id,
        bank_card_id,
        balance,
        pin_code,
        is_default
      })
    },
    setAdditionalNumberToNumpadInput(state, number) {
      state.currentNumpadInput = `${state.currentNumpadInput}${number}`
    },
    clearNumpadInput(state) {
      state.currentNumpadInput = ''
    },
    setFinalNumberToNumpadInput(state, number) {
      state.currentNumpadInput = number
    }
  },
  getters: {
    getATMData(state) {
      return state.atmData
    },
    currentNumpadInput(state) {
      return state.currentNumpadInput
    }
  }
}

export default module
