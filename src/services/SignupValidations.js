import Validations from './Validations';

export default class SignupValidations {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    checkValidations() {
        let errors = [];

        //email validations
        if (!Validations.checkEmail(this.email)) {
            errors['email'] = 'Invalid Email';
        }

        //password Validations
        if (!Validations.minLength(this.password, 6)) {
            errors['password'] = 'password should be of 6 characters';
        }

        return errors;
    }

    static getErrorMessage(errorCode, msg = null) {
        var res = ''
        switch (errorCode) {
            case 401:
                res = 'Authentication failed';
                break;
            case 404:
                res = 'Server is not responding'
                break;
            case 409:
                res = 'Email already exists';
                break;
            default:
                res = 'Something went wrong :('
                break;
        }

        if (msg !== null){
            res = res + " - " + msg;
        }

        return res
    }
}