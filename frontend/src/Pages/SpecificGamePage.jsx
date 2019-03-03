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
  overflow-x: auto !important;
  white-space: normal !important;
`

const TitleOfGame = styled.h1`
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
        <InnerContent>
          <TopSessionsRow gamers={gamers} game={props.match.params.game} />
        </InnerContent>
      </Content>
    </PageContainer>
  )
}
