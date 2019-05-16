import React, { Fragment } from 'react'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import { Redirect } from 'react-router-dom'

import GamerDashboardCalendar from './GamerDashboardCalendar'
import GamerDashboardActiveSessions from './GamerDashboardActiveSessions'
import GamerDashboardRetiredSessions from './GamerDashboardRetiredSessions'
import GamerDashboardAccountEdit from './GamerDashboardAccountEdit'
import GamerDashboardAccountPhotos from './GamerDashboardAccountPhotos'
import GamerDashboardHome from './GamerDashboardHome'
import GamerRoute from '../Components/GamerRoute'
import useTitle from '../Hooks/useTitle'

const routes = [
  {
    path: '/gamer-dashboard/home',
    component: GamerDashboardHome,
  },
  {
    path: '/gamer-dashboard/calendar',
    component: GamerDashboardCalendar,
  },
  {
    path: '/gamer-dashboard/sessions/active',
    component: GamerDashboardActiveSessions,
  },
  {
    path: '/gamer-dashboard/sessions/retired',
    component: GamerDashboardRetiredSessions,
  },
  {
    path: '/gamer-dashboard/account/edit',
    component: GamerDashboardAccountEdit,
  },
  {
    path: '/gamer-dashboard/account/photos',
    component: GamerDashboardAccountPhotos,
  },
]

const GET_IS_SETUP = gql`
  {
    me {
      id
      gamerIsSetup
    }
  }
`

export default function GamerDashboard(props) {
  useTitle('Your Gamer Dashboard')
  const { data, loading } = useQuery(GET_IS_SETUP)
  return loading ? null : data && data.me && data.me.gamerIsSetup === false ? (
    <Redirect to="/gamer-onboarding/photos" />
  ) : (
    <Fragment>
      {routes.map(route => (
        <GamerRoute
          path={route.path}
          key={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Fragment>
  )
}
