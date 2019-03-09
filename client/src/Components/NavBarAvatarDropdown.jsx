import React, {memo} from 'react'
import styled from 'styled-components'


const Container = styled.div`
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

const NavBarAvatarDropdown = memo(function NavBarAvatarDropdown (props) {
    return (
        <Container>
            <div>Hello</div>
        </Container>
    )
})
export default NavBarAvatarDropdown