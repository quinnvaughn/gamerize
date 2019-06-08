import React from 'react'
import styled from 'styled-components'
import { NavLink, withRouter } from 'react-router-dom'
import { Image } from 'cloudinary-react'

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
    border-bottom: 2px solid #db1422;
  }
  &.active {
    border-bottom: 2px solid #db1422;
  }
`

const Icon = styled(Image)`
  margin-right: 2.4rem;
  cursor: pointer;
`

function AdminDashboardNav(props) {
  return (
    <Container>
      <Icon
        publicId="https://res.cloudinary.com/gamerize/image/upload/gamerize_logo.png"
        height="80"
        onClick={async () => {
          await props.history.push('/')
        }}
      />
      <StyledLink to="/admin-dashboard/home">Home</StyledLink>
      <StyledLink to="/admin-dashboard/stats">Stats</StyledLink>
      <StyledLink to="/admin-dashboard/games">Games</StyledLink>
    </Container>
  )
}

export default withRouter(AdminDashboardNav)
