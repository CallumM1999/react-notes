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
        }
    }
    editCard() {
        this.props.editCard(this.props.id, this.props.front, this.props.back);
    }
    deleteCard() {
        const choice = confirm('Are you sure you want to delete this card?');

        if (choice) {
            this.props.deleteCard(this.props.id)
        }
    }
    render() {
        return (

            <li className="edit-item">
                <div className="edit-close" onClick={this.deleteCard}>x</div>
                <div className="edit-content">
                    <div className="edit-content-front">
                        
                        <input type="text" name="" id="" className='edit-content-input' value={this.state.front} onChange={() => {
                            this.setState({
                                front: this.value
                            });
                        }}/>

                    </div>
                    <div className="edit-content-back">
                        
                        <input type="text" name="" id="" className='edit-content-input' value={this.state.back} onChange={() => {
                            this.setState({
                                back: this.value
                            });
                        }}/>

                    </div>
                </div>
            </li>
        );
    }
}

export default connect()(EditCard);