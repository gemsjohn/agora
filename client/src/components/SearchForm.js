import React, { useState, useReducer } from 'react';
import { Button, InputGroup, FormControl, Container, Row, Col } from 'react-bootstrap';
import '../App.css';
import CategoryFunc from './ListingForm';

const handleFormSubmit = async (event) => {
  event.preventDefault();

  // check if form has everything (as per react-bootstrap docs)
  const form = event.currentTarget;
  if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
  }
};

const buySellHandler = (state, action) => {
    console.log('state:', state)
    console.log('action:', action)
  
    switch (action.type) {
      case 'selected':
        return { 
            buying: <span style={{ color: '#F2D492' }} >Buying</span>, 
            selling: <span style={{ color: 'white' }} >Selling</span>,
            form: 
            <InputGroup className="mb-3"  style={{ width: '70vw', marginTop: '4vh' }}>
                <FormControl
                placeholder="Search"
                aria-label="Search"
                aria-describedby="Search"
                />
                <Button variant="success">
                Search
                </Button>
            </InputGroup>
        }
      case 'unselected':
        return { 
            buying: <span style={{ color: 'white' }} >Buying</span>,
            selling: <span style={{ color: '#F2D492' }} >Selling</span>,
            form: 
                <CategoryFunc />
        }
      default:
        return { category: <span></span> };
    }
}


function SearchForm() {
    const initialState = { 
        buying: <span style={{ color: '#F2D492' }} >Buying</span>,
        selling: <span style={{ color: 'white' }} >Selling</span>,
        form: 
            <InputGroup className="mb-3"  style={{ width: '70vw', marginTop: '4vh' }}>
                <FormControl
                placeholder="Search"
                aria-label="Search"
                aria-describedby="Search"
                />
                <Button variant="success">
                Search
                </Button>
            </InputGroup>
    }
    const [state, dispatch] = useReducer(buySellHandler, initialState)

    const selected = () => dispatch({ type: 'selected' })
    const unselected = () => dispatch({ type: 'unselected' })  

    const commonButtonStyles = {
        backgroundColor: '#283845', 
        borderRadius: 10, 
        margin: 10, 
        height: '5vh', 
        width: '35vw', 
        color: 'white', 
        fontSize: 15,
        paddingTop: '1.5vh'
    }
    return (
        <>
        <div className="App">
            <div className="App-header" style={{ justifyContent: 'start' }}>
                <Row>
                    <a
                        style={{ ...commonButtonStyles }} 
                        onClick={selected}
                    >
                        {state.buying}
                    </a>
                    <a 
                        style={{ ...commonButtonStyles }} 
                        onClick={unselected}
                    >
                        {state.selling}
                    </a>
                </Row>
                <Row>
                    {state.form}
                </Row>
            </div>
        </div>
        </>
    );
}

export default SearchForm;