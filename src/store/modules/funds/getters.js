import {
    GET_FUNDS_GETTER,
    GET_FUNDS_STATUS_GETTER,
    GET_FUNDS_STATUS_TO_TIME_GETTER,
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
};