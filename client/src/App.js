import React, { Component } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { Provider } from 'unstated'
import UNSTATED from 'unstated-debug'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { LastLocationProvider } from 'react-router-last-location'

//local imports
import ScrollToTop from './Components/ScrollToTop'
import client from './ApolloClient'
import routes from './routes'
import GlobalStyle from './globalstyles'

UNSTATED.logStateChanges = false

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <BrowserRouter>
            <LastLocationProvider>
              <Provider>
                <ScrollToTop>
                  <GlobalStyle />
                  <Switch>
                    {routes.map(route => (
                      <Route
                        path={route.path}
                        component={route.component}
                        exact={route.exact}
                        key={route.path}
                      />
                    ))}
                  </Switch>
                </ScrollToTop>
              </Provider>
            </LastLocationProvider>
          </BrowserRouter>
        </ApolloHooksProvider>
      </ApolloProvider>
    )
  }
}

export default App
