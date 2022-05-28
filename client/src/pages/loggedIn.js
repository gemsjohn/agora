import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';


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
            <span>
            - YOUR PROFILE -
            </span>
        </header>
        </div>
    </>
  );
};

export default LoggedIn;