import React, { useState } from 'react'
import styled from 'styled-components'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const Container = styled.div``

const Header = styled.div`
  cursor: pointer;
  border: solid 1px #dfdfdf;
  padding: 1.5rem;
  background-color: #db1422;
  color: #fff;
  display: flex;
  justify-content: space-between;
`

const Text = styled.div`
  cursor: pointer;
  font-weight: 600;
`

const Content = styled.div`
  border-left: solid 1px #dfdfdf;
  border-right: solid 1px #dfdfdf;
  border-bottom: solid 1px #dfdfdf;
  border-radius: 0 0 5px 5px;
  padding: 1.5rem;
  font-size: 1.6rem;
  line-height: 1.5;
  margin-bottom: 0.5rem;
`

const StyledDown = styled(FaChevronDown)`
  color: #fff;
  font-size: 1.6rem;
  cursor: pointer;
`

const StyledUp = styled(FaChevronUp)`
  color: #fff;
  font-size: 1.6rem;
  cursor: pointer;
`

export default function Collapsible(props) {
  const [open, setOpen] = useState(false)
  return (
    <Container>
      <Header onClick={() => setOpen(!open)}>
        <Text>{props.title}</Text>
        {open ? <StyledUp /> : <StyledDown />}
      </Header>
      {open && <Content>{props.children}</Content>}
    </Container>
  )
}
