import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import validator from 'validator';
import { register } from '../requests/auth';
import authorize from '../actions/authorize';
import { Link } from 'react-router-dom';

import Loadable from 'react-loadable';

const Header = Loadable({
    loader: () => import('./Header'),
    loading: () => <div>Loading...</div>
});

const FormTextInput = Loadable({
    loader: () => import('./FormTextInput'),
    loading: () => <div>Loading...</div>
});

const Recaptcha = Loadable({
    loader: () => import('./Recaptcha'),
    loading: () => <div>Loading...</div>
});

const SplitTest = Loadable({
    loader: () => import('../components/SplitTest'),
    loading: () => <div>Loading...</div>
});


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
            main: { error: null },
            loading: false,
            success: false
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

        if (this.state.loading) return;

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

        this.setState({ loading: true });

        register(sanitisedEmail, this.state.password.value)
        .then(({ status, message }) => {
            this.setState({ loading: false });

            if (status === 'error') {
                if (message.status === 409) return this.setError('main', 'Email taken! Please try again.');
                return this.setError('main', message);
            }

            const { token, id, email } = message;

            localStorage.setItem('token', token);
            this.props.dispatch(authorize({ token, id, email }));
            this.setState({ success: true })
        })
        .catch(error => {
            this.setState({ loading: false });
            console.log({error})
            this.setError('main', 'Unknown error. Please Try again');
    
        });
    }

    render() {
        if (this.state.success) return <Redirect to='/' />
        
        return (
            <div>
                <Header />

                <div className="form-container">
                    <form onSubmit={this.registerHandler} id="registerForm">
                        <h3 className="form-heading">Register</h3>
                        
                        <FormTextInput 
                            id='inputEmail'
                            label='email'
                            name='email'
                            value={this.state.email.value}
                            onChange={this.inputChange}
                            error={this.state.email.error}
                            autoFocus={true}
                        />

                        <FormTextInput 
                            id='inputEmail_conf'
                            label='confirm email'
                            name='email_conf'
                            value={this.state.email_conf.value}
                            onChange={this.inputChange}
                            error={this.state.email_conf.error}
                        />

                        <FormTextInput 
                            id='inputPassword'
                            label='password'
                            name='password'
                            type='password'
                            value={this.state.password.value}
                            onChange={this.inputChange}
                            error={this.state.password.error}
                        />

                        <FormTextInput 
                            id='inputPassword_conf'
                            label='confirm password'
                            name='password_conf'
                            type='password'
                            value={this.state.password_conf.value}
                            onChange={this.inputChange}
                            error={this.state.password_conf.error}
                        />

                        <div className="form-group form-control">
                            <input type="submit" value='Register' className="waves-effect waves-light btn-large grey" />
                        </div>

                        <div className="form-group form-loading">
                            {this.state.loading && <p>Loading...</p>}
                        </div>

                        <div className="form-group">
                            {this.state.main.error && <p className="form-error">{this.state.main.error}</p>}
                        </div>

                        <div className="form-group">
                            <Recaptcha verify={this.verifyCallback} />
                           
                        </div>

                        <div className='form-group form-links'>
                            <Link className='form_link' to='/login'>Login</Link>
                            <Link className='form_link' to='/forgot'>Forgot</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect()(Auth_Register);