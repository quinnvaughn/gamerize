import React from 'react'
import styled from 'styled-components'
import { useBecomeAGamer } from '../State/BecomeAGamerContext'

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`

const InputLabel = styled.label`
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: black;
`

const Input = styled.input`
  padding: 1rem 0;
  padding-left: 1rem;
  border-radius: 4px;
  border: 1px solid #ebebeb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  :focus {
    outline: none;
  }
`

export default function AgeInput(props) {
  const [_, dispatch] = useBecomeAGamer()
  return (
    <InputContainer>
      <InputLabel>Age</InputLabel>
      <Input
        type="number"
        min="1"
        step="1"
        onChange={e => {
          dispatch({ type: 'SET_AGE', payload: e.target.value })
        }}
      />
    </InputContainer>
  )
}
