import React, { useRef } from 'react'
import { useApolloClient } from 'react-apollo-hooks'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

// local imports
import DefaultAvatar from '../default-avatar.png'
import useDropdown from '../Hooks/useDropdown'

const Avatar = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  margin-right: 0.5rem;
`

const AvatarContainer = styled.div`
  padding: 0 0.8rem;
  box-sizing: border-box;
  height: 100%;
  display: flex;
  position: relative;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  border-bottom: 2px solid transparent;
  :hover {
    border-bottom: 2px solid #f10e0e;
  }
`

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
`

const Content = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 100%;
  width: 100%;
`

function NavBarAvatar(props) {
  const node = useRef()
  const [dropdown, setDropdown] = useDropdown(node, true)
  const client = useApolloClient()
  return (
    <AvatarContainer ref={node}>
      <Content>
        <Avatar src={DefaultAvatar} alt="Avatar" />
        {dropdown && (
          <Dropdown>
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
        )}
      </Content>
    </AvatarContainer>
  )
}

export default withRouter(NavBarAvatar)
