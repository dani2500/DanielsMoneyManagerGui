import { createStore } from "vuex";

import auth from "./modules/auth/index";
import cashActions from "./modules/cashActions/index";
import funds from "./modules/funds/index";

import {
  TOAST_HIDE_ACTION,
  TOAST_SHOW_ACTION,
  LOADING_SPINNER_HIDE_ACTION,
  LOADING_SPINNER_SHOW_ACTION,
  LOADING_SPINNER_SHOW_MUTATION,
  TOAST_SHOW_MUTATION,
  GET_LOADING_SPINNER_SHOW_GETTER,
  GET_TOAST_SHOW_GETTER,
} from "./storeconstants";

export default createStore({
  state() {
    return {
      showLoading: false,
      showToast: false,
    };
  },
  modules: {
    auth,
    cashActions,
    funds,
  },
  getters: {
    [GET_LOADING_SPINNER_SHOW_GETTER](state) {
      return state.showLoading;
    },
    [GET_TOAST_SHOW_GETTER](state) {
      return state.showToast;
    },
  },
  mutations: {
    [LOADING_SPINNER_SHOW_MUTATION](state, payload) {
      state.showLoading = payload;
    },
    [TOAST_SHOW_MUTATION](state, payload) {
      state.showToast = payload;
    },
  },
  actions: {
    [LOADING_SPINNER_SHOW_ACTION](context) {
      context.commit(LOADING_SPINNER_SHOW_MUTATION, true);
    },
    [TOAST_SHOW_ACTION](context) {
      context.commit(LOADING_SPINNER_SHOW_MUTATION, true);
    },
    [LOADING_SPINNER_HIDE_ACTION](context) {
      context.commit(TOAST_SHOW_MUTATION, false);
    },
    [TOAST_HIDE_ACTION](context) {
      context.commit(TOAST_SHOW_MUTATION, false);
    },
  },
});
