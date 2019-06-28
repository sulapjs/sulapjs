import React from 'react';
import './App.css';
import Login from './views/Login';
import Register from './views/Register';
import Dashboard from './views/Dashboard';
import Home from './views/Home';
import { Route } from 'react-router-dom';

function App() {
  return (
    <>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
    </>
  );
}

export default App;
