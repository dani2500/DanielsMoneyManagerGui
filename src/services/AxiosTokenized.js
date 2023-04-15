import axios from "axios";
import store from "../store/index";
import {
  GET_USER_JWT_GETTER,
  AUTH_MODULE,
  TOAST_SHOW_MUTATION,
} from "../store/storeconstants";

export function GetAxiosTokenized() {
  const axiosInstance = axios.create({});

  let accessToken = store.getters[`${AUTH_MODULE}/${GET_USER_JWT_GETTER}`];
  axiosInstance.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${accessToken}`;
  axiosInstance.defaults.baseURL = process.env.VUE_APP_BASE_URL;

  axiosInstance.interceptors.response.use(
    (response) => {
      store.commit(TOAST_SHOW_MUTATION, false, { root: true });
      return response;
    },
    (error) => {
      store.commit(TOAST_SHOW_MUTATION, true, { root: true });
      throw error;
    }
  );

  return axiosInstance;
}

export function GetAxios() {
  const axiosInstance = axios.create({});
  axiosInstance.defaults.baseURL = process.env.VUE_APP_BASE_URL;

  return axiosInstance;
}
