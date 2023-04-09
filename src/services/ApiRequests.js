import { GetAxios, GetAxiosTokenized } from '../services/AxiosTokenized';

const AUTH_ROUTE = "auth"
const CASH_ACTIONS_ROUTE = "cash_actions"

// ---------------------------------------- Users ----------------------------------------
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

export function getUser(){
    GetAxiosTokenized().get(`/${AUTH_ROUTE}/user`,)            
    .then((response) => {
        console.log(response.data);
    })
}

// ---------------------------------------- Cash Actions ----------------------------------------

export async function getCashActions(fromTime, toTime, categoryId){
    var response = await GetAxiosTokenized().get(`/${CASH_ACTIONS_ROUTE}/cash_actions`, {
        params: {
            fromTime: fromTime,
            toTime: toTime,
            categoryId: categoryId
        }
    })     
    return response.data;
}

export async function insertCashActions(cashAction){
    var response = await GetAxiosTokenized().post(`/${CASH_ACTIONS_ROUTE}/cash_actions`, cashAction)     
    return response.data;
}

export async function updateCashActions(cashAction){
    var response = await GetAxiosTokenized().put(`/${CASH_ACTIONS_ROUTE}/cash_actions`, cashAction)     
    return response.data;
}

export async function deleteCashActions(payload){
    var response = await GetAxiosTokenized().delete(`/${CASH_ACTIONS_ROUTE}/cash_actions`,  {
        data: payload
      });    
    return response.data;
}

// ---------------------------------------- Cash Action Categories ----------------------------------------

export async function getCashActionsCategories(){
    var response = await GetAxiosTokenized().get(`/${CASH_ACTIONS_ROUTE}/categories`,)     
    return response.data;
}

export async function insertCashActionsCategory(category){
    var response = await GetAxiosTokenized().post(`/${CASH_ACTIONS_ROUTE}/categories`, category)     
    return response;
}

export async function updateCashActionsCategory(category){
    var response = await GetAxiosTokenized().put(`/${CASH_ACTIONS_ROUTE}/categories`, category)     
    return response;
}

export async function deleteCashActionsCategory(category){
    var response = await GetAxiosTokenized().delete(`/${CASH_ACTIONS_ROUTE}/categories`, {
        data: category
      })     
    return response;
}

export async function getCashActionsCategoriesBalances(toTime){
    var response = await GetAxiosTokenized().get(`/${CASH_ACTIONS_ROUTE}/balances`, {
        params: {
            toTime: toTime,
        }
    })     
    return response.data;
}

export async function getCashActionsTotalBalances(toTime){
    var response = await GetAxiosTokenized().get(`/${CASH_ACTIONS_ROUTE}/total_balance`, {
        params: {
            toTime: toTime,
        }
    })     
    return response.data;
}