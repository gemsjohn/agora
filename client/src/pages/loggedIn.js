import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { Card, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RenderImg from '../assets/placeholder.jpg';

// import { GET_LISTINGS } from '../utils/queries';

let listingCardArray = [];

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
const styles2 = {
  cardImage: {
    width: '300px',
    borderRadius: '25px 25px 0 0'
  },
  cardText: { 
    fontSize: '1.5vh'
  }
}

const LoggedIn = () => {

  const { data: userData } = useQuery(GET_ME);
  const user = userData?.me || {};
  console.log(user.addedListing);

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
        if (pattern.test(url)) {
          // url = "https://" + url;
          // console.log(url)
          return (
            <>
            {/* eslint-disable-next-line */}
            <img src={user.addedListing?.[i].media[0]} style={styles2.cardImage} atl=''></img>
            </>
          )
        } else {
          return <img src={RenderImg} style={styles2.cardImage} alt=''></img>
        }
      
    }

    listingCardArray[i] = 
    <div 
      style={{ backgroundColor: '#283845', borderRadius: 10, margin: 10, color: 'white' }}
      // onClick={() => numSet(i)}
      // key={i}
    >
        <div >
          <ValidateText />
          <div style={styles2.cardText}>
            {/* <p>{listings[i].title}</p>
            <p>{listings[i].price}</p> */}
              <p>{user.addedListing?.[i].title}</p>
              <p>{user.addedListing?.[i].price}</p>
              <Button 
                style={{...commonButtonStyles }} 
                // onClick={handleLocalStorage}
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
                  <p>Content Placeholder</p>
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