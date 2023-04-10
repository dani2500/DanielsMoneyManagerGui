// Modules
export const AUTH_MODULE = 'auth';
export const CASH_ACTIONS_MODULE = 'cashActions';
export const FUNDS_MODULE = 'funds';


// --------------------------------------------------- Auth ---------------------------------------------------
// Actions
export const SIGNUP_ACTION =    '[actions] signup user';
export const LOGIN_ACTION =     '[actions] login user';
export const LOGOUT_ACTION =    '[actions] logout user';
export const AUTH_ACTION =      '[actions] auth user ';
export const AUTO_LOGOUT_ACTION = '[actions] auto logout';
export const AUTO_LOGIN_ACTION = '[actions] auth auto login';
export const ON_AUTO_LOGIN_OR_AUTH = '[actions] on auto login or auth';

// Mutations
export const SET_USER_JWT_MUTATION = '[mutations] set user jwt';
export const LOADING_SPINNER_SHOW_MUTATION = '[mutations] show loading spinner';
export const SET_AUTO_LOGOUT_MUTATION = '[mutations] set auto logout';

// Getters
export const GET_USER_JWT_GETTER = '[getters] get user jwt';
export const GET_USER_NAME_GETTER ='[getters] get user name';
export const GET_USER_EMAIL_GETTER ='[getters] get user email';
export const IS_USER_AUTHENTICATED_GETTER ='[getters] is user authenticated';


// --------------------------------------------------- Cash Actions ---------------------------------------------------
// Actions
export const POPULATE_CASH_ACTIONS_ACTION =    '[actions] get cash actions';
export const POPULATE_CASH_ACTIONS_CATEGORIES_ACTION =    '[actions] get cash actions categories';
export const POPULATE_CASH_ACTIONS_CATEGORIES_BALANCES_ACTION =    '[actions] get cash actions categories balances';

export const ADD_CASH_ACTION_ACTION =    '[actions] add cash action';
export const ADD_CASH_ACTION_CATEGORY_ACTION =    '[actions] add cash action category';

export const DELETE_CASH_ACTION_ACTION = '[actions] delete cash action'
export const DELETE_CASH_ACTION_CATEGORY_ACTION = '[actions] delete cash action category'

export const UPDATE_CASH_ACTION_ACTION = '[actions] update cash action'
export const UPDATE_CASH_ACTION_CATEGORY_ACTION = '[actions] update cash action category'

export const SET_CATEGORIES_BALANCES_TO_TIME_ACTION = '[actions] set cash actions categories balances to time';
export const SET_TOTAL_BALANCE_TO_TIME_ACTION ='[actions] set cash actions categories total balance to time';

// Mutations
export const SET_CASH_ACTIONS_MUTATION = '[mutations] set cash actions';
export const SET_CASH_ACTIONS_CATEGORIES_MUTATION = '[mutations] set cash actions categories';
export const SET_CASH_ACTIONS_CATEGORIES_BALANCES_MUTATION = '[mutations] set cash actions categories balances';
export const SET_CATEGORIES_BALANCES_TO_TIME_MUTATION = '[mutations] set cash actions categories balances to time';
export const SET_TOTAL_BALANCE_TO_TIME_MUTATION ='[mutations] set cash actions categories total balance to time';

export const ADD_CASH_ACTION_MUTATION = '[mutations] add cash action';
export const ADD_CASH_ACTION_CATEGORY_MUTATION = '[mutations] add cash action category';

export const DELETE_CASH_ACTION_MUTATION = '[mutations] delete cash action';
export const DELETE_CASH_ACTION_CATEGORY_MUTATION = '[mutations] delete cash action category'

export const UPDATE_CASH_ACTION_MUTATION = '[mutations] update cash action';
export const UPDATE_CASH_ACTION_CATEGORY_MUTATION = '[mutations] update cash action category';

// Getters
export const GET_CASH_ACTIONS_GETTER = '[getters] get cash actions';
export const GET_CATEGORIES_GETTER ='[getters] get cash actions categories';
export const GET_CATEGORIES_BALANCES_GETTER ='[getters] get cash actions categories balances';
export const GET_CATEGORIES_BALANCES_TO_TIME_GETTER = '[getters] get cash actions categories balances to time';
export const GET_TOTAL_BALANCE_TO_TIME_GETTER ='[getters] get cash actions categories total balance to time';


// --------------------------------------------------- Funds ---------------------------------------------------


// Actions
export const POPULATE_FUNDS_ACTION =    '[actions] populate funds';
export const POPULATE_FUNDS_STATUS_ACTION =    '[actions] populate funds status';
export const ADD_FUND_ACTION =    '[actions] add fund';
export const UPDATE_FUND_ACTION =    '[actions] update fund';
export const DELETE_FUND_ACTION =    '[actions] delete fund';
export const SET_FUNDS_STATUS_TO_TIME_ACTION =    '[actions] set funds status to time';

// Mutations
export const POPULATE_FUNDS_MUTATION =    '[mutations] populate funds';
export const POPULATE_FUNDS_STATUS_MUTATION =    '[mutations] populate funds status';
export const ADD_FUND_MUTATION =    '[mutations] add fund';
export const UPDATE_FUND_MUTATION =    '[mutations] update fund';
export const DELETE_FUND_MUTATION =    '[mutations] delete fund';
export const SET_FUNDS_STATUS_TO_TIME_MUTATION =    '[mutations] set funds status to time';

// Getters
export const GET_FUNDS_GETTER = '[getters] get funds';
export const GET_FUNDS_STATUS_GETTER ='[getters] get funds status';
export const GET_FUNDS_STATUS_TO_TIME_GETTER ='[getters] get funds status to time';
