import React from 'react';
import { connect } from 'react-redux';

class EditCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            front: this.props.front,
            back: this.props.back
        };
    }

    render() {
        return (
            <li className="edit-item">
                <div className="edit-close" onClick={() => this.props.openModal('modalDeleteCard', { _id: this.props._id })}>x</div>
                <div className="edit-content" onClick={() => this.props.openModal('modalEditCard', { front: this.state.front, back: this.state.back, _id: this.props._id })}>
                    <div className="edit-content-front">
                        
                        <div className='edit-content-input' >{this.props.front}</div>

                    </div>
                    <div className="edit-content-back">
                        
                     <div className='edit-content-input' >{this.props.back}</div>

                    </div>
                </div>
            </li>
        );
    }
}

export default connect()(EditCard);