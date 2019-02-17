import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

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
  position: fixed;
  height: 50px;
  top: 60px;
  left: 0;
`

const GlobalStyle = createGlobalStyle`
  body {
    margin-top: 110px;
    height: calc(100% - 110px);
  }
`

export default function Filters(props) {
  return (
    <Container>
      <GamerTypeFilter />
      <GlobalStyle />
    </Container>
  )
}
