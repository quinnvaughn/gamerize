import React, { useRef, useCallback, useState } from 'react'
import styled from 'styled-components'
import { Image } from 'cloudinary-react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

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
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`

export default function IconWithDropdown(props) {
  const node = useRef()
  const [open, setOpen] = useState(false)
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
          <div>Hello</div>
        </Dropdown>
      )}
    </IconContainer>
  )
}
