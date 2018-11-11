import { createStore, combineReducers } from 'redux';

import deckReducers from '../reducers/deckReducers';
import cardReducers from '../reducers/cardReducers';
import authReducers from '../reducers/authReducers';


const configureStore = () => {
    const store = createStore(
        combineReducers({
            // decks: deckReducers,
            // cards: cardReducers,
            auth: authReducers
        })
    );

    return store;
}


export default configureStore;