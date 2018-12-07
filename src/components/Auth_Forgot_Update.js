import React from 'react';
import { isEmpty, normalizeEmail, isAscii } from 'validator';
import { postUpdate } from '../requests/auth';
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

class Auth_Forgot_Update extends React.Component {
    constructor(props) {
        super(props);

        this.setError = this.setError.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            password: { value: '', error: null },
            password_conf: { value: '', error: null },
            main: { error: null },
            loading: false
        }
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

    handleSubmit(e) {
        e.preventDefault();  

        if (this.state.loading) return;
        
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

        // if (!this.props.isVerified) return this.setError('main', Confirm that you are not a robot');

        const normalizedEmail = normalizeEmail(this.props.email);

        this.setState({ loading: true });

        postUpdate(normalizedEmail, this.props.code, this.state.password.value)
        .then(({ status, message }) => {
            this.setState({ loading: false });

            if (status === 'error') return console.log('error', message.status);

            this.props.update();

        })
        .catch(error => {
            this.setState({ loading: false });
            this.setError('main', 'unknown error');
        });
    }

    render() {
        return (
            <div>
                <Header />
                <div className="form-container">
                    <form id="loginForm" onSubmit={this.handleSubmit}>
                        <h3 className="form-heading">Forgot</h3>

                        <div className="form-group">
                            <h2>Success</h2>
                            <p>Update your password</p>
                        </div>

                        <FormTextInput 
                            id='inputPassword'
                            label='password'
                            name='password'
                            type='password'
                            value={this.state.password.value}
                            onChange={this.inputChange}
                            error={this.state.password.error}
                            autoFocus={true}
                        />

                        <FormTextInput 
                            id='inputPassword_conf'
                            label='confirm password'
                            name='password_conf'
                            type='password'
                            value={this.state.password_conf.value}
                            onChange={this.inputChange}
                            error={this.state.password_conf.error}
                            autoFocus={true}
                        />

                        <div className="form-group form-control">
                            <input type="submit" value='Update' className="waves-effect waves-light btn-large grey" />
                        </div>

                        <div className="form-group form-loading">
                            {this.state.loading && <p>Loading...</p>}
                        </div>

                        <div className="form-group">
                            {this.state.main.error && <p className="form-error">{this.state.main.error}</p>}
                        </div>

                     
                        

                        <div className='form-group form-links'>
                            <Link className='form_link' to='/login'>Login</Link>
                            <Link className='form_link' to='/register'>Register</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Auth_Forgot_Update;