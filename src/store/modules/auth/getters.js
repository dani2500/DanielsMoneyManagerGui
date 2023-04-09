import {
    GET_USER_JWT_GETTER,
    GET_USER_NAME_GETTER,
    GET_USER_EMAIL_GETTER,
    IS_USER_AUTHENTICATED_GETTER,
} from '../../storeconstants';

export default {
    [GET_USER_JWT_GETTER]: (state) => {
        return state.Jwt;
    },
    [IS_USER_AUTHENTICATED_GETTER]: (state) => {
        return !!state.Jwt;
    },
    [GET_USER_NAME_GETTER]: (state) => {
        return state.UserName;
    },
    [GET_USER_EMAIL_GETTER]: (state) => {
        return state.UserEmail;
    },
};