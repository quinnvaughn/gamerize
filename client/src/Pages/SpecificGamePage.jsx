import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'

import NavBar from '../Components/NavBar'
import Filters from '../Components/Filters'
import TopSessionsRow from '../Components/TopSessionsRow'

//data
import gamers from '../data/gamers'
import games from '../data/games'

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

const noUnderscores = string => string.replace(/_/g, ' ')

export default function SpecificGamePage(props) {
  const game = _.find(
    games,
    singleGame => singleGame.name === noUnderscores(props.match.params.game)
  )
  return (
    <PageContainer>
      <NavBar />
      <Filters />
      <Content>
        <TitleOfGame>{`${game.name}`}</TitleOfGame>
        <Sessions>{`${game.sessions} sessions`}</Sessions>
        <Tags>
          {game.tags.map(tag => (
            <Tag>{tag}</Tag>
          ))}
        </Tags>
        <InnerContent>
          <TopSessionsRow gamers={gamers} game={game} />
        </InnerContent>
      </Content>
    </PageContainer>
  )
}
