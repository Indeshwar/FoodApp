import {Fragment} from 'react'
import ReactDom from 'react-dom'
import classes from './Modal.module.css'

const Backdrop = props =>{
    return <div className={classes.backdrop} onClick={props.onClose}/>
}

const ModalOverlay = props =>{
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div> 
}

const ModalId = document.getElementById("overlays");
const Modal = (props) => {
    return (
        <Fragment>
            {ReactDom.createPortal(<Backdrop onClose = {props.onClose}/>, ModalId)}
            {ReactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, ModalId)}
        </Fragment>
    )
}

export default Modal
