import React from 'react';
import { Link } from 'react-router-dom';

const FormLink = props => {
    return (
        <Link className='form_link' to={'/' + props.name}>{props.name}</Link>
    );
}

export default FormLink;