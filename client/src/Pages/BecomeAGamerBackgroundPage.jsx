import React from 'react'
import styled from 'styled-components'

//local imports
import ProgressNav from '../Components/ProgressNav'
import TypeOfGamerList from '../Components/TypeOfGamerList'
import BecomeAGamerBackgroundFooter from '../Components/BecomeAGamerBackgroundFooter'

const PageContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh;
`

const Content = styled.div`
  max-width: 91.2rem;
  margin: 0 auto;
  padding-left: 2.4rem;
  padding-right: 2.4rem;
  padding-top: 7rem;
  margin-bottom: 9rem;
`

const Container = styled.div`
  width: 60%;
  padding: 3rem 3rem 1.6rem;
  height: 100%;
  position: relative;
  @media (max-width: 1127px) {
    width: 100%;
  }
`

const Title = styled.div`
  word-wrap: break-word;
  font-size: 2.4rem;
  font-weight: 800;
  line-height: 1.75em;
`

const Subtitle = styled.div`
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 1.5em;
  margin-bottom: 2rem;
`

const Types = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 4rem;
`

const DontSeeYours = styled.div`
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
`

const YoursTitle = styled.div`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`

const YoursText = styled.textarea`
  border-radius: 4px;
  padding-top: 0.5rem;
  padding-left: 0.5rem;
  font-size: 1.6rem;
  outline: none;
  :focus {
    border: 1px solid #db1422;
  }
`

const occupations = [
  'CELEBRITY',
  'INFLUENCER',
  'ENTERTAINER',
  'STREAMER',
  'YOUTUBER',
  'MEDIA',
  'SPORTS_PERSONALITY',
  'INTERNET_PERSONALITY',
  'PROFESSIONAL_ATHLETE',
  'PROFESSIONAL_GAMER',
  'ACTOR',
  'ACTRESS',
  'COMEDIAN',
  'ROCK_STAR',
  'RAPPER',
  'SINGER',
  'MUSICIAN',
  'POLITICIAN',
  'DJ',
  'MUSIC_PRODUCER',
  'ENTREPRENEUR',
  'ARTIST',
  'MODEL',
  'ADULT_PERFORMER',
]

export default function BecomeAGamerBackground(props) {
  return (
    <PageContainer>
      <ProgressNav />
      <Content>
        <Container>
          <Title>What kind of gamer are you?</Title>
          <Subtitle>
            You may pick multiple if they apply. Would make you show up in more
            searches.
          </Subtitle>
          <Types>
            <TypeOfGamerList array={occupations} />
          </Types>
          <DontSeeYours>
            <YoursTitle>Don't see your type? Let us know to add it.</YoursTitle>
            <YoursText rows="4" cols="50" />
          </DontSeeYours>
        </Container>
      </Content>
      <BecomeAGamerBackgroundFooter />
    </PageContainer>
  )
}
