import React, { useReducer } from 'react'
import styled from 'styled-components'
import { useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'

//local imports
import TagDropdown from './TagDropdown'

const Container = styled.div`
  width: 100%;
  padding: 2rem;
`

const TitleContainer = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
`
const Title = styled.span`
  font-size: 2rem;
  margin-right: 0.5rem;
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

const CreateGameButton = styled.button`
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

const initialState = {
  name: '',
  tags: [],
  picture: '',
  banner: '',
}

function reducer(state, action) {
  switch (action.type) {
    case 'flip':
      return { ...state, flip: action.payload }
    case 'setName':
      return { ...state, name: action.payload }
    case 'setTags':
      if (state.tags.includes(action.payload)) {
        return {
          ...state,
          tags: state.tags.filter(tag => tag !== action.payload),
        }
      } else {
        return { ...state, tags: [...state.tags, action.payload] }
      }
    case 'setPicture':
      return { ...state, picture: action.payload }
    case 'setBanner':
      return { ...state, banner: action.payload }
    case 'removeTag':
      return {
        ...state,
        tags: state.tags.filter(tag => tag !== action.payload),
      }
    default:
      return { ...state }
  }
}

const CREATE_GAME = gql`
  mutation($input: CreateGameInput!) {
    createGame(input: $input) {
      created
    }
  }
`

export default function CreateGame(props) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const createGame = useMutation(CREATE_GAME)
  return (
    <Container>
      <TitleContainer>
        <Title>Name: </Title>
        <SessionTitle
          onChange={e => {
            dispatch({ type: 'setName', payload: e.target.value })
          }}
          value={state.name}
        />
      </TitleContainer>
      <TitleContainer>
        <Title>Tags:</Title>
        <TagDropdown dispatch={dispatch} tags={state.tags} />
      </TitleContainer>
      <TitleContainer>
        <Title>Picture: </Title>
        <SessionTitle
          onChange={e => {
            dispatch({ type: 'setPicture', payload: e.target.value })
          }}
          value={state.picture}
        />
      </TitleContainer>
      <TitleContainer>
        <Title>Banner: </Title>
        <SessionTitle
          onChange={e => {
            dispatch({ type: 'setBanner', payload: e.target.value })
          }}
          value={state.banner}
        />
      </TitleContainer>
      {/* Add a tags dropdown.*/}

      <CreateGameButton
        onClick={async () => {
          const input = {
            name: state.name,
            launcher: state.launcher,
            tags: state.tags,
            picture: state.picture,
            banner: state.banner,
          }
          const { data } = await createGame({ variables: { input } })
          if (data.createGame.created) {
            await props.refetch()
            props.setOpen(false)
          }
        }}
      >
        Create new game
      </CreateGameButton>
    </Container>
  )
}
