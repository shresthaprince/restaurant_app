import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import AuthPage from './pages/Auth';
import BookingsPage from './pages/Bookings';
import TablesPage from './pages/Tables';
import HomePage from './pages/Home';

import MainNavigation from './components/Navigation/MainNavigation';
import AuthContext from './context/auth-context';

import './App.css';

class App extends Component {

  state = {
    token: null,
    userId: null
  }

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider
            value={{
              token: this.state.token,
              userId: this.state.userId,
              login: this.login,
              logout: this.logout
            }}
          >
            <MainNavigation />
            <main className="main-content">
              <Switch>

                {this.state.token && <Redirect from="/" to="/bookings" exact />}
                {this.state.token && <Redirect from="/auth" to="/bookings" exact />}

                {!this.state.token && (
                  <Route path="/auth" component={AuthPage} />
                )}

                <Route path="/tables" component={TablesPage} />
                <Route path="/home" component={HomePage} />

                {this.state.token && (
                  <Route path="/bookings" component={BookingsPage} />
                )}

                {!this.state.token && <Redirect to="/home" exact />}
              </Switch>
            </main>
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
