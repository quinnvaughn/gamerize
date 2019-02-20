import React from 'react'
import styled from 'styled-components'
//local imports
import NavBar from '../Components/NavBar'
import GamerRow from '../Components/TopGamersRow'

import Jumbotron from '../Components/Jumbotron'
import GamesRow from '../Components/TopGamesRow'
import Footer from '../Components/Footer'

const PageContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  position: relative;
  min-height: 100vh;
  padding-bottom: 6rem;
`

const Content = styled.div`
  margin: 0 auto !important;
  padding: 2rem;
  max-width: 108rem;
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
      <Footer />
    </PageContainer>
  )
}
