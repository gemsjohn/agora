import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Navbar, 
  Nav, 
  Container, 
  Dropdown, 
  DropdownButton,
  NavDropdown 
} from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import logo from '../assets/logo_lg.png';
import Auth from '../utils/auth';

// Navigation bar that populates on every page
const AppNavbar = () => {
  const [isShownSearch, setIsShownSearch] = useState(false);
  const [isShownLogin, setIsShownLogin] = useState(false);

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
              {Auth.loggedIn() ? (
                <>
                <Nav.Link as={Link} to='/selling'>
                  <span 
                    className="Nav-style"
                    onMouseEnter={() => setIsShownSearch(true)} 
                    onMouseLeave={() => setIsShownSearch(false)}
                  >
                    {isShownSearch ? <span style={{ color: '#F2D492'}} >Selling</span> : <span>Selling</span>}
                  </span>
                </Nav.Link>
                </>
                ) : (
                  <span></span>
                )}
              {/* if user is logged in show saved books and logout */}
              {Auth.loggedIn() ? (
                <>
                  <NavDropdown 
                    title={user.username} 
                    id="nav-dropdown" 
                    align={{ lg: 'end' }} 
                    style={{marginRight: '2vw', color: 'white'}}>
                    <NavDropdown.Item as={Link} to='/profile'>Profile</NavDropdown.Item>
                    <NavDropdown.Item onClick={Auth.logout}>Log Out</NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <Nav.Link as={Link} to='/loginsignup'>
                  <span 
                    className="Nav-style"
                    onMouseEnter={() => setIsShownLogin(true)} 
                    onMouseLeave={() => setIsShownLogin(false)}
                  >
                    {isShownLogin ? <span style={{ color: '#F2D492'}} >Login</span> : <span>Login</span>}
                  </span>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AppNavbar;
