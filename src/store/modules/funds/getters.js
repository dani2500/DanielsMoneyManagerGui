import {
    GET_FUNDS_GETTER,
    GET_FUNDS_STATUS_GETTER,
    GET_FUNDS_STATUS_TO_TIME_GETTER,
    GET_FUND_ACTIONS_GETTER,
} from '../../storeconstants';

export default {
    [GET_FUNDS_GETTER]: (state) => {
        return state.funds;
    },
    [GET_FUNDS_STATUS_GETTER]: (state) => {
        return state.fundsStatus;
    },
    [GET_FUNDS_STATUS_TO_TIME_GETTER]: (state) => {
        return state.fundsStatusToTime.toISOString().split("T")[0];
    },
    [GET_FUND_ACTIONS_GETTER]: (state) => {
        return state.fundActions;
    },
};