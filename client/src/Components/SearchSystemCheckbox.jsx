import React, { useState } from 'react'
import styled from 'styled-components'

import { displaySystem } from '../utils/System'
import { useSearch } from '../State/SearchContext'

const OPTIONS = ['PS4', 'PC', 'NINTENDO_SWITCH', 'XBOX_ONE']

const Container = styled.div``

const Update = styled.div`
  color: #db1422;
  cursor: pointer;
  outline: 0;
  border-radius: 4px;
  font-size: 1.4rem;
  position: relative;
  margin-top: 1rem;
`

const Clear = styled.div`
  color: black;
  cursor: pointer;
  outline: 0;
  border-radius: 4px;
  font-size: 1.4rem;
  position: relative;
  margin-top: 1rem;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const initialState = {
  PS4: false,
  PC: false,
  NINTENDO_SWITCH: false,
  XBOX_ONE: false,
}

export default function SearchSystemCheckbox(props) {
  const [search, dispatch] = useSearch()
  const [checkboxes, setCheckboxes] = useState(initialState)
  return (
    <Container>
      {OPTIONS.map(option => (
        <Checkbox
          label={option}
          isSelected={checkboxes[option]}
          onCheckboxChange={e => {
            const { name } = e.target
            setCheckboxes(prev => ({
              ...prev,
              [name]: !prev[name],
            }))
          }}
          key={option}
        />
      ))}
      <ButtonContainer>
        <Update
          onClick={() => {
            dispatch({ type: 'SET_SYSTEMS', payload: checkboxes })
          }}
        >
          Update
        </Update>
        {search.systems.length > 0 && (
          <Clear
            onClick={() => {
              setCheckboxes(initialState)
              dispatch({ type: 'SET_SYSTEMS', payload: [] })
            }}
          >
            Clear
          </Clear>
        )}
      </ButtonContainer>
    </Container>
  )
}

const Input = styled.input`
  font-size: 1.4rem;
`

const InputContainer = styled.div``

const InputLabel = styled.label`
  display: flex;
  align-items: center;
`

function Checkbox({ label, isSelected, onCheckboxChange }) {
  return (
    <InputContainer>
      <InputLabel>
        <Input
          type="checkbox"
          name={label}
          checked={isSelected}
          onChange={onCheckboxChange}
        />
        <span>{displaySystem(label)}</span>
      </InputLabel>
    </InputContainer>
  )
}
