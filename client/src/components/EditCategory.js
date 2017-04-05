import React from 'react'
import { FieldGroup, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import Upload from './Upload'



export default class EditCategory extends React.Component {

    constructor(props) {
        super(props)
        this.save = this.save.bind(this)
        this.state = Object.assign({
            vsName: null  //name的验证
        }, this.props.data)

    }

    render() {
        let titleControl = this.state && this.state.type == 'add' ? <FormControl
            type="text"
            value={this.state.name}
            placeholder="请输入分类标题"
            onChange={(ev) => this.setState({
                name: ev.target.value
            })}
        /> : <p>{this.state.name}</p>
        return (
            <div onKeyDown={ev => ev.keyCode === 13 && this.save()}>
                <from>
                    <FormGroup id="formControlsText" controlId="formValidationName" validationState={this.state.vsName}>
                        <ControlLabel>分类标题</ControlLabel>
                        {titleControl}
                    </FormGroup>
                    <FormGroup controlId="formControlsTextarea">
                        <ControlLabel>分类描述</ControlLabel>
                        <FormControl
                            onChange={(ev) => { this.setState({ description: ev.target.value }) }}
                            value={this.state.description} componentClass="textarea" placeholder="请输入分类描述" />
                    </FormGroup>
                </from>                
                <p style={{ textAlign: 'center' }}>
                    <Button onClick={this.save}>保  存</Button>
                </p>
            </div>
        )
    }

    save() {
        let { update, add } = this.props.actions,
            category = {
                name: this.state.name ? this.state.name.trim() : null,
                description: this.state.description
            }
        if (this.props.data) {
            if (this.props.data.type == 'add') {
                //检查name不为空
                if (!category.name) {
                    this.setState({
                        vsName: 'error'
                    })
                    return
                }
                add(category)
            } else {
                update(category)
            }
        }
        if (this.props.close) {
            this.props.close()
        }
    }

}