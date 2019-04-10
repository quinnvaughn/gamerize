import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const Container = styled.div`
  padding-bottom: 2rem;
`

const StyledLink = styled(NavLink)`
  font-size: 1.6rem;
  color: black;
  font-weight: 400;
  text-decoration: none;
  box-sizing: border-box;
  cursor: pointer;
  margin-right: 1rem;
  :last-child {
    margin-right: 0;
  }
  :hover {
    font-weight: 600;
  }
  &.active {
    font-weight: 600;
  }
`

export default function GamerDashboardAccountNav(props) {
  return (
    <Container>
      <StyledLink to="/gamer-dashboard/sessions/active">
        Active Sessions
      </StyledLink>
      <StyledLink to="/gamer-dashboard/sessions/retired">
        Retired Sessions
      </StyledLink>
    </Container>
  )
}
