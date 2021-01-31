const module = {
  namespaced: true,
  state: {
    atmData: {
      currentComponent: 'PinCodeScreen'
    }
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
    }
  },
  getters: {
    getATMData(state) {
      return state.atmData
    }
  }
}

export default module
