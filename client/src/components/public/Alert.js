import React from 'react'
import { Modal, Button } from 'react-bootstrap'

//事件 onClose 
//属性 title,show,content
export default class Alert extends React.Component {
    constructor(props) {
        super(props)
        this.close = this.close.bind(this)       
    }

    close() {
        if (this.props.onClose) {
            this.props.onClose()
        }
    }
    render(){
        return (
            <Modal show={this.props.show} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.content}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
