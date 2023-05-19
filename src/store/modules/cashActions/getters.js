import {
    GET_CASH_ACTIONS_GETTER,
    GET_CATEGORIES_GETTER,
    GET_CATEGORIES_BALANCES_GETTER,
    GET_CATEGORIES_BALANCES_TO_TIME_GETTER,
    GET_TOTAL_BALANCE_TO_TIME_GETTER,
} from '../../storeconstants';

export default {
    [GET_CASH_ACTIONS_GETTER]: (state) => {
        return state.cashActions;
    },
    [GET_CATEGORIES_GETTER]: (state) => {
        return state.categories;
    },
    [GET_CATEGORIES_BALANCES_GETTER]: (state) => {
        return state.categoriesBalances;
    },
    [GET_CATEGORIES_BALANCES_TO_TIME_GETTER]: (state) => {
        return state.toTimeBalances.toISOString().split("T")[0];
    },
    [GET_TOTAL_BALANCE_TO_TIME_GETTER]: (state) => {
        return state.toTimeTotalBalance.toISOString().split("T")[0];
    },
};