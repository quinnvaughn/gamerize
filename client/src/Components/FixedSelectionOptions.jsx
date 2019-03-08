import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  z-index: 4;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  padding-top: 1.6rem;
  padding-bottom: 1.6rem;
  border-top: 1px solid #dddfe2;
`

export default function FixedSelectionOptions(props) {
  return (
    <Container>
      <div>Fixed Options</div>
    </Container>
  )
}
