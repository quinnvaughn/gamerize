import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const Container = styled.div`
  flex: 25%;
  display: flex;
  flex-direction: column;
`

const StyledLink = styled(NavLink)`
  font-size: 1.6rem;
  color: black;
  font-weight: 400;
  text-decoration: none;
  box-sizing: border-box;
  cursor: pointer;
  margin-bottom: 1rem;
  :last-child {
    margin-bottom: 0;
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
      <StyledLink to="/gamer-dashboard/account/edit">Edit Profile</StyledLink>
      <StyledLink to="/gamer-dashboard/account/photos">Photos</StyledLink>
    </Container>
  )
}
