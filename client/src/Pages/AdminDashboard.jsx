import React, { Fragment } from 'react'

//local imports
import useTitle from '../Hooks/useTitle'
import AdminDashboardHome from './AdminDashboardHomePage'
import AdminRoute from '../Components/AdminRoute'
import AdminDashboardStatsPage from './AdminDashboardStatsPage'
import AdminDashboardGamesPage from './AdminDashboardGamesPage'

const routes = [
  {
    path: '/admin-dashboard/home',
    component: AdminDashboardHome,
  },
  {
    path: '/admin-dashboard/stats',
    component: AdminDashboardStatsPage,
  },
  {
    path: '/admin-dashboard/games',
    component: AdminDashboardGamesPage,
  },
]

export default function GamerDashboard(props) {
  useTitle('Admin Dashboard')
  return (
    <Fragment>
      {routes.map(route => (
        <AdminRoute
          path={route.path}
          key={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Fragment>
  )
}
