import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ModalAddCard, ModalDeleteCard, ModalEditCard } from './Modal';
import { getDecks } from '../requests/decks';
import { getCard, postCard, putCard, deleteCard } from '../requests/cards';

import Loadable from 'react-loadable';

const Header = Loadable({
    loader: () => import('./Header'),
    loading: () => <div>Loading...</div>
});

const EditCard = Loadable({
    loader: () => import('./EditCard'),
    loading: () => <div>Loading...</div>
});

class Edit extends React.Component {
    constructor(props) {
        super(props);

        this.addCard = this.addCard.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
        this.editCard = this.editCard.bind(this);

        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);

        this.state = {
            cards: [],
            modalAddCard: { isOpen: false, error: null },
            modalDeleteCard: { isOpen: false, error: null, _id: null },
            modalEditCard: { isOpen: false, error: null, _id: null },

            deckName: null,
            loaded: false,
            error: null
        };
    }
    
    componentWillMount () {
        Promise.all([getDecks(this.props.id, this.props.auth.token), getCard(this.props.id, this.props.auth.token)])
        .then(response => {
            const [decks, cards] = response;

            if (decks.status === 'error') return this.setState({ error: 'Deck not found' });
            if (cards.status === 'error') return this.setState({ error: 'Deck not found' });

            const name = decks.message.filter(item => item._id == this.props.id)[0].name;

            this.setState({ deckName: name, cards: cards.message, loaded: true })
        
        })
        .catch(error => {
            console.log('cards error', error);
            // this.setState({ undefined: true });
        });
    }

    closeModal(el) {
        this.setState({ [el]: { isOpen: false } });
    }
    openModal(el, props = {}) {
        this.setState({ [el]: { isOpen: true , ...props} });
    }

    addCard(e) {
        e.preventDefault();

        const deckID = this.props.id;
        const front = e.target.front.value;
        const back = e.target.back.value;

        if (!front || !back) return this.setState(prev => ({ modalAddCard: { ...prev.modalAddCard, error: 'Add missing fields!' } }));
    
        postCard(deckID, front, back, this.props.auth.token)
        .then(({ status, message }) => {

            if (status === 'error') return this.setState(prev => ({ modalAddCard: { ...prev.modalAddCard, error: 'unknown error!' } }));

            this.setState(prev => ({
                cards: [ ...prev.cards, { ...message } ],
                modalAddCard: { ...prev.modalAddCard, isOpen: false }
            }));

        })
        .catch(error => console.log({error}));
    }

    editCard(e) {
        e.preventDefault();

        const newFront = e.target.front.value;
        const newBack = e.target.back.value;
        const _id = e.target._id.value;

        if (!newFront || !newBack) return this.setState(prev => ({ modalEditCard: { ...prev.modalEditCard, error: 'Add missing fields!' } }));

        const previous = this.state.cards.filter(item => item._id === _id)[0];

        if (newFront === previous.front && newBack === previous.back) return this.setState(prev => ({ modalEditCard: { ...prev.modalEditCard, error: 'You haven\'t changed any of the fields!' } }));


            putCard(_id, newFront, newBack, this.props.auth.token)
            .then(({ status, message }) => {

                if (status === 'error') return console.log('error', message.status);
                
                console.log('edit card', message)

                this.setState(prev => ({
                    cards: prev.cards.map(item => item._id === _id ? { ...item, front: newFront, back: newBack } : item ),
                    modalEditCard: { ...prev.modalEditCard, isOpen: false, front: newFront, back: newBack }
                }));

            })
            .catch(error => console.log({error}));
    }

    deleteCard(e) {
        e.preventDefault();

        const _id = e.target._id.value;

        console.log('delete card', _id)

        deleteCard(_id, this.props.auth.token)
        .then(({ status, message }) => {

            if (status === 'error') return console.log('error', message.status);
            
            console.log('delete deck', message)

            this.setState(prev => {
                return {
                    cards: prev.cards.filter(item => item._id !== _id),
                    modalDeleteCard: { ...prev.modalDeleteCard, isOpen: false }
                }
            });
 
        })
        .catch(error => console.log({error}));
    }

    render() {
        return (
            <div>
                <Header subheading='Edit' auth={this.props.auth.auth} />

                <div className="edit grey lighten-5">
                {this.state.loaded ? 
                
                    <div className='edit-container'>
                        <div>
                            <h2 className='edit-title'>{this.state.deckName}</h2>
                            <button onClick={() => this.openModal('modalAddCard')} className='waves-effect waves-light btn-large grey edit-btn-main'>Add card</button>
                            <ul className='edit-list'>
                                {
                                    this.state.cards.map((item, index) => {
        
                                        return (
                                            <EditCard 
                                                key={item._id}
                                                front={item.front}
                                                back={item.back}
                                                _id={item._id}
                                                openModal={this.openModal}
                                            />
                                        );
                                    })
                    
                                }
                            </ul>
                        </div>
                    </div>
                :
                    <div className="edit-container">
                        {this.state.error ?
                            <div className='edit-error'>Error! {this.state.error}</div>
                        :
                            <div className="edit-loading">loading...</div>
                        }
                    </div>
                }
                </div>
                
                <ModalAddCard 
                    isOpen={this.state.modalAddCard.isOpen}
                    submit={this.addCard}
                    close={this.closeModal}
                    error={this.state.modalAddCard.error}
                />

                <ModalDeleteCard
                    isOpen={this.state.modalDeleteCard.isOpen}
                    submit={this.deleteCard}
                    close={this.closeModal}
                    error={this.state.modalDeleteCard.error}
                    _id={this.state.modalDeleteCard._id}
                />

                <ModalEditCard 
                    isOpen={this.state.modalEditCard.isOpen}
                    submit={this.editCard}
                    close={this.closeModal}
                    error={this.state.modalEditCard.error}
                    _id={this.state.modalEditCard._id}
                    name={this.state.modalEditCard.name}
                    front={this.state.modalEditCard.front}
                    back={this.state.modalEditCard.back}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({ auth: state });

export default withRouter(connect(mapStateToProps)(Edit));