import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { useSearch } from '../State/SearchContext'
import useOnOutsideClick from '../Hooks/useOnOutsideClick'
import SearchSystemCheckbox from './SearchSystemCheckbox'
import SearchLength from './SearchLength'

const Container = styled.div`
  padding: 2rem 4rem;
  border-bottom: 1px solid #ebebeb;
`

export default function SearchPageFilters(props) {
  const [search, dispatch] = useSearch()
  return (
    <Container>
      <SearchPageButtons title="Systems" minWidth="200">
        <SearchSystemCheckbox />
      </SearchPageButtons>
      <SearchPageButtons title="Length" minWidth="200">
        <SearchLength />
      </SearchPageButtons>
    </Container>
  )
}

const Button = styled.button`
  background: #fff;
  padding: 0.6rem 1.2rem;
  color: #db1422;
  cursor: pointer;
  outline: 0;
  border: 1px solid #db1422;
  border-radius: 4px;
  font-size: 1.4rem;
  position: relative;
`

const Dropdown = styled.div`
  position: absolute;
  top: 50px;
  left: 0;
  padding: 2rem;
  border: 1px solid #ebebeb;
  background: white;
  border-radius: 4px;
  min-width: ${props => `${props.minWidth}px`};
  z-index: 9999;
  display: ${props => (props.display ? 'block' : 'none')};
`

const ButtonContainer = styled.div`
  display: inline-block;
  position: relative;
  margin-right: 2rem;
`

function SearchPageButtons(props) {
  const [open, setOpen] = useState()
  const node = useRef()
  useOnOutsideClick(node, () => {
    setOpen(false)
  })
  return (
    <ButtonContainer ref={node}>
      <Button
        onClick={() => {
          setOpen(!open)
        }}
      >
        {props.title}
      </Button>
      <Dropdown minWidth={props.minWidth} display={open}>
        {props.children}
      </Dropdown>
    </ButtonContainer>
  )
}
