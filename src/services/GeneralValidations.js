export default class GeneralValidations {
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
                res = 'Name already exists';
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