import React from 'react';
import Form from './Form';
import FormLink from '../components/FormLink';

import { isEmpty, normalizeEmail, isAscii } from 'validator';
import { postUpdate } from '../requests/auth';

import Header from '../components/Header';


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
                <Header subheading='Reset'/>

                <Form title='Forgot' handler={this.handleSubmit}>

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
                        {this.state.main.error && <p className='form-error'>{this.state.main.error}</p>}
                    </div>
    
                    <div className='form-group'>
                        <input type="submit" value="Update Password" className='btn form-submit' />
                    </div>
    
                    <div className="form-group form-loading">
                        {this.state.loading && <p>Loading...</p>}
                    </div>
    
                    <div className='form-group form-links'>
                        <FormLink name='login'/>
                        <FormLink name='register'/>
                    </div>
                </Form>
            </div>
        );
    }
}

export default Auth_Forgot_Update;