import React from 'react'
import styled from 'styled-components'
import { Route } from 'react-router-dom'

import GamerDashboardNav from '../Components/GamerDashboardNav'
import GamerDashboardCalendar from './GamerDashboardCalendar'
import GamerDashboardSessions from './GamerDashboardSessions'
import GamerDashboardHome from './GamerDashboardHome'

const PageContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh;
`

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
    path: '/gamer-dashboard/sessions',
    component: GamerDashboardSessions,
  },
]

export default function GamerDashboard(props) {
  return (
    <PageContainer>
      <GamerDashboardNav />
      {routes.map(route => (
        <Route
          path={route.path}
          key={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </PageContainer>
  )
}
