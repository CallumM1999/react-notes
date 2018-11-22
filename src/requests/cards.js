import axios from 'axios';
import { baseURL } from '../config/axios.defaults';

export const getCard = (id, authorization) => {
    return new Promise((resolve, reject) => {
        axios.get(baseURL + '/cards', { headers: { id, authorization } })
        .then(response => resolve({ status: 'success', message: response.data }))
        .catch(error => {
            if (error.response) resolve({ status: 'error', message: error.response });
            reject(Error( error ));
        });
    });
}

export const postCard = (deck, front, back, id, authorization) => {
    return new Promise((resolve, reject) => {
        axios.post(baseURL + '/cards', { deck, front, back, id }, { headers: { authorization } })
        .then(response => resolve({ status: 'success', message: response.data }))
        .catch(error => {
            if (error.response) resolve({ status: 'error', message: error.response });
            reject(Error( error ));
        });
    });
}

export const putCard = (id, front, back, authorization) => {
    return new Promise((resolve, reject) => {
        axios.put(baseURL + '/cards', { id, front, back }, { headers: { authorization } })
        .then(response => resolve({ status: 'success', message: response.data }))
        .catch(error => {
            if (error.response) resolve({ status: 'error', message: error.response });
            reject(Error( error ));
        });
    });
}

export const deleteCard = (id, authorization) => {
    return new Promise((resolve, reject) => {
        axios.delete(baseURL + '/cards', { headers: { id, authorization } })
        .then(response => resolve({ status: 'success', message: response.data }))
        .catch(error => {
            if (error.response) resolve({ status: 'error', message: error.response });
            reject(Error( error ));
        });
    });
}