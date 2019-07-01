import React from 'react'
import styled from 'styled-components'

import { noUnderscores, capitalize } from '../utils/Strings'

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
  return props.array.map(type => (
    <TypeOfGamer
      onClick={() => props.container.setOccupations(type)}
      selected={props.container.state.occupations.includes(type)}
    >
      {type === 'DJ' ? type : capitalize(noUnderscores(type))}
    </TypeOfGamer>
  ))
}
