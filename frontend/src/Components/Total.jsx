import React from 'react'
import styled from 'styled-components'
import Totals from './Totals'

const Container = styled.div`
  padding-bottom: 1.6rem;
  border-bottom: 1px solid #dddfe2;
`

export default function Total(props) {
  return (
    <Container>
      <div>This is a total.</div>
    </Container>
  )
}
