import {
  POPULATE_FUNDS_MUTATION,
  POPULATE_FUNDS_STATUS_MUTATION,
  ADD_FUND_MUTATION,
  UPDATE_FUND_MUTATION,
  DELETE_FUND_MUTATION,
  SET_FUNDS_STATUS_TO_TIME_MUTATION,
} from "../../storeconstants";

export default {
  [POPULATE_FUNDS_MUTATION](state, payload) {
    state.funds = payload;
  },
  [ADD_FUND_MUTATION](state, payload) {
    state.funds.push(payload);
  },
  [DELETE_FUND_MUTATION](state, payload) {
    let funds = state.funds.filter(function( obj ) {
        return obj.value !== payload.fundId;
    });
    state.funds = funds;
  },
  [UPDATE_FUND_MUTATION](state, payload) {
    let funds = state.funds;
    let idx = funds.findIndex((obj => obj.fundId == payload.fundId));
    funds[idx].fundName = payload.fundName;
    state.funds = funds;
  },
  [POPULATE_FUNDS_STATUS_MUTATION](state, payload) {
    state.fundsStatus = payload;
  },
  [SET_FUNDS_STATUS_TO_TIME_MUTATION](state, payload) {
    state.fundsStatusToTime = payload;
  },
};
