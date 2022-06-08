import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Form, Button, InputGroup, FormControl, Card, Row, Modal } from 'react-bootstrap';
import '../App.css';
import RenderImg from '../assets/placeholder.jpg';
import { GET_LISTINGS } from '../utils/queries';
import { Link } from 'react-router-dom';


const urlEndpoint = 'https://ik.imagekit.io/agora/';

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



function Placeholder() {
  const { data: listingData } = useQuery(GET_LISTINGS);
  const listings = listingData?.listings || {};
  console.log(listings);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  let modalVar;
  function numSet(x) {
    modalVar = x;
    return modalVar
  }
  let listingImg;
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

    const refreshPage = ()=>{
      window.location.reload();
   }

    for (let i = 0; i < listings.length; i++) {
        function ValidateText() {
            let tarea = listings[i].media[0];
            if (tarea.indexOf("http://") == 0 || tarea.indexOf("https://") == 0) {
              return (
                <>
                <img src={(listings[i].media[0])} style={styles.cardImage}></img>
                </>
              )
            } else {
              return <img src={RenderImg} style={styles.cardImage}></img>
            }
        }

        function handleLocalStorage() {
          localStorage.clear();

          localStorage.setItem('listingMedia', JSON.stringify(listings[i].media))
          localStorage.setItem('listingTitle', listings[i].title)
          localStorage.setItem('listingPrice', listings[i].price)
          localStorage.setItem('listingDescription', listings[i].description)
          localStorage.setItem('listingCategory', listings[i].category)
          localStorage.setItem('listingCondition', listings[i].condition)
          localStorage.setItem('listingContact', listings[i].contact)
        }

        ValidateText();
        listingCardArray[i] = 
        <>
        <a 
          style={{ backgroundColor: '#283845', borderRadius: 10, margin: 10, color: 'white' }}
          onClick={() => numSet(i)}
        >
            <div>
              <ValidateText />
              <div style={styles.cardText}>
                <p>{listings[i].title}</p>
                <p>{listings[i].price}</p>
                <a onClick={refreshPage}>
                  <Button 
                    style={{...commonButtonStyles }} 
                    onClick={handleLocalStorage}
                    as={Link}
                    to='/listing'
                  >
                    Open
                  </Button>
                </a>
              </div>
            </div>
        </a> 
        </>
        }
  
    return listingCardArray;
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
          {listingCardArray.reverse()}
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