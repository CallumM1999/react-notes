import React from 'react';

const Form = (props) => {

    // console.log('form props', props)
    return (
        <div className="form-container">
            <form id="loginForm" onSubmit={props.handler}>
                <h3 className="form-heading">{props.title}</h3>

                {props.children}

            </form>
        </div>
    );
};

export default Form;