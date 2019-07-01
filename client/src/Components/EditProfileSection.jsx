import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  border: 1px solid #ebebeb;
  margin-bottom: 2rem;
`

const Top = styled.div`
  width: 100%;
  background: #ebebeb;
  padding: 1.2rem 2rem;
`

const Title = styled.h2`
  font-weight: 400;
`

const Body = styled.div`
  padding: 2rem;
`

export default function EditProfileSection(props) {
  return (
    <Container>
      <Top>
        <Title>{props.title}</Title>
      </Top>
      <Body>{props.children}</Body>
    </Container>
  )
}
