import React from 'react'
import styled from 'styled-components'

const Container = styled.footer`
  margin: 0;
  margin-top: 20px;
  box-sizing: border-box;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #d3d3d3;
`

const Copyright = styled.div`
  font-size: 14px;
`

export default function Footer(props) {
  const date = new Date()
  return (
    <Container>
      <Copyright>&#169; {`${date.getFullYear()} Gamerize`}</Copyright>
    </Container>
  )
}
