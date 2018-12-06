import React from 'react';
import { connect } from 'react-redux';

const EditCard = props => {
    return (
        <li className="edit-item">
            <div 
                className="edit-close"
                onClick={() => props.openModal('modalDeleteCard', { _id: props._id })}
            >
                <i className="small material-icons grey-text text-darken-4 ">delete</i>
            </div>
            <div 
                className="edit-edit"
                onClick={() => props.openModal('modalEditCard', { front: props.front, back: props.back, _id: props._id })}
            >
                <i className="small material-icons grey-text text-darken-4">edit</i>
            </div>
            
            <div className="edit-item-front">
                <div className='edit-item-front__content'>{props.front}</div>
            </div>

            <div className="edit-item-back">
                <div className='edit-item-back__content'>{props.back}</div>
            </div>
        </li>
    );
}

export default connect()(EditCard);