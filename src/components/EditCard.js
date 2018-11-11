import React from 'react';
import { connect } from 'react-redux';

class EditCard extends React.Component {
    constructor(props) {
        super(props);

        this.editCard = this.editCard.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
    }
    editCard() {
        this.props.editCard(this.props.id, this.front, this.back);
    }
    deleteCard() {
        const choice = confirm('Are you sure you want to delete this card?');

        if (choice) {
            this.props.deleteCard(this.props.id)
        }
    }
    render() {
        return (
            <li className="edit-list__item">
                <div className="edit-list__content">
                    <div className="edit-list__text">
                        <div className="edit-list__text-front">
                            <span>{this.props.front}</span>
                        </div>
                        <div className="edit-list__text-back">
                        <span>{this.props.back}</span>
                        </div>
                    </div>
                    <div className="edit-list__tab"></div>
                </div>

                <div className="edit-list__buttons">
                    <button onClick={this.editCard} className="edit__button edit__button-edit">edit</button>
                    <button onClick={this.deleteCard} className="edit__button edit__button-delete">delete</button>
                </div>
            </li>


        );
    }
}

export default connect()(EditCard);