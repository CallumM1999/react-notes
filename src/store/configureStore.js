import { createStore } from 'redux';
import auth from '../reducers/auth';

const configureStore = () => createStore(auth);

export default configureStore;