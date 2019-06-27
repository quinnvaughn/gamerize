import React, { Suspense } from 'react'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import { Redirect } from 'react-router-dom'

import GamerRoute from '../Components/GamerRoute'
import useTitle from '../Hooks/useTitle'
import ErrorPage from './ErrorPage'
import Loading from '../Components/Loading'

const GamerDashboardAccountPhotos = React.lazy(() =>
  import('./GamerDashboardAccountPhotos')
)
const GamerDashboardAccountEdit = React.lazy(() =>
  import('./GamerDashboardAccountEdit')
)
const GamerDashboardActiveSessions = React.lazy(() =>
  import('./GamerDashboardActiveSessions')
)
const GamerDashboardRetiredSessions = React.lazy(() =>
  import('./GamerDashboardRetiredSessions')
)
const GamerDashboardCalendar = React.lazy(() =>
  import('./GamerDashboardCalendar')
)

const GamerDashboardHome = React.lazy(() => import('./GamerDashboardHome'))

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
  const { data, loading, error } = useQuery(GET_IS_SETUP)
  return loading ? null : data && data.me && data.me.gamerIsSetup === false ? (
    <Redirect to="/gamer-onboarding/photos" />
  ) : error ? (
    <ErrorPage errors={error} />
  ) : (
    <Suspense fallback={<Loading gamer />}>
      {routes.map(route => (
        <GamerRoute
          path={route.path}
          key={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Suspense>
  )
}
