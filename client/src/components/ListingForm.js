import React, { useState, useReducer, useEffect } from 'react';
import { Form, Button, InputGroup, FormControl, Container, DropdownButton, Dropdown, Navbar, Nav, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css';
import RenderImg from '../assets/placeholder.jpg';
import { IKContext, IKImage, IKUpload } from 'imagekitio-react';
import { ImageKit } from 'imagekit';

const urlEndpoint = 'https://ik.imagekit.io/agora';
const publicKey = 'public_8mr2np+b3kK+yCiX6kpDbOADJ3M='; 
const authenticationEndpoint = 'http://localhost:3001/auth';

const imageListingArray = [];
const cardImageSetupArray = [];
const removeableImageArray = [];

const styles = {
    cardImage: {
      width: '20vw',
      borderRadius: '25px 25px 0 0'
    },
    cardText: {
      fontSize: '1.5vh',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      width: '20vw'
    }
}
// Sub-button styling for search > selling > category & condition secitons
const commonButtonStyles = {
    backgroundColor: '#283845', 
    borderRadius: 10, 
    margin: '0 0 1vh 1vh', 
    height: '6vh', 
    width: '30vw', 
    color: 'white', 
    fontSize: 15,
    paddingTop: '0.7vh'
}

const onError = err => {
    console.log("Error", err);
};
  
const onSuccess = res => {
    console.log("Success", res.name);
    imageListingArray.push(res.url);
    removeableImageArray.push(res.name);
};

const appendImages = () => {

    for ( let i = 0; i < imageListingArray.length; i++) {
        cardImageSetupArray[i] = 
        <div style={{ backgroundColor: '#283845', borderRadius: 10, margin: 10, color: 'white' }}>
            <img src={imageListingArray[i]} style={styles.cardImage}></img>
            <div style={styles.cardText}>
                {/* <p style={{ fontSize: '1.5vh', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>{removeableImageArray[i]}</p> */}
                <Button style={{ margin: '1vh 0 1vh 0' }}>Remove</Button>
            </div>
        </div>

    }
    return cardImageSetupArray;
};

// const removeImages = (rmvimg) => {
//     let imagekit = new ImageKit({
//         publicKey : 'public_8mr2np+b3kK+yCiX6kpDbOADJ3M=',
//         privateKey : 'private_SgwiwYhSBd442/y38EGKhAzIU/c=',
//         urlEndpoint : 'https://ik.imagekit.io/agora'
//     });
//     imagekit.deleteFile(rmvimg, function(error, result) {
//         if(error) console.log(error);
//         else console.log(result);
//     });
// }

const appendReducer = (stateAppend, actionAppend) => {
    appendImages();
    console.log(cardImageSetupArray);
    console.log('state:', stateAppend)
    console.log('action:', actionAppend)
  
    switch (actionAppend.type) {
      case 'increment':
        return { append: cardImageSetupArray }
      default:
        console.log('this is the default')
        return stateAppend
    }
}

// Condition button hook: NEW
function CondNewHandler() {
    const [isShown, setIsShown] = useState(false);
    return (
        <a 
            style={{ ...commonButtonStyles }}
            onMouseEnter={() => setIsShown(true)} 
            onMouseLeave={() => setIsShown(false)}
        >
            {isShown ? <span style={{ color: '#F2D492'}} >New</span> : <span>New</span>}
        </a>        
    )
}

// Condition button hook: USED - LIKE NEW
function CondUsedLikeNewHandler() {
    const [isShown, setIsShown] = useState(false);
    return (
        <a 
            style={{ ...commonButtonStyles }}
            onMouseEnter={() => setIsShown(true)} 
            onMouseLeave={() => setIsShown(false)}
        >
            {isShown ? <span style={{ color: '#F2D492'}} >Used - Like New</span> : <span>Used - Like New</span>}
        </a>        
    )
}

// Condition button hook: USED - GOOD
function CondUsedGoodHandler() {
    const [isShown, setIsShown] = useState(false);
    return (
        <a 
            style={{ ...commonButtonStyles }}
            onMouseEnter={() => setIsShown(true)} 
            onMouseLeave={() => setIsShown(false)}
        >
            {isShown ? <span style={{ color: '#F2D492'}} >Used - Good</span> : <span>Used - Good</span>}
        </a>        
    )
}

// Condition button hook: USED - FAIR
function CondUsedFairHandler() {
    const [isShown, setIsShown] = useState(false);
    return (
        <a 
            style={{ ...commonButtonStyles }}
            onMouseEnter={() => setIsShown(true)} 
            onMouseLeave={() => setIsShown(false)}
        >
            {isShown ? <span style={{ color: '#F2D492'}} >Used - Fair</span> : <span>Used - Fair</span>}
        </a>        
    )
}

// Category 1 button hook: Automotive
function Category1Handler() {
    const [isShown, setIsShown] = useState(false);
    return (
        <a 
            style={{ ...commonButtonStyles }}
            onMouseEnter={() => setIsShown(true)} 
            onMouseLeave={() => setIsShown(false)}
        >
            {isShown ? <span style={{ color: '#F2D492'}} >Automotive</span> : <span>Automotive</span>}
        </a>        
    )
}

// Category 2 button hook: Clothing / Accessories
function Category2Handler() {
    const [isShown, setIsShown] = useState(false);
    return (
        <a 
            style={{ ...commonButtonStyles }}
            onMouseEnter={() => setIsShown(true)} 
            onMouseLeave={() => setIsShown(false)}
        >
            {isShown ? <span style={{ color: '#F2D492'}} >Clothing / Accessories</span> : <span>Clothing / Accessories</span>}
        </a>        
    )
}

// Category 3 button hook: Household
function Category3Handler() {
    const [isShown, setIsShown] = useState(false);
    return (
        <a 
            style={{ ...commonButtonStyles }}
            onMouseEnter={() => setIsShown(true)} 
            onMouseLeave={() => setIsShown(false)}
        >
            {isShown ? <span style={{ color: '#F2D492'}} >Household</span> : <span>Household</span>}
        </a>        
    )
}

// Category 4 button hook: Sporting Goods
function Category4Handler() {
    const [isShown, setIsShown] = useState(false);
    return (
        <a 
            style={{ ...commonButtonStyles }}
            onMouseEnter={() => setIsShown(true)} 
            onMouseLeave={() => setIsShown(false)}
        >
            {isShown ? <span style={{ color: '#F2D492'}} >Sporting Goods</span> : <span>Sporting Goods</span>}
        </a>        
    )
}

// Search > Selling > Category & Condition sections button switch
const categorySelect = (state, action) => {
    switch (action.type) {
        case 'caton':
            return { 
                categories: 
                <div style={{ 
                    fontSize: 15, 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    justifyContent: 'center', 
                    margin: 'auto' }}
                >
                    <Category1Handler />
                    <Category2Handler />
                    <Category3Handler />
                    <Category4Handler />
                </div>,
                conditions: null 
            }
        case 'catoff':
            return {
                categories: null,
                conditions: 
                    <div style={{ 
                        fontSize: 15, 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        justifyContent: 'center', 
                        margin: 'auto' }}
                    >
                        <CondNewHandler />
                        <CondUsedLikeNewHandler />
                        <CondUsedGoodHandler />
                        <CondUsedFairHandler />
                    </div>
            }
    }
  }

// Create New Listing Form
function NewListingFunc() {
    // ---- Category Hook -----
    const catInit = {
        categories: null
    }
    const [state, dispatch] = useReducer(categorySelect, catInit)

    const catOn = () => dispatch({ type: 'caton' })
    const catOff = () => dispatch({ type: 'catoff' })
    // -----------------------
    
    // ---- Append Images -----
    const initialState = { append:
        <div style={{ backgroundColor: '#283845', borderRadius: 10, margin: 10, color: 'white' }}>
            <img src={RenderImg} style={styles.cardImage}></img>
            <div style={styles.cardText}>
                <Container>
                    <p style={{ margin: '1vh 0 1vh 0', fontSize: '1.5vh' }}>Upload a File</p>
                </Container>
            </div>
        </div>
    }
    const [stateAppend, dispatchAppend] = useReducer(appendReducer, initialState)
  
    const increment = () => dispatchAppend({ type: 'increment' })
    // ------------------------

    //Render Button
    const [isShown, setIsShown] = useState(false);
    const [fileUploaded, setFileUploaded] = useState(false);
    let renderBtn;
    if (fileUploaded) {

        renderBtn =
        <a onClick={increment} 
            style={{ 
                backgroundColor: '#283845', 
                borderRadius: 10, 
                height: '6vh', 
                width: '20vw', 
                color: 'white', 
                fontSize: '1.5vh',
                paddingTop: '2vh'
            }}
            onMouseEnter={() => setIsShown(true)} 
            onMouseLeave={() => setIsShown(false)}
        >
            {isShown ? <span style={{ color: '#F2D492'}} >Render</span> : <span>Render</span>}
        </a>         
    }

    appendImages();
    return (
                <div>
                    <p style={{ paddingTop: '2vh'}}>Create New Listing</p>
                    <IKContext 
                        publicKey={publicKey} 
                        urlEndpoint={urlEndpoint} 
                        authenticationEndpoint={authenticationEndpoint} 
                    >
                        <p style={{ 
                            display: 'flex', 
                            flexWrap: 'wrap', 
                            justifyContent: 'left', 
                            fontSize: '2vh'
                        }}>
                            Upload Image(s)
                        </p>
                        <IKUpload
                        fileName="agora.png"
                        onError={onError}
                        onSuccess={onSuccess}
                        style={{ 
                            fontSize: '1.5vh', 
                            color: 'red', 
                            display: 'flex', 
                            flexWrap: 'wrap', 
                            justifyContent: 'left',  
                        }}
                        onClick={() => setFileUploaded(true)} 
                        />
                    </IKContext>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'left', marginTop: 10}}>
                        {renderBtn}
                    </div>
                    {onSuccess}
                    <div style={{ width: '70vw' }}>
                        <Row>
                            {stateAppend.append}
                            {/* {cardImageSetupArray} */}
                        </Row>
                    </div>
                    <Row style={{ width: '70vw', marginTop: '4vh' }}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
                            <FormControl
                            placeholder="Title"
                            aria-label="Title"
                            aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Price</InputGroup.Text>
                            <FormControl
                            placeholder="Price"
                            aria-label="Price"
                            aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Description</InputGroup.Text>
                            <FormControl
                            placeholder="Description"
                            aria-label="Description"
                            aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                    </Row>
                    <Row style={{ width: '70vw'}}>
                            <InputGroup className="mb-3">
                                <Button variant="outline-secondary" id="button-addon1" onClick={catOn}>
                                Category
                                </Button>
                                <FormControl
                                placeholder="Select Category to see options"
                                aria-label="Example text with button addon"
                                aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                            {state.categories}
                            <InputGroup className="mb-3">
                                <Button variant="outline-secondary" id="button-addon1" onClick={catOff}>
                                Condition
                                </Button>
                                <FormControl
                                placeholder="Select Condition to see options"
                                aria-label="Example text with button addon"
                                aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                            {state.conditions}
                    </Row>
                    <Row >
                        <Button
                        type='submit'
                        variant='success'
                        style={{ width: '70vw' }}>
                        Submit
                        </Button>
                    </Row>
                </div>     
    );
}

export default NewListingFunc;