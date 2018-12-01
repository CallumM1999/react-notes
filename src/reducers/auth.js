import jwt from 'jsonwebtoken';

const checkLocalStorage = () => {
    const token = localStorage.getItem("token");
    if (!!token) {
        const { email, id } = jwt.decode(token);

        return {
            auth: true,    
            token,
            email,
            id
        }
    } 
    return false
}

const defaultState = () => {
    const data = checkLocalStorage();

    if (data) {
        return data
    } else {
        return {
            auth: false,
            token: null,
            email: null,
            id: null
        }
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