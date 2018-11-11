import jwt from 'jsonwebtoken';

const token = localStorage.getItem("token");

const defaultState = () => {
    if (!!token) {
        const { email, id } = jwt.decode(token);

        return {
            auth: true,    
            token,
            email,
            id
        }
    } 
    return {
        auth: false,
        token: null,
        email: null,
        id: null
    }
}

const authReducers = (state = defaultState(), action) => {
    switch(action.type) {
       case 'AUTH_TRUE':
        return {
            ...state,
            auth: true,
            email: action.email,
            id: action.id,
            token: action.token
        }
        case 'AUTH_FALSE':
        return {
            ...state,
            auth: false,
            token: null,
            email: null,
            id: null
        }

        default:
            return state
    }
}

export default authReducers;