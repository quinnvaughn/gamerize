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
  padding-top: 2rem;
  padding-left: 2.4rem;
  padding-right: 2.4rem;
  max-width: none;
  overflow-anchor: none;
  padding-bottom: 6rem;
  @media (min-width: 1128px) {
    margin: 0 auto;
    padding-left: 8rem;
    padding-right: 8rem;
  }
`

const InnerContent = styled.div`
  margin-left: -0.8rem;
  margin-right: -0.8rem;
  overflow: hidden;
`

export default function HomePage(props) {
  return (
    <PageContainer>
      <NavBar />
      <Jumbotron />
      <Content>
        <InnerContent>
          <GamerRow title="Gamers" />
          <GamesRow title="Most Popular Games" />
        </InnerContent>
      </Content>
      <Footer />
    </PageContainer>
  )
}
