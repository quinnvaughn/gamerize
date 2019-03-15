import React, { useState } from 'react'
import styled from 'styled-components'
import ReactCardFlip from 'react-card-flip'

//local imports
import { noUnderscores } from '../utils/Strings'

const Card = styled.div`
  background: #fff;
  border: 1px solid #dddfe2;
  border-radius: 4px;
  padding: 2rem;
  width: 100%;
  cursor: pointer;
  margin-bottom: 1rem;
  min-height: 100%;
  :hover {
    background: #ededed;
  }
  div {
    cursor: inherit;
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

export default function GamerSessionCard({ session }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <ReactCardFlip isFlipped={flipped} flipDirection="horizontal">
      <Card key="front" onClick={() => setFlipped(true)}>
        <SessionTitle>{session.title}</SessionTitle>
        <Game>{noUnderscores(session.game)}</Game>
        <Gamers>
          {`Gamers: `}
          <Gamer>Quinn</Gamer>
        </Gamers>
        <Length>{`${session.length} minutes`}</Length>
        {/* Will be names of gamers when I'm actually getting from db. Will be mapped.*/}
      </Card>
      <Card key="back" onClick={() => setFlipped(false)}>
        <input type="text" onClick={e => e.stopPropagation()} />
      </Card>
    </ReactCardFlip>
  )
}
