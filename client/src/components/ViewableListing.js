import React from "react";
import { Table, Button } from "react-bootstrap";
import { useMutation } from '@apollo/client';
import Slider from "react-slick";
import { ADD_WATCHLIST } from '../utils/mutations';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Auth from '../utils/auth';


// const commonButtonStyles = {
//     backgroundColor: '#283845', 
//     borderRadius: 10, 
//     margin: 10, 
//     height: '5vh', 
//     width: '20vw', 
//     color: 'white', 
//     fontSize: 15, 
//     paddingTop: '1.5vh'
// }

let imageArray1 = [];
let imageArray2 = [];


function ViewableListing() {
    // const [isShownLogin, setIsShownLogin] = useState(false);
    // const [isShownSignup, setIsShownSignup] = useState(false);
    // let denominator;
    let slopeEq = -(7/300) * window.innerWidth + (245/3);
    let denominator = window.innerWidth/slopeEq;

    const state = {width: (window.innerWidth/50)};
    
    const _id = localStorage.getItem('listingID');
    const media = localStorage.getItem('listingMedia');
    const title = localStorage.getItem('listingTitle');
    const price = localStorage.getItem('listingPrice');
    const description = localStorage.getItem('listingDescription');
    const category = localStorage.getItem('listingCategory');
    const condition = localStorage.getItem('listingCondition');
    const contact= localStorage.getItem('listingContact');

    const _idUpdate = (_id.replace(/['"]+/g, ''));

    imageArray1 = JSON.parse(media);
    console.log(imageArray1)

    function ImageDisplay() {
        
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            
        };
        for (let i = 0; i < imageArray1.length; i++) {
            imageArray2[i] =
                <div key={i}>
                    {/* eslint-disable-next-line */}
                    <img src={imageArray1[i]} style={{ height: 'auto', width: state.width + "vw"}}/>
                </div>
        }

        return (
            <Slider {...settings}>
                {imageArray2}
            </Slider>
        )
    }
    console.log(window.innerWidth)

    const [addToWatchlist] = useMutation(ADD_WATCHLIST);

    const handleAddToWatchlist = async (listingId, title, price, media) => {

        // get token
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        console.log(token);

        if (!token) {
        return false;
        }

        console.log(media)

        try {
            const { data } = await addToWatchlist({
              variables: { id: listingId, title: title, price: price, media: media }
            });
            console.log(data);
            
        } catch (e) {
            console.error(e);
        }
        
      };
    
    return (
        <div className="App">
            <div className="App-header" style={{ justifyContent: 'start' }}>
            <div className="container" style={{ marginTop: '2vh', display: 'true', width: state.width + "vw"}}>
                <ImageDisplay />
            </div>
            <Table striped bordered hover variant="dark" style={{ margin: '4vh 0 4vh 0', width: '70vw', height: 'auto', fontSize: '2vh' }}>
            <tbody>
                <tr>
                <td style={{ width: '20vw'}}>Title</td>
                <td style={{ justifyContent: 'left' }}>{title}</td>
                </tr>
                <tr>
                <td>Price</td>
                <td>{price}</td>
                </tr>
                <tr>
                <td>Description</td>
                <td>{description}</td>
                </tr>
                <tr>
                <td>Category</td>
                <td>{category}</td>
                </tr>
                <tr>
                <td>Condition</td>
                <td>{condition}</td>
                </tr>
                <tr>
                <td>Contact</td>
                <td>{contact}</td>
                </tr>
            </tbody>
            </Table>
            {Auth.loggedIn() ? (
                <Button onClick={() => handleAddToWatchlist(_idUpdate, title, price, imageArray1)} style={{ width: '70vw', marginBottom: '10vh' }}>Add to Watchlist</Button>
            ) : (
                null
            )}
            </div>
        </div>
    )
}

export default ViewableListing;