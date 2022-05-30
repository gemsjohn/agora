import React, { useState, useReducer } from 'react';
import { Form, Button, InputGroup, FormControl, Container, DropdownButton, Dropdown, Navbar, Nav, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css';

// Sub-button styling for search > selling > category & condition secitons
const commonButtonStyles = {
    backgroundColor: '#283845', 
    borderRadius: 10, 
    margin: '0 0 1vh 1vh', 
    height: '6vh', 
    width: '30vw', 
    color: 'white', 
    fontSize: 15,
    paddingTop: '0.7vh'
}

// Condition button hook: NEW
function CondNewHandler() {
    const [isShown, setIsShown] = useState(false);
    return (
        <a 
            style={{ ...commonButtonStyles }}
            onMouseEnter={() => setIsShown(true)} 
            onMouseLeave={() => setIsShown(false)}
        >
            {isShown ? <span style={{ color: '#F2D492'}} >New</span> : <span>New</span>}
        </a>        
    )
}

// Condition button hook: USED - LIKE NEW
function CondUsedLikeNewHandler() {
    const [isShown, setIsShown] = useState(false);
    return (
        <a 
            style={{ ...commonButtonStyles }}
            onMouseEnter={() => setIsShown(true)} 
            onMouseLeave={() => setIsShown(false)}
        >
            {isShown ? <span style={{ color: '#F2D492'}} >Used - Like New</span> : <span>Used - Like New</span>}
        </a>        
    )
}

// Condition button hook: USED - GOOD
function CondUsedGoodHandler() {
    const [isShown, setIsShown] = useState(false);
    return (
        <a 
            style={{ ...commonButtonStyles }}
            onMouseEnter={() => setIsShown(true)} 
            onMouseLeave={() => setIsShown(false)}
        >
            {isShown ? <span style={{ color: '#F2D492'}} >Used - Good</span> : <span>Used - Good</span>}
        </a>        
    )
}

// Condition button hook: USED - FAIR
function CondUsedFairHandler() {
    const [isShown, setIsShown] = useState(false);
    return (
        <a 
            style={{ ...commonButtonStyles }}
            onMouseEnter={() => setIsShown(true)} 
            onMouseLeave={() => setIsShown(false)}
        >
            {isShown ? <span style={{ color: '#F2D492'}} >Used - Fair</span> : <span>Used - Fair</span>}
        </a>        
    )
}

// Category 1 button hook: Automotive
function Category1Handler() {
    const [isShown, setIsShown] = useState(false);
    return (
        <a 
            style={{ ...commonButtonStyles }}
            onMouseEnter={() => setIsShown(true)} 
            onMouseLeave={() => setIsShown(false)}
        >
            {isShown ? <span style={{ color: '#F2D492'}} >Automotive</span> : <span>Automotive</span>}
        </a>        
    )
}

// Category 2 button hook: Clothing / Accessories
function Category2Handler() {
    const [isShown, setIsShown] = useState(false);
    return (
        <a 
            style={{ ...commonButtonStyles }}
            onMouseEnter={() => setIsShown(true)} 
            onMouseLeave={() => setIsShown(false)}
        >
            {isShown ? <span style={{ color: '#F2D492'}} >Clothing / Accessories</span> : <span>Clothing / Accessories</span>}
        </a>        
    )
}

// Category 3 button hook: Household
function Category3Handler() {
    const [isShown, setIsShown] = useState(false);
    return (
        <a 
            style={{ ...commonButtonStyles }}
            onMouseEnter={() => setIsShown(true)} 
            onMouseLeave={() => setIsShown(false)}
        >
            {isShown ? <span style={{ color: '#F2D492'}} >Household</span> : <span>Household</span>}
        </a>        
    )
}

// Category 4 button hook: Sporting Goods
function Category4Handler() {
    const [isShown, setIsShown] = useState(false);
    return (
        <a 
            style={{ ...commonButtonStyles }}
            onMouseEnter={() => setIsShown(true)} 
            onMouseLeave={() => setIsShown(false)}
        >
            {isShown ? <span style={{ color: '#F2D492'}} >Sporting Goods</span> : <span>Sporting Goods</span>}
        </a>        
    )
}

// Search > Selling > Category & Condition sections button switch
const categorySelect = (state, action) => {
    switch (action.type) {
        case 'caton':
            return { 
                categories: 
                <div style={{ 
                    fontSize: 15, 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    justifyContent: 'center', 
                    margin: 'auto' }}
                >
                    <Category1Handler />
                    <Category2Handler />
                    <Category3Handler />
                    <Category4Handler />
                </div>,
                conditions: null 
            }
        case 'catoff':
            return {
                categories: null,
                conditions: 
                    <div style={{ 
                        fontSize: 15, 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        justifyContent: 'center', 
                        margin: 'auto' }}
                    >
                        <CondNewHandler />
                        <CondUsedLikeNewHandler />
                        <CondUsedGoodHandler />
                        <CondUsedFairHandler />
                    </div>
            }
    }
  }

// Create New Listing Form
function NewListingFunc() {
    // ---- Category Hook -----
    const catInit = {
        categories: null
    }
    const [state, dispatch] = useReducer(categorySelect, catInit)

    const catOn = () => dispatch({ type: 'caton' })
    const catOff = () => dispatch({ type: 'catoff' })
    // -----------------------

    return (
                <div>
                    <p style={{ paddingTop: '2vh'}}>Create New Listing</p>
                    <Row style={{ width: '70vw', marginTop: '4vh' }}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
                            <FormControl
                            placeholder="Title"
                            aria-label="Title"
                            aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Price</InputGroup.Text>
                            <FormControl
                            placeholder="Price"
                            aria-label="Price"
                            aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Description</InputGroup.Text>
                            <FormControl
                            placeholder="Description"
                            aria-label="Description"
                            aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                    </Row>
                    <Row style={{ width: '70vw'}}>
                            <InputGroup className="mb-3">
                                <Button variant="outline-secondary" id="button-addon1" onClick={catOn}>
                                Category
                                </Button>
                                <FormControl
                                placeholder="Select Category to see options"
                                aria-label="Example text with button addon"
                                aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                            {state.categories}
                            <InputGroup className="mb-3">
                                <Button variant="outline-secondary" id="button-addon1" onClick={catOff}>
                                Condition
                                </Button>
                                <FormControl
                                placeholder="Select Condition to see options"
                                aria-label="Example text with button addon"
                                aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                            {state.conditions}
                    </Row>
                    <Row >
                        <Button
                        type='submit'
                        variant='success'
                        style={{ width: '70vw' }}>
                        Submit
                        </Button>
                    </Row>
                </div>     
    );
}

export default NewListingFunc;