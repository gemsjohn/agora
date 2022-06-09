import React from 'react';
import { useQuery } from '@apollo/client';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import '../App.css';
// import RenderImg from '../assets/placeholder.jpg';
import { GET_LISTINGS } from '../utils/queries';
import { Link } from 'react-router-dom';
import { IKImage, IKContext } from 'imagekitio-react'; 


const urlEndpoint = 'https://ik.imagekit.io/agora/';
const RenderImg = "https://ik.imagekit.io/agora/placeholder_6BhauKy5j.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1654809198073";

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
  borderRadius: 25, 
  margin: '0 0 1vh 0', 
  height: '6vh', 
  width: '200px', 
  color: 'white', 
  fontSize: 15,
  paddingTop: '0.7vh'
}



function Placeholder() {
  const { data: listingData } = useQuery(GET_LISTINGS);
  const listings = listingData?.listings || {};
  console.log(listings);

  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  
  let modalVar;
  function numSet(x) {
    modalVar = x;
    return modalVar
  }
  function ListingCard() {
    const styles = {
      cardImage: {
        borderRadius: '25px 25px 0 0',
        borderColor: 'white',
        borderStyle: 'solid'
      },
      cardText: { 
        fontSize: '1.5vh'
      }
    }

    for (let i = 0; i < listings.length; i++) {
        function ValidateText() {
            const pattern = /^((http|https|ftp):\/\/)/;
            let url = listings[i].media[0];
              if (pattern.test(url)) {
                // url = "https://" + url;
                // console.log(url)
                return (
                  <>
                  <IKContext urlEndpoint={urlEndpoint}>
                    <IKImage
                      src={listings[i].media[0]}
                      style={styles.cardImage}
                      transformation={[{
                        height: 200,
                        width: 200
                      }]}
                    />
                  </IKContext>
                  {/* eslint-disable-next-line */}
                  {/* <img src={listings[i].media[0]} style={styles.cardImage} atl=''></img> */}
                  </>
                )
              } else {
                return (
                  <IKContext urlEndpoint={urlEndpoint}>
                    <IKImage
                      src={RenderImg}
                      style={styles.cardImage}
                      transformation={[{
                        height: 200,
                        width: 200
                      }]}
                    />
                  </IKContext>
                )
                // return <img src={RenderImg} style={styles.cardImage} alt=''></img>
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
          
          localStorage.setItem('listingID', JSON.stringify(listings[i]._id))
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
        <div 
          style={{ backgroundColor: '#283845', borderRadius: 25, margin: 10, color: 'white' }}
          onClick={() => numSet(i)}
          key={i}
        >
            <div >
              <ValidateText />
              <div style={styles.cardText}>
                <p>{listings[i].title ? listings[i].title : "Title"}</p>
                <p>{listings[i].price ? listings[i].price : "Price"}</p>
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
  
    return listingCardArray;
  }

  ListingCard();

  return (
    <div className="App">
      <div className="App-header" style={{ justifyContent: 'start' }}>
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
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', flexDirection: 'row', margin: '0 12% 0 12%'}}>
          {listingCardArray.reverse()}
        </div>
      </div>
    </div>
  );
}

export default Placeholder;