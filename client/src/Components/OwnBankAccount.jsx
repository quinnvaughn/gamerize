import React, { useState } from 'react'
import styled from 'styled-components'
import { useBecomeAGamer } from '../State/BecomeAGamerContext'

const OPTIONS = ['YES', 'NO']

const mapOptions = option => {
  switch (option) {
    case 'YES': {
      return 'Yes'
    }
    case 'NO': {
      return 'No'
    }
    default: {
      return 'not an option'
    }
  }
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`

const InputLabel = styled.label`
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${props => props.color};
`

const RadioContainer = styled.label`
  display: flex;
  align-items: center;
`

export default function OwnBankAccount(props) {
  const [becomeAGamer, dispatch] = useBecomeAGamer()
  return (
    <InputContainer>
      <InputLabel>You control your own bank account</InputLabel>
      {OPTIONS.map(option => (
        <OwnBankAccountRadio
          label={option}
          name={option}
          isSelected={becomeAGamer.ownsOwnBankAccount === option}
          onCheckboxChange={e => {
            const { name } = e.target
            dispatch({
              type: 'SET_OWNS_BANK_ACCOUNT',
              payload: name,
            })
          }}
          key={option}
        />
      ))}
    </InputContainer>
  )
}

function OwnBankAccountRadio({ label, isSelected, onCheckboxChange }) {
  return (
    <div>
      <RadioContainer>
        <input
          type="radio"
          name={label}
          checked={isSelected}
          onChange={onCheckboxChange}
        />
        <span>{mapOptions(label)}</span>
      </RadioContainer>
    </div>
  )
}
