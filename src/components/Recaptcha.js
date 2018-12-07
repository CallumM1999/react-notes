import React from 'react';
import ReactRecaptcha from 'react-recaptcha';

const Recaptcha = props => {
    return (
        <ReactRecaptcha
            className='recaptcha'
            sitekey="6LeF0XoUAAAAAJmJb_4y_b84mM7b9bcahGhmhA6x"
            render="explicit"
            verifyCallback={props.verify}
        />
    );
}
export default Recaptcha;