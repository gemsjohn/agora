import React from 'react';
import { Form, Button } from 'react-bootstrap';
import '../App.css';
import SearchForm from '../components/SearchForm';

const handleFormSubmit = async (event) => {
  event.preventDefault();

  // check if form has everything (as per react-bootstrap docs)
  const form = event.currentTarget;
  if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
  }
};

function Placeholder() {
  return (
    <div className="App">
      <div className="App-header" style={{ justifyContent: 'start', paddingTop: '5%' }}>
        <SearchForm />
      </div>
    </div>
  );
}

export default Placeholder;
