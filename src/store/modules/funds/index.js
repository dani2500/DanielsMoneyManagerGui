import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
    namespaced: true,
    state() {
        return {
            funds: [],
            fundsStatus: [],
            fundsStatusToTime: new Date(),
            fundActions: []
        };
    },
    mutations,
    getters,
    actions,
};