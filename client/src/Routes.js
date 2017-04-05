import React from 'react'
import { Router, Route, IndexRoute,hashHistory } from 'react-router'
import BaseLayout from './components/layouts/BaseLayout'
import Home from './views/Home'
import About from './views/About'
import Category from './views/Category'
import Book from './views/Book'

export default () => (    
  <Router history={hashHistory}>    
      <Route path="/" component={Home}  onEnter={scrollToTop}/>  
      <Route path="/category" component={Category} onEnter={scrollToTop}/>
      <Route path="/book" component={Book} onEnter={scrollToTop}/>
      <Route path="/about" component={About} onEnter={scrollToTop}/>  
  </Router>
)
  
function scrollToTop() {
  window.scrollTo(0, 0)
}