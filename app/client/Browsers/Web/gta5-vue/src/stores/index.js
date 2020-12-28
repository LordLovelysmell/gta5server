import { createStore } from "vuex";
import auth from './auth.js';
import atm from './atm.js';

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    atm
  }
});
