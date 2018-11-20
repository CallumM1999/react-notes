import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Recaptcha from 'react-recaptcha';


import Form from './Form';
import { baseURL } from '../config/axios.defaults';

import validator from 'validator';




class Register extends React.Component {
    constructor(props) {
        super(props);

        this.registerHandler = this.registerHandler.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.setError = this.setError.bind(this);

        this.state = {
            isVerified: false,
            email: {
                error: null,
                value: ''
            },
            email_conf: {
                error: null,
                value: ''
            },
            password: {
                error: null,
                value: ''
            },
            password_conf: {
                error: null,
                value: ''
            }
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

    inputChange(e) {
        this.setState({
            [e.target.name]: {
                ...this.state[e.target.name],
                value: e.target.value
            }
        });  
    }
    setError(field, error) {
        this.setState({
            [field]: {
                ...this.state[field],
                error
            }
        });
    }

    registerHandler(e) {
        e.preventDefault();

        let errors = false;

        if (validator.isEmpty(this.state.email.value)) {
            this.setError('email', 'field missing');
            errors = true;
        } else if (!validator.isEmail(this.state.email.value)) {
            this.setError('email', 'invalid email');
            errors = true;
        } else {
            this.setError('email', null);
        }

        if (validator.isEmpty(this.state.email_conf.value)) {
            this.setError('email_conf', 'field missing');
            errors = true;
        } else if (this.state.email.value !== this.state.email_conf.value) {
            this.setError('email_conf', 'email fields don\'t match');
            errors = true;
        } else {
            this.setError('email_conf', null);
        }

        if (validator.isEmpty(this.state.password.value)) {
            this.setError('password', 'field missing');
            errors = true;
        } else if (this.state.password.value.length < 8 || this.state.password.value.length > 100) {
            this.setError('password', 'invalid password! Must be 8-100 characters');
            errors = true;
        } else if (!validator.isAscii(this.state.password.value)) {
            this.setError('password', 'password can only contain ascii characters');
            errors = true;
        } else {
            this.setError('password', null);
        }

        if (validator.isEmpty(this.state.password_conf.value)) {
            this.setError('password_conf', 'field missing');
            errors = true;
        } else if (this.state.password.value !== this.state.password_conf.value) {
            this.setError('password_conf', 'password fields do not match');
            errors = true;    
        } else {
            this.setError('password_conf', null);
        }

        if (errors) return;

        // if (!this.state.isVerified) {
        //     return this.props.setError('Confirm that you are not a robot');
        // }

        const sanitisedEmail = validator.normalizeEmail(this.state.email.value);

        axios.post(baseURL + '/register', { email: sanitisedEmail, password: this.state.password.value })
        .then(response => {
            // if (response.status === 202) return this.props.setError('email taken');
            const { token, id, email } = response.data;

            localStorage.setItem('token', token);
            this.props.dispatch(this.authorise({ token, id, email }));
            this.props.redirect();
        })
        .catch(error => {
            console.log({error})
            switch (error.response.status) {
                case 401:
                    this.props.setError('Email taken! Please try again.');
                    break;
                default:
                    this.props.setError('Unknown error. Please Try again');
            }        
        });
    }

    render() {
        return (
            <div>
                <Form title='Register' handler={this.registerHandler}>
    
                    <div className="form-group">
                        <input type="text" name="email" className='form-input' placeholder='Email' value={this.state.email.value} onChange={this.inputChange}/>        
                        <p className="input-err">{this.state.email.error}</p>
                    </div>
    
                    <div className="form-group">
                        <input type="text" name="email_conf" className='form-input' placeholder='Confirm email' value={this.state.email_conf.value} onChange={this.inputChange}/>   
                        <p className="input-err">{this.state.email_conf.error}</p>
                    </div>
    
                    <div className="form-group">
                        <input type="password" name="password" className='form-input' placeholder='Password' value={this.state.password.value} onChange={this.inputChange}/>
                        <p className="input-err">{this.state.password.error}</p>
                    </div>
    
                    <div className="form-group">
                        <input type="password" name="password_conf" className='form-input' placeholder='Confirm password' value={this.state.password_conf.value} onChange={this.inputChange}/>
                        <p className="input-err">{this.state.password_conf.error}</p>
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