import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Recaptcha from 'react-recaptcha';


import Form from './Form';
import { baseURL } from '../config/axios.defaults';



class Register extends React.Component {
    constructor(props) {
        super(props);

        this.registerHandler = this.registerHandler.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);

        this.state = {
            isVerified: false
        };
    }

    authorise(data) {
        return {
            type: 'AUTH_TRUE',
            ...data
        };
    }

    verifyCallback() {
        this.setState({ isVerified: true });
    }


    registerHandler(e) {
        e.preventDefault();

        const { email, email_conf, password, password_conf } = e.target;

        if (!email.value || !email_conf.value || !password.value || !password_conf.value) {
            return this.props.setError('Missing fields');
        }

        if (email.value !== email_conf.value) {
            return this.props.setError('email fields don\'t match');
        }

        if (password.value !== password_conf.value) {
            return this.props.setError('password fields don\'t match');
        }

        // valid, send request to server

        axios.post(baseURL + '/register', {
            email: email.value,
            password: password.value
        })
            .then(response => {
                if (response.status === 202) return this.props.setError('email taken');
                
                const { token, id, email } = response.data;

                localStorage.setItem('token', token);

                this.props.dispatch(this.authorise({ token, id, email }));
    
                this.props.redirect();

            })
            .catch(error => {
                console.log('error', error);
            });
    }

    render() {
        return (
            <div>
                <Form title='Register' handler={this.registerHandler}>
    
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
                        {this.props.state.error && <p className='form-error'>{this.props.state.error}</p>}
                    </div>
    
                    <div className='form-group'>
                        <input type="submit" value="Register" className='btn form-submit' />
                    </div>
    
                    <div className="form-group">
                        <Recaptcha
                            sitekey="6LeF0XoUAAAAAJmJb_4y_b84mM7b9bcahGhmhA6x"
                            render="explicit"
                            verifyCallback={this.verifyCallback}
                        />
                    </div>

    
    
    
                    <div className='form-group'>
                        <button type='button' className='form-link' onClick={this.props.showLoginPage}>Login</button>
                        <button type='button' className='form-link' onClick={this.props.showForgotPage}>Forgot</button>
                    </div>
    
                </Form>
            </div>    
        );
    }
}

export default connect()(Register);