import React from 'react';
import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';
import Dashboard from './secure/Dashboard';
import Users from './secure/users/Users';
import { BrowserRouter, Route } from "react-router-dom";
import Login from './public/Login';
import Register from './public/Register';
import RedirectToDahboard from './secure/RedirectToDahboard';
import UserCreate from './secure/users/UserCreate';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Route path={'/'} exact component={RedirectToDahboard} />
        <Route path={'/dashboard'} exact component={Dashboard} />
        <Route path={'/users'} component={Users} exact/>
        <Route path={'/users/create'} component={UserCreate} />
        <Route path={'/login'} component={Login} />
        <Route path={'/register'} component={Register} />
      </BrowserRouter>
    </div>
  );
}

export default App;
