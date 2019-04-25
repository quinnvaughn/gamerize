import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'

//local imports
import { mapTags } from '../utils/Strings'
import useOnOutsideClick from '../Hooks/useOnOutsideClick'

const SelectionContainer = styled.div`
  display: inline-flex;
  width: 85%;
  margin-bottom: 0.5rem;
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
const Selection = styled.div`
  border: none;
  outline: none;
  width: 100%;
  font-size: 1.6rem;
  font-weight: 600;
  margin-right: 0.4rem;
  :hover {
    cursor: pointer;
  }
  :focus {
    outline: none;
  }
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
  height: 12rem;
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

const Tag = styled.span`
  padding: 0.5rem;
  background: #db1422;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  margin-right: 0.5rem;
`

const TagText = styled.span`
  color: #fff;
`

const Close = styled(MdClose)`
  color: #fff;
  font-size: 1.6rem;
`

const tags = [
  'ACTION',
  'ADVENTURE_GAME',
  'CARD_AND_BOARD_GAME',
  'COMPILATION',
  'DRIVING_SLASH_RACING_GAME',
  'EDUCATIONAL_GAME',
  'FIGHTING',
  'FLIGHT_SIMULATOR',
  'FPS',
  'GAMBLING_GAME',
  'HIDDEN_OBJECTS',
  'HORROR',
  'INDIE_GAME',
  'METROIDVANIA',
  'MMORPG',
  'MOBA',
  'OPEN_WORLD',
  'PINBALL',
  'PLATFORMER',
  'POINT_AND_CLICK',
  'PUZZLE',
  'RHYTHM_AND_MUSIC_GAME',
  'ROGUELIKE',
  'RPG',
  'RTS',
  'SERIES_COLON_SOULS',
  'SHOOT_HYPHEN_EM_UP',
  'SHOOTER',
  'SIMULATION',
  'SPORTS_GAME',
  'STEALTH',
  'STRATEGY',
  'SURVIVAL',
  'VISUAL_NOVEL',
]

export default function TagDropdown(props) {
  const node = useRef()
  const [open, setOpen] = useState(false)
  useOnOutsideClick(node, () => {
    setOpen(false)
  })
  return (
    <SelectionContainer ref={node} onClick={() => setOpen(!open)}>
      <Selection value={props.tags} readOnly>
        {props.tags.map((tag, index) => (
          <Tag
            key={tag}
            onClick={e => {
              e.stopPropagation()
              props.dispatch({ type: 'removeTag', payload: tag })
            }}
          >
            <Close />
            <TagText>{mapTags(tag)}</TagText>
          </Tag>
        ))}
      </Selection>
      {!open && <ChevronDown />}
      {open && <ChevronUp />}
      {open && (
        <Dropdown>
          {tags.map(tag => (
            <DropdownOption
              key={tag}
              onClick={() => {
                props.dispatch({ type: 'setTags', payload: tag })
                setOpen(false)
              }}
            >
              {mapTags(tag)}
            </DropdownOption>
          ))}
        </Dropdown>
      )}
    </SelectionContainer>
  )
}
