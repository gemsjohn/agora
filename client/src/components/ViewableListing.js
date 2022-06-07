import React from "react";
import { Table } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


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
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        for (let i = 0; i < imageArray1.length; i++) {
            imageArray2[i] =
                <div>
                    <img src={imageArray1[i]} />
                </div>
        }

        return (
            <Slider {...settings}>
                {imageArray2}
            </Slider>
        )
    }
    console.log(ImageDisplay())
    
    return (
        <div className="App">
            <div className="App-header" style={{ justifyContent: 'start' }}>
            <div className="container" style={{ marginTop: '4vh'}}>
                <ImageDisplay />
            </div>
            <Table striped bordered hover variant="dark" style={{ margin: '4vh 0 10vh 0' }}>
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
            </tbody>
            </Table>
            </div>
        </div>
    )
}

export default ViewableListing;