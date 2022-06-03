import React from 'react';
import { Form, Button, InputGroup, FormControl, Card, Row } from 'react-bootstrap';
import '../App.css';
import RenderImg from '../assets/placeholder.jpg';
import { IKImage, IKContext, IKupload } from 'imagekitio-react';

const urlEndpoint = 'https://ik.imagekit.io/agora/';


const listingCardArray = [];

const handleFormSubmit = async (event) => {
  event.preventDefault();

  // check if form has everything (as per react-bootstrap docs)
  const form = event.currentTarget;
  if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
  }
};

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
  for ( let i = 0; i < 20; i++) {
    listingCardArray[i] = 
    <div style={{ backgroundColor: '#283845', borderRadius: 10, margin: 10, color: 'white' }}>
      <img src={RenderImg} style={styles.cardImage}></img>
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
      <div style={styles.cardText}>
        <p>Item Title_ {i}</p>
        <p>$100.00</p>
      </div>
    </div>
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
  );
}

export default Placeholder;
