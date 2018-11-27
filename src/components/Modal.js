import React from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#app');

export const ModalAddDeck = props => (
    <ReactModal
        className='modal'
        isOpen={props.isOpen}
        contentLabel='Add new deck'
        onRequestClose={() => props.close('addModal')}
    >
        <form onSubmit={props.submit}>
            <h3 className='modal-heading' >Add Deck</h3>

            <div className="modal-group">
                <input type="text" name="name" className='modal-input' autoFocus/>
            </div>

            <div className="modal-group">
                {props.modalError && <p className='form-error'>{props.error}</p>}
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
);
// <button type='button' onClick={() => props.close('addModal')}>Close</button>


export const ModalDelete = props => (
    <ReactModal
        className='modal'
        isOpen={props.isOpen}
        contentLabel='Are you sure you want to delete this deck>'
        onRequestClose={() => props.close('deleteModal')}
    >
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
                    onClick={() => props.close('deleteModal')}
                >
                    No
                </button>
            </div>
            <input type="hidden" name="_id" value={props._id} />
        </form>
    </ReactModal>
);

export const ModalRename = props => {

    return (
        <ReactModal
            className='modal'
            isOpen={props.isOpen}
            contentLabel='Rename deck'
            onRequestClose={() => props.close('renameModal')}
        >
            <form onSubmit={props.submit}>
                <h3 className='modal-heading' >Rename</h3>
    
                <div className="modal-group">
                    <input 
                        type="text" 
                        name="name"
                        value={props.name} 
                        onChange={props.updateName}
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
                    {props.modalError && <p className='form-error'>{props.error}</p>}
                </div>

                <div className="modal-choice">
                    <button className='btn btn-medium btn-modal' type="submit">Add</button>
                </div>
            </form>
        </ReactModal>
    )
};
// <button type='button' onClick={() => props.close('renameModal')}>Close</button>




export const ModalAddCard = props => {

    return (
        <ReactModal
            className='modal'
            isOpen={props.isOpen}
            contentLabel='Rename deck'
            onRequestClose={() => props.close('modalAddCard')}
        >
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
                    {props.modalError && <p className='form-error'>{props.error}</p>}
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
            <input type="hidden" name="_id" value={props._id} />
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

                    <input type="hidden" name="_id" value={this.props._id}/>
    
                    <div className="modal-group">
                        {this.props.modalError && <p className='form-error'>{this.props.error}</p>}
                    </div>
    
                    <div className="modal-choice">
                        <button className='btn btn-medium btn-modal' type="submit">Edit</button>
                    </div>
                </form>
            </ReactModal>
        )
    }
}