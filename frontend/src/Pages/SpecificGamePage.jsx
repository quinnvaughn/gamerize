import React from 'react'
import styled from 'styled-components'
import NavBar from '../Components/NavBar'
import Filters from '../Components/Filters'
import TopSessionsRow from '../Components/TopSessionsRow'
import _ from 'underscore'

const PageContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh;
`

const TitleOfGame = styled.h1`
  font-size: 40px;
  color: black;
  line-height: 1.2;
`

const Content = styled.div`
  margin: 0 auto !important;
  padding: 20px;
  padding-left: 80px;
  padding-right: 80px;
`

const Tags = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: black;
  margin-bottom: 30px;
`

const Tag = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: black;
  border: 1px solid #d3d3d3;
  padding: 4px 6px;
  display: inline-block;
  border-radius: 4px;
  margin-right: 5px;
  :hover {
    cursor: default;
  }
`

const Sessions = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: black;
  margin-bottom: 12px;
`

const gamers = [
  {
    name: 'Kyle',
    occupation: 'Celebrities',
    systems: ['Xbox One'],
    price: 180,
    rating: 4.8,
    numRatings: 500,
    username: 'SuperDuperKyle',
  },
  {
    name: 'Taylor Bennett',
    occupation: 'Celebrities',
    systems: ['PS4'],
    price: 200,
    rating: 4.0,
    numRatings: 400,
    username: 'Taylor_Bennett',
  },
  {
    name: 'Shroud',
    occupation: 'Streamers',
    systems: ['Xbox One, PC'],
    price: 200,
    rating: 4.92,
    numRatings: 2000,
    username: 'Shroud',
  },
  {
    name: 'TSM Myth',
    occupation: 'Streamers',
    systems: ['PC, PS4'],
    price: 190,
    rating: 4.6,
    numRatings: 587,
    username: 'TSM_Myth',
  },
  {
    name: 'Ninja',
    occupation: 'Streamers',
    systems: ['PC'],
    price: 250,
    rating: 4.97,
    numRatings: 5678,
    username: 'Ninja',
  },
  {
    name: 'TimTheTatMan',
    occupation: 'Streamers',
    systems: ['PC'],
    price: 165,
    rating: 4.8,
    numRatings: 5123,
    username: 'TimTheTatMan',
  },
  {
    name: 'DisguisedToast',
    occupation: 'Streamers',
    systems: ['PC'],
    price: 100,
    rating: 4.8,
    numRatings: 786,
    username: 'DisguisedToast',
  },
  {
    name: 'PewDiePie',
    occupation: 'Youtubers',
    systems: ['Xbox One'],
    price: 300,
    rating: 4.4,
    numRatings: 1999,
    username: 'PewDiePie',
  },
]

const noUnderscores = string => string.replace(/_/g, ' ')

const allGamers = _.groupBy(gamers, 'occupation')

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
