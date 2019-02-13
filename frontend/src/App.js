import React, { Component, lazy, Suspense } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'

//local imports
const HomePage = lazy(() => import('./Pages/HomePage'))

const GlobalStyle = createGlobalStyle`
  html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
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
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <GlobalStyle />
          <Switch>
            <Route path="/" component={HomePage} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default App
