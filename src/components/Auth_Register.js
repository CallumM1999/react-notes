import React from 'react';
import { connect } from 'react-redux';

import Form from './Form';
import FormLink from '../components/FormLink';
import Recaptcha from '../components/Recaptcha';

import validator from 'validator';
import { register } from '../requests/auth';

import authorize from '../actions/authorize';


class Auth_Register extends React.Component {
    constructor(props) {
        super(props);

        this.registerHandler = this.registerHandler.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.setError = this.setError.bind(this);

        this.state = {
            isVerified: false,
            email: { error: null, value: '' },
            email_conf: { error: null, value: '' },
            password: { error: null, value: '' },
            password_conf: { error: null, value: '' },
            main: { error: null }
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
        //     return this.setError('main', 'Confirm that you are not a robot');
        // }

        const sanitisedEmail = validator.normalizeEmail(this.state.email.value);

        register(sanitisedEmail, this.state.password.value)
        .then(({ status, message }) => {

            if (status === 'error') return console.log('error', message.status);

            const { token, id, email } = message;

            localStorage.setItem('token', token);
            this.props.dispatch(authorize({ token, id, email }));
            this.props.redirect();
        })
        .catch(error => {
            console.log({error})
            switch (error.response.status) {
                case 401:
                    this.setError('main', 'Email taken! Please try again.');
                    break;
                default:
                    this.setError('main', 'Unknown error. Please Try again');
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
                        {this.state.main.error && <p className='form-error'>{this.state.main.error}</p>}
                    </div>
    
                    <div className='form-group'>
                        <input type="submit" value="Register" className='btn form-submit' />
                    </div>
    
                    <div className="form-group">
                        <Recaptcha verify={this.verifyCallback}/>
                    </div>

                    <div className='form-group'>
                        <FormLink name='login'/>
                        <FormLink name='forgot'/>
                    </div>
    
                </Form>
            </div>    
        );
    }
}

export default connect()(Auth_Register);