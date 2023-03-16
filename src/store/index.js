import { createStore } from "vuex";
import auth from './modules/auth/index';
import { LOADING_SPINNER_SHOW_MUTATION } from './storeconstants';


export default createStore({
  state() {
    return {
      showLoading: false,
  };
  },
  getters: {},
  mutations: {
    [LOADING_SPINNER_SHOW_MUTATION](state, payload) {
      state.showLoading = payload;
    },
  },
  actions: {},
  modules: {
    auth,
  },
});
