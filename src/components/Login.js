import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Recaptcha from 'react-recaptcha';

import { baseURL } from '../config/axios.defaults';

import Form from './Form';

import validator from 'validator';

const authorise = (data) => {
    return {
        type: 'AUTH_TRUE',
        ...data
    };
};

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.verifyCallback = this.verifyCallback.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
        this.setError = this.setError.bind(this);
        this.inputChange = this.inputChange.bind(this);

        this.state = {
            isVerified: false,

            email: {
                error: null,
                value: ''
            },
            password: {
                error: null,
                value: ''
            }
        };
    }

    verifyCallback() {
        this.setState({ isVerified: true });
    }

    setError(field, error) {
        this.setState({
            [field]: {
                ...this.state[field],
                error
            }
        });
    }

    inputChange(e) {
        // e.preventDefault();
        this.setState({
            [e.target.name]: {
                ...this.state[e.target.name],
                value: e.target.value
            }
        });  
    }

    loginHandler(e) {
        e.preventDefault();
        let errors = false;

        // const { email, password } = e.target;

        if (!this.state.email.value) {
            this.setError('email', 'this field is missing');
            errors = true;
        } else if (!validator.isEmail(this.state.email.value)) {
            this.setError('email', 'invalid email address');
            errors = true;
        } else {
            this.setError('email', null);
        }

        if (!this.state.password.value) {
            this.setError('password', 'this field is missing');
            errors = true;
        } else {
            this.setError('password', null);
        }
        
        // validation errors
        if (errors) return;

        // if (!this.state.isVerified) {
        //     return this.props.setError('Confirm that you are not a robot');
        // } 

        const sanitisedEmail = validator.normalizeEmail(this.state.email.value);

        axios.get(baseURL + '/login', { headers: { email: sanitisedEmail, password: this.state.password.value }})
        .then(response => {
            const { token, id, email } = response.data;
            localStorage.setItem('token', token);
            this.props.dispatch(authorise({ token, id, email }));
            this.props.redirect();
        })
        .catch(error => {
            switch (error.response.status) {
                case 401:
                    this.props.setError('Your email or password was incorrect! Please try again.');
                    break;
                default:
                    this.props.setError('Unknown error. Please Try again');
            }
        });
    }

    render() {
        return (
            <div>
                <Form title='Login' handler={this.loginHandler}>

                    <div className="form-group">
                        <input className="form-input" type="text" name="email" placeholder='Email' value={this.state.email.value} onChange={this.inputChange}/> 
                        <p className="input-err">{this.state.email.error}</p>
                    </div>

                    <div className="form-group">
                        <input className="form-input" type="password" name="password" placeholder='Password' value={this.state.password.value} onChange={this.inputChange}/>
                        <p className="input-err">{this.state.password.error}</p>
                    </div>

                    <div className="form-group">
                        {this.props.state.error && <p className="form-error">{this.props.state.error}</p>}
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Login" className="btn form-submit" />
                    </div>

                    <div className="form-group">
                        <Recaptcha
                            sitekey="6LeF0XoUAAAAAJmJb_4y_b84mM7b9bcahGhmhA6x"
                            render="explicit"
                            verifyCallback={this.verifyCallback}
                        />
                    </div>

                    <div className='form-group'>
                        <button type='button' className='form-link' onClick={this.props.showRegisterPage}>Register</button>
                        <button type='button' className='form-link' onClick={this.props.showForgotPage}>Forgot</button>
                    </div>
                </Form>
            </div>
        );
    }
}

export default connect()(Login);