import React, { useEffect, useState } from 'react';
import { useReducer } from 'react';
import { Row } from 'react-bootstrap';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

// Form handler hook; user is either loging in or signing up
const formHandler = (state, action) => {
  console.log('state:', state)
  console.log('action:', action)

  switch (action.type) {
    case 'login':
      return { form: <LoginForm /> }
    case 'signup':
      return { form: <SignupForm /> }
    default:
      return { form: <h1>Default</h1> };
  }
}

const LoginSignup = () => {
  const initialState = { form: <LoginForm />  }
  const [state, dispatch] = useReducer(formHandler, initialState)

  const [isShownLogin, setIsShownLogin] = useState(false);
  const [isShownSignup, setIsShownSignup] = useState(false);

  const login = () => dispatch({ type: 'login' })
  const signup = () => dispatch({ type: 'signup' })

  useEffect(() => {
    console.log('form changed')
  }, [state.form])

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
          <a 
            style={{ ...commonButtonStyles }} 
            onClick={login}
            onMouseEnter={() => setIsShownLogin(true)} 
            onMouseLeave={() => setIsShownLogin(false)}
          >
            {isShownLogin ? <span style={{ color: '#F2D492'}} >Log In</span> : <span>Log In</span>}
          </a>
          <a 
            style={{ ...commonButtonStyles }} 
            onClick={signup}
            onMouseEnter={() => setIsShownSignup(true)} 
            onMouseLeave={() => setIsShownSignup(false)}
          >
            {isShownSignup ? <span style={{ color: '#F2D492'}} >Sign Up</span> : <span>Sign Up</span>}
          </a>
        </Row>
        <Row style={{ fontSize: 15,  }}>
          {state.form}
        </Row>
      </div>
    </div>
  )
}


export default LoginSignup;
