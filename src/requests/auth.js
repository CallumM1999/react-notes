import axios from 'axios';
import { baseURL } from '../config/axios.defaults';

export const getResetCode = (email) => {
    return new Promise((resolve, reject) => {
        axios.get(baseURL + '/reset/code', { headers: { email } })
        .then(response => resolve(response))
        .catch(error => reject(new Error(error)));
    });
}

export const getResendCode = (email) => {
    return new Promise((resolve, reject) => {
        axios.get(baseURL + '/reset/code/resend', { headers: { email } })
        .then(response => resolve(response))
        .catch(error => reject(new Error(error)));
    });
}

export const postConfirm = (email, code) => {
    return new Promise((resolve, reject) => {
        axios.post(baseURL + '/reset/confirm', {}, { headers: { email, code } })
        .then(response => resolve(response))
        .catch(error => reject(new Error(error)));
    });
}

export const postUpdate = (email, code, password) => {
    return new Promise((resolve, reject) => {
        axios.post(baseURL + '/reset/update', {}, { headers: { email, code, password } })
        .then(response => resolve(response))
        .catch(error => reject(new Error(error)));
    });
}