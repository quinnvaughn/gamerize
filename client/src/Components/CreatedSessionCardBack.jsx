import React from 'react'
import styled from 'styled-components'
import { useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'

//local imports
import GameSessionDropdown from './GameSessionDropdown'
import TypeSessionDropdown from './TypeSessionDropdown'
import SystemsSessionDropdown from './SystemsSessionDropdown'

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
`

const TitleContainer = styled.div`
  margin-bottom: 0.5rem;
`
const Title = styled.span`
  font-size: 2rem;
  font-weight: 700;
`

const SessionTitle = styled.input`
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #ebebeb;
  transition: box-shadow 200ms ease-in;
  transition: width 200ms ease-in;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 1.6rem;
  font-weight: 600;
  :hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(26, 26, 29, 0.08);
  }
`

const PriceContainer = styled.div`
  margin-bottom: 0.5rem;
`

const Price = styled.span`
  font-size: 2rem;
  font-weight: 700;
`

const SessionPrice = styled.input`
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #ebebeb;
  transition: box-shadow 200ms ease-in;
  transition: width 200ms ease-in;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 1.6rem;
  font-weight: 600;
  :hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(26, 26, 29, 0.08);
  }
`

const LengthContainer = styled.div`
  margin-bottom: 0.5rem;
`

const Length = styled.span`
  font-size: 2rem;
  font-weight: 700;
`

const SessionLength = styled.input`
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #ebebeb;
  transition: box-shadow 200ms ease-in;
  transition: width 200ms ease-in;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 1.6rem;
  font-weight: 600;
  :hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(26, 26, 29, 0.08);
  }
`

const Buffer = styled.span`
  font-size: 1.2rem;
  margin-left: 0.5rem;
`

const SystemsContainer = styled.div`
  margin-bottom: 0.5rem;
`

const Systems = styled.span`
  font-size: 2rem;
  font-weight: 700;
`

const SessionSystems = styled.input`
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #ebebeb;
  transition: box-shadow 200ms ease-in;
  transition: width 200ms ease-in;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 1.6rem;
  font-weight: 600;
  :hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(26, 26, 29, 0.08);
  }
`

const SlotsContainer = styled.div`
  margin-bottom: 0.5rem;
`

const Slots = styled.span`
  font-size: 2rem;
  font-weight: 700;
`

const SessionSlots = styled.input`
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #ebebeb;
  transition: box-shadow 200ms ease-in;
  transition: width 200ms ease-in;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 1.6rem;
  font-weight: 600;
  :hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(26, 26, 29, 0.08);
  }
`

const TypeContainer = styled.div`
  margin-bottom: 0.5rem;
`

const Type = styled.span`
  font-size: 2rem;
  font-weight: 700;
`

const SessionType = styled.input`
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #ebebeb;
  transition: box-shadow 200ms ease-in;
  transition: width 200ms ease-in;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 1.6rem;
  font-weight: 600;
  :hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(26, 26, 29, 0.08);
  }
`

const EditSession = styled.button`
  background: #f10e0e;
  padding: 1rem 1.4rem;
  color: #fff;
  cursor: pointer;
  outline: 0;
  border: 1px solid #f10e0e;
  border-radius: 4px;
  font-size: 1.6rem;
  font-weight: 600;
  margin-top: 1rem;
`

const UPDATE_SESSION = gql`
  mutation($input: UpdateSessionInput!) {
    updateSession(input: $input) {
      updatedSession {
        id
      }
    }
  }
`

export default function CreatedSessionCardBack({
  session,
  dispatch,
  state,
  refetch,
}) {
  const updateSession = useMutation(UPDATE_SESSION)
  return (
    <Card back>
      <TitleContainer>
        <Title>Title: </Title>
        <SessionTitle
          onChange={e => {
            dispatch({ type: 'setTitle', payload: e.target.value })
          }}
          value={state.title}
        />
      </TitleContainer>
      <GameSessionDropdown
        label={'Game: '}
        dispatch={dispatch}
        title={state.game}
      />
      <PriceContainer>
        <Price>Price: </Price>
        <SessionPrice
          onChange={e => {
            dispatch({
              type: 'setPrice',
              payload: e.target.value === '' ? '' : Number(e.target.value),
            })
          }}
          value={state.price}
        />
      </PriceContainer>
      <LengthContainer>
        <Length>Length:</Length>
        <SessionLength
          onChange={e => {
            dispatch({
              type: 'setLength',
              payload: e.target.value === '' ? '' : Number(e.target.value),
            })
          }}
          value={state.length}
        />
        <Buffer>*not counting buffer</Buffer>
      </LengthContainer>
      <SystemsSessionDropdown
        label={'Systems: '}
        dispatch={dispatch}
        title={state.systems}
      />
      <SlotsContainer>
        <Slots>Slots:</Slots>
        <SessionSlots
          onChange={e => {
            dispatch({
              type: 'setSlots',
              payload: e.target.value === '' ? '' : Number(e.target.value),
            })
          }}
          value={state.slots}
        />
      </SlotsContainer>
      <TypeSessionDropdown
        label={'Type: '}
        dispatch={dispatch}
        title={state.type}
      />
      <EditSession
        onClick={async () => {
          const input = {
            sessionId: session.id,
            title: state.title,
            game: state.game,
            price: state.price,
            length: state.length,
            systems: state.systems,
            slots: state.slots,
            type: state.type,
          }
          const data = await updateSession({ variables: { input } })
          await refetch()
          dispatch({ type: 'flip', payload: false })
        }}
      >
        Update Session
      </EditSession>
    </Card>
  )
}
