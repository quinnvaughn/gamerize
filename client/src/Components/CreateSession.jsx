import React, { useReducer, useState } from 'react'
import styled from 'styled-components'
import { useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'

//local imports
import GameSessionDropdown from './GameSessionDropdown'
import SystemsSessionDropdown from './SystemsSessionDropdown'
import TypeSessionDropdown from './TypeSessionDropdown'
import LauncherDropdown from './LauncherDropdown'
import { formatSystem } from '../utils/Strings'
import { formatLauncher } from '../utils/System'

const Container = styled.div`
  width: 100%;
  padding: 2rem;
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

const Setup = styled.span`
  font-size: 1.2rem;
  margin-left: 0.5rem;
`

const Minutes = styled.span`
  font-size: 1.2rem;
`

const USD = styled.span`
  font-size: 1.2rem;
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

const CreateSessionButton = styled.button`
  background: #db1422;
  padding: 1rem 1.4rem;
  color: #fff;
  cursor: pointer;
  outline: 0;
  border: 1px solid #db1422;
  border-radius: 4px;
  font-size: 1.6rem;
  font-weight: 600;
  margin-top: 1rem;
`

const ErrorMessage = styled.div`
  font-size: 1.6rem;
  color: #db1422;
  font-weight: 700;
  margin-top: 0.3rem;
`

const initialState = {
  flip: false,
  game: '',
  title: '',
  launcher: '',
  length: '',
  price: '',
  type: '',
  system: '',
  slots: '',
}

function reducer(state, action) {
  switch (action.type) {
    case 'flip':
      return { ...state, flip: action.payload }
    case 'setGame':
      return { ...state, game: action.payload }
    case 'setTitle':
      return { ...state, title: action.payload }
    case 'setPrice':
      return { ...state, price: action.payload }
    case 'setLength':
      return { ...state, length: action.payload }
    case 'setLauncher':
      return { ...state, launcher: action.payload }
    case 'setType':
      return { ...state, type: action.payload }
    case 'setSystem':
      return { ...state, system: action.payload }
    case 'setSlots':
      return { ...state, slots: action.payload }
    case 'clearState':
      return { ...initialState }
    default:
      return { ...state }
  }
}

const CREATE_SESSION = gql`
  mutation($input: CreateGamingSessionInput!) {
    createGamingSession(input: $input) {
      gamingSession {
        id
      }
      created
    }
  }
`

export default function CreateSession(props) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [priceError, setPriceError] = useState(false)
  const createSession = useMutation(CREATE_SESSION)
  return (
    <Container>
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
            setPriceError(false)
            if (Number(e.target.value) !== 0 && Number(e.target.value) < 1) {
              setPriceError(true)
            } else {
              dispatch({
                type: 'setPrice',
                payload: e.target.value === '' ? '' : e.target.value,
              })
            }
          }}
          value={state.price}
        />
        {priceError && (
          <ErrorMessage>
            Price must either be zero or at least a dollar
          </ErrorMessage>
        )}
      </PriceContainer>
      <LengthContainer>
        <Length>
          Length<Minutes> (minutes) </Minutes>:{' '}
        </Length>
        <SessionLength
          onChange={e => {
            dispatch({
              type: 'setLength',
              payload: e.target.value === '' ? '' : Number(e.target.value),
            })
          }}
          value={state.length}
        />
        <Setup>*not counting setup</Setup>
      </LengthContainer>
      <SystemsSessionDropdown
        label={'System: '}
        dispatch={dispatch}
        title={formatSystem(state.system)}
      />
      {state.system === 'PC' && (
        <LauncherDropdown
          label={'Launcher: '}
          dispatch={dispatch}
          title={formatLauncher(state.launcher)}
        />
      )}
      <SlotsContainer>
        <Slots>Slots: </Slots>
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
      <CreateSessionButton
        onClick={async () => {
          const input = {
            title: state.title,
            game: state.game,
            price: parseFloat(state.price),
            launcher: state.launcher,
            length: state.length,
            system: state.system,
            slots: state.slots,
            type: state.type,
          }
          const data = await createSession({ variables: { input } })
          await props.refetch()
          props.setOpen(false)
        }}
      >
        Create new session
      </CreateSessionButton>
    </Container>
  )
}
