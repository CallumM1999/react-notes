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
            modalAddDeck: { isOpen: false, error: null },
            modalRenameDeck: { isOpen: false, error: null, _id: null, name: null },
            modalDeleteDeck: { isOpen: false, error: null, _id: null },
            loaded: false
        };
    }
    
    componentWillMount() {
        getDecks(this.props.auth.id, this.props.auth.token)
        .then(({ status, message }) => {
            if (status === 'error') return console.log('error', message.status);
            console.log('get decks', message)
            this.setState({ decks: message, loaded: true });            
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

        if (!deckName) return this.setState(prev => ({ modalAddDeck: { ...prev.modalAddDeck, error: 'Enter a name!' } }))

        postDecks(deckName, this.props.auth.id, this.props.auth.token)
        .then(({ status, message }) => {

            if (status === 'error') return this.setState(prev => ({ modalAddDeck: { ...prev.modalAddDeck, error: 'unknown error' } }))

            this.setState(prev => ({
                decks: [ ...prev.decks, { ...message } ],
                modalAddDeck: { isOpen: false, error: null }
            }));
        })
        .catch(error => console.log({error}));
    }
    renameDeck(e) {
        e.preventDefault();

        const { _id } = this.state.modalRenameDeck;
        const name = e.target.name.value;

        const prevName = this.state.decks.filter(item => item._id === _id)[0].name;

        if (!name) return this.setState(prev => ({ modalRenameDeck: { ...prev.modalRenameDeck, error: 'Enter a name!' } }))
        if (name === prevName) return this.setState(prev => ({ modalRenameDeck: { ...prev.modalRenameDeck, error: 'Name has not changed.' } }))

        putDecks(name, _id, this.props.auth.token)
        .then(({ status, message }) => {

            if (status === 'error') return this.setState(prev => ({ modalRenameDeck: { ...prev.modalRenameDeck, error: 'error' } }))

            this.setState(prev => ({
                decks: prev.decks.map(item => item._id === _id ? { ...item, name } : item),
                modalRenameDeck: { ...prev.modalRenameDeck, isOpen: false }
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
                modalDeleteDeck: { isOpen: false }
            }));
        })
        .catch(error => console.log({error}));
    }

    render() {
        return (
            <div>
                <Header subheading='Dashboard' auth={this.props.auth.auth} />
                <div className="dashboard">
                    <button className='waves-effect waves-light btn-large grey dashboard-btn-main' onClick={() => this.openModal('modalAddDeck')} >Add Deck</button>

                    {this.state.loaded ? 
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
                    : 
                        <div className="dashboard-container">
                            <p className='dashboard-loading'>loading...</p>
                        </div>
                    }
                </div>

                <ModalAddDeck 
                    isOpen={this.state.modalAddDeck.isOpen}
                    submit={this.addDeck}
                    close={this.closeModal}
                    error={this.state.modalAddDeck.error}
                />

                <ModalDeleteDeck
                    isOpen={this.state.modalDeleteDeck.isOpen}
                    submit={this.deleteDeck}
                    close={this.closeModal}
                    _id={this.state.modalDeleteDeck._id}
                />

                <ModalRenameDeck
                    isOpen={this.state.modalRenameDeck.isOpen}
                    submit={this.renameDeck}
                    close={this.closeModal}
                    error={this.state.modalRenameDeck.error}
                    _id={this.state.modalRenameDeck._id}
                    name={this.state.modalRenameDeck.name}
                />
                
            </div>
        );
    }
}

const mapStateToProps = (state) => ({ auth: state });

export default connect(mapStateToProps)(Dashboard);