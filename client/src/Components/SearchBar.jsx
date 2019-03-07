import React, { useState } from 'react'
import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa'

const Input = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-size: 1.8rem;
  font-weight: 800;
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
  height: 4.8rem;
  padding: 1rem 0;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid black;
  width: 46rem;
  border: 1px solid #ebebeb;
  transition: box-shadow 200ms ease-in;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const StyledSearch = styled(FaSearch)`
  margin-left: 1.2rem;
  height: 1.8rem;
  width: 1.8rem;
  margin-right: 2rem;
`

export default function SearchBar(props) {
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
