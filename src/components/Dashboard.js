import React from 'react';
import DashboardItem from '../components/DashboardItem';
import { connect } from 'react-redux';
import axios from 'axios';
import uuid from 'uuid/v4';

import Header from '../components/Header';


import { baseURL } from '../config/axios.defaults';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.addDeck = this.addDeck.bind(this);
        this.deleteDeck = this.deleteDeck.bind(this);
        this.renameDeck = this.renameDeck.bind(this);

        this.state = {
            decks: []
        };
    
    }
    componentDidMount() {
        // console.log('component did mount', this.props.auth.token)


        axios.get(baseURL + '/decks', 
        {
            headers: {
                id: this.props.auth.id,
                authorization: this.props.auth.token
            }
        })
            .then(response => {  
                this.setState({
                    decks: response.data
                });
            })
            .catch(error => {
                console.log('error', error);
            });
    }

    addDeck() {
        const deckName = prompt('Enter name of new deck: ');
        const id = uuid();

        if (deckName) {
            axios.post(baseURL + '/decks', 
            { name: deckName, id, owner: this.props.auth.id },
            {
                headers: {
                    authorization: this.props.auth.token
                }
            })
                .then(response => {
                    this.setState(prev => {
                        return {
                            decks: [
                                ...prev.decks,
                                {
                                    name: deckName,
                                    owner: this.props.auth.id,
                                    id
                                }
                            ]
                        };
                    });
                })
                .catch(error => {
                    console.log('error', error);
                });
        }
    }
    renameDeck(id, name) {
          axios.put(baseURL + '/decks', 
            { name, id },
            {
                headers: {
                    authorization: this.props.auth.token
                }
            })
            .then(response => {
                this.setState(prev => {
                    return {
                        decks: prev.decks.map(item => {
                            if (item.id === id) {
                                return {
                                    ...item,
                                    name
                                };
                            }
                            return item;
                        })
                    };
                });

            })
            .catch(error => {
                console.log('error', error);
            });
    }
    deleteDeck(id) {
        console.log('dashboard delete', id);
        axios.delete(baseURL + '/decks', 
        {
            headers: {
                id,
                authorization: this.props.auth.token
            }
        })
        .then(response => {
            console.log('delete respoonse', response);
            this.setState(prev => {
                return {
                    decks: prev.decks.filter(item => item.id !== id)
                };
            });
        })
        .catch(error => {
            console.log('error', error);
        });
    }
    render() {
        return (
            <div>
                <Header subheading='Dashboard' auth={this.props.auth.auth} dispatch={this.props.dispatch} />

                <button className='btn dashboard-add' onClick={this.addDeck}>Add Deck</button>


                <ul className="dashboard-container">
                {
                    this.state.decks.map((deck, index) => {
                        return (
                            <DashboardItem 
                                key={index} 
                                name={deck.name} 
                                id={deck.id}
                                renameDeck={this.renameDeck}
                                deleteDeck={this.deleteDeck}
                            />                
                        );
                    })
                }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};
export default connect(mapStateToProps)(Dashboard);