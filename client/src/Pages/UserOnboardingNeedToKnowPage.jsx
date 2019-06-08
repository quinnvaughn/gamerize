import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

//local imports
import NavBar from '../Components/NavBar'

const PageContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh;
`

const Content = styled.div`
  @media (min-width: 744px) {
    max-width: 696px;
  }
  @media (min-width: 1128px) {
    max-width: 1080px;
  }
  margin: 0 auto;
  width: auto;
  padding-right: 2.4rem;
  padding-left: 2.4rem;
`

const NeedToKnow = styled.div`
  padding-top: 9.6rem;
  padding-bottom: 8rem;
  border-bottom: 1px solid #dddfe2;
`

const Info = styled.div`
  font-size: 6rem;
  line-height: 6.4rem;
  letter-spacing: -2.5px;
  font-weight: 800;
  text-align: center;
  margin-bottom: 3rem;
`

const Alpha = styled.div`
  @media (min-width: 744px) {
    max-width: 680px;
    margin: 0 auto;
  }
  word-wrap: break-word;
  white-space: pre-wrap;
  font-size: 2.4rem;
  line-height: 3rem;
  font-weight: 400;
  text-align: center;
`

const Title = styled.div`
  word-wrap: break-word;
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.75em;
`

const Subtitle = styled.div`
  font-weight: 400;
  font-size: 1.8rem;
  line-height: 1.5em;
  margin-bottom: 2rem;
`

const LetsGo = styled(Link)`
  display: inline-block;
  margin-bottom: 1rem;
  color: #fff;
  text-decoration: none;
  outline: 0;
  border: 0;
  border-radius: 4px;
  font-size: 1.6rem;
  font-weight: 600;
  padding: 1rem 2.2rem;
  background: ${props => (props.disabled ? '#dddfe2' : '#db1422')};
  pointer-events: ${props => props.disabled && 'none'};
`

export default function UserOnboardingNeedToKnowPage(props) {
  return (
    <PageContainer>
      <NavBar />
      <Content>
        <NeedToKnow>
          <Info>Things you need to know</Info>
          <Title>Invites</Title>
          <Subtitle>
            If you add more than one player in a session, your invites will be
            under the sessions link. You can only invite your added friends.
          </Subtitle>
          <Title>Paying</Title>
          <Subtitle>
            In the future, we want to be able to split up payments to you and
            your invited friends, but our current system doesn't do that, so you
            will have to settle that outside the website, unfortunately.
          </Subtitle>
          <Title>Gamertags</Title>
          <Subtitle>
            Be sure to add your gamertags. You can't add a session until the
            correct gamertag is on your profile.
          </Subtitle>
          <Title>Features</Title>
          <Subtitle>
            Not all the features we plan on having on the beta and beyond are
            here, but let us know if you would like something to be added in the
            future!
          </Subtitle>
          <Title>Game Length</Title>
          <Subtitle>
            Make sure your gamers are playing long enough games. If you die in a
            BR game in the first couple of minutes, for example, you should
            expect another game to be played.
          </Subtitle>
          <Title>Most important</Title>
          <Subtitle>
            Have fun! And please try to play as many games as you can so we can
            get the best feedback from you.
          </Subtitle>
          <LetsGo to="/">Let's go!</LetsGo>
        </NeedToKnow>
      </Content>
    </PageContainer>
  )
}
