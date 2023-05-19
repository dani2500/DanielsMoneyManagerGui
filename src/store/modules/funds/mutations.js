import {
  POPULATE_FUNDS_MUTATION,
  POPULATE_FUNDS_STATUS_MUTATION,
  POPULATE_FUND_ACTIONS_MUTATION,

  ADD_FUND_MUTATION,
  ADD_FUND_ACTION_MUTATION,

  UPDATE_FUND_MUTATION,
  UPDATE_FUND_ACTION_MUTATION,

  DELETE_FUND_MUTATION,
  DELETE_FUND_ACTION_MUTATION,

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
        return obj.fundId !== payload.fundId;
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

  // --------------------------- Fund Actions ---------------------------

  [POPULATE_FUND_ACTIONS_MUTATION](state, payload) {
   // let res = []; split to date only
    //payload.forEach(action => {
    //  action.investmentDate = action.investmentDate.split("T")[0];
    //  res.push(action);
    //})
    //state.fundActions = res;
    state.fundActions = payload;
  },
  [ADD_FUND_ACTION_MUTATION](state, payload) {
      state.fundActions.push(payload);
  },
  [DELETE_FUND_ACTION_MUTATION](state, payload) {
      let actionIdsToRemove = payload.split(",").map(Number);
      let actions = state.fundActions.filter( function( el ) {
          return !actionIdsToRemove.includes( el.fundActionId );
        } );
      state.fundActions = actions;
  },
  [UPDATE_FUND_ACTION_MUTATION](state, payload) {
      let actions = [];
      state.fundActions.forEach(element => {
          if(element.fundActionId == payload.fundActionId){
              actions.push(payload);
          }
          else{
              actions.push(element);
          }
      });
      state.fundActions = actions;
  },
};
