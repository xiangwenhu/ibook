import React from 'react'
import { Grid, Row, Col, Button, ControlLabel, Pagination } from 'react-bootstrap'
import BookItem from './BookItem'
import EditBook from './EditBook'
import Dialog from '../public/Dialog'
import Upload from '../Upload'
import { getBaseUrl } from '../../utils/apiProxy'
import Confirm from '../public/Confirm'
import storageConfig from '../../config/storageConfig'
import Seach from '../Search'


export default class BookIndex extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pagination: {
                activePage: 1,
            },
            pageSize: 5,
            pagedBooks: []
        }
        this.onAddBook = this.onAddBook.bind(this)
        this.onDialogClose = this.onDialogClose.bind(this)
        this.onRead = this.onRead.bind(this)
        this.onPage = this.onPage.bind(this)
    }

    render() {
        let arr = []
        this.state.pagedBooks.map((b, index) => {
            arr.push(
                <BookItem item={b} key={index}
                    onUploaded={this.onUploaded.bind(this)} onRead={this.onRead}
                    onDelete={this.onDeleteBook.bind(this, b.name)} onEdit={this.onEditBook.bind(this, index)} />
            )
        })

        return (
            <div style={{position:'relative'}}>

                <Seach search={this.props.bookActions.search.bind(this)} />

                <Button bsStyle="primary" style={{ position: 'absolute', right: 0,top:0 }} onClick={this.onAddBook}>添加电子书</Button>

                <Pagination   onSelect={this.onPage}  {...this.state.pagination} maxButtons={10} ellipsis={true} first={true} last={true} />
                {arr}
                <Pagination   onSelect={this.onPage}  {...this.state.pagination} maxButtons={10} ellipsis={true} first={true} last={true} />
                <Dialog {...this.state.dialogOptions} />
                <Confirm {...this.state.confirmOptions} />

            </div>
        )
    }

    componentWillReceiveProps(nextProps) {
        let books = nextProps.book
        this.setState({
            pagedBooks: books.slice(0, this.state.pageSize),
            pagination: {
                activePage: 1,
                items: Math.ceil( books.length/this.state.pageSize)
            }
        })
    }

    componentWillMount() {
        this.props.bookActions.getAll()
        this.props.categoryActions.getAll()
    }

    onAddBook() {
        this.setState({
            dialogOptions: {
                title: '新增电子书',
                show: true,
                content: EditBook,
                data: {
                    type: 'add',
                    category: this.props.category
                },
                actions: this.props.bookActions,
                onClose: this.onDialogClose
            }
        })
    }

    onEditBook(index) {
        this.setState({
            dialogOptions: {
                title: '编辑电子书',
                show: true,
                content: EditBook,
                data: {
                    category: this.props.category,
                    book: this.props.book[index]
                },
                actions: this.props.bookActions,
                onClose: this.onDialogClose
            }
        })
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



    onUploaded(data) {
        this.props.bookActions.update(data)
    }

    onRead(url) {
        if (url) {
            let dir = storageConfig.Directory ? storageConfig.Directory : '',
                targetUrl = '/viewer.html?file=' + encodeURIComponent(`https://${storageConfig.StorageAccount}.file.core.windows.net/${storageConfig.FileShare}${dir}/${url}?${storageConfig.SASToken}`)
            window.open(targetUrl)
        }
    }

    onDeleteBook(name) {
        this.setState({
            confirmOptions: {
                show: true,
                content: <div>确认删除电子书 {name}？</div>,
                onClose: this.onDialogClose,
                onConfirm: this.onConfirmDeleteBook.bind(this, name)
            }
        })
    }

    onConfirmDeleteBook(name) {
        this.props.bookActions.deleteItem(name)
        this.onDialogClose()
    }

    onPage(activePage) {
        let books = this.props.book
        this.setState({
             pagination: {
                activePage: activePage,
                items: Math.ceil( books.length/this.state.pageSize)
            },
            pagedBooks:books.slice(this.state.pageSize * (activePage-1) , this.state.pageSize * activePage)
        })
    }

}