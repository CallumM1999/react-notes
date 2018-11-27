import React from 'react';
import DashboardItem from '../components/DashboardItem';
import { connect } from 'react-redux';

import { ModalAddDeck, ModalDelete, ModalRename } from '../components/Modal';

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

        this.updateName = this.updateName.bind(this);

        this.state = {
            decks: [],
            addModal: { isOpen: false, error: null },
            renameModal: { isOpen: false, error: null, _id: null, name: null },
            deleteModal: { isOpen: false, error: null, _id: null }
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

        if (!deckName) return this.setState({ modalError: 'Enter a name!' }); 

        postDecks(deckName, this.props.auth.id, this.props.auth.token)
        .then(({ status, message }) => {

            if (status === 'error') return console.log('error', message.status);

            console.log('deck added', message);

            this.setState(prev => ({
                decks: [ ...prev.decks, { ...message } ],
                addModal: { isOpen: false, error: null }
            }));
        })
        .catch(error => console.log({error}));
    }
    renameDeck(e) {
        e.preventDefault();

        const { name, _id } = this.state.renameModal;


        putDecks(name, _id, this.props.auth.token)
        .then(({ status, message }) => {

            if (status === 'error') return console.log('error', message.status);

            console.log('renaming deck', message)

            this.setState(prev => ({
                decks: prev.decks.map(item => item._id === _id ? { ...item, name } : { item }),
                renameModal: { isOpen: false }
            }));
        })
        .catch(error => console.log({error}));
    }

    updateName(e) {
        this.setState({
            renameModal: { ...this.state.renameModal, name: e.target.value }
        });
    }

    deleteDeck(e) {
        e.preventDefault();

        const _id = e.target._id.value;

        deleteDecks(_id, this.props.auth.token)
        .then(({ status, message }) => {

            if (status === 'error') return console.log('error', message.status);

            console.log('delete deck', message)

            this.setState(prev => ({
                decks: prev.decks.filter(item => item._id !== _id),
                deleteModal: { isOpen: false }
            }));
        })
        .catch(error => console.log({error}));
    }

    render() {
        return (
            <div>
                <Header subheading='Dashboard' auth={this.props.auth.auth} dispatch={this.props.dispatch} />

                <button className='btn btn-big dashboard-add' onClick={() => this.openModal('addModal')}>Add Deck</button>

                <ul className="dashboard-container">
                {
                    this.state.decks.map((deck, index) => {
                        return (
                            <DashboardItem 
                                key={index} 
                                name={deck.name} 
                                _id={deck._id}
                                renameDeck={this.openModal}
                                deleteDeck={this.openModal}
                            />                
                        );
                    })
                }
                </ul>

                <ModalAddDeck 
                    isOpen={this.state.addModal.isOpen}
                    submit={this.addDeck}
                    close={this.closeModal}
                    error={this.state.addModal.error}
                />

                <ModalDelete 
                    isOpen={this.state.deleteModal.isOpen}
                    submit={this.deleteDeck}
                    close={this.closeModal}
                    error={this.state.deleteModal.error}
                    _id={this.state.deleteModal._id}
                />

                <ModalRename 
                    isOpen={this.state.renameModal.isOpen}
                    submit={this.renameDeck}
                    close={this.closeModal}
                    error={this.state.renameModal.error}
                    _id={this.state.renameModal._id}
                    name={this.state.renameModal.name}
                    updateName={this.updateName}
                />
                
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Dashboard);