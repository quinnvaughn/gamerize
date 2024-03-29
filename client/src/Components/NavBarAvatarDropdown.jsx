import React, { memo } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import Media from 'react-media'
import { useApolloClient } from 'react-apollo-hooks'

const Dropdown = styled.div`
  position: absolute;
  top: 8rem;
  right: 0;
  background: #fff;
  z-index: 10;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 5px;
  border: 1px solid rgb(235, 235, 235);
  border-top: none;
  border-radius: 4px;
  :hover {
    z-index: 9999;
  }
`

const DropdownOption = styled.div`
  background: #fff;
  cursor: pointer;
  :hover {
    background: #d3d3d3;
  }
  padding: 1rem;
  width: 100%;
`

const NavBarAvatarDropdown = memo(function NavBarAvatarDropdown(props) {
  const client = useApolloClient()
  return (
    <Media query={{ maxWidth: 1127 }}>
      {matches =>
        matches ? (
          <Dropdown>
            {!props.gamer && !props.admin && (
              <DropdownOption
                onClick={async () => {
                  await props.history.push('/become-a-gamer')
                }}
              >
                Become a Gamer
              </DropdownOption>
            )}
            {props.admin && (
              <DropdownOption
                onClick={async () => {
                  await props.history.push('/admin-dashboard/home')
                }}
              >
                Admin Dashboard
              </DropdownOption>
            )}
            {props.gamer && (
              <DropdownOption
                onClick={async () => {
                  await props.history.push('/gamer-dashboard/home')
                }}
              >
                Gamer Dashboard
              </DropdownOption>
            )}
            <DropdownOption
              onClick={async () => {
                await props.history.push('/sessions')
              }}
            >
              Sessions
            </DropdownOption>
            <DropdownOption
              onClick={async () => {
                await props.history.push('/notifications')
              }}
            >
              Notifications
            </DropdownOption>
            <DropdownOption
              onClick={async () => {
                await props.history.push('/profile/edit')
              }}
            >
              Profile
            </DropdownOption>
            <DropdownOption
              onClick={async () => {
                await client.resetStore()
                await props.history.push('/')
                await localStorage.removeItem('TOKEN')
              }}
            >
              Logout
            </DropdownOption>
          </Dropdown>
        ) : (
          <Dropdown>
            <DropdownOption
              onClick={async () => {
                await props.history.push('/profile/edit')
              }}
            >
              Profile
            </DropdownOption>
            <DropdownOption
              onClick={async () => {
                await client.resetStore()
                await props.history.push('/')
                await localStorage.removeItem('TOKEN')
              }}
            >
              Logout
            </DropdownOption>
          </Dropdown>
        )
      }
    </Media>
  )
})
export default withRouter(NavBarAvatarDropdown)
