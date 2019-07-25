import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './componentes/Home'
import Header from './componentes/Header'


function App() {
  return (

    <Router>
      <Header />
      <Route exact path="/" component={Home} />
    </Router>

  );
}

export default App;
