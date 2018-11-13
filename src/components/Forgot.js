import React from 'react';

import Form from './Form';

const Forgot = props => {

    const forgotHandler = e => {
        e.preventDefault();

        console.log('forgot', e)
    }

    return (
        <div>
            <Form title='Forgot' handler={forgotHandler}>

                <div className='form-group'>
                    <input type="text" name="email" id="input_email" className='form-input' placeholder='Email' />        
                </div>


                <div className='form-group'>
                    <input type="button" value="Resend" onClick={props.sendCode} className='btn form-submit form-resend'/>
                    <input type="text" name="code" id="input_code" className='form-input form-input__code' placeholder='Code'/>
                </div>


                <div className='form-group'>
                    {props.state.error && <p className='form-error'>{props.state.error}</p>}
                </div>

                <div className='form-group'>
                    <input type="submit" value="Confirm" className='btn form-submit' />
                </div>
                
                <div className='form-group'>
                    <button className='form-link' onClick={props.showLoginPage}>Login</button>
                    <button className='form-link' onClick={props.showRegisterPage}>Register</button>
                </div>

            </Form>
        </div>
    );

}
export default Forgot;