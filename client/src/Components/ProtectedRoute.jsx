import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'

const GET_GAMER_STATUS = gql`
  {
    me {
      id
    }
  }
`

export default function ProtectedRoute({ component: Component, ...rest }) {
  const { data, loading } = useQuery(GET_GAMER_STATUS)
  return loading ? null : (
    <Route
      {...rest}
      render={props =>
        data.me && data.me.id ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  )
}
