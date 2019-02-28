import React from 'react'
import styled from 'styled-components'
import { Link, withRouter } from 'react-router-dom'

//local imports
import SearchBar from './SearchBar'

const Container = styled.nav`
  height: 6rem;
  border-bottom: 1px solid #dddfe2;
  width: 100vw;
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
`

const Links = styled.div`
  font-size: 1.4rem;
  display: flex;
  height: 100%;
  padding-right: 4rem;
`

const StyledLink = styled(Link)`
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
    border-bottom: 2px solid #e62739;
  }
`

const Empty = styled.div``

const navigationlinks = [
  {
    text: 'Become a Gamer',
    path: '/become-a-gamer',
  },
  {
    text: 'Sign Up',
    path: '/sign-up',
  },
  {
    text: 'Login',
    path: '/login',
  },
]

function NavBar(props) {
  return (
    <Container className="navbar">
      {props.match.path !== '/users/:user' ? <SearchBar /> : <Empty />}
      <Links>
        {navigationlinks.map(link => (
          <StyledLink key={link.text} to={link.path}>
            {link.text}
          </StyledLink>
        ))}
      </Links>
    </Container>
  )
}

export default withRouter(NavBar)
