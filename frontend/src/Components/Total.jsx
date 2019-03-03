import React, { useEffect } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  padding-bottom: 1.6rem;
  border-bottom: 1px solid #dddfe2;
`

export default function Total(props) {
  useEffect(() => {
    return () => {
      props.container.clearSessions()
    }
  }, {})
  return (
    <Container>
      <div>${props.session.slots * props.price}</div>
    </Container>
  )
}
