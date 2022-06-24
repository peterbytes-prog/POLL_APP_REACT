import React, { Component } from 'react';
import logo from '../logo.png';
import { NavLink } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  Input,
  Button
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faUser, faCheck } from '@fortawesome/free-solid-svg-icons'


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen : false
    }
  }
  toggle(){
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render(){
    const onSearch = (event) => {
      this.props.handleSearch(event.target.value)
    }
    return (
      <div>
        <Navbar  dark expand="md" className="mb-5 bg-theme-four">
          <NavbarBrand href="/"> Poll
          <img
              src={logo}
              width="20"
              height="20"
              className="d-inline-block align-middle"
              alt="React Bootstrap logo"
            />

           Simple</NavbarBrand>
          <NavbarToggler onClick={()=> this.toggle() } />
          <Collapse isOpen={ this.state.isOpen } navbar>
            <Nav className='mr-auto' navbar>
              <NavItem>
                <NavLink className="nav-link" to='/polls'>
                      <span className="fa fa-home fa-lg"></span>POLLS
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle className="nav-link" nav caret>
                  <FontAwesomeIcon icon={faPlus} />
                  Create
                </DropdownToggle>
                <DropdownMenu className='dropdown-menu-right'>
                    {!this.props.user.isAuthenticated?(
                      <DropdownItem>
                        <NavLink to='/signup'>
                          Account
                        </NavLink>
                      </DropdownItem>
                    ):( null)}
                  <DropdownItem>
                    <NavLink to='/polls/create'>
                      Poll
                    </NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>

            <Nav className='ml-auto' navbar>

              <Form className="d-flex mx-2">
                <Input
                  type="search"
                  placeholder="Search"
                  className="mr-2"
                  aria-label="Search"
                  value={this.props.search}
                  onChange = { onSearch }
                />
                <Button className='bg-success'>Search</Button>
              </Form>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle className="nav-link" nav caret>
                  <FontAwesomeIcon icon={faUser} />
                </DropdownToggle>
                <DropdownMenu className='dropdown-menu-right'>
                  {this.props.user.isAuthenticated?(
                    <>
                    <DropdownItem onClick={ this.props.logoutUser }>
                      {`Hi! ${this.props.user.user.username} Sign Out?`}
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink to={`profile/${this.props.user.user._id}`}>
                        Profile
                      </NavLink>
                    </DropdownItem>
                    </>
                  ):(
                    <DropdownItem>
                      <NavLink to='/signin'>
                        Sign In
                      </NavLink>
                    </DropdownItem>
                  )}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>

          </Collapse>
        </Navbar>
      </div>
    )
  }
}

export default Header;
