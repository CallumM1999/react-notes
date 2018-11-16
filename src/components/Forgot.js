import React from 'react';
import Recaptcha from 'react-recaptcha';

import axios from 'axios';
import { baseURL } from '../config/axios.defaults';



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

        this.state = {
            isVerified: false,
            sent: false,
            email: '',
            code: '',
            codeIsValid: false,
            password: '',
            password_conf: ''
        };
    }

    verifyCallback() {
        this.setState({ isVerified: true });
    }

    handleSend(e) {
        e.preventDefault();

        const { email } = e.target;
        if (!email.value) return this.props.setError('Missing fields');
        if (!this.state.isVerified) return this.props.setError('Confirm that you are not a robot');

        axios.get(baseURL + '/reset/code', {
            headers: {
                email: this.state.email
            }
        })
        .then(response => {
            this.props.setError('');
            this.setState({
                sent: true
            });
        })
        .catch(error => {
            console.log('email error', error)
            this.props.setError('unknown error');
        });
    }

    resend(e) {
        e.preventDefault();

        axios.get(baseURL + '/reset/code/resend', {
            headers: {
                email: this.state.email
            }
        })
        .then(response => {
            console.log('email response', response);
        })
        .catch(error => {
            console.log('email error', error)
            this.props.setError('unknown error');
        });
    }

    confirm(e) {
        e.preventDefault();
        axios.post(baseURL + '/reset/confirm', {}, {
            headers: {
                email: this.state.email,
                code: this.state.code
            }
        })
        .then(response => {
            console.log('email response', response);
            this.setState({
                codeIsValid: true
            });
        })
        .catch(error => {
            console.log('email error', error)
            this.props.setError('code is invalid');
        });
    }

    updatePassword(e) {
        e.preventDefault();

        if (this.state.password === '' || this.state.password_conf === '') {
            return this.props.setError('fields missing');
        }
        if (this.state.password !== this.state.password_conf) {
            return this.props.setError('passwords do not match');
        }

        axios.post(baseURL + '/reset/update', {}, {
            headers: {
                code: this.state.code,
                email: this.state.email,
                password: this.state.password
            }
        })
        .then(response => {
            console.log('response', response);
            this.props.setError('');
            this.props.redirect()
        })
        .catch(error => {
            console.error('error', error)
        });
    }

    render() {
        if (this.state.codeIsValid) {
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
                            id="input_password" 
                            className='form-input' 
                            placeholder='Password'
                            value={this.state.password}
                            onChange={e => {
                                this.setState({ password: e.target.value })
                            }} 
                        />        
                    </div>


                    <div className='form-group'>
                        <input 
                            type="password" 
                            name="password_conf" 
                            id="input_password_conf" 
                            className='form-input' 
                            placeholder='Confirm Password'
                            value={this.state.password_conf}
                            onChange={e => {
                                this.setState({ password_conf: e.target.value })
                            }} 
                        />        
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
        }

        if (!this.state.sent){
            return (
                <Form title='Forgot' handler={this.handleSend}>
                    

                    <div className='form-group'>
                        <input 
                            type="text" 
                            name="email" 
                            id="input_email" 
                            className='form-input' 
                            placeholder='Email' 
                            value={this.state.email}
                            onChange={e => {
                                this.setState({
                                    email: e.target.value
                                });
                            }}
                        />        
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
        } else {
            return (
                <Form title='Forgot' handler={this.confirm} >

                    <div className="form-group">
                        <p>ACCOUNT : {this.state.email} <button>Change Address?</button></p>
                    </div>
                
                    <div className='form-group'>
                        <input 
                            type="text" 
                            name="code" 
                            id="input_code" 
                            className='form-input' 
                            placeholder='Code'
                            value={this.state.code}
                            onChange={e => {
                                this.setState({
                                    code: e.target.value
                                });
                            }}
                        />
                    </div>

                    <div className='form-group'>
                        <p>If your email address exists in out records, we have send an email! Please check your inbox</p>
                        <p>Not recieved email? <input type='button' value='Resend' onClick={this.resend} /></p>
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
        }
    
    }
}

export default Forgot;