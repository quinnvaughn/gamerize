import React from 'react'
import styled from 'styled-components'
import { Subscribe } from 'unstated'

import SessionsContainer from '../Containers/SessionsContainer'
import Total from './Total'

const Container = styled.div`
  width: 100%;
  padding: 0.8rem 0;
`

export default function Totals(props) {
  return (
    <Container>
      <Subscribe to={[SessionsContainer]}>
        {sessions =>
          sessions.state.selected.map(session => <Total session={session} />)
        }
      </Subscribe>
    </Container>
  )
}
