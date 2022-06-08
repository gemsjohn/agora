import React, { useState } from 'react';
import { Nav, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const commonButtonStyles = {
    backgroundColor: '#283845', 
    borderRadius: 10, 
    margin: 10, 
    height: '5vh', 
    width: '20vw', 
    color: 'white', 
    fontSize: 15, 
    paddingTop: '1.5vh'
}

function ListingComplete() {
    const [isShownLogin, setIsShownLogin] = useState(false);
    const [isShownSignup, setIsShownSignup] = useState(false);

    return (
        <div className="App">
            <div className="App-header" style={{ justifyContent: 'start' }}>
                <p style={{ marginTop: '10vh', color: '#8ac926' }}>Congratulations, your listing has been published!</p>
                <Row>
                    <Link
                        style={{ ...commonButtonStyles }} 
                        as={Link}
                        to="/"
                        onMouseEnter={() => setIsShownLogin(true)} 
                        onMouseLeave={() => setIsShownLogin(false)}
                    >
                        {isShownLogin ? <span style={{ color: '#F2D492'}} >Return Home</span> : <span>Return Home</span>}
                    </Link>
                    <Link 
                        style={{ ...commonButtonStyles }} 
                        as={Link}
                        to="/selling"
                        onMouseEnter={() => setIsShownSignup(true)} 
                        onMouseLeave={() => setIsShownSignup(false)}
                    >
                        {isShownSignup ? <span style={{ color: '#F2D492'}} >Create New Listing</span> : <span>Create New Listing</span>}
                    </Link>
                </Row>
            </div>
        </div>
    )
}

export default ListingComplete;