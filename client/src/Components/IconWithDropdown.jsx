import React, { useRef, useCallback, useState } from 'react'
import styled from 'styled-components'
import { Image } from 'cloudinary-react'
import { withRouter } from 'react-router-dom'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { useApolloClient } from 'react-apollo-hooks'

import useOnOutsideClick from '../Hooks/useOnOutsideClick'

const Icon = styled(Image)`
  margin-right: 2.4rem;
  cursor: pointer;
  @media (max-width: 1127px) {
    margin-right: 0;
  }
`

const ChevronDown = styled(FaChevronDown)`
  margin-right: 2.4rem;
`

const ChevronUp = styled(FaChevronUp)`
  margin-right: 2.4rem;
`

const IconContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`

const Dropdown = styled.div`
  top: 75px;
  z-index: 3;
  left: 0;
  position: absolute;
  background: #fff;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
`

const DropdownOption = styled.div`
  background: #fff;
  cursor: pointer;
  :hover {
    background: #d3d3d3;
  }
  padding: 1rem;
  font-size: 1.6rem;
  width: 100%;
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

function IconWithDropdown(props) {
  const node = useRef()
  const [open, setOpen] = useState(false)
  const client = useApolloClient()
  useOnOutsideClick(
    node,
    useCallback(() => {
      setOpen(false)
    }, [])
  )
  return (
    <IconContainer
      ref={node}
      onClick={() => {
        setOpen(!open)
      }}
    >
      <Icon
        publicId="https://res.cloudinary.com/gamerize/image/upload/gamerize_logo.png"
        height="80"
        onClick={async () => {}}
      />
      {!open && <ChevronDown />}
      {open && <ChevronUp />}
      {open && (
        <Dropdown>
          <DropdownOption
            onClick={async () => {
              await props.history.push('/')
            }}
          >
            Home
          </DropdownOption>
          {!props.loggedIn
            ? notSignedInLinks.map(link => (
                <DropdownOption
                  onClick={async () => {
                    await props.history.push(link.path)
                  }}
                >
                  {link.text}
                </DropdownOption>
              ))
            : signedInLinks.map(link => {
                if (link.path === '/become-a-gamer' && props.gamer) {
                  return (
                    <DropdownOption
                      key={link.text}
                      onClick={async () => {
                        await props.history.push('/gamer-dashboard/home')
                      }}
                    >
                      {`Gamer Dashboard`}
                    </DropdownOption>
                  )
                } else if (link.path === '/become-a-gamer' && props.admin) {
                  return (
                    <DropdownOption
                      key={link.text}
                      onClick={async () => {
                        await props.history.push('/admin-dashboard/home')
                      }}
                    >
                      {`Admin Dashboard`}
                    </DropdownOption>
                  )
                } else {
                  return (
                    <DropdownOption
                      key={link.text}
                      onClick={async () => {
                        await props.history.push(link.path)
                      }}
                    >
                      {link.text}
                    </DropdownOption>
                  )
                }
              })}
          {props.loggedIn && (
            <DropdownOption
              key="Logout"
              onClick={async () => {
                await client.resetStore()
                await props.history.push('/')
                await localStorage.removeItem('TOKEN')
              }}
            >
              Log out
            </DropdownOption>
          )}
        </Dropdown>
      )}
    </IconContainer>
  )
}

export default withRouter(IconWithDropdown)
