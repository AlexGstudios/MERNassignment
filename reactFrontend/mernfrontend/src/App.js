import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Navbar } from './components/fixed/NavBar';
import { Home } from './components/views/Home';
import { Login } from './components/views/Login';
import { Register } from './components/views/Register';
import { Map } from './components/views/Map';
import { Account } from './components/views/Account'
import { Footer } from './components/fixed/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/map" component={Map} />
      <Route exact path="/account" component={Account} />
      <Footer />
    </Router>
  );
}

export default App;
