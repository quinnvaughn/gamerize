import React from 'react'
import styled from 'styled-components'

//local imports
import { formatCommas } from '../utils/Components'

const Card = styled.div`
  background: #fff;
  border: 1px solid #dddfe2;
  border-radius: 4px;
  padding: 2rem;
  width: 100%;
  margin-bottom: 1rem;
  min-height: 100%;
  :hover {
    background: ${props => !props.back && '#ededed'};
    cursor: ${props => !props.back && 'pointer'};
  }
  cursor: pointer;
  div {
    cursor: pointer;
  }
`

const SessionTitle = styled.div`
  font-size: 2.2rem;
  font-weight: 900;
  margin-bottom: 0.5rem;
`

const Game = styled.div`
  font-size: 1.7rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`

const Gamers = styled.div`
  font-weight: 600;
  font-size: 1.6rem;
  word-wrap: break-word;
  margin-bottom: 0.5rem;
`

const Gamer = styled.span`
  font-weight: 400;
  margin-left: 0.5rem;
  font-size: 1.6rem;
`

const Length = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
`

export default function GamerSessionCardFront({ session, dispatch }) {
  return (
    <Card onClick={() => dispatch({ type: 'flip', payload: true })}>
      <SessionTitle>{session.title}</SessionTitle>
      <Game>{session.game.name}</Game>
      <Gamers>
        {`Gamers: `}
        {session.gamers.map((gamer, index) =>
          formatCommas({
            component: Gamer,
            array: session.gamers,
            item: gamer.username,
            index,
          })
        )}
      </Gamers>
      <Length>{`${session.length} minutes`}</Length>
      {/* Will be names of gamers when I'm actually getting from db. Will be mapped.*/}
    </Card>
  )
}
