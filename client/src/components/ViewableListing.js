import React, { useState } from 'react';
import { Carousel, Nav, Row } from 'react-bootstrap';
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

let imageArray1 = [];
let imageArray2 = [];


function ViewableListing() {
    // const [isShownLogin, setIsShownLogin] = useState(false);
    // const [isShownSignup, setIsShownSignup] = useState(false);
    
    const media = localStorage.getItem('listingMedia');
    const title = localStorage.getItem('listingTitle');
    const price = localStorage.getItem('listingPrice');
    const description = localStorage.getItem('listingDescription');
    const category = localStorage.getItem('listingCategory');
    const condition = localStorage.getItem('listingCondition');

    imageArray1 = JSON.parse(media);

    function ImageDisplay() {
        for (let i = 0; i < imageArray1.length; i++) {
            imageArray2[i] =
                <img src={imageArray1[i]} style={{ height: '30vh', width: 'auto', margin: '10px'}}></img>
        }

        return imageArray2;
    }
    
    // ImageDisplay()

    return (
        <div className="App">
            <div className="App-header" style={{ justifyContent: 'start' }}>
                <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', flexDirection: 'row', margin: '0 12% 0 12%'}}>
                    <ImageDisplay />
                </div>
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