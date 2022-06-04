import React, { useState } from 'react';
import { Form, Button, InputGroup, FormControl, Card, Row, Modal } from 'react-bootstrap';
import '../App.css';
import RenderImg from '../assets/placeholder.jpg';
import { IKImage, IKContext, IKupload } from 'imagekitio-react';
import { Link } from 'react-router-dom';

const urlEndpoint = 'https://ik.imagekit.io/agora/';
let modalVar;

const listingCardArray = [];

// const handleFormSubmit = async (event) => {
//   event.preventDefault();

//   // check if form has everything (as per react-bootstrap docs)
//   const form = event.currentTarget;
//   if (form.checkValidity() === false) {
//     event.preventDefault();
//     event.stopPropagation();
//   }
// };

const commonButtonStyles = {
  backgroundColor: '#283845', 
  borderRadius: 10, 
  margin: '0 0 1vh 1vh', 
  height: '6vh', 
  width: '300px', 
  color: 'white', 
  fontSize: 15,
  paddingTop: '0.7vh'
}

function numSet(x) {
  modalVar = x;
  return modalVar
}

function ListingCard() {
  const styles = {
    cardImage: {
      width: '300px',
      borderRadius: '25px 25px 0 0'
    },
    cardText: {
      fontSize: '1.5vh'
    }
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  for ( let i = 0; i < 20; i++) {
    // numSet(i);
    listingCardArray[i] = 
    <>
    <a 
      style={{ backgroundColor: '#283845', borderRadius: 10, margin: 10, color: 'white' }}
      onClick={() => numSet(i)}
    >
        <div>
          <img src={RenderImg} style={styles.cardImage}></img>
          <div style={styles.cardText}>
            <p>Item Title_ {i}</p>
            <p>$100.00</p>
            <Button style={{...commonButtonStyles}} onClick={handleShow}>Open</Button>
          </div>
        </div>
    </a>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Item Title_{modalVar}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>[Images]</div>
        <div>[Title]</div>
        <div>[Price]</div>
        <div>[Description]</div>
        <div>[Category]</div>
        <div>[Condition]</div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Placeholder
        </Button>
      </Modal.Footer>
    </Modal>  
    </>  
  }

  return listingCardArray;
}

function Placeholder() {
  const styles = {
    cardImage: {
      width: '300px',
      borderRadius: '25px 25px 0 0'
    },
    cardText: {
      fontSize: '1.5vh'
    }
  }

  ListingCard();

  return (
    <>
    <div className="App">
      <div className="App-header" style={{ justifyContent: 'start' }}>
      {/* Search bar */}
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
        {/* Cards */}
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', flexDirection: 'row', margin: '0 12% 0 12%'}}>
          {/* Listing card */}
          {listingCardArray}
        </div>
      </div>
    </div>
    </>
  );
}

export default Placeholder;


        {/* <IKContext urlEndpoint={urlEndpoint}>
          <IKImage 
              path="default-image.jpg"
              transformation={[{
                height: 200,
                width: 200,
                cropMode: 'extract'
              }]}
              loading="lazy"
              height="200"
              width="200"
            />
        </IKContext> */}