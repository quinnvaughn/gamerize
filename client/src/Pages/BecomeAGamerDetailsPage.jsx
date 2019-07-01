import React from 'react'
import styled from 'styled-components'
import { Subscribe } from 'unstated'

//local imports
import Gamer from '../Containers/BecomeAGamerContainer'
import ProgressNav from '../Components/ProgressNav'
import useTitle from '../Hooks/useTitle'
import SocialMediaInput from '../Components/SocialMediaInput'
import BecomeAGamerDetailsFooter from '../Components/BecomeAGamerDetailsFooter'

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

function BecomeAGamerDetails(props) {
  useTitle('Let us know who you are')
  return (
    <Subscribe to={[Gamer]}>
      {container => (
        <PageContainer>
          <ProgressNav />
          <Content>
            <Container>
              <Title>Your links</Title>
              <Subtitle>
                We require at least one of these to know you have a sizable
                enough presence on the internet to reach out to fans. Also, you
                must currently be living in America to be approved as a gamer.
                We hope to address this in the future.
              </Subtitle>
              <SocialMediaInput
                container={container}
                socialMedia="twitter"
                color="#38A1F3"
                label="Twitter"
              />
              <SocialMediaInput
                container={container}
                socialMedia="facebook"
                color="#4267b2"
                label="Facebook Page"
              />
              <SocialMediaInput
                container={container}
                socialMedia="youtube"
                color="#ED3833"
                label="Youtube"
              />
              <SocialMediaInput
                container={container}
                socialMedia="instagram"
                color="#C13584"
                label="Instagram"
              />
              <SocialMediaInput
                container={container}
                socialMedia="twitch"
                color="#6441A5"
                label="Twitch"
              />
              <SocialMediaInput
                container={container}
                socialMedia="snapchat"
                color="#FDD835"
                label="Snapchat"
              />
            </Container>
            <BecomeAGamerDetailsFooter container={container} />
          </Content>
        </PageContainer>
      )}
    </Subscribe>
  )
}

export default BecomeAGamerDetails
