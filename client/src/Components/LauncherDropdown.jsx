import React from 'react'

//local imports
import { formatLauncher } from '../utils/System'
import Dropdown from './Dropdown'

const launchers = [
  'EPIC',
  'STEAM',
  'ORIGIN',
  'BATTLENET',
  'GOG',
  'UPLAY',
  'BETHESDA',
  'ITCH',
  'WINDOWS',
  'RIOT',
]

export default function LauncherDropdown(props) {
  return (
    <Dropdown
      placeholder="Specify the launcher"
      value={props.value}
      name="launcher"
      onBlur={() => props.setFieldTouched('launcher')}
      isSearchable
      onChange={selected => props.setFieldValue(selected)} //props.setFieldValue('launcher', selected.value)}
      options={launchers.map(launcher => ({
        value: launcher,
        label: formatLauncher(launcher),
      }))}
    />
  )
}
