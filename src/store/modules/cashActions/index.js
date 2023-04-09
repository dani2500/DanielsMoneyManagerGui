import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
    namespaced: true,
    state() {
        return {
            cashActions: [],
            categories: [], // in a value/text format because it is being used in a lot of selectors
            categoriesBalances: [],
            toTimeBalances: new Date(),
            toTimeTotalBalance: new Date(),
        };
    },
    mutations,
    getters,
    actions,
};