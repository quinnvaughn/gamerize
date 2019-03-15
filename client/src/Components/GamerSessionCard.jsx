import React, { useState } from 'react'
import styled from 'styled-components'
import ReactCardFlip from 'react-card-flip'
import TimePicker from 'react-time-picker'

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

const Buttons = styled.div`
  display: flex;
`

const OneAdd = styled.div``

const BulkAdd = styled.div``

export default function GamerSessionCard({ session }) {
  const [addState, setAddState] = useState(null)
  const [flipped, setFlipped] = useState(false)
  const [time, setTime] = useState('')
  const [endTime, setEndTime] = useState('')
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
        {addState === null && (
          <Buttons>
            <button
              onClick={e => {
                e.stopPropagation()
                setAddState('one')
              }}
            >
              Add One
            </button>
            <button
              onClick={e => {
                e.stopPropagation()
                setAddState('bulk')
              }}
            >
              Add Bulk
            </button>
          </Buttons>
        )}
        {addState === 'one' && (
          <OneAdd>
            <div>Time Start</div>
            <TimePicker
              disableClock
              onClick={e => e.stopPropagation()}
              onChange={time => setTime(time)}
            />
          </OneAdd>
        )}
        {addState === 'bulk' && (
          <BulkAdd>
            <div>Time Start</div>
            <TimePicker
              disableClock
              onClick={e => e.stopPropagation()}
              onChange={time => setTime(time)}
              value={time}
            />
            <div>Time End</div>
            <TimePicker
              disableClock
              onClick={e => e.stopPropagation()}
              onChange={time => setEndTime(time)}
              value={endTime}
            />
          </BulkAdd>
        )}
      </Card>
    </ReactCardFlip>
  )
}
