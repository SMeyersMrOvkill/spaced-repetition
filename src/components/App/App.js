import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from '../Header/Header'
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import PublicOnlyRoute from '../PublicOnlyRoute/PublicOnlyRoute'
import RegistrationRoute from '../../routes/RegistrationRoute/RegistrationRoute'
import LoginRoute from '../../routes/LoginRoute/LoginRoute'
import DashboardRoute from '../../routes/DashboardRoute/DashboardRoute'
import LearningRoute from '../../routes/LearningRoute/LearningRoute'
import NotFoundRoute from '../../routes/NotFoundRoute/NotFoundRoute'
import LanguageContext from '../../contexts/LanguageContext'

import config from '../../config';

import './App.css'
import TokenService from '../../services/token-service'

export default class App extends Component {
  
  constructor() {
    super();
    this.state = {
      hasError: false,
      language: {},
      words: []
    }
  }

  fetchLanguage = () => {
    fetch(`${config.API_ENDPOINT}/language`, {
      headers: {
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
        method: 'GET'
      }
    }).then(res => res.json()).then(data => {
      console.log(data);
      this.setState(data);
    })
  }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  render() {
    const { hasError } = this.state
    return (
      <LanguageContext.Provider value={{
        language: this.state.language,
        words: this.state.words,
        fetchLanguage: this.fetchLanguage
      }}> 
        <br /><br /><br /><br />
        <div className='App panel'>
          <Header />
          <main>
            {hasError && (
              <p>There was an error! Oh no!</p>
            )}
            <Switch>
              <PrivateRoute
                exact
                path={'/'}
                component={DashboardRoute}
              />
              <PrivateRoute
                path={'/learn'}
                component={LearningRoute}
              />
              <PublicOnlyRoute
                path={'/register'}
                component={RegistrationRoute}
              />
              <PublicOnlyRoute
                path={'/login'}
                component={LoginRoute}
              />
              <Route
                component={NotFoundRoute}
              />
            </Switch>
          </main>
        </div>
      </LanguageContext.Provider>
    );
  }
}
