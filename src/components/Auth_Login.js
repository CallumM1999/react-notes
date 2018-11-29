import React from 'react';
import { connect } from 'react-redux';
import Recaptcha from '../components/Recaptcha';

import { Redirect } from 'react-router-dom';
import authorize from '../actions/authorize';

import Form from './Form';

import { login } from '../requests/auth';

import validator from 'validator';
import checkAuth from '../actions/checkAuth';

import FormLink from '../components/FormLink';

import Header from '../components/Header';

class Auth_Login extends React.Component {
    constructor(props) {
        super(props);

        this.verifyCallback = this.verifyCallback.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
        this.setError = this.setError.bind(this);
        this.inputChange = this.inputChange.bind(this);

        this.state = {
            email: { error: null, value: '' },
            password: { error: null, value: '' },
            main: { error: null },
            isVerified: false,
            loading: false,
            success: false
        };

        // console.log('props', props)
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
        this.setState({
            [e.target.name]: {
                ...this.state[e.target.name],
                value: e.target.value
            }
        });  
    }

    loginHandler(e) {
        e.preventDefault();

        if (this.state.loading) return;

        let errors = false;

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
        //     return this.setError('main', Confirm that you are not a robot');
        // } 

        const sanitisedEmail = validator.normalizeEmail(this.state.email.value);

        this.setState({ loading: true });

        login(sanitisedEmail, this.state.password.value)
        .then(({ status, message }) => {

            this.setState({ loading: false });

            if (status === 'error') {
                console.log('error', message.status)
                return this.setError('main', 'Your email or password was incorrect! Please try again.')
            }

            const { token, id, email } = message;
            localStorage.setItem('token', token);


            this.props.dispatch(authorize({ token, id, email }));
            this.setState({ success: true })
            
        })
        .catch(error => {
            this.setState({ loading: false });
            console.log('error', error);
            this.setError('main', 'Your email or password was incorrect! Please try again.');
        });
    }

    render() {
        if (this.state.success) return <Redirect to='/' />

        if (checkAuth(this.props.auth)) return <Redirect to='/' />;
        
        return (
            <div>
                <Header subheading='Login'/>
                
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
                        {this.state.main.error && <p className="form-error">{this.state.main.error}</p>}
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Login" className="btn form-submit" />
                    </div>

                    <div className="form-group form-loading">
                        {this.state.loading && <p>Loading...</p>}
                    </div>

                    <div className="form-group">
                        <Recaptcha verify={this.verifyCallback}/>
                    </div>

                    <div className='form-group'>
                        <FormLink name='register'/>
                        <FormLink name='forgot'/>
                    </div>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Auth_Login);