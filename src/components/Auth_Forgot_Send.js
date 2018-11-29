import React from 'react';
import Form from './Form';
import FormLink from '../components/FormLink';

import { isEmpty, normalizeEmail } from 'validator';
import { getResendCode, postConfirm } from '../requests/auth';

import Header from '../components/Header';


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

        const normalisedEmail = normalizeEmail(this.props.email);

        this.setState({ loading: true });
        
        getResendCode(normalisedEmail)
        .then(({ status, message }) => {

            this.setState({ loading: false });

            if (status === 'error') return console.log('error', message.status);

            console.log('code resent');
        })
        .catch(error => {
            this.setState({ loading: false });
            console.log({ error })
            this.setError('main', 'unknown error');
        });
    }

    handleSubmit(e) {
        e.preventDefault();

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

            if (status === 'error') return console.log('error', message.status);

            // console.log('send funx', this.props.send)
            
            this.props.send({ code: this.state.code.value });

            // console.log('email respon?se', message);
            // this.props.setError(null);

        })
        .catch(error => {
            this.setState({ loading: false });
            this.setError('main', 'code is invalid');
        });
    }

    


    render() {
        return (
            <div>
                <Header subheading='Reset'/>
            
                <Form title='Forgot' handler={this.handleSubmit} >

                    <div className="form-group">
                        <p>ACCOUNT : {this.props.email} <button onClick={this.props.changeAddress} type='button'>Change Address?</button></p>
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
                        {this.state.main.error && <p className='form-error'>{this.state.main.error}</p>}
                    </div>

                    <div className="form-group">
                            <input type="submit" value="Submit" className='btn form-submit'/>
                    </div>

                    <div className="form-group form-loading">
                        {this.state.loading && <p>Loading...</p>}
                    </div>

                    <div className='form-group'>
                        <FormLink name='login'/>
                        <FormLink name='register'/>
                    </div>
                </Form>
            </div>
        );
    }
}

export default Auth_Forgot_Send;