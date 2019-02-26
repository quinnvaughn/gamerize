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
  padding: 2rem 4rem 2rem 8rem;
`

const Links = styled.div`
  font-size: 1.6rem;
`

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  margin-right: 1.5rem;
  :last-child {
    margin-right: 0;
  }
  :hover {
    cursor: pointer;
    color: #e62739;
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
