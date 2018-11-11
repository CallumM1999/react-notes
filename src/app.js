import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Router from './routers/Router';

import 'normalize.css';
import './styles/styles.scss';

const API = 'http://localhost:3000/';

const store = configureStore();

// store.subscribe(() => {
//     console.log('getstate', store.getState())
// });

const jsx = (
    <Provider store={store}>
        <Router />
    </Provider>
);
    
ReactDOM.render(jsx, document.getElementById('app'));