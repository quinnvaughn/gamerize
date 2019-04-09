import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'

//local imports
import NotificationBadge from './NotificationBadge'

const Container = styled.div`
  height: 8rem;
  border-bottom: 1px solid #dddfe2;
  width: 100vw;
  position: sticky;
  top: 0;
  background: white;
  z-index: 9999;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-left: 8rem;

  @media (max-width: 1127px) {
    padding-left: 2.4rem;
  }
`

const StyledLink = styled(NavLink)`
  font-size: 1.4rem;
  color: black;
  text-decoration: none;
  box-sizing: border-box;
  height: 100%;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  margin-right: 1.5rem;
  font-weight: 600;
  padding: 0 0.8rem;
  display: flex;
  align-items: center;
  :last-child {
    margin-right: 0;
  }
  :hover {
    border-bottom: 2px solid #f10e0e;
  }
  &.active {
    border-bottom: 2px solid #f10e0e;
  }
`

const NotificationContainer = styled.div`
  position: relative;
  cursor: pointer;
`

const GET_MY_NOTIFICATIONS = gql`
  {
    numGamerNotifications
  }
`

export default function GamerDashboardNav(props) {
  const { data, loading } = useQuery(GET_MY_NOTIFICATIONS, {
    pollInterval: 1000,
  })
  return loading ? null : (
    <Container>
      <StyledLink to="/gamer-dashboard/home">
        <NotificationContainer>
          <NotificationBadge count={data.numGamerNotifications} />
          Home
        </NotificationContainer>
      </StyledLink>
      <StyledLink to="/gamer-dashboard/calendar">Calendar</StyledLink>
      <StyledLink to="/gamer-dashboard/sessions">Sessions</StyledLink>
      <StyledLink
        to="/gamer-dashboard/account/edit"
        isActive={(_, { pathname }) =>
          pathname.match(`\/gamer-dashboard\/account\/d*`)
        }
      >
        Account
      </StyledLink>
    </Container>
  )
}
