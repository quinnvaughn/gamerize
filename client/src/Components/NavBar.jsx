import React, { useEffect, memo } from 'react'
import styled from 'styled-components'
import { Link, withRouter } from 'react-router-dom'
import _ from 'lodash'
import Media from 'react-media'
import gql from 'graphql-tag'
import { Image } from 'cloudinary-react'
import { useQuery } from 'react-apollo-hooks'

//local imports
import NotificationBadge from './NotificationBadge'
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
    border-bottom: 2px solid #db1422;
  }
`

const NotificationContainer = styled.div`
  position: relative;
  cursor: pointer;
`

const Left = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`

const Icon = styled(Image)`
  margin-right: 2.4rem;
  cursor: pointer;
`

const notSignedInLinks = [
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
    path: '/my-sessions',
  },
  {
    text: 'Notifications',
    path: '/notifications',
  },
]

const GET_ME = gql`
  {
    me {
      id
      name
      username
      role
      profilePicture
    }
  }
`

const GET_MY_NOTIFICATIONS = gql`
  {
    numUserNotifications
  }
`
function NavBar(props) {
  const token = localStorage.getItem('TOKEN')
  const { data, loading, refetch } = useQuery(GET_ME)
  const { data: notifications, loading: secondLoading } = useQuery(
    GET_MY_NOTIFICATIONS,
    { pollInterval: 1000 }
  )
  useEffect(() => {
    refetch()
  }, [token])
  const gamer = !loading && data && data.me && data.me.role === 'GAMER'
  const admin = !loading && data && data.me && data.me.role === 'ADMIN'
  return (
    <Container className="navbar">
      <Left>
        <Icon
          publicId="https://res.cloudinary.com/gamerize/image/upload/gamerize_logo.png"
          height="80"
          onClick={async () => {
            await props.history.push('/')
          }}
        />
        <SearchBar />
      </Left>
      {loading || secondLoading ? null : (
        <Media query={{ maxWidth: 1127 }}>
          {matches =>
            matches && !_.isEmpty(data) && data.me ? (
              <Links>
                <NavBarAvatar
                  admin={admin}
                  gamer={gamer}
                  profilePicture={data.me.profilePicture}
                />
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
                        data.me.role === 'GAMER'
                      ) {
                        return (
                          <StyledLink
                            key={link.text}
                            to={'/gamer-dashboard/home'}
                          >
                            {`Gamer Dashboard`}
                          </StyledLink>
                        )
                      } else if (
                        link.path === '/become-a-gamer' &&
                        data.me.role === 'ADMIN'
                      ) {
                        return (
                          <StyledLink
                            key={link.text}
                            to={'/admin-dashboard/home'}
                          >
                            {`Admin Dashboard`}
                          </StyledLink>
                        )
                      } else if (
                        link.path === '/notifications' &&
                        notifications &&
                        notifications.numUserNotifications
                      ) {
                        return (
                          <StyledLink key={link.text} to={'/notifications'}>
                            <NotificationContainer>
                              <NotificationBadge
                                count={notifications.numUserNotifications}
                              />
                              {link.text}
                            </NotificationContainer>
                          </StyledLink>
                        )
                      } else {
                        return (
                          <StyledLink
                            key={link.text}
                            to={
                              link.path === '/sessions'
                                ? `/sessions`
                                : link.path
                            }
                          >
                            {link.text}
                          </StyledLink>
                        )
                      }
                    })}
                {!_.isEmpty(data) && !_.isEmpty(data.me) && (
                  <NavBarAvatar
                    gamer={gamer}
                    profilePicture={data.me.profilePicture}
                  />
                )}
              </Links>
            )
          }
        </Media>
      )}
    </Container>
  )
}

export default memo(withRouter(NavBar))
