import React, { useState } from 'react'
import styled from 'styled-components'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 8px;
  position: relative;
`

const PlayersLabel = styled.label`
  font-size: 17px;
  font-weight: 400;
  padding: 0 0 4px;
`

const Players = styled.span`
  font-size: 12px;
  overflow-wrap: break-word;
`

const SelectionContainer = styled.div`
  position: relative;
  width: 100%;
`

const SelectionButton = styled.button`
  border: 1px solid #d3d3d3;
  padding: 10px;
  display: flex;
  width: 100%;
  height: 40px !important;
  align-items: center;
  justify-content: space-between;
  color: ${props => (props.disabled ? 'grey' : 'black')};
  border-radius: 4px;
  cursor: ${props => (props.disabled ? 'default' : 'cursor')};
  background: white;
`

const SelectedChoice = styled.span``

const ChevronDown = styled(FaChevronDown)`
  color: ${props => (props.disabled ? 'grey' : 'black')};
  font-size: 14px;
`

const ChevronUp = styled(FaChevronUp)`
  color: ${props => (props.disabled ? 'grey' : 'black')};
  font-size: 14px;
`

const PlayersChoices = styled.div`
  position: absolute;
  top: 40px;
  width: 100%;
  left: 0;
  padding: 10px;
  border: 1px solid #d3d3d3;
  border-radius: 4px;
  z-index: 1;
  background: white;
  display: flex;
  flex-direction: column;
`

const PlayersChoice = styled.div`
  margin: 10px 0px;
  font-size: 14px;
`

export default function PlayersOptions(props) {
  const [open, setOpen] = useState(false)
  return (
    <Container>
      <PlayersLabel>
        <Players>Players</Players>
      </PlayersLabel>
      <SelectionContainer>
        <SelectionButton
          onClick={() => props.players.length >= 1 && setOpen(!open)}
          disabled={props.players.length <= 1}
        >
          <SelectedChoice>{props.players[0]}</SelectedChoice>
          {open ? (
            <ChevronUp />
          ) : (
            <ChevronDown disabled={props.players.length <= 1} />
          )}
          {open && (
            <PlayersChoices>
              {props.players.map(system => (
                <PlayersChoice>{system}</PlayersChoice>
              ))}
            </PlayersChoices>
          )}
        </SelectionButton>
      </SelectionContainer>
    </Container>
  )
}
