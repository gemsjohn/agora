import React, { useState, useReducer } from 'react';
import { Button, InputGroup, FormControl, Container, Row, Col } from 'react-bootstrap';
import '../App.css';
import CategoryFunc from './ListingForm';

const handleFormSubmit = async (event) => {
  event.preventDefault();

  // check if form has everything (as per react-bootstrap docs)
  const form = event.currentTarget;
  if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
  }
};

function SellingForm() {
    return (
        <>
        <div className="App">
            <div className="App-header" style={{ justifyContent: 'start' }}>
                <CategoryFunc />
            </div>
        </div>
        </>
    );
}

export default SellingForm;