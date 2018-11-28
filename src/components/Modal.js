import React from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#app');

export const ModalAddDeck = props => {
    return (
        <ReactModal
            className='modal'
            isOpen={props.isOpen}
            contentLabel='Add new deck'
            onRequestClose={() => props.close('modalAddDeck')}
        >
            <div className="modal-close" onClick={() => props.close('modalAddDeck')}>x</div>
            <form onSubmit={props.submit}>
                <h3 className='modal-heading' >Add Deck</h3>
    
                <div className="modal-group">
                    <input type="text" name="name" className='modal-input' autoFocus/>
                </div>
    
                <div className="modal-group">
                    {props.error && <p className='form-error'>{props.error}</p>}
                </div>
    
                <div className="modal-choice">
                    <button 
                        type="submit"
                        className='btn btn-medium btn-modal'
                    >
                        Add
                    </button>
                </div>
    
            </form>
        </ReactModal>
    )
};

export const ModalDeleteDeck = props => (
    <ReactModal
        className='modal'
        isOpen={props.isOpen}
        contentLabel='Are you sure you want to delete this deck>'
        onRequestClose={() => props.close('modalDeleteDeck')}
    >
        <div className="modal-close" onClick={() => props.close('modalDeleteDeck')}>x</div>
        <form onSubmit={props.submit}>
            <h3 className='modal-heading' >Delete Deck</h3>
            <h4 className='modal-subheading'>Are you sure?</h4>

            <div className="modal-choice">
                <button 
                    className='btn btn-medium btn-modal'
                    type="submit" 
                    name='yes'
                >
                    Yes
                </button>
                <button 
                    className='btn btn-medium btn-modal'
                    type='button' 
                    onClick={() => props.close('modalDeleteDeck')}
                >
                    No
                </button>
            </div>
            <input type="hidden" name="_id" value={props._id || false} />
        </form>
    </ReactModal>
);

export class ModalRenameDeck extends React.Component {
    constructor(props) {
        super(props);

        this.inputChange = this.inputChange.bind(this);

        this.state = {
            name: ''
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.isOpen && !prevProps.isOpen) {
            // console.log('load stuff');

            this.setState({
                name: this.props.name
            });
        }
    }

    inputChange(e) {
        // console.log('change', e.target.name, e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        });  
    }

    render() {
        return (
            <ReactModal
                className='modal'
                isOpen={this.props.isOpen}
                contentLabel='Rename deck'
                onRequestClose={() => this.props.close('modalRenameDeck')}
            >
                <div className="modal-close" onClick={() => this.props.close('modalRenameDeck')}>x</div>
                <form onSubmit={this.props.submit}>
                    <h3 className='modal-heading' >Rename</h3>
        
                    <div className="modal-group">
                        <input 
                            type="text" 
                            name="name"
                            value={this.state.name} 
                            onChange={this.inputChange}
                            className='modal-input'
                            autoFocus
                            onFocus={
                                e => {
                                    const val = e.target.value;
                                    e.target.value = '';
                                    e.target.value = val;
                                }
                            }
                        />
                    </div>
    
                    <div className="modal-group">
                        {this.props.error && <p className='form-error'>{this.props.error || false}</p>}
                    </div>
    
                    <div className="modal-choice">
                        <button className='btn btn-medium btn-modal' type="submit">Add</button>
                    </div>
                </form>
            </ReactModal>
        )
    }
}


export const ModalAddCard = props => {

    return (
        <ReactModal
            className='modal'
            isOpen={props.isOpen}
            contentLabel='Rename deck'
            onRequestClose={() => props.close('modalAddCard')}
        >

            <div className="modal-close" onClick={() => props.close('modalAddCard')}>x</div>
            <form onSubmit={props.submit}>
                <h3 className='modal-heading' >Add Card</h3>
    
                <div className="modal-group">
                    <label className='modal-label' htmlFor="front">Front</label>
                    <input
                        id='someid'
                        name='front'
                        className='modal-input'  
                        autoFocus
                    />

                    <label className='modal-label' htmlFor="back">Back</label>
                    <input 
                        name='back'
                        className='modal-input'
                    />   
                </div>

           

                <div className="modal-group">
                    {props.error && <p className='form-error'>{props.error}</p>}
                </div>

                <div className="modal-choice">
                    <button className='btn btn-medium btn-modal' type="submit">Add</button>
                </div>
            </form>
        </ReactModal>
    )
};

export const ModalDeleteCard = props => (
    <ReactModal
        className='modal'
        isOpen={props.isOpen}
        contentLabel='Are you sure you want to delete this card?'
        onRequestClose={() => props.close('modalDeleteCard')}
    >
        <div className="modal-close" onClick={() => props.close('modalDeleteCard')}>x</div>
        <form onSubmit={props.submit}>
            <h3 className='modal-heading' >Delete Card</h3>
            <h4 className='modal-subheading'>Are you sure?</h4>

            <div className="modal-choice">
                <button 
                    className='btn btn-medium btn-modal'
                    type="submit" 
                    name='yes'
                >
                    Yes
                </button>
                <button 
                    className='btn btn-medium btn-modal'
                    type='button' 
                    onClick={() => props.close('modalDeleteCard')}
                >
                    No
                </button>
            </div>
            <input type="hidden" name="_id" value={props._id || false} />
        </form>
    </ReactModal>
);


export class ModalEditCard extends React.Component {
    constructor(props) {
        super(props);

        this.inputChange = this.inputChange.bind(this);

        this.state = {
            front: '',
            back: ''
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.isOpen && !prevProps.isOpen) {
            console.log('load stuff');

            this.setState({
                front: this.props.front,
                back: this.props.back
            });
        }
    }

    inputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });  
    }

    render() {
        return (
            <ReactModal
                className='modal'
                isOpen={this.props.isOpen}
                contentLabel='Rename deck'
                onRequestClose={() => this.props.close('modalEditCard')}
            >
                <div className="modal-close" onClick={() => props.close('modalEditCard')}>x</div>
                <form onSubmit={this.props.submit}>
                    <h3 className='modal-heading' >Edit Card</h3>

                    <div className="modal-group">
                        <label htmlFor="front" className="modal-label">Front</label>
                        <input
                            type="text"
                            name="front"
                            className='modal-input'
                            value={this.state.front}
                            onChange={this.inputChange}
                            autoFocus
                            onFocus={
                                e => {
                                    const val = e.target.value;
                                    e.target.value = '';
                                    e.target.value = val;
                                }
                            }
                        />
        
                        <label htmlFor="back" className="modal-label">Back</label>
                        <input
                            type="text"
                            name="back"
                            className='modal-input'
                            value={this.state.back}
                            onChange={this.inputChange}
                        />
                    </div>

                    <input type="hidden" name="_id" value={this.props._id || false}/>
    
                    <div className="modal-group">
                        {this.props.error && <p className='form-error'>{this.props.error}</p>}
                    </div>
    
                    <div className="modal-choice">
                        <button className='btn btn-medium btn-modal' type="submit">Edit</button>
                    </div>
                </form>
            </ReactModal>
        )
    }
}