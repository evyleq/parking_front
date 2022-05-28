import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MainPage from './views/MainPage';
import ParkingsPage from './views/ParkingsPage';
import ParkingPage from './views/ParkingPage';
import api from './api/v1';
import LoginPage from './views/LoginPage';
import SignupPage from './views/SignupPage';
import ParkingStatisticPage from './views/ParkingStatisticPage';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/pk/" component={MainPage} />
          <Route path="/pk/:id/stats" component={ParkingStatisticPage} />
          <Route path="/pk/parkings/new" component={ParkingPage} />
          <Route path="/pk/parkings/:id" component={ParkingPage} />          
          <Route path="/pk/parkings" component={ParkingsPage} />
          <Route path="/pk/login" component={LoginPage} />
          <Route path="/pk/signup" component={SignupPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
