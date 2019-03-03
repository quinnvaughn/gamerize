import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import { Provider } from 'unstated'
import UNSTATED from 'unstated-debug'

//local imports
import HomePage from './Pages/HomePage'
import ScrollToTop from './Components/ScrollToTop'
import GamesPage from './Pages/GamesPage'
import SpecificGamePage from './Pages/SpecificGamePage'
import SpecificSessionPage from './Pages/SpecificSessionPage'
import UserProfile from './Pages/UserProfile'

const GlobalStyle = createGlobalStyle`
html {
  font-size: 62.5%;
}
  body {
    @import url('https://fonts.googleapis.com/css?family=Montserrat:200,300,400,500,600,700, 800');
    font-family: 'Montserrat', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    overflow-x:hidden;
    position: relative;
    height: 100vh;
    width: 100vw;
    max-width: 100%;
  }
  button {
    font-family: 'Montserrat', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
  }
  input {
    font-family: 'Montserrat', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
  }
  div {
    box-sizing: border-box;
    cursor: default;
    font-family: 'Montserrat', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
  }
  h1 {
    margin: 0;
  }
  h2 {
    margin: 0
  }
  h3 {
    margin: 0;
  }
  h4 {
    margin: 0;
  }
  p {
    margin: 0;
  }
  button {
    :focus {
      outline: 0;
    }
  }
`

UNSTATED.logStatechanges = true

class App extends Component {
  render() {
    return (
      <Provider>
        <ScrollToTop>
          <GlobalStyle />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/games" component={GamesPage} />
            <Route path="/games/:game" component={SpecificGamePage} />
            <Route path="/users/:user/:game" component={SpecificSessionPage} />
            <Route path="/users/:user" component={UserProfile} />
          </Switch>
        </ScrollToTop>
      </Provider>
    )
  }
}

export default App
