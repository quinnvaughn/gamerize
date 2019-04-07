import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'

const GET_GAMER_STATUS = gql`
  {
    me {
      role
    }
  }
`

export default function GamerRoute({ component: Component, ...rest }) {
  const { data, loading } = useQuery(GET_GAMER_STATUS)
  return loading ? null : (
    <Route
      {...rest}
      render={props =>
        data && data.me && data.me.role === 'GAMER' ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  )
}
