import React, { useState, useReducer } from 'react';
import { Form, Button, Alert, Container, Row, InputGroup, OverlayTrigger, Tooltip} from 'react-bootstrap';
import { IKContext, IKUpload } from 'imagekitio-react';
import { Link, useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_LISTING } from '../utils/mutations';
import Auth from '../utils/auth';
import RenderImg from '../assets/placeholder.jpg';
import '../App.css';

// imagekit.io dependencies
const urlEndpoint = 'https://ik.imagekit.io/agora';
const publicKey = 'public_8mr2np+b3kK+yCiX6kpDbOADJ3M='; 
const authenticationEndpoint = 'http://localhost:3001/auth';

// Variables
const imageListingArray = [];
const cardImageSetupArray = [];
let urlArray = [];

// Card styline
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


const appendImages = () => {

    for ( let i = 0; i < imageListingArray.length; i++) {
        cardImageSetupArray[i] = 
        <div style={{ backgroundColor: '#283845', borderRadius: 10, margin: 10, color: 'white' }} key={i}>
            <img src={imageListingArray[i]} style={styles.cardImage} alt=""></img>
            <div style={styles.cardText}>
                <Button style={{ margin: '1vh 0 1vh 0' }}>Remove</Button>
            </div>
        </div>

    }
    return cardImageSetupArray;
};


// Create New Listing Form
function NewListingFunc() {

    // ************ [START: IMAGE UPLOAD AND RENDER] ************
    // [React State Hook] :: resNameBool starts out false. Updates to true upon image upload. Returns to false once the image has been rendered.
    const [resNameBool, setresNameBool] = useState(false);

    // Handles image upload error
    const onError = err => {
        console.log("Error", err);
    };

    // Handles successful image upload.
    const onSuccess = res => {
        console.log("Success", res.name);
        setresNameBool(true); // [React State Hook Management]
        urlArray.push(res.url); // Store imagekit.io URL in urlArray
        console.log(urlArray);
        imageListingArray.push(res.url); // Store imagekit.io URL in the array that handles the rendering on page
    };

    // Part of a react state hook; appends the uploaded images to the page
    const appendReducer = (stateAppend, actionAppend) => {
        switch (actionAppend.type) {
          case 'increment':
            setresNameBool(false)
            return { append: cardImageSetupArray }
          default:
            console.log('this is the default')
            return stateAppend
        }
    }
    
    const initialState = { append:
        <div style={{ backgroundColor: '#283845', borderRadius: 10, margin: 10, color: 'white' }}>
            <img src={RenderImg} style={styles.cardImage} alt=""></img>
            <div style={styles.cardText}>
                <Container>
                    <p style={{ margin: '1vh 0 1vh 0', fontSize: '1.5vh' }}>Upload a File</p>
                </Container>
            </div>
        </div>
    }

    // [React State Hook] :: stateAppend starts out with the generic placeholder image and then updates to the uploaded images
    const [stateAppend, dispatchAppend] = useReducer(appendReducer, initialState)
  
    const increment = () => dispatchAppend({ type: 'increment' })
    appendImages();
    // ************ [END: IMAGE UPLOAD AND RENDER] ************

    // ************ [START: RENDER BUTTON] ************
    const [isShown, setIsShown] = useState(false);
    let renderBtn;
    if (resNameBool) {

        renderBtn =
        <OverlayTrigger
            key='right'
            placement='right'
            overlay={
                <Tooltip id={`tooltip-right`}>
                <strong>Select Render to show your uploaded image.</strong>
                </Tooltip>
            }
        >
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
        </OverlayTrigger>         
    }
    // ************ [END: RENDER BUTTON] ************

    // ************ [START: ADD LISTING] ************
    const history = useHistory();
    // set initial form state
    const [listingFormData, setListingFormData] = useState({ title: '',  price: '', description: '', category: '', condition: '', contact: '' });
    const [addListing, { error }] = useMutation(ADD_LISTING);
    // set state for form validation
    const [validated] = useState(false);
    // set state for alert
    const [showAlert, setShowAlert] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
    
        setListingFormData({
          ...listingFormData,
          [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
        return false;
        }
    
        try {
          const { data } = await addListing({
            variables: { ...listingFormData, media: urlArray }
          });
          console.log(data);
          history.push("/complete")
          
        } catch (e) {
          console.error(e);
        }
    };
    // ************ [END: ADD LISTING] ************

    return (
                <div>
                    <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                        {/* show alert if server response is bad */}
                        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                        Something went wrong with your signup!
                        </Alert>
                        
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
                            />
                        </IKContext>
                        
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'left', marginTop: 10}}>
                            {renderBtn}
                        </div>

                        {onSuccess}

                        <div style={{ width: '70vw' }}>
                            <Row>{stateAppend.append}</Row>
                        </div>

                        <Form.Group style={{ width: '70vw', textAlign: 'left' }}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
                            <Form.Control
                                type='text'
                                placeholder='Title'
                                name='title'
                                onChange={handleInputChange}
                                value={listingFormData.title}
                                required
                            />
                        </InputGroup>
                        <Form.Control.Feedback type='invalid'>Title is required!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group style={{ width: '70vw', textAlign: 'left' }}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Price</InputGroup.Text>
                            <Form.Control
                                type='text'
                                placeholder='Name your price'
                                name='price'
                                onChange={handleInputChange}
                                value={listingFormData.price}
                                required
                            />
                        </InputGroup>
                        <Form.Control.Feedback type='invalid'>Price is required!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group style={{ width: '70vw', textAlign: 'left' }}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Description</InputGroup.Text>
                            <Form.Control
                                type='text'
                                placeholder='Describe your listing'
                                name='description'
                                onChange={handleInputChange}
                                value={listingFormData.description}
                                required
                            />
                        </InputGroup>
                        <Form.Control.Feedback type='invalid'>Description is required!</Form.Control.Feedback>
                        </Form.Group>
                        

                        <Form.Group style={{ width: '70vw', textAlign: 'left' }}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Category</InputGroup.Text>
                            <Form.Control
                                type='text'
                                placeholder='Category?'
                                name='category'
                                onChange={handleInputChange}
                                value={listingFormData.category}
                                required
                            />
                        </InputGroup>
                        <Form.Control.Feedback type='invalid'>Category is required!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group style={{ width: '70vw', textAlign: 'left' }}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Condition</InputGroup.Text>
                            <Form.Control
                                type='text'
                                placeholder='Condition?'
                                name='condition'
                                onChange={handleInputChange}
                                value={listingFormData.condition}
                                required
                            />
                        </InputGroup>
                        <Form.Control.Feedback type='invalid'>Condition is required!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group style={{ width: '70vw', textAlign: 'left' }}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Contact</InputGroup.Text>
                            <Form.Control
                                type='text'
                                placeholder='Contact?'
                                name='contact'
                                onChange={handleInputChange}
                                value={listingFormData.contact}
                                required
                            />
                        </InputGroup>
                        <Form.Control.Feedback type='invalid'>Contact is required!</Form.Control.Feedback>
                        </Form.Group>

                        <Button
                        disabled={!(listingFormData.title && listingFormData.price && listingFormData.description && listingFormData.category && listingFormData.condition && listingFormData.contact)}
                        type='submit'
                        variant='success'
                        style={{ width: '70vw', marginBottom: '20vh' }}
                        >
                        Submit
                        </Button>
                        {/* <Row>
                            <Button style={{ width: '70vw', marginBottom: '20vh' }} as={Link} to="/complete">Test</Button>
                        </Row> */}
                    </Form>
                    {error && <div>Signup failed</div>}
                </div>     
    );
}

export default NewListingFunc;