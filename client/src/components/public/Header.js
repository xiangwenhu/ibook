import React from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import api,{getBaseUrl} from '../../utils/apiProxy'
import Alert from './Alert'

export default class Header extends React.Component {

  constructor(props) {
    super(props)
    this.state = {     
        alertTitle: '提示框',
        alertShow: false,
        alertContent: null
    }
    this.syncData = this.syncData.bind(this)
    this.onClose = this.onClose.bind(this)
  }

  syncData(ev) {
    ev.stopPropagation()
    api.get('/api/common/sync').then(() => {
      this.setState({  
          alertShow: true,
          alertContent: <p>同步成功</p>
      })
    }).catch((err) => {
      this.setState({        
          alertShow: true,
          alertContent: <p>{JSON.stringify(err)}</p>
      })
    })
  }

  onClose(){
    this.setState({alertShow:false})
  }

  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">我的图书馆</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <LinkContainer to='/book' >
              <NavItem eventKey={1}>电子书</NavItem>
            </LinkContainer>
            <LinkContainer to='/category'>
              <NavItem eventKey={2}>分类</NavItem>
            </LinkContainer>
            <NavDropdown eventKey={3} title="设置" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1} onClick={this.syncData}>同步</MenuItem>
              <MenuItem eventKey={3.2} onClick={ ev=>{ev.stopPropagation();window.open(getBaseUrl() + '/api/common/export/config')}}>导出配置</MenuItem>
              <MenuItem eventKey={3.3} onClick={ev=>{ev.stopPropagation(),window.open(getBaseUrl()+'/api/common/export/books')}}>导出电子书</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <LinkContainer to='/about'>
              <NavItem eventKey={4}>关于我</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar>
        <Alert title = {this.state.alertTitle} show = {this.state.alertShow} content = {this.state.alertContent} onClose = {this.onClose}/>
      </div>
    )
  }
}

