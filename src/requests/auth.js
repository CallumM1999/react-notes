import axios from 'axios';
import { baseURL } from '../config/axios.defaults';

export const getResetCode = (email) => {
    return new Promise((resolve, reject) => {
        axios.get(baseURL + '/reset/code', { headers: { email } })
        .then(response => resolve({ status: 'success', message: response.data }))
        .catch(error => {
            if (error.response) resolve({ status: 'error', message: error.response });
            reject(Error( error ));
        });
    });
}

export const getResendCode = (email) => {
    return new Promise((resolve, reject) => {
        axios.get(baseURL + '/reset/code/resend', { headers: { email } })
        .then(response => resolve({ status: 'success', message: response.data }))
        .catch(error => {
            if (error.response) resolve({ status: 'error', message: error.response });
            reject(Error( error ));
        });
    });
}

export const postConfirm = (email, code) => {
    return new Promise((resolve, reject) => {
        axios.post(baseURL + '/reset/confirm', {}, { headers: { email, code } })
        .then(response => resolve({ status: 'success', message: response.data }))
        .catch(error => {
            if (error.response) resolve({ status: 'error', message: error.response });
            reject(Error( error ));
        });
    });
}

export const postUpdate = (email, code, password) => {
    return new Promise((resolve, reject) => {
        axios.post(baseURL + '/reset/update', {}, { headers: { email, code, password } })
        .then(response => resolve({ status: 'success', message: response.data }))
        .catch(error => {
            if (error.response) resolve({ status: 'error', message: error.response });
            reject(Error( error ));
        });
    });
}

export const login = (email, password) => {
    return new Promise((resolve, reject) => {
        axios.get(baseURL + '/login', { headers: { email, password } })
        .then(response => resolve({ status: 'success', message: response.data }))
        .catch(error => {
            if (error.response) resolve({ status: 'error', message: error.response });
            reject(Error( error ));
        });
    });
}

export const register = (email, password) => {
    return new Promise((resolve, reject) => {
        axios.post(baseURL + '/register', { email, password })
        .then(response => resolve({ status: 'success', message: response.data }))
        .catch(error => {
            if (error.response) resolve({ status: 'error', message: error.response });
            reject(Error( error ));
        });
    });
}