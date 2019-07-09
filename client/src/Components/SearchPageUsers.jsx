import React from 'react'
import styled from 'styled-components'
import SearchPageUsersRow from './SearchPageUsersRow'

const Container = styled.div`
  width: 100%;
`

const Title = styled.h1`
  font-size: 3.4rem;
  margin-left: 0.8rem;
`

export default function SearchPageUsers(props) {
  return props.users && props.users.length > 0 ? (
    <Container>
      <Title>Users</Title>
      <SearchPageUsersRow users={props.users} first={10} />
    </Container>
  ) : null
}
