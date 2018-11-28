import { createStore, combineReducers, applyMiddleware } from 'redux';
import authReducers from '../reducers/authReducers';

const configureStore = () => {
    const store = createStore(
        combineReducers({
            auth: authReducers
        })
    );

    return store;
}

export default configureStore;