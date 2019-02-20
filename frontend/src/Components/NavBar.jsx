import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

//local imports
import SearchBar from './SearchBar'

const Container = styled.nav`
  height: 60px;
  border-bottom: 1px solid #dddfe2;
  width: 100vw;
  position: sticky;
  top: 0;
  background: white;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 20px 40px 20px 80px;
  -webkit-backface-visibility: hidden;
`

const Links = styled.div``

const StyledLink = styled(Link)`
  font-size: 16px;
  color: black;
  text-decoration: none;
  margin-right: 15px;
  :last-child {
    margin-right: 0;
  }
  :hover {
    cursor: pointer;
    color: red;
  }
`

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

export default function NavBar(props) {
  return (
    <Container>
      <SearchBar />
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
