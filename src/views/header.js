import React, { Component } from 'react';
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
  DropdownItem
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faUser } from '@fortawesome/free-solid-svg-icons'


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
    return (
      <div>
        <Navbar  dark expand="md" className="mb-5 bg-theme-four">
          <NavbarBrand href="/"> Poll Simple</NavbarBrand>
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
                      <NavLink to='/signin'>
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
