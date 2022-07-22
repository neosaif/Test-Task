import axios from 'axios';
import {Alert} from 'react-native';

export async function apiCallHandler(method,url,query,data,contentType){
    const Header = {
        Accept: 'application/json',
        'Content-Type': contentType,
        Connection: 'close',
    };
    if (method === 'GET') {
        return axios({
            url: url += '?' + query,
            method: method,
            headers: Header,
        })
         .then(function (response) {
            return response.data
         })
         .catch(async error => {
            console.warn('error',error);
            return error;
         })
    } else if (method === 'DELETE') {
        return axios({
            url: url,
            method: method,
            headers: {},
        })
         .then(function (response) {
            return response 
         })
         .catch(async error => {
            console.warn('error',error);
            return error;
         })
    } else {
        return axios({
            url: url,
            method: method,
            headers: Header,
            data: data,
        })
         .then(function (response) {
            return response.data
         })
         .catch(async error => {
            return error;
         })
    }
}