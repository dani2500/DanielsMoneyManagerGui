import {
  SET_CASH_ACTIONS_MUTATION,
  SET_CASH_ACTIONS_CATEGORIES_MUTATION,
  SET_CASH_ACTIONS_CATEGORIES_BALANCES_MUTATION,
  SET_CATEGORIES_BALANCES_TO_TIME_MUTATION,
  SET_TOTAL_BALANCE_TO_TIME_MUTATION,
  DELETE_CASH_ACTION_MUTATION,
  DELETE_CASH_ACTION_CATEGORY_MUTATION,
  UPDATE_CASH_ACTION_MUTATION,
  UPDATE_CASH_ACTION_CATEGORY_MUTATION,
  ADD_CASH_ACTION_MUTATION,
  ADD_CASH_ACTION_CATEGORY_MUTATION,
  POPULATE_CASH_ACTIONS_ACTION,
  POPULATE_CASH_ACTIONS_CATEGORIES_ACTION,
  POPULATE_CASH_ACTIONS_CATEGORIES_BALANCES_ACTION,
  ADD_CASH_ACTION_ACTION,
  ADD_CASH_ACTION_CATEGORY_ACTION,
  DELETE_CASH_ACTION_ACTION,
  DELETE_CASH_ACTION_CATEGORY_ACTION,
  UPDATE_CASH_ACTION_ACTION,
  UPDATE_CASH_ACTION_CATEGORY_ACTION,
  SET_CATEGORIES_BALANCES_TO_TIME_ACTION,
  GET_CATEGORIES_BALANCES_TO_TIME_GETTER,
  SET_TOTAL_BALANCE_TO_TIME_ACTION,
} from "../../storeconstants";
import {
  getCashActions,
  getCashActionsCategories,
  getCashActionsCategoriesBalances,
  insertCashActions,
  insertCashActionsCategory,
  deleteCashActions,
  deleteCashActionsCategory,
  updateCashActions,
  updateCashActionsCategory,
} from "../../../services/ApiRequests";
import CategoryValidations from "../../../services/CategoryValidations";

export default {
  // --------------------------- Cash Actions ---------------------------
  async [POPULATE_CASH_ACTIONS_ACTION](context, payload) {
    let cashActions = await getCashActions(
      payload.fromTime,
      payload.toTime,
      payload.categoryId
    );
    context.commit(SET_CASH_ACTIONS_MUTATION, cashActions);
  },

  async [ADD_CASH_ACTION_ACTION](context, payload) {
    let cashAction = await insertCashActions(payload);
    context.commit(ADD_CASH_ACTION_MUTATION, cashAction);
    context.dispatch(POPULATE_CASH_ACTIONS_CATEGORIES_BALANCES_ACTION);
  },

  async [UPDATE_CASH_ACTION_ACTION](context, payload) {
    await updateCashActions(payload);
    context.commit(UPDATE_CASH_ACTION_MUTATION, payload);
    context.dispatch(POPULATE_CASH_ACTIONS_CATEGORIES_BALANCES_ACTION);
  },

  async [DELETE_CASH_ACTION_ACTION](context, payload) {
    let deleteData = {
      cashActionIds: payload,
    };
    await deleteCashActions(deleteData);
    context.commit(DELETE_CASH_ACTION_MUTATION, payload);
    context.dispatch(POPULATE_CASH_ACTIONS_CATEGORIES_BALANCES_ACTION);
  },

  // --------------------------- Cash Actions Categories ---------------------------
  async [POPULATE_CASH_ACTIONS_CATEGORIES_ACTION](context) {
    let category = await getCashActionsCategories();
    context.commit(SET_CASH_ACTIONS_CATEGORIES_MUTATION, category);
  },
  
  async [POPULATE_CASH_ACTIONS_CATEGORIES_BALANCES_ACTION](context) {
    let toTime = context.getters[GET_CATEGORIES_BALANCES_TO_TIME_GETTER];
    let categoryBalance = await getCashActionsCategoriesBalances(toTime);
    context.commit(
      SET_CASH_ACTIONS_CATEGORIES_BALANCES_MUTATION,
      categoryBalance
    );
  },

  async [ADD_CASH_ACTION_CATEGORY_ACTION](context, payload) {
    let response;

    try {
      response = await insertCashActionsCategory(payload);
      context.commit(ADD_CASH_ACTION_CATEGORY_MUTATION, response.data);
    } catch (err) {
      var code = 404;
      var msg = null;
      if (err.response !== undefined) {
        code = err.response.status;
        msg = err.response.data.message;
      }
      let errorMessage = CategoryValidations.getErrorMessage(code, msg);
      throw errorMessage;
    }
  },

  async [UPDATE_CASH_ACTION_CATEGORY_ACTION](context, payload) {
    await updateCashActionsCategory(payload);
    context.commit(UPDATE_CASH_ACTION_CATEGORY_MUTATION, payload);
  },

  async [DELETE_CASH_ACTION_CATEGORY_ACTION](context, payload) {
    await deleteCashActionsCategory(payload);
    context.commit(DELETE_CASH_ACTION_CATEGORY_MUTATION, payload);
  },

  async [SET_CATEGORIES_BALANCES_TO_TIME_ACTION](context, payload) {
    let datetimeObj = new Date(payload);
    context.commit(SET_CATEGORIES_BALANCES_TO_TIME_MUTATION, datetimeObj);
    context.dispatch(POPULATE_CASH_ACTIONS_CATEGORIES_BALANCES_ACTION);
  },

  async [SET_TOTAL_BALANCE_TO_TIME_ACTION](context, payload) {
    context.commit(SET_TOTAL_BALANCE_TO_TIME_MUTATION, payload);
  },
};
