import React from 'react';
import Recaptcha from '../components/Recaptcha';
import { normalizeEmail, isEmail } from 'validator';
import { getResetCode } from '../requests/auth';
import Header from '../components/Header';
import FormTextInput from '../components/FormTextInput';
import { Link } from 'react-router-dom';

class Auth_Forgot_Start extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.setError = this.setError.bind(this);
        this.inputChange = this.inputChange.bind(this);

        this.state = {
            email: { value: '', error: null },
            main: { error: null },
            loading: false
        }
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

    handleSubmit(e) {
        e.preventDefault();

        if (this.state.loading) return;

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

        // if (!this.props.isVerified) return this.setError('main', Confirm that you are not a robot');

        const sanitisedEmail = normalizeEmail(this.state.email.value);

        this.setState({ loading: true });

        getResetCode(sanitisedEmail)
        .then(({ status, message }) => {
            this.setState({ loading: false });

            if (status === 'error') return console.log('error', message.status);

            this.props.start({ email: this.state.email.value });
            
        })
        .catch(error => {
            this.setState({ loading: false });
            console.log({ error })
            this.setError('main', 'unknown error');
        })

    }

    render() {
        return (
            <div>
                <Header />
                <div className="form-container">
                    <form id="loginForm" onSubmit={this.handleSubmit}>
                        <h3 className="form-heading">Forgot</h3>

                        <FormTextInput 
                            id='inputEmail'
                            label='email'
                            name='email'
                            value={this.state.email.value}
                            onChange={this.inputChange}
                            error={this.state.email.error}
                            autoFocus={true}
                        />

                        <div className="form-group form-control">
                            <input type="submit" value='Submit' className="waves-effect waves-light btn-large grey" />
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
                            <Link className='form_link' to='/login'>Login</Link>
                            <Link className='form_link' to='/register'>Register</Link>
                        </div>

                    </form>
                </div>
            </div>
        );
    }            
}

export default Auth_Forgot_Start;