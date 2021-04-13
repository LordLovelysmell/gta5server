import { createStore } from "vuex";
import auth from './auth.js';
import atm from './atm.js';
import dialogue from './dialogue.js'

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    atm,
    dialogue
  }
});
