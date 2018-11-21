import axios from 'axios';
import { baseURL } from '../config/axios.defaults';

export const getDecks = (id, authorization) => {
    return new Promise((resolve, reject) => {
        axios.get(baseURL + '/decks', { headers: { id, authorization } })
        .then(response => resolve(response))
        .catch(error => reject(new Error(error)));
    });
}

export const postDecks = (name, owner, id, authorization) => {
    return new Promise((resolve, reject) => {
        axios.post(baseURL + '/decks', { name, id, owner }, { headers: { authorization } })
        .then(response => resolve(response))
        .catch(error => reject(new Error(error)));
    });
}

export const putDecks = (name, id, authorization) => {
    return new Promise((resolve, reject) => {
        axios.put(baseURL + '/decks', { name, id }, { headers: { authorization } })
        .then(response => resolve(response))
        .catch(error => reject(new Error(error)));
    });
}

export const deleteDeck = (id, authorization) => {
    return new Promise((resolve, reject) => {
        axios.delete(baseURL + '/decks', { headers: { id, authorization } })
        .then(response => resolve(response))
        .catch(error => reject(new Error(error)));
    });
}
