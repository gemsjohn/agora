import React, { useState, useReducer } from 'react';
import { Form, Button, InputGroup, FormControl, Container, DropdownButton, Dropdown, Navbar, Nav, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css';

const handleFormSubmit = async (event) => {
  event.preventDefault();

  // check if form has everything (as per react-bootstrap docs)
  const form = event.currentTarget;
  if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
  }
};

const categoryHandler1 = (state, action) => {
    console.log('state:', state)
    console.log('action:', action)
  
    switch (action.type) {
      case 'set':
        return { category: <span style={{ color: '#F2D492'}} >All Categories</span> }
      case 'unset':
        return { category: <span>All Categories</span> }
      default:
        return { category: <h1>Default</h1> };
    }
  }

function SearchForm() {
    const initialState = { category: <span>All Categories</span>}
    const [state, dispatch] = useReducer(categoryHandler1, initialState)
    
    const [isShown1, setIsShown1] = useState(false);
    const [isShown2, setIsShown2] = useState(false);
    const [isShown3, setIsShown3] = useState(false);
    const [isShown4, setIsShown4] = useState(false);

const set = () => dispatch({ type: 'set' })
  const unset = () => dispatch({ type: 'unset' })

    const commonButtonStyles = {
        backgroundColor: '#283845', borderRadius: 10, margin: 10, height: '10vh', width: '10vw', color: 'white', fontSize: 15, paddingTop: '4vh'
    }
    return (
        <>
        <div className="App">
            <div className="App-header" style={{ justifyContent: 'start', paddingTop: '5%' }}>
                <Row style={{ marginBottom: '5vh' }}>
                <a 
                    style={{ ...commonButtonStyles }} 
                    onClick={set}
                    // onMouseEnter={() => setIsShown1(true)} 
                    // onMouseLeave={() => setIsShown1(false)}
                >
                    {state.category}
                </a>
                <a 
                    style={{ ...commonButtonStyles }} 
                    // onClick={login}
                    onMouseEnter={() => setIsShown2(true)} 
                    onMouseLeave={() => setIsShown2(false)}
                >
                    {isShown2 ? <span style={{ color: '#F2D492'}} >Vehicles</span> : <span>Vehicles</span>}
                </a>
                <a 
                    style={{ ...commonButtonStyles }} 
                    // onClick={login}
                    onMouseEnter={() => setIsShown3(true)} 
                    onMouseLeave={() => setIsShown3(false)}
                >
                    {isShown3 ? <span style={{ color: '#F2D492'}} >Electronics</span> : <span>Electronics</span>}
                </a>
                <a 
                    style={{ ...commonButtonStyles }} 
                    // onClick={login}
                    onMouseEnter={() => setIsShown4(true)} 
                    onMouseLeave={() => setIsShown4(false)}
                >
                    {isShown4 ? <span style={{ color: '#F2D492'}} >Toys</span> : <span>Toys</span>}
                </a>
                </Row>
                <Row>
                    <InputGroup className="mb-3"  style={{ width: '48vw' }}>
                        <FormControl
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="Search"
                        />
                        <Button variant="success">
                        Search
                        </Button>
                    </InputGroup>
                </Row>
            </div>
            
        </div>
            
        </>
    );
}

export default SearchForm;