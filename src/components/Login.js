import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Recaptcha from 'react-recaptcha';

import { baseURL } from '../config/axios.defaults';

import Form from './Form';

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

        this.state = {
            isVerified: false
        };
    }

    verifyCallback() {
        this.setState({ isVerified: true });
    }

    loginHandler(e) {
        e.preventDefault();
        // console.log('login called')

        const { email, password } = e.target;

        if (!email.value || !password.value) return this.props.setError('missing fields');

        if (!this.state.isVerified) return this.props.setError('Confirm that you are not a robot');

        this.props.setError('');

        axios.get(baseURL + '/login', {
            headers: {
                email: email.value,
                password: password.value
            }
        })
        .then(response => {
            const { token, id, email } = response.data;

            localStorage.setItem('token', token);

            this.props.dispatch(authorise({ token, id, email }));
   
            this.props.redirect();
        
        })
        .catch(error => {
            this.props.setError('Auth error');
        });
        
    }


    render() {
        return (
            <div>
                <Form title='Login' handler={this.loginHandler}>

                    <div className="form-group">
                        <input className="form-input" type="text" name="email" id="input_email" placeholder="Email" />        
                    </div>

                    <div className="form-group">
                        <input className="form-input" type="password" name="password" id="input_password" placeholder="Password" />
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