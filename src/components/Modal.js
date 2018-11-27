import React from 'react';
import ReactModal from 'react-modal';

export const ModalAddDeck = props => (
    <ReactModal
        className='modal'
        isOpen={props.isOpen}
        contentLabel='Add new deck'
    >
        <form onSubmit={props.submit}>
            <h3>Add Deck</h3>

            <input type="text" name="name" id=""/>

            {props.modalError && <p className='form-error'>{props.error}</p>}

            <button type="submit">Add</button>
            <button type='button' onClick={() => props.close('addModal')}>Close</button>
        </form>
    </ReactModal>
);

export const ModalDelete = props => (
    <ReactModal
        className='modal'
        isOpen={props.isOpen}
        contentLabel='Are you sure you want to delete this deck>'
    >
        <form onSubmit={props.submit}>
            <h3>Are you sure you want to delete : {props.selected}</h3>

            <button type="submit" name='yes'>Yes</button>
            <button type='button' onClick={() => props.close('deleteModal')}>Close</button>
            
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
        >
            <form onSubmit={props.submit}>
                <h3>Rename {props.name}</h3>
    
                <input type="text" name="name" id="" value={props.name} onChange={props.updateName}/>
    
                {props.modalError && <p className='form-error'>{props.error}</p>}
    
                <button type="submit">Add</button>
                <button type='button' onClick={() => props.close('renameModal')}>Close</button>
            </form>
        </ReactModal>
    )
};