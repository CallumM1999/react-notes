import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Router from './routers/Router';

import 'normalize.css';
import './styles/styles.scss';

const consoleStyles = [
    'color: #ccc',
    'background-color: #95141e',
    'font-size: 80px',
    'text-align: center',
    'padding: 20px 0',
    'width: 100%'
].join(';');

const consoleStyles_dark = [
    'color: #000',
    'background-color: #95141e',
    'font-size: 80px',
    'text-align: center',
    'padding: 20px 0',
    'width: 100%'
].join(';');

console.log(' %cN%cotes %cA%cpp', consoleStyles_dark, consoleStyles, consoleStyles_dark, consoleStyles);

const store = configureStore();

store.subscribe(() => console.log('subscribe', store.getState()));

const jsx = (
    <Provider store={store}>
        <Router />
    </Provider>
);
    
ReactDOM.render(jsx, document.getElementById('app'));