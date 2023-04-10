import {
    POPULATE_FUNDS_ACTION,
    POPULATE_FUNDS_STATUS_ACTION,
    ADD_FUND_ACTION,
    UPDATE_FUND_ACTION,
    DELETE_FUND_ACTION,
    SET_FUNDS_STATUS_TO_TIME_ACTION,

    POPULATE_FUNDS_MUTATION,
    POPULATE_FUNDS_STATUS_MUTATION,
    ADD_FUND_MUTATION,
    UPDATE_FUND_MUTATION,
    DELETE_FUND_MUTATION,
    SET_FUNDS_STATUS_TO_TIME_MUTATION,

    GET_FUNDS_STATUS_TO_TIME_GETTER,
  } from "../../storeconstants";
  import {
    getFunds,
    getFundsStatus,
    insertFund,
    deleteFund,
    updateFund
  } from "../../../services/ApiRequests";
  import GeneralValidations from "../../../services/GeneralValidations";
  
  export default {
    // --------------------------- Cash Actions Categories ---------------------------
    async [POPULATE_FUNDS_ACTION](context) {
      let funds = await getFunds();
      context.commit(POPULATE_FUNDS_MUTATION, funds);
      context.dispatch(POPULATE_FUNDS_STATUS_ACTION);
    },
    
    async [POPULATE_FUNDS_STATUS_ACTION](context) {
      let toTime = context.getters[GET_FUNDS_STATUS_TO_TIME_GETTER];
      let fundsStatus = await getFundsStatus(toTime);
      context.commit(
        POPULATE_FUNDS_STATUS_MUTATION,
        fundsStatus
      );
    },
  
    async [ADD_FUND_ACTION](context, payload) {
      let response;
      
      try {
        response = await insertFund(payload);
        context.commit(ADD_FUND_MUTATION, response.data);
      } catch (err) {
        var code = 404;
        var msg = null;
        if (err.response !== undefined) {
          code = err.response.status;
          msg = err.response.data.message;
        }
        let errorMessage = GeneralValidations.getErrorMessage(code, msg);
        throw errorMessage;
      }
      context.dispatch(POPULATE_FUNDS_STATUS_ACTION);
    },
  
    async [UPDATE_FUND_ACTION](context, payload) {
      await updateFund(payload);
      context.commit(UPDATE_FUND_MUTATION, payload);
      context.dispatch(POPULATE_FUNDS_STATUS_ACTION);
    },
  
    async [DELETE_FUND_ACTION](context, payload) {
      await deleteFund(payload);
      context.commit(DELETE_FUND_MUTATION, payload);
      context.dispatch(POPULATE_FUNDS_STATUS_ACTION);
    },
  
    async [SET_FUNDS_STATUS_TO_TIME_ACTION](context, payload) {
      let datetimeObj = new Date(payload);
      context.commit(SET_FUNDS_STATUS_TO_TIME_MUTATION, datetimeObj);
      context.dispatch(POPULATE_FUNDS_STATUS_ACTION);
    },
  };
  