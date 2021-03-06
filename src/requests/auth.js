import axios from 'axios';
import { baseURL } from '../config/axios.defaults';

export const getResetCode = (email) => {
    return new Promise((resolve, reject) => {
        axios.post(baseURL + '/reset/code', { email })
        .then(response => resolve({ status: 'success', message: response.data }))
        .catch(error => {
            if (error.response) resolve({ status: 'error', message: error.response });
            reject(Error( error ));
        });
    });
}

export const getResendCode = (email) => {
    return new Promise((resolve, reject) => {
        axios.post(baseURL + '/reset/code/resend', { email })
        .then(response => resolve({ status: 'success', message: response.data }))
        .catch(error => {
            if (error.response) resolve({ status: 'error', message: error.response });
            reject(Error( error ));
        });
    });
}

export const postConfirm = (email, code) => {
    return new Promise((resolve, reject) => {
        axios.post(baseURL + '/reset/confirm', { email, code })
        .then(response => {
            console.log('postConfirm', response)
            resolve({ status: 'success', message: response.data })
        })
        .catch(error => {
            console.log('postConfirm', error)

            if (error.response) resolve({ status: 'error', message: error.response });
            reject(Error( error ));
        });
    });
}

export const postUpdate = (email, code, password) => {
    return new Promise((resolve, reject) => {
        axios.post(baseURL + '/reset/update', { email, code, password })
        .then(response => resolve({ status: 'success', message: response.data }))
        .catch(error => {
            if (error.response) resolve({ status: 'error', message: error.response });
            reject(Error( error ));
        });
    });
}

export const login = (email, password) => {
    return new Promise((resolve, reject) => {
        axios.post(baseURL + '/login', { email, password })
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