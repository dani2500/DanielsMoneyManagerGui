import { GetAxios, GetAxiosTokenized } from '../services/AxiosTokenized';

const AUTH_ROUTE = "auth"

export async function Login(email, pw){
    let url = `/${AUTH_ROUTE}/login`
    let postData = {
        UserEmail: email,
        UserPassword: pw,
    };

    var response = await GetAxios().post(
        url,
        postData,
    )

    return response;
}


export async function Signup(email, pw, username){
    let url = `/${AUTH_ROUTE}/register`
    let postData = {
        UserEmail: email,
        UserPassword: pw,
        UserName: username,
    };

    var response = await GetAxios().post(
        url,
        postData,
    )

    return response;
}

export function GetUser(){
    GetAxiosTokenized().get(`/${AUTH_ROUTE}/user`,)            
    .then((response) => {
        console.log(response.data);
    })
}

