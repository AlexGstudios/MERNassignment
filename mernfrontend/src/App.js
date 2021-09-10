import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Navbar } from './components/fixed/NavBar';
import { Home } from './components/views/Home';
import { Login } from './components/views/Login';
import { Register } from './components/views/Register';
import { Whisky } from './components/views/Whisky';
import { Account } from './components/views/Account'
import { Footer } from './components/fixed/Footer';
import { PrivateRoute } from './hooks/PrivateRoute';
import { UnPrivate } from './hooks/UnPrivate';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Route exact path="/" component={Home} />
      <UnPrivate path="/login" component={Login} />
      <UnPrivate path="/register" component={Register} />
      <PrivateRoute path="/whisky" component={Whisky} />
      <PrivateRoute path="/account" component={Account} />
      <Footer />
    </Router>
  );
}

export default App;