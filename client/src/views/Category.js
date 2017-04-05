import React from 'react'
import Header from '../components/public/Header'
import Footer from '../components/public/Footer'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as categoryActions from '../actions/category'
import Category from '../components/Category'

class CategoryView extends React.Component {

    render() {
        return (
            <div>
                <Header/>
                <Category {...this.props} /> 
                <Footer/>
            </div>
        )
    }
   
}


const mapStateToProps = (state) => {
    return {category: state.category}
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(categoryActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryView)