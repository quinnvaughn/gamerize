import React from 'react'
import styled from 'styled-components'

//local imports
import GamerTypeFilter from './GamerTypeFilter'

const Container = styled.div`
  padding: 10px 80px;
  border-bottom: 1px solid #d3d3d3;
  background: white;
  width: 100vw;
  z-index: 9999;
  display: flex;
  align-items: center;
  position: sticky;
  height: 50px;
  top: 60px;
  left: 0;
`

export default function Filters(props) {
  return (
    <Container>
      <GamerTypeFilter />
    </Container>
  )
}
