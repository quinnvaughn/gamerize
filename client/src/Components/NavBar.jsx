import React, {useEffect} from 'react'
import styled from 'styled-components'
import { Link, withRouter } from 'react-router-dom'
import { useQuery } from 'react-apollo-hooks'
import _ from 'lodash'
import Media from 'react-media'
import gql from 'graphql-tag'

//local imports
import SearchBar from './SearchBar'
import NavBarAvatar from './NavBarAvatar'

const Container = styled.nav`
  height: 8rem;
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
  padding-left: 8rem;

  @media (max-width: 1127px) {
    padding-left: 2.4rem;
  }
`

const Links = styled.div`
  font-size: 1.4rem;
  display: flex;
  height: 100%;
  padding-right: 8rem;

  @media (max-width: 1127px) {
    padding-right: 2.4rem;
  }
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
    border-bottom: 2px solid #f10e0e;
  }
`

const Empty = styled.div``

const notSignedInLinks = [
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

const signedInLinks = [
  {
    text: 'Become a Gamer',
    path: '/become-a-gamer',
  },
  {
    text: 'Sessions',
    path: '/sessions',
  },
]

const GET_ME = gql`
  {
    me {
      name
      username
      isGamer
    }
  }
`
function NavBar(props) {
  const token = localStorage.getItem('TOKEN')
  const { data, loading, refetch} = useQuery(GET_ME, { skip: !token })
  useEffect(() => {
    refetch()
  }, [token])
  return (
    <Container className="navbar">
      {props.match.path !== '/users/:user' ? <SearchBar /> : <Empty />}
      {loading ? null : (
        <Media query={{ maxWidth: 1127 }}>
          {matches =>
            matches && !_.isEmpty(data) ? (
              <Links>
                <NavBarAvatar />
              </Links>
            ) : (
              <Links>
                {data === null || !_.get(data, ['me'])
                  ? notSignedInLinks.map(link => (
                      <StyledLink key={link.text} to={link.path}>
                        {link.text}
                      </StyledLink>
                    ))
                  : signedInLinks.map(link => {
                      if (
                        link.path === '/become-a-gamer' &&
                        data.me.isGamer === true
                      ) {
                        return (
                          <StyledLink
                            key={link.text}
                            to={'/gamer-dashboard/home'}
                          >
                            {`Gamer Dashboard`}
                          </StyledLink>
                        )
                      } else {
                        return (
                          <StyledLink
                            key={link.text}
                            to={
                              link.path === '/sessions'
                                ? `/sessions/${data.me.username}`
                                : link.path
                            }
                          >
                            {link.text}
                          </StyledLink>
                        )
                      }
                    })}
                {!_.isEmpty(data) && !_.isEmpty(data.me) && <NavBarAvatar />}
              </Links>
            )
          }
        </Media>
      )}
    </Container>
  )
}

export default withRouter(NavBar)
