import React from 'react'
import styled from 'styled-components'

import SearchPageSessionsRow from './SearchPageSessionsRow'

const Container = styled.div`
  width: 100%;
`

const Title = styled.h1`
  font-size: 3.4rem;
  margin-left: 0.8rem;
`

export default function SearchPageSessions(props) {
  return props.sessions && props.sessions.length > 0 ? (
    <Container>
      <Title>Sessions</Title>
      <SearchPageSessionsRow sessions={props.sessions} first={10} />
    </Container>
  ) : null
}
