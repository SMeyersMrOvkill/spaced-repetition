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
      words: [],
      head: {},
      guessResponse: null
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

  fetchHead = () => {
    fetch(`${config.API_ENDPOINT}/language/head`, {
      headers: {
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
        method: 'GET'
      }
    }).then(res => res.json()).then(data => {
      this.setState({head: data});
    })
  }

  guessWord = (guess) => {
    console.log('Guess:', guess);
    console.log('Stringified Guess:', JSON.stringify({guess}));
    let obj = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({guess})
    };
    console.log('Request object:', obj)
    fetch(`${config.API_ENDPOINT}/language/guess`, obj)
    .then(res => res.json()).then(data => {
      this.setState({guessResponse: data});
      console.log(data);
    }).catch(error => {
      console.log(error);
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
        head: this.state.head,
        guessResponse: this.state.guessResponse,
        fetchLanguage: this.fetchLanguage,
        fetchHead: this.fetchHead,
        guessWord: this.guessWord,
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
