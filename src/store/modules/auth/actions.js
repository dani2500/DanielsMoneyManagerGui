import SignupValidations from '../../../services/SignupValidations';
import {
    AUTH_ACTION,
    LOGIN_ACTION,
    AUTO_LOGIN_ACTION,
    LOGOUT_ACTION,
    SET_USER_JWT_MUTATION,
    SIGNUP_ACTION,
    LOADING_SPINNER_SHOW_MUTATION
} from '../../storeconstants';
import { Login, Signup } from '../../../services/ApiRequests';



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
    },


    async [AUTO_LOGIN_ACTION](context){
        let userData = localStorage.getItem('userData');
        if (userData) {
            context.commit(
                SET_USER_JWT_MUTATION,
                JSON.parse(userData),
            );
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
                var userData = {
                    UserEmail: response.data.UserEmail,
                    Jwt: response.data.Jwt,
                    ExpiresAt: response.data.ExpiresAt,
                    UserName: response.data.UserName,
                    UserId: response.data.UserId,
                }

                localStorage.setItem('userData', JSON.stringify(userData));
                context.commit(SET_USER_JWT_MUTATION,  userData);
            }
        }
        finally{
            context.commit(LOADING_SPINNER_SHOW_MUTATION, false, { root: true, });
        }

    },
};
