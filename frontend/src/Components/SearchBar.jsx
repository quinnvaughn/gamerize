import React, { useState } from 'react'
import styled from 'styled-components'

const Input = styled.input`
  width: 300px;
  padding: 5px 15px;
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid black;
  :hover {
    cursor: text;
  }
  :focus {
    outline: none;
  }
`

export default function SearchBar(props) {
  const [search, setSearch] = useState('')
  return (
    <Input
      type="text"
      placeholder="Search"
      value={search}
      onChange={event => setSearch(event.target.value)}
    />
  )
}
