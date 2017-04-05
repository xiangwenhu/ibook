import React from 'react'
import Header from '../components/public/Header'
import Footer from '../components/public/Footer'

export default () => {
    return (
        <div>
            <Header />
            <div className='container'>
                <div className="jumbotron">
                    <h1>云（Shawn)</h1>
                    <p>追逐云的颜色，风的飘逸，确一直疲惫，回头一看，开心就好。</p>
                    <p>无欲有求的等待。。。。。。</p>
                    <p>Github:<a href="https://github.com/xiangwenhu" target="_bank">https://github.com/xiangwenhu</a></p>
                    <p>Blog::<a href="http://www.cnblogs.com/cloud-/" target="_bank">http://www.cnblogs.com/cloud-/</a></p>
                    <p>
                        email:xiangwenhu@hotmail.com
                        </p>
                    <p>QQ:429124393</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}