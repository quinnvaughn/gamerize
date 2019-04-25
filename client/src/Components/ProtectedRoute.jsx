import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default function ProtectedRoute({ component: Component, ...rest }) {
  const token = localStorage.getItem('TOKEN')
  return (
    <Route
      {...rest}
      render={props => (token ? <Component {...props} /> : <Redirect to="/" />)}
    />
  )
}
