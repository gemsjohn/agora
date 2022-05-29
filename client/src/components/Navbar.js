import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab, Dropdown, NavDropdown, SplitButton, DropdownButton } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import logo from '../assets/logo_lg.png';

import Auth from '../utils/auth';

const AppNavbar = () => {
  const [isShown, setIsShown] = useState(false);

  const test = () => {
    return (
      <div style={{ backgroundColor: '#283845', borderRadius: 10, margin: 10, color: 'white' }}>
        <p>Test</p>
      </div>
    );
  }

  const { data: userData } = useQuery(GET_ME);
  const user = userData?.me || {};
  console.log(user);

  return (
    <>
      <Navbar style={{ backgroundColor: '#283845', borderRadius: 10, margin: 10, color: 'white' }}>
        <Container fluid>
          <Navbar.Brand as={Link} to='/' style={{ marginLeft: '2%' }}>
            <img src={logo} style={{ height: 50, width: 150 }}></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar'>
            <Nav className='ml-auto' style={{ marginRight: '2%' }}>
              <Nav.Link as={Link} to='/'>
                <span className="Nav-style">Search</span>
              </Nav.Link>
              {/* if user is logged in show saved books and logout */}
              {Auth.loggedIn() ? (
                <>
                  <DropdownButton
                    as='down'
                    key='down'
                    drop='down'
                    title={user.username}
                  >
                    <Dropdown.Item as={Link} to='/profile'>Profile</Dropdown.Item>
                    <Dropdown.Item onClick={Auth.logout}>Log Out</Dropdown.Item>
                  </DropdownButton>
                </>
              ) : (
                <Nav.Link as={Link} to='/loginsignup'><span className="Nav-style">Log In</span></Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AppNavbar;
