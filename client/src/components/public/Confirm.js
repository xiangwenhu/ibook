import React from 'react'
import { Modal, Button } from 'react-bootstrap'

//事件 onClose , onConfirm
//属性 title,show,content

const Confirm = ({ title = '温馨提示', show = false, content, onClose, onConfirm }, ...props) => {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {content}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onConfirm}>Confirm</Button>
                <Button onClick={onClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

Confirm.propTypes = {
    title: React.PropTypes.string,
    show: React.PropTypes.bool,  
    onClose: React.PropTypes.func,
    onConfirm: React.PropTypes.func
}

export default Confirm