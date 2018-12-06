import React from 'react';

const FormTextInput = props => {
    return (
        <div className="input-field form-group">
            <input 
                className={`form-input ${!!props.error ? 'invalid' : props.value.length > 1 ? 'valid' : ''}`}
                type={props.type || "text"} 
                name={props.name} 
                id={props.id}
                value={props.value} 
                onChange={props.onChange}
                autoFocus={props.autoFocus}
            />
            <label htmlFor={ props.id } className={props.active && 'active'}>{ props.label }</label>
            <p className="helper-text" data-error={props.error}></p>
        </div>
    )
};

export default FormTextInput;