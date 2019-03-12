import React from 'react'
import styled from 'styled-components'
//local imports
import NavBar from '../Components/NavBar'
import DisplayGamers from '../Components/DisplayGamers'

const PageContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh;
`

const Content = styled.div`
  margin: 0 auto !important;
  padding: 2rem;

  padding-left: 8rem;
  padding-right: 8rem;
`

const Title = styled.h2`
  font-weight: 800;
  font-size: 3rem;
`

export default function GamersPage(props) {
  return (
    <PageContainer>
      <NavBar />
      <Content>
        <Title>Explore gamers</Title>
        <DisplayGamers />
      </Content>
    </PageContainer>
  )
}
