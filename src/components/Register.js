import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import Form from './Form';

const authorise = (data) => {
    return {
        type: 'AUTH_TRUE',
        ...data
    }
}

const Register = props => {

    const registerHandler = e => {
        e.preventDefault();

        const { email, email_conf, password, password_conf } = e.target;

        if (!email.value || !email_conf.value || !password.value || !password_conf.value) {
            return props.setError('Missing fields');
        }

        if (email.value !== email_conf.value) {
            return props.setError('email fields don\'t match');
        }

        if (password.value !== password_conf.value) {
            return props.setError('password fields don\'t match');
        }

        // valid, send request to server

        axios.post('http://localhost:3000/register', {
            email: email.value,
            password: password.value
        })
            .then(response => {
                if (response.status === 202) return props.setError('email taken');
                
                const { token, id, email } = response.data;

                localStorage.setItem("token", token);

                props.dispatch(authorise({ token, id, email }));
    
                props.redirect();

            })
            .catch(error => {
                console.log('error', error)
            });
    }

    return (
        <div>
            <Form title='Register' handler={registerHandler}>

                <div className="form-group">
                    <input type="text" name="email" id="input_email" className='form-input' placeholder='Email' />        
                </div>

                <div className="form-group">
                    <input type="text" name="email_conf" id="input_email_conf" className='form-input' placeholder='Confirm email' />        
                </div>

                <div className="form-group">
                    <input type="password" name="password" id="input_password" className='form-input' placeholder='Password' />
                </div>

                <div className="form-group">
                    <input type="password" name="password_conf" id="input_password_conf" className='form-input' placeholder='Confirm password' />
                </div>

                <div className='form-group'>
                    {props.state.error && <p className='form-error'>{props.state.error}</p>}
                </div>

                <div className='form-group'>
                    <input type="submit" value="Register" className='form-submit' />
                </div>





                <div className='form-group'>
                    <button className='form-link' onClick={props.showLoginPage}>Login</button>
                    <button className='form-link' onClick={props.showForgotPage}>Forgot</button>
                </div>

            </Form>
        </div>    
    );
}
export default connect()(Register);