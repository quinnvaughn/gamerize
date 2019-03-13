import React from 'react'
import styled from 'styled-components'
import { Subscribe } from 'unstated'
import { Link } from 'react-router-dom'

//local imports
import Gamer from '../Containers/BecomeAGamerContainer'
import ProgressNav from '../Components/ProgressNav'
import useTitle from '../Hooks/useTitle'

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

const ReturnContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`
const Return = styled(Link)`
  color: #fff;
  text-decoration: none;
  outline: 0;
  border-radius: 4px;
  font-size: 1.6rem;
  font-weight: 600;
  padding: 1rem 2.2rem;
  background: #f10e0e;
`

export default function BecomeAGamerFinished(props) {
  useTitle('Your application is finished')
  return (
    <Subscribe to={[Gamer]}>
      {container => (
        <PageContainer>
          <ProgressNav />
          <Content>
            <Container>
              <Title>You're all set!</Title>
              <Subtitle>
                We will review your information and get a decision to you in the
                next few days.
              </Subtitle>
              <ReturnContainer>
                <Return to="/">Return Home</Return>
              </ReturnContainer>
            </Container>
          </Content>
        </PageContainer>
      )}
    </Subscribe>
  )
}
