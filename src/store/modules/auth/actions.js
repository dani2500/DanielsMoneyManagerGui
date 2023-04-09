import SignupValidations from '../../../services/SignupValidations';
import {
    AUTH_ACTION,
    LOGIN_ACTION,
    AUTO_LOGIN_ACTION,
    LOGOUT_ACTION,
    AUTO_LOGOUT_ACTION,
    SET_USER_JWT_MUTATION,
    SIGNUP_ACTION,
    LOADING_SPINNER_SHOW_MUTATION,
    ON_AUTO_LOGIN_OR_AUTH,
    CASH_ACTIONS_MODULE,
    POPULATE_CASH_ACTIONS_CATEGORIES_ACTION,
    POPULATE_CASH_ACTIONS_CATEGORIES_BALANCES_ACTION
} from '../../storeconstants';
import { Login, Signup } from '../../../services/ApiRequests';


var logoutTimer = '';
export default {
    [LOGOUT_ACTION](context) {
        context.commit(SET_USER_JWT_MUTATION, {
            email: null,
            token: null,
            expiresIn: null,
            refreshToken: null,
            userId: null,
        });

        localStorage.removeItem('userData');
        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    },

    [AUTO_LOGOUT_ACTION](context) {
        console.log("Token expired - logging out")
        context.dispatch(LOGOUT_ACTION);
        //TODO "are you still here?"
    },


    async [AUTO_LOGIN_ACTION](context){
        let userDataString = localStorage.getItem('userData');

        if (userDataString) {
            let userData = JSON.parse(userDataString);
            let timeToExpiration = userData.ExpiresAt - new Date().getTime();

            if (timeToExpiration < 10000) {
                context.dispatch(AUTO_LOGOUT_ACTION);
            } else {
                context.commit(SET_USER_JWT_MUTATION, userData);
                context.dispatch(ON_AUTO_LOGIN_OR_AUTH);
                logoutTimer = setTimeout(() => {
                    context.dispatch(AUTO_LOGOUT_ACTION);
                }, timeToExpiration);
            }
        }
    },

    async [LOGIN_ACTION](context, payload) {  
        return context.dispatch(
            AUTH_ACTION, {
            ...payload,
            expectedCode: 200
            },
        );
    },

    async [ON_AUTO_LOGIN_OR_AUTH](context) {  
        context.dispatch(`${CASH_ACTIONS_MODULE}/${POPULATE_CASH_ACTIONS_CATEGORIES_ACTION}`, null, { root: true });
        context.dispatch(`${CASH_ACTIONS_MODULE}/${POPULATE_CASH_ACTIONS_CATEGORIES_BALANCES_ACTION}`, null , { root: true });
    },

    async [SIGNUP_ACTION](context, payload) {  
        return context.dispatch(
            AUTH_ACTION, {
            ...payload,
            isSignup: true,
            expectedCode: 201
            },
        );
    },

    
    async [AUTH_ACTION](context, payload){
        context.commit(LOADING_SPINNER_SHOW_MUTATION, true, { root: true, });
        let response = '';

        try {
            if (payload.isSignup){
                response = await Signup(payload.email, payload.password, payload.username)
            }
            else{
                response = await Login(payload.email, payload.password)
            }
        } catch (err) {
            context.commit(LOADING_SPINNER_SHOW_MUTATION, false, { root: true, });

            var code = 404;
            var msg = null;
            if (err.response !== undefined){
                code = err.response.status;
                msg = err.response.data.message;
            }
            let errorMessage = SignupValidations.getErrorMessage(code, msg);

            throw errorMessage;
        }

        try{
            if (response.status == payload.expectedCode) {
                let now = Date.now();
                let tokenLifeTimeMs = response.data.JwtLifeTimeMs;
                let expirationTime = new Date(now + tokenLifeTimeMs).getTime();

                logoutTimer = setTimeout(() => {
                    context.dispatch(AUTO_LOGOUT_ACTION);
                }, tokenLifeTimeMs);

                var userData = {
                    UserEmail: response.data.UserEmail,
                    Jwt: response.data.Jwt,
                    ExpiresAt: expirationTime,
                    UserName: response.data.UserName,
                }

                localStorage.setItem('userData', JSON.stringify(userData));
                context.commit(SET_USER_JWT_MUTATION,  userData);
                context.dispatch(ON_AUTO_LOGIN_OR_AUTH);
            }
        }
        finally{
            context.commit(LOADING_SPINNER_SHOW_MUTATION, false, { root: true, });
        }
    },
    
};
