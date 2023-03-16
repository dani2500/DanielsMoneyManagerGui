import { SET_USER_JWT_MUTATION } from '../../storeconstants';

export default {
    [SET_USER_JWT_MUTATION](state, payload) {
        state.Jwt = payload.Jwt;
        state.UserEmail = payload.UserEmail;
        state.UserId = payload.UserId;
        state.UserName = payload.UserName;
        state.ExpiresAt = payload.ExpiresAt;
    },
};
