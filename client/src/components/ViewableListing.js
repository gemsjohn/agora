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

function ViewableListing() {
    // const [isShownLogin, setIsShownLogin] = useState(false);
    // const [isShownSignup, setIsShownSignup] = useState(false);
    
    const media = localStorage.getItem('listingMedia');
    const title = localStorage.getItem('listingTitle');
    const price = localStorage.getItem('listingPrice');
    const description = localStorage.getItem('listingDescription');
    const category = localStorage.getItem('listingCategory');
    const condition = localStorage.getItem('listingCondition');

    return (
        <div className="App">
            <div className="App-header" style={{ justifyContent: 'start' }}>
                <img src={media} style={{ height: '30vh', width: 'auto' }}></img>
                <p style={{ marginTop: '10vh', color: 'white' }}>Title: {title}</p>
                <p style={{ marginTop: '2vh', color: 'white' }}>Price: {price}</p>
                <p style={{ marginTop: '2vh', color: 'white' }}>Description: {description}</p>
                <p style={{ marginTop: '2vh', color: 'white' }}>Category: {category}</p>
                <p style={{ marginTop: '2vh', color: 'white' }}>Condition: {condition}</p>
            </div>
        </div>
    )
}

export default ViewableListing;