import React from 'react';
import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';
import Nav from './secure/components/Nav';
import Menu from './secure/components/Menu';
import Dashboard from './secure/Dashboard';
import Header from './secure/components/Header';
import Users from './secure/Users';
// require('bootstrap');
import {BrowserRouter, Route} from "react-router-dom";

function App() {
  return (
    <div className='App'>
      <Header/>
      <div className="container-fluid">
        <div className="row">
          <Nav />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">

            <Menu />
            {/* <canvas className="my-4 w-100" id="myChart" width="900" height="380"></canvas> */}

            {/* <Dashboard /> */}
            <BrowserRouter>
              <Route path={'/'} component={Dashboard} />
              <Route path={'/users'} component={Users} />
            </BrowserRouter>

            {/* <Users /> */}
            
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
