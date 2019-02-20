import React from 'react'
import styled from 'styled-components'
import _ from 'underscore'

import NavBar from '../Components/NavBar'
import Filters from '../Components/Filters'
import TopSessionsRow from '../Components/TopSessionsRow'

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

const gamers = [
  {
    name: 'Kyle',
    gamerType: 'Celebrities',
    systems: ['Xbox One'],
    price: 180,
    rating: 4.8,
    numRatings: 500,
    username: 'SuperDuperKyle',
  },
  {
    name: 'Taylor Bennett',
    gamerType: 'Celebrities',
    systems: ['PS4'],
    price: 200,
    rating: 4.0,
    numRatings: 400,
    username: 'Taylor_Bennett',
  },
  {
    name: 'Shroud',
    gamerType: 'Streamers',
    systems: ['Xbox One, PC'],
    price: 200,
    rating: 4.92,
    numRatings: 2000,
    username: 'Shroud',
  },
  {
    name: 'TSM Myth',
    gamerType: 'Streamers',
    systems: ['PC, PS4'],
    price: 190,
    rating: 4.6,
    numRatings: 587,
    username: 'TSM_Myth',
  },
  {
    name: 'Ninja',
    gamerType: 'Streamers',
    systems: ['PC'],
    price: 250,
    rating: 4.97,
    numRatings: 5678,
    username: 'Ninja',
  },
  {
    name: 'TimTheTatMan',
    gamerType: 'Streamers',
    systems: ['PC'],
    price: 165,
    rating: 4.8,
    numRatings: 5123,
    username: 'TimTheTatMan',
  },
  {
    name: 'DisguisedToast',
    gamerType: 'Streamers',
    systems: ['PC'],
    price: 100,
    rating: 4.8,
    numRatings: 786,
    username: 'DisguisedToast',
  },
  {
    name: 'PewDiePie',
    gamerType: 'Youtubers',
    systems: ['Xbox One'],
    price: 300,
    rating: 4.4,
    numRatings: 1999,
    username: 'PewDiePie',
  },
]

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
