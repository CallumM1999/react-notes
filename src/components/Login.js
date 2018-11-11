import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { baseURL } from '../config/axios.defaults';

import Form from './Form';

const authorise = (data) => {
    return {
        type: 'AUTH_TRUE',
        ...data
    }
}

const Login = props => {

    const loginHandler = e => {
        e.preventDefault();
        // console.log('login called')

        const { email, password } = e.target;

        if (!email.value || !password.value) return props.setError('missing fields');

        axios.get(baseURL + '/login', {
            headers: {
                email: email.value,
                password: password.value
            }
        })
        .then(response => {
            const { token, id, email } = response.data;

            localStorage.setItem("token", token);

            props.dispatch(authorise({ token, id, email }))
   
            props.redirect();
        
        })
        .catch(error => {
            props.setError('Auth error');
        });
        
    }

    return (
        <div>
            <Form title='Login' handler={loginHandler}>

                <div className="form-group">
                    <input className="form-input" type="text" name="email" id="input_email" placeholder="Email" />        
                </div>

                <div className="form-group">
                    <input className="form-input" type="password" name="password" id="input_password" placeholder="Password" />
                </div>

                <div className="form-group">
                    {props.state.error && <p className="form-error">{props.state.error}</p>}
                </div>

                <div className="form-group">
                    <input type="submit" value="Login" className="form-submit" />
                </div>

                <div className='form-group'>
                    <button className='form-link' onClick={props.showRegisterPage}>Register</button>
                    <button className='form-link' onClick={props.showForgotPage}>Forgot</button>
                </div>
            </Form>
        </div>
    );
}

export default connect()(Login);