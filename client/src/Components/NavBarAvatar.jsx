import React, { useState } from 'react'
import styled from 'styled-components'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import Media from 'react-media'

// local imports
import DefaultAvatar from '../default-avatar.png'

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
  padding: 2rem;
  z-index: 10;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 5px;
  border: 1px solid rgb(235, 235, 235);
  border-top: none;
  border-radius: 4px;
  :hover {
    z-index: 9999;
  }
`

const Content = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 100%;
  width: 100%;
`

export default function NavBarAvatar(props) {
  const [open, setOpen] = useState(false)
  return (
    <AvatarContainer onClick={() => setOpen(!open)}>
      <Content>
        <Avatar src={DefaultAvatar} alt="Avatar" />
        {open && <Dropdown>This is a dropdown</Dropdown>}
      </Content>
    </AvatarContainer>
  )
}
