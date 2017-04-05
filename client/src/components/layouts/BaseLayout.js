import React from 'react'
import Header from '../public/Header'
import Footer from '../public/Footer'

export default  (component,store) => {
    return (store)=> (
        <div>
            <Header />
            <div className="container">
               {component(store)}
            </div>
            <Footer />
        </div>)
}