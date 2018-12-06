import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import authorize from '../actions/authorize';
import validator from 'validator';
import checkAuth from '../actions/checkAuth';
import FormTextInput from '../components/FormTextInput';
import Header from '../components/Header';
import Recaptcha from '../components/Recaptcha';
import { Link } from 'react-router-dom';
import { login } from '../requests/auth';

class Auth_Login extends React.Component {
    constructor(props) {
        super(props);

        this.verifyCallback = this.verifyCallback.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
        this.setError = this.setError.bind(this);
        this.inputChange = this.inputChange.bind(this);
3
        this.state = {
            email: { error: null, value: '' },
            password: { error: null, value: '' },
            main: { error: null },
            isVerified: false,
            loading: false,
            success: false
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
                <Header />
                <div className="form-container">
                    <form id="loginForm" onSubmit={this.loginHandler}>
                        <h3 className="form-heading">Login</h3>

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
                            id='inputPassword'
                            type='password'
                            label='password'
                            name='password'
                            value={this.state.password.value}
                            onChange={this.inputChange}
                            error={this.state.password.error}
                        />

                        <div className="form-group form-control">
                            <input type="submit" value='Login' className="waves-effect waves-light btn-large grey" />
                        </div>

                        <div className="form-group form-loading">
                            {this.state.loading && <p>Loading...</p>}
                        </div>

                        <div className="form-group">
                            {this.state.main.error && <p className="form-error">{this.state.main.error}</p>}
                        </div>

                        <div className="form-group">
                            <Recaptcha verify={this.verifyCallback}/>
                        </div>

                        <div className='form-group form-links'>
                            <Link className='form_link' to='/register'>Register</Link>
                            <Link className='form_link' to='/forgot'>Forgot</Link>
                        </div>

                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({ auth: state });

export default connect(mapStateToProps)(Auth_Login);