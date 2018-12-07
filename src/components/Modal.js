import React from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#app');

const ModalCloseButton = props => (
    <div className="modl-close" onClick={ props.onClick } >
        <i className="small material-icons grey-text text-darken-4">close</i>
    </div>
);

const ModalHead = props => (
    <div className="modl-head">
        <h3>{ props.headText }</h3>
    </div>
);

const ModalButton = props => (
    <button 
        type={props.type || "submit"}
        className={'waves-effect waves-light btn-large grey darken-2 ' + props.className}
        onClick={props.onClick}
    >
        { props.buttonText }
    </button>
);

const ModalTextInput = props => (
    <div className="input-field modl-group">
        <input 
            type="text" 
            className='modl-input' 
            id={ props.id } 
            autoFocus={ props.autoFocus }
            name={ props.label }
            

            defaultValue={ props.defaultValue }    
            onFocus={ props.onFocus &&  
                (e => {
                    const val = e.target.value;
                    e.target.value = '';
                    e.target.value = val;
                })
            }
            
        />
        <label htmlFor={ props.id } className={props.active && 'active'}>{ props.label }</label>
    </div>
)

const ModalTemplate = props => (
    <ReactModal
            className='modl white'
            isOpen={props.isOpen}
            contentLabel={props.contentLabel}
            onRequestClose={props.close}
        >
            <ModalCloseButton onClick={props.close}/>

            <ModalHead headText={props.title}/>

            <form className='modl-form' onSubmit={props.submit}>

                <div className="modl-content">
                    <props.modalContent />
                </div>

                <div className="modl-choice">
                    <props.modalChoice />
                </div>

            </form>

        </ReactModal>
);

export const ModalAddDeck = props => (
    <ModalTemplate 
        isOpen={props.isOpen}
        contentLabel='Add new deck'
        close={() => props.close('modalAddDeck')}
        title='Add Deck'
        submit={props.submit}

        modalContent={() => (
            <div>
                <ModalTextInput 
                    id='inputName'
                    label='name'
                    autoFocus={true}
                />

                <div className="modl-group">
                    {props.error && <p className='form-error'>{props.error}</p>}
                </div>
            </div>
        )}

        modalChoice={() => (
            <ModalButton buttonText='Add' />
        )}
    />
)

export const ModalDeleteDeck = props => (
    <ModalTemplate 
        isOpen={props.isOpen}
        contentLabel='Are you sure that you want to delete this deck?'
        close={() => props.close('modalDeleteDeck')}
        title='Delete Deck'
        submit={props.submit}

        modalContent={() => (
            <div>
                <div className="modl-group">
                    <h4 className='modl-subheading'>Are you sure?</h4>
                </div>
                <input type="hidden" name="_id" value={props._id || false} />
            </div>
        )}

        modalChoice={() => (
            <div>
                <ModalButton buttonText='yes'/>
                <ModalButton buttonText='no' type='button' onClick={() => props.close('modalDeleteDeck')}/>
            </div>
        )}
    />
);

export const ModalRenameDeck = props => (
    <ModalTemplate 
        isOpen={props.isOpen}
        contentLabel='Rename deck'
        close={() => props.close('modalRenameDeck')}
        title='Rename Deck'
        submit={props.submit}

        modalContent={() => (
            <div>
                <ModalTextInput 
                    id='inputName'
                    label='name'
                    defaultValue={ props.name }
                    autoFocus={true}
                    onFocus={true}
                />

                <div className="modl-group">
                    {props.error && <p className='form-error'>{props.error || false}</p>}
                </div>
            </div>
            
        )}

        modalChoice={() => (
            <ModalButton buttonText='Rename'/>
        )}
    />
)


export const ModalAddCard = props => {
    console.log('add props', props)
    return (
    <ModalTemplate 
        isOpen={props.isOpen}
        contentLabel='Add Card'
        close={() => props.close('modalAddCard')}
        title='Add Card'
        submit={props.submit}

        modalContent={() => (
            <div>
                <ModalTextInput 
                    id='inputFront'
                    label='front'
                    autoFocus={true}
                />

                <ModalTextInput 
                    id='inputBack'
                    label='back'
                />

                <div className="modl-group">
                    {props.error && <p className='form-error'>{props.error}</p>}
                </div>
            </div>
        )}

        modalChoice={() => (
            <ModalButton buttonText='Add'/>
        )}
    />

)}


export const ModalDeleteCard = props => (

    <ModalTemplate 
        isOpen={props.isOpen}
        contentLabel='Are you sure that you want to delete this card?'
        close={() => props.close('modalDeleteCard')}
        title='Delete Card'
        submit={props.submit}

        modalContent={() => (
            <div>
                <div className="modl-group">
                    <h4 className='modl-subheading'>Are you sure?</h4>
                </div>
                
                <input type="hidden" name="_id" value={props._id || false} />
            </div>
        )}

        modalChoice={() => (
            <div>
                <ModalButton buttonText='yes' />
                <ModalButton buttonText='no' type='button' onClick={() => props.close('modalDeleteCard')} />
            </div>
        )}
    />

);

export const ModalEditCard = props => (
    <ModalTemplate 
        isOpen={props.isOpen}
        contentLabel='Edit card'
        close={() => props.close('modalEditCard')}
        title='Edit Card'
        submit={props.submit}

        modalContent={() => (
            <div>

                <ModalTextInput 
                    id='inputFront'
                    label='front'
                    defaultValue={props.front}
                    autoFocus={true}
                    onFocus={true}
                />

                <ModalTextInput 
                    id='inputBack'
                    label='back'
                    defaultValue={props.back}
                    active={true}
                />

                <input type="hidden" name="_id" value={props._id || false}/>

                <div className="modl-group">
                    {props.error && <p className='form-error'>{props.error}</p>}
                </div>
            </div>
        )}

        modalChoice={() => (
            <ModalButton buttonText='Edit' />
        )}
    />
)


