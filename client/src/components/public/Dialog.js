import React from 'react'
import {Modal,Button} from 'react-bootstrap'

//事件 onClose 
//属性 title,show,data,actions,component,footer
export default class Dialog extends React.Component {
    constructor(props) {
        super(props)   
        this.close = this.close.bind(this)            
    }

    close() {      
        if(this.props.onClose){
            this.props.onClose()
        }
    }

    render() {
        let Com = this.props.content,
            body = Com ? <Com data = {this.props.data} actions = {this.props.actions}  close = {this.close} /> : null
        return (
            <Modal show={this.props.show} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>                    
                  {body}
                </Modal.Body>
                <Modal.Footer>
                   {this.props.footer? <Button onClick={this.close}>Close</Button> : null}                   
                </Modal.Footer>
            </Modal>
        )
    }
}
