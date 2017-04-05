import React from 'react'
import Header from '../components/public/Header'
import Footer from '../components/public/Footer'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addCategory } from '../actions/category'

export default class App extends React.Component {

    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    <div className="jumbotron">
                        <h1>IBook 轻量级电子书。</h1>
                        <p>功能：</p>
                        <ul>
                            <li>电子书分类</li>
                            <li>电子书在线阅读</li>
                            <li>导出配置和电子书</li>
                            <li>阅读统计</li>
                        </ul>
                        <p>技术点：</p>
                        <ul>
                            <li>nodejs7 + koa2</li>
                            <li>React + Redux + React-Bootstrap</li>
                            <li>ES6 + Fetch</li>
                            <li>pdfjs</li>
                            <li>HTML5 File System</li>
                            <li>Azure Storage</li>
                        </ul>
                        <p>兼容性：</p>
                        <ul>
                            <li>chrome 55以上</li>
                        </ul>
                       
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
