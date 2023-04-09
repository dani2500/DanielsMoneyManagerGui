import { 
        SET_CASH_ACTIONS_MUTATION,
        SET_CASH_ACTIONS_CATEGORIES_MUTATION,
        SET_CASH_ACTIONS_CATEGORIES_BALANCES_MUTATION,

        SET_CATEGORIES_BALANCES_TO_TIME_MUTATION,
        SET_TOTAL_BALANCE_TO_TIME_MUTATION,

        ADD_CASH_ACTION_MUTATION,
        ADD_CASH_ACTION_CATEGORY_MUTATION,

        UPDATE_CASH_ACTION_MUTATION,
        UPDATE_CASH_ACTION_CATEGORY_MUTATION,

        DELETE_CASH_ACTION_MUTATION,
        DELETE_CASH_ACTION_CATEGORY_MUTATION,
    } from '../../storeconstants';

export default {
    [SET_CASH_ACTIONS_MUTATION](state, payload) {
        state.cashActions = payload;
    },
    [ADD_CASH_ACTION_MUTATION](state, payload) {
        state.cashActions.push(payload);
    },
    [DELETE_CASH_ACTION_MUTATION](state, payload) {
        let actionIdsToRemove = payload.split(",").map(Number);
        let actions = state.cashActions.filter( function( el ) {
            return !actionIdsToRemove.includes( el.cashActionId );
          } );
        state.cashActions = actions;
    },
    [UPDATE_CASH_ACTION_MUTATION](state, payload) {
        let actions = [];
        state.cashActions.forEach(element => {
            if(element.cashActionId == payload.cashActionId){
                actions.push(payload);
            }
            else{
                actions.push(element);
            }
        });
        state.cashActions = actions;
    },
    // ------------------------------ Categories ------------------------------
    [SET_CASH_ACTIONS_CATEGORIES_MUTATION](state, payload) {
        let adaptedToSelect = []
        payload.forEach(element => {
            let category = {};
            category.value = element.categoryId
            category.text = element.categoryName
            adaptedToSelect.push(category)
        });
        state.categories = adaptedToSelect;
    },
    [SET_CASH_ACTIONS_CATEGORIES_BALANCES_MUTATION](state, payload) {
        state.categoriesBalances = payload;
    },
    [SET_CATEGORIES_BALANCES_TO_TIME_MUTATION](state, payload) {
        state.toTimeBalances = payload;
    },
    [SET_TOTAL_BALANCE_TO_TIME_MUTATION](state, payload) {
        state.toTimeTotalBalance = payload;
    },
    [ADD_CASH_ACTION_CATEGORY_MUTATION](state, payload) {
        let category = {}
        category.value = payload.categoryId
        category.text = payload.categoryName
        state.categories.push(category);
        //---
        let balance = {
            categoryId: payload.categoryId,
            categoryBalance: 0,
            cashActionsCount: 0
        }
        state.categoriesBalances.push(balance);
    },
    [UPDATE_CASH_ACTION_CATEGORY_MUTATION](state, payload) {
        let categories = state.categories;
        let idx = categories.findIndex((obj => obj.value == payload.categoryId));
        categories[idx].text = payload.categoryName;

        state.categories = categories;
    },

    [DELETE_CASH_ACTION_CATEGORY_MUTATION](state, payload) {
        let categories = state.categories.filter(function( obj ) {
            return obj.value !== payload.categoryId;
        });
        state.categories = categories;
    },
    
};
