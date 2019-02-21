import React from 'react'
import styled from 'styled-components'
import _ from 'underscore'

import NavBar from '../Components/NavBar'
import Filters from '../Components/Filters'
import TopSessionsRow from '../Components/TopSessionsRow'
import gamers from '../data/gamers'

const PageContainer = styled.div`
  width: 100%;
  max-width: 100%;
  height: 100%;
  box-sizing: border-box;
`

const TitleOfGame = styled.h1`
  font-size: 4rem;
  color: black;
  line-height: 1.2;
`

const Content = styled.div`
  margin: 0 auto !important;
  padding: 2rem;

  padding-left: 8rem;
  padding-right: 8rem;
  padding-bottom: 6rem;
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

const allGamers = _.groupBy(gamers, 'gamerType')

export default function SpecificGamePage(props) {
  return (
    <PageContainer>
      <NavBar />
      <Filters />
      <Content>
        <TitleOfGame>{`${noUnderscores(props.match.params.game)}`}</TitleOfGame>
        <Sessions>
          {props.location.state && `${props.location.state.sessions} sessions`}
        </Sessions>
        <Tags>
          {props.location.state &&
            props.location.state.tags.map(tag => <Tag>{tag}</Tag>)}
        </Tags>
        {Object.keys(allGamers).map(type => {
          let arrayOfGamers = allGamers[type]
          return (
            <TopSessionsRow
              gamers={arrayOfGamers}
              game={props.match.params.game}
              title={type}
            />
          )
        })}
      </Content>
    </PageContainer>
  )
}
