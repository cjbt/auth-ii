import React, { Component, useEffect, useState } from 'react';
import './App.css';
import { NavLink, Route, Switch } from 'react-router-dom';
import SignIn from './component/Signin';
import SignUp from './component/Signup';
import Users from './component/Users';

class App extends Component {
  logout = () => {
    localStorage.removeItem('token');

    this.props.history.push('/signin');
  };
  render() {
    return (
      <>
        <header>
          <nav>
            <NavLink to='/signin'>
              <h2>Sign In </h2>
            </NavLink>
            <NavLink to='/signup'>
              <h2>Sign Up</h2>
            </NavLink>
            <NavLink to='/users'>
              <h2>Users</h2>
            </NavLink>
          </nav>

          <button onClick={this.logout}>Logout</button>
        </header>

        <main>
          <Switch>
            <Route to='/signup' component={SignUp} />
            <Route exact to='/signin' component={SignIn} />
            <Route to='/users' component={Users} />
          </Switch>
        </main>
      </>
    );
  }
}

export default App;
