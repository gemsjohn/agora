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
    let denominator;
    if (window.innerWidth <= 480) {
        denominator = 5
    } else if (window.innerWidth >= 481 && window.innerWidth <= 768) {
        denominator = 7
    } else if (window.innerWidth >= 769 && window.innerWidth <= 1024) {
        denominator = 15
    } else if (window.innerWidth >= 1025 && window.innerWidth <= 1200) {
        denominator = 22
    }else if (window.innerWidth >= 1201) {
        denominator = 35
    }
    function getBaseLog(x, y) {
        return Math.log(y) / Math.log(x);
    }
    const state = {
        
        width: (window.innerWidth / denominator)
    };
    
    const media = localStorage.getItem('listingMedia');
    const title = localStorage.getItem('listingTitle');
    const price = localStorage.getItem('listingPrice');
    const description = localStorage.getItem('listingDescription');
    const category = localStorage.getItem('listingCategory');
    const condition = localStorage.getItem('listingCondition');

    imageArray1 = JSON.parse(media);

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
                <div>
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
    
    return (
        <div className="App">
            <div className="App-header" style={{ justifyContent: 'start' }}>
            <div className="container" style={{ marginTop: '4vh', display: 'true', width: state.width + "vw"}}>
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