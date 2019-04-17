import React, { useState, useCallback, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa'
import gql from 'graphql-tag'

import useOnOutsideClick from '../Hooks/useOnOutsideClick'
import SearchBarDropdown from './SearchBarDropdown'
import useQueryNotBugged from '../Hooks/useQueryNotBugged'

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
  position: relative;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid black;
  width: ${props => `${props.width}rem`};
  border: 1px solid #ebebeb;
  transition: box-shadow 200ms ease-in;
  transition: width 200ms ease-in;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  :hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(26, 26, 29, 0.08);
  }
`

const StyledSearch = styled(FaSearch)`
  margin-left: 1.2rem;
  height: 1.8rem;
  width: 1.8rem;
  margin-right: 2rem;
`

const SEARCH_GAMERIZE = gql`
  query($search: String!) {
    searchGamerize(search: $search) {
      type
      game {
        tags
        name
      }
      user {
        role
        numSessions
        username
        name
      }
      session {
        id
        game {
          name
        }
        title
        price
        creator {
          username
        }
        gamers {
          username
        }
      }
    }
  }
`

export default function SearchBar(props) {
  const node = useRef()
  const [search, setSearch] = useState('')
  const [width, setWidth] = useState(46)
  const [open, setOpen] = useState(false)
  const { data } = useQueryNotBugged(SEARCH_GAMERIZE, {
    skip: !search || search.length === 0,
    variables: { search },
  })
  useOnOutsideClick(
    node,
    useCallback(() => {
      setWidth(40)
      setOpen(false)
    }, [])
  )
  return (
    <Container
      onClick={() => {
        setWidth(60)
        setOpen(true)
      }}
      width={width}
      ref={node}
    >
      <StyledSearch />
      <Input
        type="text"
        placeholder="Search"
        value={search}
        onChange={event => {
          setSearch(event.target.value)
        }}
      />
      {open && <SearchBarDropdown data={data} search={search} />}
    </Container>
  )
}
