import React from 'react';
import Recaptcha from 'react-recaptcha';

import { Redirect } from 'react-router-dom';

import { isEmpty, normalizeEmail, isEmail, isAscii } from 'validator';

import { getResetCode, getResendCode, postConfirm, postUpdate } from '../requests/auth';


import Form from './Form';
class Forgot extends React.Component {
    constructor(props) {
        super(props);

        // this.forgotHandler = this.forgotHandler.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);

        this.handleSend = this.handleSend.bind(this);
        this.resend = this.resend.bind(this);
        this.confirm = this.confirm.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.changeAddress = this.changeAddress.bind(this);

        this.setError = this.setError.bind(this);
        this.inputChange = this.inputChange.bind(this);

        this.state = {
            formStage: 'START',
            isVerified: false,
            sent: false,

            email: {
                value: '',
                error: null,
            },
            code: {
                value: '',
                error: null,
                isValid: false,
            },
            password: {
                value: '',
                error: null,
            },
            password_conf: {
                value: '',
                error: null,
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

    handleSend(e) {
        e.preventDefault();
        console.log('handleSend()');

        let errors = false;

        if (!this.state.email.value) {
            this.setError('email', 'Missing fields');
            errors = true;
        } else if (!isEmail(this.state.email.value)) {
            this.setError('email', 'invalid email');
            errors = true;
        } else {
            this.setError('email', null);
        }

        if (errors) return;

        // if (!this.state.isVerified) return this.props.setError('Confirm that you are not a robot');

        const sanitisedEmail = normalizeEmail(this.state.email.value);

        getResetCode(sanitisedEmail)
        .then(response => {
            this.setState({
                formStage: 'SENT_CODE'
            });
        })
        .catch(error => {
            console.log({ error })
            this.props.setError('unknown error');
        })

    }

    resend(e) {
        e.preventDefault();

        const normalisedEmail = normalizeEmail(this.state.email.value);

        getResendCode(normalisedEmail)
        .then(response => {
            console.log('code resent');
        })
        .catch(error => {
            console.log({ error })
            this.props.setError('unknown error');
        });
    }

    confirm(e) {
        e.preventDefault();

        console.log('confirm()');


        let errors = false;


        if (isEmpty(this.state.code.value)) {
            this.setError('code', 'Field missing');
            errors = true;
        } else if (this.state.code.value.length !== 8) {
            this.setError('code', 'invalid code');
            errors = true;
        } else {
            this.setError('code', null);
        }

        if (errors) return;
        
        const normalisedEmail = normalizeEmail(this.state.email.value);

        postConfirm(normalisedEmail, this.state.code.value)
        .then(error => {
            console.log('email respon?se', response);
            this.props.setError(null);
            
            this.setState({
                formStage: 'GOT_CODE'

            });
        })
        .catch(error => this.props.setError('code is invalid'));
    }

    changeAddress() {
        this.setState({
            formStage: 'START'
        });
    }

    updatePassword(e) {
        e.preventDefault();  

        console.log('updateDassword()');

        
        let errors = false;
        
        if (isEmpty(this.state.password.value)) {
            this.setError('password', 'field missing');
            errors = true;
        } else if (this.state.password.value.length < 8 || this.state.password.value.length > 100) {
            this.setError('password', 'invalid password! Must be 8-100 characters');
            errors = true;
        } else if (!isAscii(this.state.password.value)) {
            this.setError('password', 'password can only contain ascii characters');
            errors = true;
        } else {
            this.setError('password', null);
        }

        if (isEmpty(this.state.password_conf.value)) {
            this.setError('password_conf', 'field missing');
            errors = true;
        } else if (this.state.password_conf.value !== this.state.password.value) {
            this.setError('password_conf', 'passwords don\'t match');
            errors = true;
        } else {
            this.setError('password_conf', null);
        }

        if (errors) return;

        const normalizedEmail = normalizeEmail(this.state.email.value);

        postUpdate(normalizedEmail, this.state.code.value, this.state.password.value)
        .then(response => {
            console.log('response', response);

            this.setState({
                formStage: 'SUCCESS'
            });
        })
        .catch(error => this.props.setError('unknown error'));

    }

    render() {
        switch (this.state.formStage) {
            case 'START':
                return (
                    <Form title='Forgot' handler={this.handleSend}>
                        

                        <div className='form-group'>
                            <input 
                                type="text" 
                                name="email" 
                                className='form-input' 
                                placeholder='Email' 
                                value={this.state.email.value}
                                onChange={this.inputChange}
                            />       
                            <p className="input-err">{this.state.email.error}</p>
                        </div>

                        <div className='form-group'>
                            {this.props.state.error && <p className='form-error'>{this.props.state.error}</p>}
                        </div>

                        <div className='form-group'>
                            <input type="submit" value="Confirm" className='btn form-submit' />
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
                            <button type='button' className='form-link' onClick={this.props.showRegisterPage}>Register</button>
                        </div>
                    </Form>
                );
                break;
            case 'SENT_CODE':
                return (
                    <Form title='Forgot' handler={this.confirm} >

                        <div className="form-group">
                            <p>ACCOUNT : {this.state.email.value} <button onClick={this.changeAddress}>Change Address?</button></p>
                        </div>
                    
                        <div className='form-group'>
                            <input 
                                type="text" 
                                name="code" 
                                className='form-input' 
                                placeholder='Code'
                                value={this.state.code.value}
                                onChange={this.inputChange}
                            />
                            <p className="input-err">{this.state.code.error}</p>
                        </div>

                        <div className='form-group'>
                            <p>If your email address exists in out records, we have send an email! Please check your inbox</p>
                            <p>Not recieved email? <input type='button' value='Resend' onClick={this.resend} /></p>
                        </div>

                        <div className='form-group'>
                            {this.props.state.error && <p className='form-error'>{this.props.state.error}</p>}
                        </div>

                        <div className="form-group">
                                <input type="submit" value="Submit" className='btn form-submit'/>
                        </div>

                        <div className='form-group'>
                            <button type='button' className='form-link' onClick={this.props.showLoginPage}>Login</button>
                            <button type='button' className='form-link' onClick={this.props.showRegisterPage}>Register</button>
                        </div>
                    </Form>
                );
                break;
            case 'GOT_CODE':
                return (
                    <Form title='Forgot' handler={this.updatePassword}>

                    <div className="form-group">
                        <h2>Success</h2>
                        <p>Update your password</p>
                    </div>

                        <div className='form-group'>
                            <input 
                                type="password" 
                                name="password" 
                                className='form-input' 
                                placeholder='Password'
                                value={this.state.password.value}
                                onChange={this.inputChange} 
                            />      
                            <p className="input-err">{this.state.password.error}</p>
                        </div>


                        <div className='form-group'>
                            <input 
                                type="password" 
                                name="password_conf" 
                                className='form-input' 
                                placeholder='Confirm Password'
                                value={this.state.password_conf.value}
                                onChange={this.inputChange} 
                            />   
                            <p className="input-err">{this.state.password_conf.error}</p>
                        </div>


                        <div className='form-group'>
                            {this.props.state.error && <p className='form-error'>{this.props.state.error}</p>}
                        </div>

                        <div className='form-group'>
                            <input type="submit" value="Update Password" className='btn form-submit' />
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
                            <button type='button' className='form-link' onClick={this.props.showRegisterPage}>Register</button>
                        </div>
                    </Form>

                );

                break;
            case 'SUCCESS':
                return (
                    <Redirect to='/'/>
                );
        }    
    }
}

export default Forgot;