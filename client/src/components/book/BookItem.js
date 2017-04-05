import React from 'react'
import { Grid, Row, Col, Button, Thumbnail } from 'react-bootstrap'
import Upload from '../Upload'

export default ({ item, onDelete, onEdit, onUploaded, onRead }) => {


    return (
        <Grid>
            <Row style={{ borderTop: 'solid 1px silver' }}>
                <Col xs={3} md={3}>
                    <Thumbnail src={item.cover || 'img/cover.jpg'} alt={item.name} onClick={ev => { ev.stopPropagation(); onRead(item.url) }}>
                    </Thumbnail>
                </Col>
                <Col xs={7} md={7} style={{ height: '186px' }}>
                    <p>&nbsp;</p>
                    <p><a style={{ fontSize: '18px', fontWeight: 600 }} className='btn-link' onClick={ev => { ev.stopPropagation(); onRead(item.url) }}>书名：{item.name}</a></p>
                    <p>分类：{item.categories ? item.categories.join(',') : ''}</p>
                    <p>描述：{item.description}</p>
                    <p>文件名：{item.url}</p>
                </Col>
                <Col xs={2} md={2}>
                    <p>
                        <Button onClick={ev => { ev.stopPropagation(); onEdit() }} >编辑</Button>
                        <Button onClick={ev => { ev.stopPropagation(); onDelete() }}>删除</Button>
                    </p>
                    {item.url ? null : <Upload onUploaded={data => {
                        onUploaded(Object.assign(item, {
                            url: data.url
                        }))
                    }} />}
                </Col>
            </Row>
        </Grid>
    )
}