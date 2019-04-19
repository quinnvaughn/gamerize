import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'

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
  font-size: 1.2rem;
  font-weight: 400;
  color: black;
  border: 1px solid #dddfe2;
  padding: 0.4rem 0.6rem;
  display: inline-block;
  border-radius: 4px;
  margin-right: 0.8rem;
  :hover {
    cursor: default;
  }
`

const Sessions = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
  color: black;
  margin-bottom: 1.2rem;
`

const GET_GAME = gql`
  query($name: String!) {
    specificGame(name: $name) {
      name
      tags
      numSessions
      sessions {
        system
        numReviews
        reviewRating
        id
        creator {
          username
          name
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
      <Content>
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
        <InnerContent>
          <GamesRow name={game.name} sessions={game.sessions} />
        </InnerContent>
      </Content>
    </PageContainer>
  )
}
