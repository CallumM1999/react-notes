import React from 'react';
import DashboardItem from '../components/DashboardItem';
import { connect } from 'react-redux';

import Header from '../components/Header';

import { getDecks, postDecks, putDecks, deleteDecks } from '../requests/decks';

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

        getDecks(this.props.auth.id, this.props.auth.token)
        .then(({ status, message }) => {

            if (status === 'error') return console.log('error', message.status);


            console.log('get decks', message)
            
            this.setState({
                decks: message
            });

            console.log(this.state)
            
        })
        .catch(error => console.error({error}));
    }

    addDeck() {
        const deckName = prompt('Enter name of new deck: ');

        if (deckName) {
            postDecks(deckName, this.props.auth.id, this.props.auth.token)
            .then(({ status, message }) => {

                if (status === 'error') return console.log('error', message.status);

                console.log('deck added', message)

                this.setState(prev => {
                    return {
                        decks: [
                            ...prev.decks,
                            {
                                ...message
                            }
                        ]
                    };
                });
            })
            .catch(error => console.log({error}));
        }
    }
    renameDeck(_id, name) {

        putDecks(name, _id, this.props.auth.token)
        .then(({ status, message }) => {

            if (status === 'error') return console.log('error', message.status);

            console.log('renaming deck', message)

            this.setState(prev => {
                return {
                    decks: prev.decks.map(item => {
                        if (item._id === _id) {
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
        .catch(error => console.log({error}));
    }
    deleteDeck(_id) {

        deleteDecks(_id, this.props.auth.token)
        .then(({ status, message }) => {

            if (status === 'error') return console.log('error', message.status);

            console.log('delete deck', message)

            this.setState(prev => {
                return {
                    decks: prev.decks.filter(item => item._id !== _id)
                };
            });
        })
        .catch(error => console.log({error}));
    }
    render() {
        return (
            <div>
                <Header subheading='Dashboard' auth={this.props.auth.auth} dispatch={this.props.dispatch} />

                <button className='btn dashboard-add' onClick={this.addDeck}>Add Deck</button>


                <ul className="dashboard-container">
                {
                    this.state.decks.map((deck, index) => {
                        // console.log('mapping', deck)
                        return (
                            <DashboardItem 
                                key={index} 
                                name={deck.name} 
                                _id={deck._id}
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

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Dashboard);