import React from 'react';
import DashboardItem from '../components/DashboardItem';
import { connect } from 'react-redux';

import { ModalAddDeck, ModalDeleteDeck, ModalRenameDeck } from '../components/Modal';

import Header from '../components/Header';

import { getDecks, postDecks, putDecks, deleteDecks } from '../requests/decks';



class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.addDeck = this.addDeck.bind(this);
        this.deleteDeck = this.deleteDeck.bind(this);
        this.renameDeck = this.renameDeck.bind(this);

        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);

        this.state = {
            decks: [],
            modalAddCard: { isOpen: false, error: null },
            modalRenameCard: { isOpen: false, error: null, _id: null, name: null },
            modalDeleteCard: { isOpen: false, error: null, _id: null }
        };
    }
    
    componentDidMount() {
        getDecks(this.props.auth.id, this.props.auth.token)
        .then(({ status, message }) => {
            if (status === 'error') return console.log('error', message.status);
            console.log('get decks', message)
            this.setState({ decks: message });            
        })
        .catch(error => console.error({error}));
    }

    closeModal(el) {
        this.setState({ [el]: { isOpen: false } });
    }
    openModal(el, props = {}) {
        this.setState({ [el]: { isOpen: true , ...props} });
    }

    addDeck(e) {
        e.preventDefault();
        const deckName = e.target.name.value;

        if (!deckName) return this.setState(prev => ({ modalAddCard: { ...prev.modalAddCard, error: 'Enter a name!' } }))

        postDecks(deckName, this.props.auth.id, this.props.auth.token)
        .then(({ status, message }) => {

            if (status === 'error') return this.setState(prev => ({ modalAddCard: { ...prev.modalAddCard, error: 'unknown error' } }))

            this.setState(prev => ({
                decks: [ ...prev.decks, { ...message } ],
                modalAddCard: { isOpen: false, error: null }
            }));
        })
        .catch(error => console.log({error}));
    }
    renameDeck(e) {
        e.preventDefault();

        const { _id } = this.state.modalRenameCard;
        const name = e.target.name.value;

        const prevName = this.state.decks.filter(item => item._id === _id)[0].name;

        if (!name) return this.setState(prev => ({ modalRenameCard: { ...prev.modalRenameCard, error: 'Enter a name!' } }))
        if (name === prevName) return this.setState(prev => ({ modalRenameCard: { ...prev.modalRenameCard, error: 'Name has not changed.' } }))

        putDecks(name, _id, this.props.auth.token)
        .then(({ status, message }) => {

            if (status === 'error') return this.setState(prev => ({ modalRenameCard: { ...prev.modalRenameCard, error: 'error' } }))

            this.setState(prev => ({
                decks: prev.decks.map(item => item._id === _id ? { ...item, name } : item),
                modalRenameCard: { ...prev.modalRenameCard, isOpen: false }
            }));
        })
        .catch(error => console.log({error}));
    }

    deleteDeck(e) {
        e.preventDefault();

        const _id = e.target._id.value;

        deleteDecks(_id, this.props.auth.token)
        .then(({ status, message }) => {

            if (status === 'error') return console.log('error', message.status);

            this.setState(prev => ({
                decks: prev.decks.filter(item => item._id !== _id),
                modalDeleteCard: { isOpen: false }
            }));
        })
        .catch(error => console.log({error}));
    }

    render() {
        return (
            <div>
                <Header subheading='Dashboard' auth={this.props.auth.auth} dispatch={this.props.dispatch} />

                <button className='btn btn-big dashboard-add' onClick={() => this.openModal('modalAddCard')}>Add Deck</button>

                <ul className="dashboard-container">
                {
                    this.state.decks.map((deck, index) => {
                        return (
                            <DashboardItem 
                                key={index} 
                                name={deck.name} 
                                _id={deck._id}
                                openModal={this.openModal}
                            />                
                        );
                    })
                }
                </ul>

                <ModalAddDeck 
                    isOpen={this.state.modalAddCard.isOpen}
                    submit={this.addDeck}
                    close={this.closeModal}
                    error={this.state.modalAddCard.error}
                />

                <ModalDeleteDeck
                    isOpen={this.state.modalDeleteCard.isOpen}
                    submit={this.deleteDeck}
                    close={this.closeModal}
                    _id={this.state.modalDeleteCard._id}
                />

                <ModalRenameDeck
                    isOpen={this.state.modalRenameCard.isOpen}
                    submit={this.renameDeck}
                    close={this.closeModal}
                    error={this.state.modalRenameCard.error}
                    _id={this.state.modalRenameCard._id}
                    name={this.state.modalRenameCard.name}
                />
                
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Dashboard);