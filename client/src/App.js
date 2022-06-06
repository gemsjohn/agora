import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Various Page and Component imports used by React Router
import Placeholder from './pages/placeholder';
import LoggedIn from './pages/loggedIn';
import LoginSignup from './pages/loginpage';
import Navbar from './components/Navbar';
import SellingForm from './components/SellingForm';
import ListingComplete from './components/ListingComplete';
import ViewableListing from './components/ViewableListing';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Primary App function used by index.js. This contains ApolloProvider and React Router.
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <div className="App-navbar">
            <Navbar />
          </div>
          <Switch>
            <Route exact path='/' component={Placeholder} />
            <Route exact path='/profile' component={LoggedIn} />
            <Route exact path='/loginsignup' component={LoginSignup} />
            <Route exact path='/selling' component={SellingForm} />
            <Route exact path='/complete' component={ListingComplete} />
            <Route exact path='/listing' component={ViewableListing} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
