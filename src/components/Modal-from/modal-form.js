import '../../index.css'
import React, { useState } from 'react'
import AddForm from "./add-form";

const Modal = props => {
    const [ modal, setModal ] = useState ({
        modal: true,
    })

    return (
        <div className={ `modal__wrapper ${ props.isOpened ? 'open' : 'close' }` } style={ { ...props.style } }>
            <div className='modal__body'>
                <div className='modal_close' onClick={ props.onModalClose }>x</div>
                <h2>{ props.title }</h2>
                <AddForm />
                <hr/>
            </div>
        </div>
    )
}

export default Modal