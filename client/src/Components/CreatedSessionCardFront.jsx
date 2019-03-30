import React, { useEffect } from 'react'
import styled from 'styled-components'

//local imports
import { capitalize, noUnderscores } from '../utils/Strings'

const Card = styled.div`
  background: #fff;
  border: 1px solid #dddfe2;
  border-radius: 4px;
  padding: 2rem;
  width: 100%;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  :hover {
    box-shadow: ${props =>
      !props.back &&
      '0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(26, 26, 29, 0.08)'};
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

const Price = styled.div`
  font-size: 1.7rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const Length = styled.div`
  font-size: 1.7rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const Systems = styled.div`
  margin-bottom: 0.5rem;
`

const SystemTitle = styled.span`
  font-size: 1.7rem;
  font-weight: 600;
`

const System = styled.span`
  font-size: 1.7rem;
  font-weight: 400;
`

const Slots = styled.div`
  font-size: 1.7rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const Type = styled.div`
  margin-bottom: 0.5rem;
`

const TypeTitle = styled.span`
  font-size: 1.7rem;
  font-weight: 600;
`

const TypeGame = styled.span`
  font-size: 1.7rem;
  font-weight: 400;
`

export default function CreatedSessionCardFront({ session, buffer, dispatch }) {
  useEffect(() => {
    dispatch({ type: 'setTitle', payload: session.title })
    dispatch({ type: 'setGame', payload: session.game.name })
    dispatch({ type: 'setPrice', payload: session.price })
    dispatch({ type: 'setLength', payload: session.length })
    dispatch({ type: 'setSlots', payload: session.slots })
    dispatch({ type: 'setType', payload: session.type })
    dispatch({ type: 'setSystem', payload: session.system })
  }, [])
  return (
    <Card
      onClick={() => {
        dispatch({ type: 'flip', payload: true })
      }}
    >
      <SessionTitle>{session.title}</SessionTitle>
      <Game>{session.game.name}</Game>
      <Price>{`$${session.price} a slot`}</Price>
      <Length>{`${session.length + buffer} minutes a game`}</Length>
      <Systems>
        <SystemTitle>{`System: `}</SystemTitle>
        <System>{`${
          session.system === 'PC'
            ? session.system
            : capitalize(noUnderscores(session.system))
        }`}</System>
      </Systems>
      <Slots>{`${session.slots} slots per game`}</Slots>
      <Type>
        <TypeTitle>{`Type of game: `}</TypeTitle>
        <TypeGame>{`${capitalize(session.type)}`}</TypeGame>
      </Type>
    </Card>
  )
}
