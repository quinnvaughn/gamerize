import React, { useState } from 'react'
import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa'

const Input = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-size: 1.6rem;
  font-weight: 600;
  margin-right: 0.4rem;
  :hover {
    cursor: text;
  }
  :focus {
    outline: none;
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;
  flex: 50%;
  padding: 1rem 0;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid black;
  width: 6rem;
  border: 1px solid #ebebeb;
  transition: box-shadow 200ms ease-in;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const StyledSearch = styled(FaSearch)`
  margin-left: 1rem;
  height: 1.6rem;
  width: 1.6rem;
  margin-right: 1rem;
`

export default function ReviewSearchBar(props) {
  const [search, setSearch] = useState('')
  return (
    <Container>
      <StyledSearch />
      <Input
        type="text"
        placeholder="Search"
        value={search}
        onChange={event => setSearch(event.target.value)}
      />
    </Container>
  )
}
