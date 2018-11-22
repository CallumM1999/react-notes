import React from 'react';
import { connect } from 'react-redux';

class EditCard extends React.Component {
    constructor(props) {
        super(props);

        this.editCard = this.editCard.bind(this);
        this.deleteCard = this.deleteCard.bind(this);

        this.state = {
            front: this.props.front,
            back: this.props.back
        };
    }

    editCard() {
        this.props.editCard(this.props._id, this.props.front, this.props.back);
    }
    deleteCard() {
        const choice = confirm('Are you sure you want to delete this card?');

        if (choice) {
            this.props.deleteCard(this.props._id);
        }
    }
    render() {
        return (

            <li className="edit-item">
                <div className="edit-close" onClick={this.deleteCard}>x</div>
                <div className="edit-content" onClick={this.editCard}>
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