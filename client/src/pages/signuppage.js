import React, { useState } from 'react';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SignupForm from '../components/SignupForm';

const SignUp = () => {
  const [isShownLogin, setIsShownLogin] = useState(false);
  const [isShownSignup, setIsShownSignup] = useState(false);

  const commonButtonStyles = {
    backgroundColor: '#283845', 
    borderRadius: 10, 
    margin: 10, 
    height: '5vh', 
    width: '35vw', 
    color: 'white', 
    fontSize: 15, 
    paddingTop: '1.5vh'
  }

  return (
    <div className="App">
      <div className="App-header" style={{ justifyContent: 'start' }}>
        <Row>
          <Link 
            style={{ ...commonButtonStyles }} 
            onMouseEnter={() => setIsShownLogin(true)} 
            onMouseLeave={() => setIsShownLogin(false)}
            as={Link}
            to="/login"
            href=''
          >
            {isShownLogin ? <span style={{ color: '#F2D492'}} >Log In</span> : <span>Log In</span>}
          </Link>
          <Link 
            style={{ ...commonButtonStyles }} 
            onMouseEnter={() => setIsShownSignup(true)} 
            onMouseLeave={() => setIsShownSignup(false)}
            as={Link}
            to="/signup"
            href=''
          >
            {isShownSignup ? <span style={{ color: '#F2D492'}} >Sign Up</span> : <span>Sign Up</span>}
          </Link>
        </Row>
        <Row style={{ fontSize: 15,  }}>
          <SignupForm />
        </Row>
      </div>
    </div>
  )
}


export default SignUp;
