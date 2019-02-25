import React, { Component, lazy, Suspense } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import createHistory from 'history/createBrowserHistory'

//local imports
import Loading from './Components/Loading'
import HomePage from './Pages/HomePage'
const GamesPage = lazy(() => import('./Pages/GamesPage'))
const SpecificGamePage = lazy(() => import('./Pages/SpecificGamePage'))
const SpecificSessionPage = lazy(() => import('./Pages/SpecificSessionPage'))

const GlobalStyle = createGlobalStyle`
html {
  font-size: 62.5%;
}
  body {
    @import url('https://fonts.googleapis.com/css?family=Open+Sans:200,300,400,600,700, 800');
    font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    overflow-x:hidden;
    position: relative;
    height: 100%;
  }
  div {
    box-sizing: border-box;
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
`

const history = createHistory()

history.listen(_ => {
  window.scrollTo(0, 0)
})

class App extends Component {
  render() {
    return (
      <BrowserRouter history={history}>
        <Suspense fallback={<Loading />}>
          <GlobalStyle />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/games" component={GamesPage} />
            <Route path="/games/:game" component={SpecificGamePage} />
            <Route path="/users/:user/:game" component={SpecificSessionPage} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default App
