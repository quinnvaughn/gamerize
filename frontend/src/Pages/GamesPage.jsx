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
  padding: 20px;

  padding-left: 80px;
  padding-right: 80px;
`

const Title = styled.h2`
  font-weight: 800;
  font-size: 24px;
`

export default function GamesPage(props) {
  return (
    <PageContainer>
      <NavBar />
      <Content>
        <Title>Explore Games</Title>
        <DisplayGames />
      </Content>
    </PageContainer>
  )
}
