import React, { useState, useCallback, useRef } from 'react'
import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
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
  width: 100%;
  border: 1px solid #ebebeb;
  transition: box-shadow 200ms ease-in;
  transition: width 200ms ease-in;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  :hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(26, 26, 29, 0.08);
  }
  @media (max-width: 743px) {
    width: 100%;
  }
`

const StyledSearch = styled(FaSearch)`
  margin-left: 1.2rem;
  height: 1.8rem;
  width: 1.8rem;
  margin-right: 2rem;
`

const StyledClose = styled(MdClose)`
  height: 2.4rem;
  width: 2.4rem;
  margin-right: 1rem;
`

const SEARCH_GAMERIZE = gql`
  query($search: String!) {
    searchGamerize(search: $search) {
      type
      game {
        tags
        name
        picture
      }
      user {
        role
        profilePicture
        numSessions
        username
        displayName
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
          profilePicture
        }
        gamers {
          username
        }
      }
    }
  }
`

export default function SmallSearchBar(props) {
  const node = useRef()
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const { data } = useQueryNotBugged(SEARCH_GAMERIZE, {
    skip: !search || search.length === 0,
    variables: { search },
  })
  useOnOutsideClick(
    node,
    useCallback(() => {
      setOpen(false)
      props.setClicked(false)
    }, [])
  )
  return (
    <Container
      onClick={() => {
        setOpen(true)
        props.setClicked(true)
      }}
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
      {props.clicked && (
        <StyledClose
          onClick={async () => {
            await setSearch('')
            await setOpen(false)
            await props.setClicked(false)
          }}
        />
      )}
      {open && <SearchBarDropdown data={data} search={search} />}
    </Container>
  )
}
