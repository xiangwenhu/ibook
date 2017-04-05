import React from 'react'
import Header from '../components/public/Header'
import Footer from '../components/public/Footer'
import Book from '../components/book'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as bookActions from '../actions/book'
import * as categoryActions from '../actions/category'


class BookView extends React.Component {

    render() {
        return (
            <div>
                <Header />
                <div className='container'>
                    <Book {...this.props}/>
                </div>
                <Footer />
            </div>
        )
    }
}

//返回 book 和 category
const mapStateToProps = (state) => {
    return state
}

const mapDispatchToProps = (dispatch) => {
    return {
        bookActions: bindActionCreators(bookActions, dispatch),
        categoryActions: bindActionCreators(categoryActions,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookView)