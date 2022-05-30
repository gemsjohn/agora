import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { Card, Row } from 'react-bootstrap';


const LoggedIn = () => {

  const { data: userData } = useQuery(GET_ME);
  const user = userData?.me || {};
  console.log(user);

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


  return (
    <>
      <div className="App">
        <div className="App-header" style={{ justifyContent: 'start' }}>
            <p>
             {user.username} Profile
            </p>
            {/* Watchlist card */}
            <Card style={styles.card}>
              <Card.Header style={styles.cardHeader}>Watchlist</Card.Header>
              <Card.Body>
                <Row style={{ justifyContent: 'center' }}>
                  <p>Content Placeholder</p>
                </Row>
              </Card.Body>
            </Card>

            {/* Watchlist card */}
            <Card style={styles.card}>
              <Card.Header style={styles.cardHeader}>Listings</Card.Header>
              <Card.Body>
                <Row style={{ justifyContent: 'center' }}>
                  <p>Content Placeholder</p>
                </Row>
              </Card.Body>
            </Card>

            {/* Watchlist card */}
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
    </>
  );
};

export default LoggedIn;