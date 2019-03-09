import React from 'react'
import styled from 'styled-components'

//local imports
//import GamerTypeFilter from './GamerTypeFilter'

const Container = styled.div`
  padding: 1rem 8rem;
  border-bottom: 1px solid #dddfe2;
  background: white;
  width: 100vw;
  z-index: 1;
  display: flex;
  align-items: center;
  position: sticky;
  height: 5rem;
  top: 8rem;
  left: 0;
`

export default function Filters(props) {
  return (
    <Container>
      <div>Hello</div>
    </Container>
  )
}
