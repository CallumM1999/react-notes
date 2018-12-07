import React from 'react';
import { isEmpty, normalizeEmail } from 'validator';
import { getResendCode, postConfirm } from '../requests/auth';
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

class Auth_Forgot_Send extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.setError = this.setError.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.resend = this.resend.bind(this);

        this.state = {
            code: { value: '', error: null },
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
    resend(e) {
        e.preventDefault();

        if (this.state.loading) return;

        const normalisedEmail = normalizeEmail(this.props.email);

        this.setState({ loading: true });
        
        getResendCode(normalisedEmail)
        .then(({ status, message }) => {
            this.setState({ loading: false });

            if (status === 'error') return console.log('error', message.status);

            console.log('code resent');
        })
        .catch(error => {
            console.log({ error })
            this.setError('main', 'unknown error');
            this.setState({ loading: false });

        });
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.state.loading) return;

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

        // if (!this.props.isVerified) return this.setError('main', Confirm that you are not a robot');

        const normalisedEmail = normalizeEmail(this.props.email);

        this.setState({ loading: true });

        postConfirm(normalisedEmail, this.state.code.value)
        .then(({ status, message }) => {
            this.setState({ loading: false });

            if (status === 'error') {
                if (message.status === 404) return this.setError('main', 'Code is incorrect! try again.');
                return this.setError('main', 'unknown error');
            }
            
            this.props.send({ code: this.state.code.value });
        })
        .catch(error => {
            this.setState({ loading: false });
            this.setError('main', 'code is invalid');
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
                            <p>ACCOUNT : {this.props.email} <button onClick={this.props.changeAddress} type='button'>Change Address?</button></p>
                        </div>
                                    
                        <FormTextInput 
                            id='inputCode'
                            label='code'
                            name='code'
                            value={this.state.code.value}
                            onChange={this.inputChange}
                            error={this.state.code.error}
                            autoFocus={true}
                        />

                        <div className="form-group form-control">
                            <input type="submit" value='Submit' className="waves-effect waves-light btn-large grey" />
                        </div>

                        <div className='form-group'>
                            <p>If your email address exists in out records, we have send an email! Please check your inbox</p>
                            <p>Not recieved email? <input type='button' value='Resend' onClick={this.resend} /></p>
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

export default Auth_Forgot_Send;