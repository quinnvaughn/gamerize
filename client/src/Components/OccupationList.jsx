import React from 'react'
import styled from 'styled-components'
import { formatOccupation } from '../utils/Strings'

const Occupations = styled.div`
  font-size: 1.4rem;
  font-weight: 400;
  color: black;
  margin-top: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const Occupation = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
  color: black;
  border: 1px solid #dddfe2;
  padding: 0.4rem 0.6rem;
  display: inline-block;
  border-radius: 4px;
  margin-right: 0.8rem;
  margin-top: 0.5rem;
  :last-child {
    margin-right: 0;
  }
  :hover {
    cursor: default;
  }
`

export default function OccupationList(props) {
  return (
    <Occupations>
      {props.occupations.map(
        // Change to List component
        occupation => (
          <Occupation key={occupation}>
            {formatOccupation(occupation)}
          </Occupation>
        )
      )}
    </Occupations>
  )
}
