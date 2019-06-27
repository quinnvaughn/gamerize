import React, { useRef, useState, useCallback } from 'react'
import styled from 'styled-components'
import { Image } from 'cloudinary-react'

// local imports
import useOnOutsideClick from '../Hooks/useOnOutsideClick'
import NavBarAvatarDropdown from './NavBarAvatarDropdown'

const Avatar = styled(Image)`
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
    border-bottom: 2px solid #db1422;
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
  const node = useRef()
  const [dropdown, setDropdown] = useState(false)
  useOnOutsideClick(
    node,
    useCallback(() => {
      setDropdown(false)
    }, [])
  )
  return (
    <AvatarContainer
      ref={node}
      onClick={async () => {
        setDropdown(!dropdown)
      }}
    >
      <Content>
        <Avatar
          publicId={props.profilePicture}
          crop="scale"
          gravity="face"
          width="35"
          height="35"
        />
        {dropdown && (
          <NavBarAvatarDropdown gamer={props.gamer} admin={props.admin} />
        )}
      </Content>
    </AvatarContainer>
  )
}
