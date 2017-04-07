import React from 'react'
import { FieldGroup, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'



export default class EditBook extends React.Component {

    constructor(props) {
        super(props)
        this.save = this.save.bind(this)
        this.state = Object.assign({
            vsName: null,  //name的验证
            book: {}
        }, this.props.data)

    }

    render() {
        let { category: categories, book } = this.state,
            titleControl = this.state && this.state.type == 'add' ? <FormControl
                type="text"
                defaulValue={book.name || ''}
                placeholder="请输入电子书名"
                onChange={(ev) => {
                    let b = this.state.book
                    b.name = ev.target.value
                    this.setState({
                        book: b
                    })
                }}
            /> : <p>{book.name}</p>,
            categoriesControl = categories.map((c, i) => {
                return <option onClick={ev => {
                    ev.stopPropagation()                   
                    let cv = ev.target.value,
                        b = this.state.book,
                        cates = b.categories || [],
                        index = cates.findIndex(v => v == cv)
                    index >= 0 ? cates.splice(index, 1) : cates.push(cv)
                    b.categories = cates
                    this.setState({
                        book: b
                    })
                    ev.preventDefault()
                }} value={c.name} key={i}>{c.name}</option>
            })

        return (
            <div onKeyDown={ev => ev.keyCode === 13 && this.save()}>
                <from>
                    <FormGroup id="formControlsText" controlId="formValidationName" validationState={this.state.vsName}>
                        <ControlLabel>电子书名</ControlLabel>
                        {titleControl}
                    </FormGroup>
                    <FormGroup controlId="formControlsSelectMultiple">
                        <ControlLabel>分类</ControlLabel>
                        <FormControl componentClass="select" multiple value={book.categories}>>
                            {categoriesControl}
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId="formControlsTextarea">
                        <ControlLabel>描述</ControlLabel>
                        <FormControl
                            onChange={(ev) => {
                                let b = this.state.book
                                b.description = ev.target.value
                                this.setState({
                                    book: b
                                })
                            }}
                            value={this.state.book.description} componentClass="textarea" placeholder="请输入描述" />
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
                name: this.state.book.name ? this.state.book.name.trim() : null,
                categories:this.state.book.categories || [],
                description: this.state.book.description
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