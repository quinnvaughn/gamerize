import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'

const GET_ADMIN_STATUS = gql`
  {
    me {
      role
    }
  }
`

export default function AdminRoute({ component: Component, ...rest }) {
  const { data, loading } = useQuery(GET_ADMIN_STATUS)
  return loading ? null : (
    <Route
      {...rest}
      render={props =>
        data && data.me && data.me.role === 'ADMIN' ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  )
}
