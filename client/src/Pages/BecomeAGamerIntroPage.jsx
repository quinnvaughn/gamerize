import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'

//local imports
import NavBar from '../Components/NavBar'
import ErrorPage from './ErrorPage'
import Loading from '../Components/Loading'

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

const Setup = styled.div`
  padding-top: 9.6rem;
  padding-bottom: 8rem;
  border-bottom: 1px solid #dddfe2;
`

const StartGaming = styled.div`
  font-size: 6rem;
  line-height: 6.4rem;
  letter-spacing: -2.5px;
  font-weight: 800;
  text-align: center;
  margin-bottom: 3rem;
`

const Hosting = styled.div`
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

const HowYouGame = styled.div`
  padding-top: 6rem;
  border-bottom: 1px solid #dddfe2;
`

const HowYouGameTitle = styled.div`
  font-size: 6rem;
  line-height: 6.4rem;
  letter-spacing: -2.5px;
  font-weight: 800;
  text-align: center;
  margin-bottom: 4rem;
`

const Squares = styled.div`
  display: flex;
`

const SquaresTitle = styled.div`
  word-wrap: break-word;
  font-size: 2.4rem;
  font-weight: 800;
  line-height: 1.25em;
  margin-bottom: 1rem;
`

const SquaresInfo = styled.p`
  word-wrap: break-word;
  white-space: pre-wrap;
  overflow: unset;
  font-size: 1.6rem;
  line-height: 1.75em;
  font-weight: 400;
`

const FlexHalf = styled.div`
  flex: 1;
  margin-right: 6.4rem;
`

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`

const Ready = styled.div`
  padding-top: 6rem;
  padding-bottom: 8rem;
  text-align: center;
`

const ReadyTitle = styled.div`
  font-size: 6rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 4rem;
`

const GetStarted = styled(Link)`
  color: #fff;
  text-decoration: none;
  outline: 0;
  border-radius: 4px;
  font-size: 1.6rem;
  font-weight: 600;
  padding: 1rem 2.2rem;
  background: #db1422;
`

const StopContainer = styled.div`
  padding-top: 9.6rem;
  padding-bottom: 8rem;
  border-bottom: 1px solid #dddfe2;
`
const Stop = styled.div`
  font-size: 6rem;
  line-height: 6.4rem;
  letter-spacing: -2.5px;
  font-weight: 800;
  text-align: center;
  margin-bottom: 3rem;
`

const Already = styled.div`
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

const GoBackContainer = styled.div`
  display: flex;
  align-items: center;
  padding-top: 2rem;
  justify-content: center;
`

const GoBack = styled(Link)`
  color: #fff;
  text-decoration: none;
  outline: 0;
  border-radius: 4px;
  font-size: 1.6rem;
  font-weight: 600;
  padding: 1rem 2.2rem;
  background: #db1422;
`

const GET_ME = gql`
  {
    me {
      id
      currentGamerRequest
    }
  }
`

export default function BecomeAGamerIntroPage(props) {
  const { data, loading, refetch, error } = useQuery(GET_ME)
  useEffect(() => {
    refetch()
  }, {})
  return loading ? (
    <Loading />
  ) : (
    <PageContainer>
      <NavBar />
      {data.me && data.me.currentGamerRequest ? (
        <Content>
          <StopContainer>
            <Stop>Stop!</Stop>
            <Already>
              You already have a pending gamer request. We'll get to it as soon
              as possible. In the meantime, keep being awesome.
            </Already>
            <GoBackContainer>
              <GoBack to="/">Go Back</GoBack>
            </GoBackContainer>
          </StopContainer>
        </Content>
      ) : error ? (
        <ErrorPage errors={error} />
      ) : (
        <Content>
          <Setup>
            <StartGaming>Start gaming</StartGaming>
            <Hosting>
              Hosting sessions on Gamerize is easy. Start earning money playing
              video games with your fans.
            </Hosting>
          </Setup>
          <HowYouGame>
            <HowYouGameTitle>Decide how you game</HowYouGameTitle>
            <Squares>
              <FlexHalf>
                <Flex>
                  <SquaresTitle>Game whenever</SquaresTitle>
                  <SquaresInfo>
                    You can game whenever you want, there are no minimum
                    requirements or limits.
                  </SquaresInfo>
                </Flex>
                <Flex>
                  <SquaresTitle>Coordinate your sessions</SquaresTitle>
                  <SquaresInfo>
                    We let you control your own calendar, whether that's adding
                    a consistent schedule, or sporadically adding a couple
                    sessions, you're in control of your own calendar.
                  </SquaresInfo>
                </Flex>
              </FlexHalf>
              <FlexHalf>
                <Flex>
                  <SquaresTitle>Set your own prices</SquaresTitle>
                  <SquaresInfo>
                    You can choose your own price, and we have tools that can
                    help you decide on your ideal price per session.
                  </SquaresInfo>
                </Flex>
                <Flex>
                  <SquaresTitle>Decide on your own rules</SquaresTitle>
                  <SquaresInfo>
                    You can set rules for your sessions, including:
                    <br />
                    • Minimum/Maximum amount of sessions bought
                    <br />
                    • Skill level
                    <br />
                    • Number of reviews
                    <br />• Review Rating
                  </SquaresInfo>
                </Flex>
              </FlexHalf>
            </Squares>
          </HowYouGame>
          <Ready>
            <ReadyTitle>Ready to start earning money?</ReadyTitle>
            <GetStarted to="/become-a-gamer/background">Get Started</GetStarted>
          </Ready>
        </Content>
      )}
    </PageContainer>
  )
}
