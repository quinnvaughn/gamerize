import React from 'react'

//local imports
import { capitalize } from '../utils/Strings'
import Dropdown from './Dropdown'

const types = ['CUSTOM', 'CASUAL', 'COMPETITIVE']

export default function TypeSessionDropdown(props) {
  return (
    <Dropdown
      placeholder="Specify the type of game"
      value={props.value}
      name="type"
      onBlur={() => props.setFieldTouched('type')}
      isSearchable
      onChange={selected => props.setFieldValue('type', selected.value)}
      options={types.map(type => ({
        value: type,
        label: capitalize(type),
      }))}
    />
  )
}
