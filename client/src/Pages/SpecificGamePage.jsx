import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import { Image } from 'cloudinary-react'

import NavBar from '../Components/NavBar'
import GamesRow from '../Components/GamesRow'
import { noUnderscores, mapTags } from '../utils/Strings'
import Loading from '../Components/Loading'
import ErrorPage from './ErrorPage'

const PageContainer = styled.div`
  width: 100%;
  max-width: 100%;
  height: 100%;
  box-sizing: border-box;
  white-space: normal !important;
`

const TitleOfGame = styled.h1`
  font-weight: 800;
  font-size: 4rem;
  color: black;
  line-height: 1.2;
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

const HeaderContent = styled.div`
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

const Tags = styled.div`
  font-size: 1.4rem;
  font-weight: 400;
  color: black;
  margin-bottom: 3rem;
`

const Tag = styled.div`
  padding: 0.5rem;
  background: #db1422;
  border-radius: 4px;
  font-weight: 600;
  color: #fff;
  display: inline-flex;
  font-size: 1.4rem;
  margin-right: 0.5rem;
`

const Sessions = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: black;
  margin-bottom: 1.2rem;
`

const Header = styled.div`
  content: '';
  position: relative;
  overflow: hidden;
`

const InfoContainer = styled.div`
  justify-content: flex-end;
  display: flex;
  flex-direction: column;
`

const Background = styled.div`
  height: 100%;
  width: 100%;
  z-index: -1;
  position: absolute;
  background-image: url(${props => props.publicId});
  background-position: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #392e5c;
`

const Placeholder = styled.div`
  margin-left: 3rem;
  margin-bottom: 3rem;
  margin-right: 2rem;
  margin-top: 3rem;
  left: 0;
  bottom: 0;
  right: 0;
  @media (min-width: 1128px) {
    margin-left: 8rem;
  }
`

const Flex = styled.div`
  display: flex;
`

const FlexShrink = styled.div`
  margin-right: 2rem;
  flex-shrink: 1;
`

const Container = styled.div`
  position: relative;
  width: 100%;
  background: linear-gradient(
    0deg,
    #faf9fa 0,
    rgba(250, 249, 250, 0.9) 25%,
    rgba(250, 249, 250, 0.3)
  );
`

const GameImage = styled(Image)`
  max-width: 100%;
  vertical-align: top;
  width: 13rem;
`

const GET_GAME = gql`
  query($name: String!) {
    specificGame(name: $name) {
      name
      tags
      banner
      picture
      numSessions
      id
      sessions {
        system
        numReviews
        reviewRating
        id
        creator {
          id
          username
          displayName
          profilePicture
        }
        title
        price
      }
    }
  }
`

export default function SpecificGamePage(props) {
  const { data, loading, error } = useQuery(GET_GAME, {
    variables: { name: noUnderscores(props.match.params.game) },
  })
  const { specificGame: game } = data
  return loading ? (
    <Loading />
  ) : error ? (
    <ErrorPage errors={error} />
  ) : (
    <PageContainer>
      <NavBar />
      <Container>
        <Header>
          <Background publicId={game.banner} />
          <Placeholder>
            <Flex>
              <FlexShrink>
                <GameImage publicId={game.picture} />
              </FlexShrink>
              <InfoContainer>
                <TitleOfGame>{`${game.name}`}</TitleOfGame>
                <Sessions>{`${game.numSessions} ${
                  game.numSessions === 1 ? 'session' : 'sessions'
                }
        `}</Sessions>
                <Tags>
                  {game.tags.map(tag => (
                    <Tag>{mapTags(tag)}</Tag>
                  ))}
                </Tags>
              </InfoContainer>
            </Flex>
          </Placeholder>
        </Header>
        <Content>
          <InnerContent>
            <GamesRow name={game.name} sessions={game.sessions} />
          </InnerContent>
        </Content>
      </Container>
    </PageContainer>
  )
}
