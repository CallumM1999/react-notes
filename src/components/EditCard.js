import React from 'react';
import { connect } from 'react-redux';

const EditCard = props => {
    return (
        <li className="edit-item">
            <div className="edit-close" onClick={() => props.openModal('modalDeleteCard', { _id: props._id })}>x</div>
            <div className="edit-edit" onClick={() => props.openModal('modalEditCard', { front: props.front, back: props.back, _id: props._id })}>edit</div>
            <div className="edit-content">
                <div className="edit-content-front">
                    
                    <div className='edit-content-input' >{props.front}</div>

                </div>
                <div className="edit-content-back">
                    
                 <div className='edit-content-input' >{props.back}</div>

                </div>
            </div>
        </li>
    );
}

export default connect()(EditCard);