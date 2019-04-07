import React, { useReducer } from 'react'
import styled from 'styled-components'

const PageContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh;
`

const Content = styled.div`
  width: 100%;
  max-width: 108rem;
  margin: 0 auto;
  padding-left: 8rem;
  padding-right: 8rem;
  padding-top: 1rem;
  margin-bottom: 9rem;
`

const Account = styled.div`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
`

const Top = styled.div`
  width: 100%;
  padding-top: 2rem;
  padding-bottom: 2rem;
  padding-right: 1rem;
`

const Section = styled.div`
  width: 100%;
  margin-bottom: 2rem;
`

const SectionTitle = styled.div`
  font-size: 2rem;
  font-weight: 400;
  padding-bottom: 1rem;
  width: 100%;
  border-bottom: 1px solid black;
`

const Subtitle = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
`

const initialState = {
  favoriteGames: [],
  setup: 0,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'loadFavoriteGames':
      return { ...state, favoriteGames: action.payload }
    case 'loadSetup':
      return { ...state, setup: action.payload }
    case 'addFavoriteGame':
      return {
        ...state,
        favoriteGames: [...state.favoriteGames, action.payload],
      }
    case 'editSetupLength':
      return { ...state, setup: action.payload }
    default:
      return state
  }
}

export default function GamerDashboardAccount(props) {
  return (
    <PageContainer>
      <Content>
        <Top>
          <Account>Account</Account>
        </Top>
        <Section>
          <SectionTitle>Favorite Games</SectionTitle>
          <Subtitle>Add 3 favorite games</Subtitle>
        </Section>
        <Section>
          <SectionTitle>Setup</SectionTitle>
        </Section>
      </Content>
    </PageContainer>
  )
}
