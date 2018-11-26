import React from 'react';
import Form from './Form';
import Recaptcha from '../components/Recaptcha';
import FormLink from '../components/FormLink';

import { normalizeEmail, isEmail } from 'validator';
import { getResetCode } from '../requests/auth';


class Auth_Forgot_Start extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.setError = this.setError.bind(this);
        this.inputChange = this.inputChange.bind(this);

        this.state = {
            email: { value: '', error: null },
            main: { error: null }
        }
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

        // if (!this.props.isVerified) return this.setError('main', Confirm that you are not a robot');

        const sanitisedEmail = normalizeEmail(this.state.email.value);

        getResetCode(sanitisedEmail)
        .then(({ status, message }) => {

            if (status === 'error') return console.log('error', message.status);

            this.props.start({ email: this.state.email.value });
            
        })
        .catch(error => {
            console.log({ error })
            this.setError('main', 'unknown error');
        })

    }

    render() {
        return (
            <Form title='Forgot' handler={this.handleSubmit}>
                

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
                    {this.state.main.error && <p className='form-error'>{this.state.main.error}</p>}
                </div>

                <div className='form-group'>
                    <input type="submit" value="Confirm" className='btn form-submit' />
                </div>

                <div className="form-group">
                    <Recaptcha verify={this.props.verifyCallback}/>
                </div>

                <div className='form-group'>
                    <FormLink name='login'/>
                    <FormLink name='register'/>
                </div>
            </Form>
        );
    }
}




export default Auth_Forgot_Start;