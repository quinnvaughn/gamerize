import React from 'react'
import styled from 'styled-components'
//local imports
import NavBar from '../Components/NavBar'
import DisplayGames from '../Components/DisplayGames'

const PageContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh;
`

const Content = styled.div`
  margin: 0 auto !important;
  padding-top: 2rem;

  @media(max-width: 1127px) {
    padding-left: 2.4rem;
    padding-right: 2.4rem;
  }

  @media (min-width: 1128px) {
    padding-left: 8rem;
  padding-right: 8rem;
  }
`

const Title = styled.h2`
  font-weight: 800;
  font-size: 3rem;
`

export default function GamesPage(props) {
  return (
    <PageContainer>
      <NavBar />
      <Content>
        <Title>Explore games</Title>
        <DisplayGames />
      </Content>
    </PageContainer>
  )
}
