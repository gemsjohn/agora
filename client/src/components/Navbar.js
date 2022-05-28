import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

import Auth from '../utils/auth';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  const [isShown, setIsShown] = useState(false);

  const { data: userData } = useQuery(GET_ME);
  const user = userData?.me || {};
  console.log(user);

  return (
    <>
      <Navbar style={{ backgroundColor: '#283845', borderRadius: 10, margin: 10, color: 'white' }}>
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>
          <span className="Nav-style">Placeholder Logo</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar'>
            <Nav className='ml-auto'>
              <Nav.Link as={Link} to='/'>
              <span className="Nav-style">Placeholder Button</span>
              </Nav.Link>
              {/* if user is logged in show saved books and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to='/profile'>
                    <span className="Nav-style">Profile Page</span>
                  </Nav.Link>
                  <Nav.Link 
                    onClick={Auth.logout} 
                    onMouseEnter={() => setIsShown(true)} 
                    onMouseLeave={() => setIsShown(false)}
                  >
                    {isShown ? <span className="Nav-user-logout">Logout</span> : <span className="Nav-user-style">{user.username}</span>}
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}><span className="Nav-style">Login/Sign Up</span></Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;
