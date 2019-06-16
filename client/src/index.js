import React from 'react'
import { render } from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import * as Sentry from '@sentry/browser'

// Sentry.init({
//   dsn: 'https://1ca3e49dfb97459e94af1a69dc03686f@sentry.io/1469078',
// })

const rootElement = document.getElementById('root')

if (process.env.NODE_ENV !== 'development') {
  console.log = () => {}
}

render(<App />, rootElement)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
