import React from 'react'
import styled from 'styled-components'

import { noUnderscores, capitalize } from '../utils/Strings'
import { useBecomeAGamer } from '../State/BecomeAGamerContext'

const TypeOfGamer = styled.button`
  border-radius: 4px;
  cursor: pointer;
  background: ${props => (props.selected ? '#db1422' : '#fff')};
  color: ${props => (props.selected ? '#fff' : '#db1422')};
  border: ${props =>
    !props.selected ? '1px solid #db1422' : '1px solid transparent'};
  padding: 1rem 1rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  outline: 0;
  :last-of-type {
    margin-right: 0;
  }
`

export default function TypeOfGamerList(props) {
  const [becomeAGamer, dispatch] = useBecomeAGamer()
  return props.array.map(type => (
    <TypeOfGamer
      onClick={() => dispatch({ type: 'SET_OCCUPATIONS', payload: type })}
      selected={becomeAGamer.occupations.includes(type)}
    >
      {type === 'DJ' ? type : capitalize(noUnderscores(type))}
    </TypeOfGamer>
  ))
}
