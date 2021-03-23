import axios from "axios"
import { getToken, isAuthenticated } from "./auth";
const urlApi = "http://5d8b64ad3c0aaf0014342c2a.mockapi.io/api/v1/collaborator"

export const requestApi = (endpoint, method="GET", params=null, data=null, token=null) => {
    return axios.request({
        baseURL : urlApi,
        url : endpoint,
        method: method.toLowerCase(),
        params : params,
        data : data,
        headers : (isAuthenticated()) ? {
            'Authorization' : 'Bearer ' + getToken()
        } : (token !== null) ? {'Authorization': 'Bearer ' + token} : { }
    })
    .then(response => response.data)
    .catch(error => Promise.reject(error))
    .then(data => Promise.resolve(data))

}