import React from 'react'
import styled from 'styled-components'
//local imports
import NavBar from '../Components/NavBar'
import GamerRow from '../Components/GamerRow'

import Jumbotron from '../Components/Jumbotron'
import GamesRow from '../Components/GamesRow'

const PageContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh;
`

const Content = styled.div`
  margin: 0 auto !important;
  padding: 20px;
  max-width: 1080px;
`

export default function HomePage(props) {
  return (
    <PageContainer>
      <NavBar />
      <Jumbotron />
      <Content>
        <GamerRow title="Gamers" />
        <GamesRow title="Most Popular Games" />
      </Content>
    </PageContainer>
  )
}
