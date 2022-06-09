import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { Card, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RenderImg from '../assets/placeholder.jpg';


let listingCardArray = [];
let watchlistCardArray = [];

const commonButtonStyles = {
  backgroundColor: '#283845', 
  borderRadius: 10, 
  margin: '0 0 1vh 0',
  paddingBottom: '3vh', 
  height: '3vh', 
  width: '120px', 
  color: 'white', 
  fontSize: 12
} 
const styles2 = {
  cardImage: {
    width: '150px',
    height: '120px',
    borderRadius: '25px 25px 0 0'
  },
  cardText: { 
    fontSize: '1.5vh'
  }
}

const LoggedIn = () => {

  const { data: userData } = useQuery(GET_ME);
  const user = userData?.me || {};
  console.log(user);

  let modalVar;
  function numSet(x) {
    modalVar = x;
    return modalVar
  }

  const styles = {
    card: {
      backgroundColor: '#437095',
      borderRadius: 25,
      width: '70vw',
      margin: '4vh'
    }, 
    cardHeader: {
      backgroundColor: '#28384557',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      margin: 'auto',
      borderRadius: '25px 25px 0 0',
      width: '70vw'
    }
  }

  for (let i = 0; i < user.addedListing?.length; i++) {

    function ValidateText() {
      const pattern = /^((http|https|ftp):\/\/)/;
      let url = user.addedListing?.[i].media[0];
      const urlUpdate = (url.replace(/['"]+/g, ''));
      const urlUpdate2 = (urlUpdate.replace(/[\[\]']+/g,''));
      console.log(urlUpdate2)
        if (pattern.test(url)) {
          return (
            <>
            {/* eslint-disable-next-line */}
            <img src={urlUpdate2} style={styles2.cardImage} atl=''></img>
            </>
          )
        } else {
          return <img src={RenderImg} style={styles2.cardImage} alt=''></img>
        }
      
    }

    function handleLocalStorage() {
      localStorage.removeItem('listingID')
      localStorage.removeItem('listingMedia')
      localStorage.removeItem('listingTitle')
      localStorage.removeItem('listingPrice')
      localStorage.removeItem('listingDescription')
      localStorage.removeItem('listingCategory')
      localStorage.removeItem('listingCondition')
      localStorage.removeItem('listingContact')
      
      localStorage.setItem('listingID', JSON.stringify(user.addedListing?.[i]._id))
      localStorage.setItem('listingMedia', JSON.stringify(user.addedListing?.[i].media))
      localStorage.setItem('listingTitle', user.addedListing?.[i].title)
      localStorage.setItem('listingPrice', user.addedListing?.[i].price)
      localStorage.setItem('listingDescription', user.addedListing?.[i].description)
      localStorage.setItem('listingCategory', user.addedListing?.[i].category)
      localStorage.setItem('listingCondition', user.addedListing?.[i].condition)
      localStorage.setItem('listingContact', user.addedListing?.[i].contact)
    }

    listingCardArray[i] = 
    <div 
      style={{ backgroundColor: '#283845', borderRadius: 25, margin: 10, color: 'white' }}
      onClick={() => numSet(i)}
      key={i}
    >
        <div >
          <ValidateText />
          <div style={styles2.cardText}>
              <p>{user.addedListing?.[i].title ? user.addedListing?.[i].title : "Title"}</p>
              <p>{user.addedListing?.[i].price ? user.addedListing?.[i].price : "Price"}</p>
              <Button 
                style={{...commonButtonStyles }} 
                onClick={handleLocalStorage}
                as={Link}
                to='/listing'
              >
                Open
              </Button>
          </div>
        </div>
    </div> 
  }

  for (let i = 0; i < user.watchlist?.length; i++) {
    function ValidateText() {
      const pattern = /^((http|https|ftp):\/\/)/;
      let url = user.watchlist?.[i].media[0];
      // const urlUpdate = (url.replace(/['"]+/g, ''));
      // const urlUpdate2 = (urlUpdate.replace(/[\[\]']+/g,''));
      console.log(url)
        if (pattern.test(url)) {
          return (
            <>
            {/* eslint-disable-next-line */}
            <img src={url} style={styles2.cardImage} atl=''></img>
            </>
          )
        } else {
          return <img src={RenderImg} style={styles2.cardImage} alt=''></img>
        }
    }

    function handleLocalStorage() {
      localStorage.removeItem('listingID')
      localStorage.removeItem('listingMedia')
      localStorage.removeItem('listingTitle')
      localStorage.removeItem('listingPrice')
      localStorage.removeItem('listingDescription')
      localStorage.removeItem('listingCategory')
      localStorage.removeItem('listingCondition')
      localStorage.removeItem('listingContact')
      
      localStorage.setItem('listingID', JSON.stringify(user.watchlist?.[i]._id))
      localStorage.setItem('listingMedia', JSON.stringify(user.watchlist?.[i].media))
      localStorage.setItem('listingTitle', user.watchlist?.[i].title)
      localStorage.setItem('listingPrice', user.watchlist?.[i].price)
      localStorage.setItem('listingDescription', user.watchlist?.[i].description)
      localStorage.setItem('listingCategory', user.watchlist?.[i].category)
      localStorage.setItem('listingCondition', user.watchlist?.[i].condition)
      localStorage.setItem('listingContact', user.watchlist?.[i].contact)
    }

    watchlistCardArray[i] =
    <div 
      style={{ backgroundColor: '#283845', borderRadius: 25, margin: 10, color: 'white' }}
      onClick={() => numSet(i)}
      key={i}
    >
        <div >
          <ValidateText />
          <div style={styles2.cardText}>
              <p>{user.watchlist?.[i].title ? user.watchlist?.[i].title : "Title"}</p>
              <p>{user.watchlist?.[i].price ? user.watchlist?.[i].price : "Price"}</p>
              <Button 
                style={{...commonButtonStyles }} 
                onClick={handleLocalStorage}
                as={Link}
                to='/listing'
              >
                Open
              </Button>
          </div>
        </div>
    </div> 
  }
  return (
      <div className="App">
        <div className="App-header" style={{ justifyContent: 'start' }}>
            <p>
             {user.username} Profile
            </p>

            <Card style={styles.card}>
              <Card.Header style={styles.cardHeader}>Watchlist</Card.Header>
              <Card.Body>
                <Row style={{ justifyContent: 'center' }}>
                  {watchlistCardArray}
                </Row>
              </Card.Body>
            </Card>

            <Card style={styles.card}>
              <Card.Header style={styles.cardHeader}>Listings</Card.Header>
              <Card.Body>
                <Row style={{ justifyContent: 'center' }}>
                {listingCardArray}
                </Row>
              </Card.Body>
            </Card>

            <Card style={styles.card}>
              <Card.Header style={styles.cardHeader}>Recently Viewed</Card.Header>
              <Card.Body>
                <Row style={{ justifyContent: 'center' }}>
                  <p>Content Placeholder</p>
                </Row>
              </Card.Body>
            </Card>
        </div>
        </div>
  );
};

export default LoggedIn;