import React from 'react'

//local imports
import { formatSystem } from '../utils/Strings'
import Dropdown from './Dropdown'

const systems = ['PC', 'XBOX_ONE', 'PS4', 'NINTENDO_SWITCH']

export default function SystemsSessionDropdown(props) {
  return (
    <Dropdown
      placeholder="Specify the system"
      value={props.value}
      name="system"
      onBlur={() => props.setFieldTouched('system')}
      isSearchable
      onChange={selected => props.setFieldValue('system', selected.value)}
      options={systems.map(system => ({
        value: system,
        label: formatSystem(system),
      }))}
    />
  )
}
