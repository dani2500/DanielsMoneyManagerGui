// Modules
export const AUTH_MODULE = 'auth';

// Actions
export const SIGNUP_ACTION =    '[actions] signup user';
export const LOGIN_ACTION =     '[actions] login user';
export const LOGOUT_ACTION =    '[actions] logout user';
export const AUTH_ACTION =      '[actions] auth user ';
export const AUTO_LOGOUT_ACTION = '[actions] auto logout';
export const AUTO_LOGIN_ACTION = '[actions] auth auto login';

// Mutations
export const SET_USER_JWT_MUTATION = '[mutations] set user jwt';
export const LOADING_SPINNER_SHOW_MUTATION = '[mutations] show loading spinner';
export const SET_AUTO_LOGOUT_MUTATION = '[mutations] set auto logout';

// Getters
export const GET_USER_JWT_GETTER = '[getters] user jwt';
export const GET_USER_NAME_GETTER ='[getters] user name';
export const GET_USER_EMAIL_GETTER ='[getters] user email';
export const GET_USER_ID_GETTER ='[getters] user id';
export const IS_USER_AUTHENTICATED_GETTER ='[getters] is user authenticated';
