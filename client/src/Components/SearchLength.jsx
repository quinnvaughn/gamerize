import React, { useState } from 'react'
import styled from 'styled-components'

const OPTIONS = ['gte', 'lte']

const mapOptions = option => {
  switch (option) {
    case 'gte': {
      return 'At Least'
    }
    case 'lte': {
      return 'At Most'
    }
    default: {
      return 'not an option'
    }
  }
}

export default function SearchLength(props) {
  const [selected, setSelected] = useState('')
  return OPTIONS.map(option => (
    <LengthRadio
      label={option}
      name={option}
      isSelected={selected === option}
      onCheckboxChange={e => {
        const { name } = e.target
        setSelected(name)
      }}
      key={option}
    />
  ))
}

function LengthRadio({ label, isSelected, onCheckboxChange }) {
  return (
    <div>
      <label>
        <input
          type="radio"
          name={label}
          checked={isSelected}
          onChange={onCheckboxChange}
        />
        {mapOptions(label)}
      </label>
    </div>
  )
}
