import React from 'react'
import styled from 'styled-components'

//local imports
import ProgressNav from '../Components/ProgressNav'
import SocialMediaInput from '../Components/SocialMediaInput'
import BecomeAGamerDetailsFooter from '../Components/BecomeAGamerDetailsFooter'
import AgeInput from '../Components/AgeInput'
import OwnBankAccount from '../Components/OwnBankAccount'

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
  return (
    <PageContainer>
      <ProgressNav />
      <Content>
        <Container>
          <Title>Info</Title>
          <Subtitle>
            We require at least one of these to know you have a sizable enough
            presence on the internet to reach out to fans. Also, you must
            currently be living in America and be in control of your own bank
            account to be approved as a gamer. We use Stripe as our payment
            provider.
          </Subtitle>
          <Subtitle>
            Please include https:// or http:// for the URL to be valid.
          </Subtitle>
          <SocialMediaInput
            socialMedia="twitter"
            color="#38A1F3"
            label="Twitter"
          />
          <SocialMediaInput
            socialMedia="facebook"
            color="#4267b2"
            label="Facebook Page"
          />
          <SocialMediaInput
            socialMedia="youtube"
            color="#ED3833"
            label="Youtube"
          />
          <SocialMediaInput
            socialMedia="instagram"
            color="#C13584"
            label="Instagram"
          />
          <SocialMediaInput
            socialMedia="twitch"
            color="#6441A5"
            label="Twitch"
          />
          <SocialMediaInput
            socialMedia="snapchat"
            color="#FDD835"
            label="Snapchat"
          />
          <br />
          <br />
          <Subtitle>
            We need this info to make sure you can use Stripe properly.
          </Subtitle>
          <AgeInput />
          <OwnBankAccount />
        </Container>
        <BecomeAGamerDetailsFooter />
      </Content>
    </PageContainer>
  )
}

export default BecomeAGamerDetails
