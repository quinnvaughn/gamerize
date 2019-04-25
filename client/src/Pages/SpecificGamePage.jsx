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
  font-weight: 400;
  color: black;
  margin-bottom: 1.2rem;
`

const Header = styled.div`
  height: 223px;
  position: relative;
`

const Container = styled.div`
  display: flex;
  height: 223px;
`

const InfoContainer = styled.div`
  margin-left: 1rem;
`

const Background = styled(Image)`
  height: 100%;
  position: absolute;
  width: 100%;
  opacity: 0.6;
  z-index: -1;
`

const GET_GAME = gql`
  query($name: String!) {
    specificGame(name: $name) {
      name
      tags
      banner
      picture
      numSessions
      sessions {
        system
        numReviews
        reviewRating
        id
        creator {
          username
          name
          profilePicture
        }
        title
        price
      }
    }
  }
`

export default function SpecificGamePage(props) {
  const { data, loading } = useQuery(GET_GAME, {
    variables: { name: noUnderscores(props.match.params.game) },
  })
  const { specificGame: game } = data
  return loading ? (
    <Loading />
  ) : (
    <PageContainer>
      <NavBar />
      <Header>
        <Background publicId={game.banner} />
        <HeaderContent>
          <Container>
            <Image publicId={game.picture} width="200" />
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
          </Container>
        </HeaderContent>
      </Header>
      <Content>
        <InnerContent>
          <GamesRow name={game.name} sessions={game.sessions} />
        </InnerContent>
      </Content>
    </PageContainer>
  )
}
