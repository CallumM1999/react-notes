import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import uuid from 'uuid/v4'
import Header from '../components/Header';
import { withRouter } from 'react-router-dom';
import EditCard from './EditCard';

import { baseURL } from '../config/axios.defaults';


class Edit extends React.Component {
    constructor(props) {
        super(props);

        this.addCard = this.addCard.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
        this.editCard = this.editCard.bind(this);

        this.state = {
            undefined: false,
            cards: []
        }
    }
    
    componentDidMount() {
        // console.log('edit id', this.props.id)
        axios.get(baseURL + '/cards', 
        {
            headers: {
                id: this.props.id,
                authorization: this.props.auth.token
            }
        })
        .then(response => {
            // console.log('edit mount', response)
            this.setState({
                cards: response.data
            });
        })
        .catch(error => {
            console.log('error', error);
            this.setState({
                undefined: true
            });
        });
    }
    addCard() {
        const front = prompt('Enter card front text: ');
        const back = prompt('Enter card back text: ');
    
        if (front && back) {
            const id = uuid();
            const deck = this.props.id;

            axios.post(baseURL + '/cards', 
            { deck, front, back, id },
            {
                headers: {
                    authorization: this.props.auth.token
                }
            })
            .then(response => {
                console.log('add card', response)
                this.setState(prev => {
                    return {
                        cards: [
                            ...prev.cards,
                            { deck, front, back, id }
                        ]
                    }
                });
            })
            .catch(error => {
                console.log('error', error);
            });
        }
    }
    editCard(id, front, back) {
        const newFront = prompt('Enter value for front: ', front);
        if (!newFront) return false;

        const newBack = prompt('Enter value for back: ', back);
        if (!newBack) return false;


        if (newFront !== front || newBack !== back) {

            axios.put(baseURL + '/cards', 
            {
                id,
                front: newFront,
                back: newBack
            },
            {
                headers: {
                    authorization: this.props.auth.token
                }
            })
                .then(response => {
                    this.setState(prev => {
                        return {
                            cards: prev.cards.map(item => {
                                if (item.id === id) {
                                    return {
                                        ...item,
                                        front: newFront,
                                        back: newBack
                                    }
                                }
                                return item;
                            })
                        }
                    });
                })
                .catch(error => {
                    console.log('error', error)
                });
        }
    }

    deleteCard(id) {
        axios.delete(baseURL + '/cards', 
        {
            headers: {
                id,
                authorization: this.props.auth.token
            }
        })
            .then(result => {
                console.log('delete response', result)
                this.setState(prev => {
                    return {
                        cards: prev.cards.filter(item => item.id !== id)
                    }
                });
            })
            .catch(error => {
                console.log('error', error)
            });
    }

    render() {
        if (this.state.undefined) {
            return (
                <div>
                    <h2>Deck undefined</h2>
                </div>
            );
        } 

        return (
            <div>
                <Header subheading='Edit' auth={this.props.auth.auth} dispatch={this.props.dispatch} />

                <div className='edit-container'>

                
                    {!!this.props.location.state ? 
                        <div>
                            <h2 className='edit-title'>{this.props.location.state.deck}</h2>
                            <button onClick={this.addCard} className='btn edit-add'>Add card</button>
                            <ul className='edit-list'>
                                {
                                    this.state.cards.map((item, index) => {
                                        // console.log('item', item)
                                        return (
                                            <EditCard 
                                                key={index}
                                                front={item.front}
                                                back={item.back}
                                                id={item.id}
                                                deleteCard={this.deleteCard}
                                                editCard={this.editCard}
                                            />
                                        )
                                    })
                    
                                }
                            </ul>
                        </div>
                    : 
                        <h1>Unknown deck</h1>
                    }
                    
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}
export default withRouter(connect(mapStateToProps)(Edit));