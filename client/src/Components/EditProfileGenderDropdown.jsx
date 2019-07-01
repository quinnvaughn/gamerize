import React from 'react'
import styled from 'styled-components'

import GenderDropdown from './GenderDropdown'

const Row = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 0.5rem;
`

const RowLeft = styled.div`
  flex: 25%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-align: right;
  padding-right: 0.8rem;
`

const Label = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
`

const RowRight = styled.div`
  flex: 75%;
  position: ${props => props.relative && 'relative'};
`

export default function EditProfileGenderDropdown(props) {
  return (
    <Row>
      <RowLeft>
        <Label>Gender</Label>
      </RowLeft>
      <RowRight relative>
        <GenderDropdown {...props} />
      </RowRight>
    </Row>
  )
}
