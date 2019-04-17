import React, { useState } from 'react'
import styled from 'styled-components'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { formatGender } from '../utils/Strings'

const SelectionContainer = styled.div`
  display: inline-flex;
  width: 26.15rem;
  justify-content: space-between;
  align-items: center;
  position: relative;
  cursor: pointer;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #ebebeb;
  transition: box-shadow 200ms ease-in;
  transition: width 200ms ease-in;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 1.6rem;
  font-weight: 600;
  :hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(26, 26, 29, 0.08);
  }
`
const Selection = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-size: 1.6rem;
  margin-right: 0.4rem;
  :hover {
    cursor: pointer;
  }
  :focus {
    outline: none;
  }
`

const Container = styled.div`
  margin-bottom: 0.5rem;
`

const Label = styled.span`
  font-size: 2rem;
  font-weight: 700;
`

const Dropdown = styled.div`
  top: 4.15rem;
  z-index: 3;
  left: 0;
  position: absolute;
  background: #fff;
  border-radius: 4px;
  width: 100%;
  border: 1px solid #ebebeb;
  height: 8rem;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`

const DropdownOption = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
  background: #fff;
  cursor: pointer;
  :hover {
    background: #d3d3d3;
  }
  padding: 1rem;
`

const ChevronDown = styled(FaChevronDown)`
  color: ${props => (props.disabled ? 'grey' : 'black')};
  font-size: 1.4rem;
`

const ChevronUp = styled(FaChevronUp)`
  color: ${props => (props.disabled ? 'grey' : 'black')};
  font-size: 1.4rem;
`

const genders = ['MALE', 'FEMALE', 'OTHER']

export default function GenderDropdown(props) {
  const [open, setOpen] = useState(false)
  return (
    <Container>
      <SelectionContainer>
        <Selection
          onClick={() => setOpen(!open)}
          value={formatGender(props.title)}
          readOnly
        />
        {!open && <ChevronDown />}
        {open && <ChevronUp />}
        {open && (
          <Dropdown>
            {genders.map(gender => (
              <DropdownOption
                key={gender}
                onClick={() => {
                  props.dispatch({ type: 'setGender', payload: gender })
                  setOpen(false)
                }}
              >
                {formatGender(gender)}
              </DropdownOption>
            ))}
          </Dropdown>
        )}
      </SelectionContainer>
    </Container>
  )
}
