import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import Auth from '../utils/auth';


const LoggedIn = () => {

  const { data: userData } = useQuery(GET_ME);
  const user = userData?.me || {};
  console.log(user);


  return (
    <>
      <div className="App">
        <header className="App-header">
            <p>
            Placeholder page #2.
            </p>
            <a>
            - YOUR PROFILE -
            </a>
        </header>
        </div>
    </>
  );
};

export default LoggedIn;