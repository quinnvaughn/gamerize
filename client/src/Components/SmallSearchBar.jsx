import React, { useState, useCallback, useRef } from 'react'
import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import { withRouter } from 'react-router-dom'
import { Formik } from 'formik'

import { useSearch } from '../State/SearchContext'
import useOnOutsideClick from '../Hooks/useOnOutsideClick'

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

const Container = styled.form`
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

const StyledExit = styled(MdClose)`
  height: 1.8rem;
  width: 1.8rem;
  margin-left: 1.2rem;
  cursor: pointer;
  margin-right: 1.2rem;
`

function SmallSearchBar(props) {
  const searchInput = useRef()
  const [search, dispatch] = useSearch()
  const [open, setOpen] = useState(false)
  useOnOutsideClick(
    searchInput,
    useCallback(() => {
      setOpen(false)
      props.setClicked(false)
    }, [])
  )
  return (
    <Formik
      enableReinitialize
      initialValues={search}
      onSubmit={async () => {
        props.history.push('/search')
      }}
    >
      {({ handleSubmit }) => (
        <Container
          onSubmit={handleSubmit}
          onClick={() => {
            setOpen(true)
            props.setClicked(true)
          }}
          ref={searchInput}
        >
          <StyledSearch />
          <Input
            type="text"
            placeholder="Search"
            value={search.text}
            onChange={event => {
              dispatch({ type: 'SET_TEXT', payload: event.target.value })
            }}
          />
          {search.text.length > 0 && (
            <StyledExit
              onClick={() => {
                dispatch({ type: 'CLEAR_TEXT' })
                searchInput.current.focus()
              }}
            />
          )}
        </Container>
      )}
    </Formik>
  )
}

export default withRouter(SmallSearchBar)
