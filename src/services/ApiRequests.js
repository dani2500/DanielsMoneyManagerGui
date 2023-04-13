import { GetAxios, GetAxiosTokenized } from '../services/AxiosTokenized';

const AUTH_ROUTE = "auth"
const CASH_ACTIONS_ROUTE = "cash_actions"
const FUNDS_ROUTE = "funds"

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


// ---------------------------------------- Funds ----------------------------------------


export async function getFunds(){
    var response = await GetAxiosTokenized().get(`/${FUNDS_ROUTE}/funds`,)     
    return response.data;
}

export async function insertFund(fund){
    var response = await GetAxiosTokenized().post(`/${FUNDS_ROUTE}/funds`, fund)     
    return response;
}

export async function updateFund(fund){
    var response = await GetAxiosTokenized().put(`/${FUNDS_ROUTE}/funds`, fund)     
    return response;
}

export async function deleteFund(fund){
    var response = await GetAxiosTokenized().delete(`/${FUNDS_ROUTE}/funds`, {
        data: fund
      })     
    return response;
}

export async function getFundsStatus(toTime){
    var response = await GetAxiosTokenized().get(`/${FUNDS_ROUTE}/status`, {
        params: {
            toTime: toTime,
        }
    })     
    return response.data;
}

// ---------------------------------------- Fund Actions ----------------------------------------

export async function getFundActions(fromTime, toTime, fundId){
    var response = await GetAxiosTokenized().get(`/${FUNDS_ROUTE}/fund_actions`, {
        params: {
            fromTime: fromTime,
            toTime: toTime,
            fundId: fundId
        }
    })     
    return response.data;
}

export async function insertFundActions(fundAction){
    var response = await GetAxiosTokenized().post(`/${FUNDS_ROUTE}/fund_actions`, fundAction)     
    return response.data;
}

export async function updateFundActions(fundAction){
    var response = await GetAxiosTokenized().put(`/${FUNDS_ROUTE}/fund_actions`, fundAction)     
    return response.data;
}

export async function deleteFundActions(fundActionIds){
    var response = await GetAxiosTokenized().delete(`/${FUNDS_ROUTE}/fund_actions`,  {
        data: fundActionIds
      });    
    return response.data;
}
