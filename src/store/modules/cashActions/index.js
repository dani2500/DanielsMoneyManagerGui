import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
    namespaced: true,
    state() {
        return {
            cashActions: [],
            categories: [],
            categoriesBalances: [],
            toTimeBalances: new Date(),
            toTimeTotalBalance: new Date(),
        };
    },
    mutations,
    getters,
    actions,
};