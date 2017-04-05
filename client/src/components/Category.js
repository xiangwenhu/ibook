import React from 'react'
import { Table, Button, ControlLabel } from 'react-bootstrap'
import Dialog from './public/Dialog'
import EditCategory from './EditCategory'
import Confirm from './public/Confirm'

export default class Category extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dialogOptions: {
                title: '修改分类',
                show: false,
                content: null,
                actions: null,
                data: null
            }
        }
        this.onDialogClose = this.onDialogClose.bind(this)
        this.onAddCategory = this.onAddCategory.bind(this)
    }

    render() {
        let { category: categories } = this.props,
            arr = []
        categories.map((cate, i) => {
            arr.push(
                <tr key={i}>
                    <th>{i + 1}</th>
                    <th>{cate.name}</th>
                    <th>{cate.description || ''}</th>
                    <th>
                        <Button onClick={this.onEditCategory.bind(this, i)}>编辑</Button>
                        <Button onClick={this.onDelete.bind(this, i)}>删除</Button>
                    </th>
                </tr>
            )
        })

        return (
            <div className="container">
                <p>
                    <Button onClick={this.onAddCategory}>新增分类</Button><ControlLabel>您已创建{this.props.category.length}个分类</ControlLabel>
                </p>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>标题</th>
                            <th>描述</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arr}
                    </tbody>
                </Table>
                <Dialog {...this.state.dialogOptions} />
                <Confirm {...this.state.confirmOptions} />
            </div>
        )
    }

    componentWillMount() {
        this.props.actions.getAll()
    }

    onDialogClose() {
        this.setState({
            dialogOptions: {
                show: false
            },
            confirmOptions: {
                show: false
            }
        })
    }

    onEditCategory(index) {
        this.setState({
            dialogOptions: {
                title: '修改分类',
                show: true,
                content: EditCategory,
                data: this.props.category[index],
                actions: this.props.actions,
                onClose: this.onDialogClose
            }
        })
    }

    onAddCategory() {
        this.setState({
            dialogOptions: {
                title: '新增分类',
                show: true,
                content: EditCategory,
                data: {
                    type: 'add'
                },
                actions: this.props.actions,
                onClose: this.onDialogClose
            }
        })
    }

    onDelete(index) {
        this.setState({
            confirmOptions: {
                show: true,
                content: <div>确认删除分类么？</div>,
                onClose: this.onDialogClose,
                onConfirm: this.onConfirm.bind(this, index)
            }
        })
    }

    onConfirm(index) {
          this.props.actions.deleteItem(this.props.category[index].name)
          this.onDialogClose()
    }
}