import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  display: flex;
`

const Cell = styled.div`
  padding: 2rem 1rem;
  border: 1px solid #d3d3d3;
  flex-grow: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 3rem;
  font-size: 1.8rem;
  font-weight: 600;
`

export default function GamerRequestTableColumns(props) {
  return (
    <Container>
      <Cell>Username</Cell>
      <Cell>Twitter</Cell>
      <Cell>Facebook</Cell>
      <Cell>Twitch</Cell>
      <Cell>Youtube</Cell>
      <Cell>Instagram</Cell>
      <Cell>Snapchat</Cell>
      <Cell>Age</Cell>
      <Cell>Owns own bank account</Cell>
      <Cell>Occupations</Cell>
      <Cell>Approve/Deny</Cell>
    </Container>
  )
}
