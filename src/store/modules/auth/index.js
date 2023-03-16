import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
    namespaced: true,
    state() {
        return {
            Jwt: '',
            UserEmail: '',
            UserId: '',
            UserName: '',
            ExpiresAt: '',
        };
    },
    mutations,
    getters,
    actions,
};