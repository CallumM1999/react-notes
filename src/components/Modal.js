import React from 'react';
import ReactModal from 'react-modal';

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