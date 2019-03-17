import React, { Fragment, useReducer, useRef, useCallback } from 'react'
import styled from 'styled-components'
import ReactCardFlip from 'react-card-flip'
import { FaChevronLeft } from 'react-icons/fa'

//local imports
import { noUnderscores } from '../utils/Strings'
import TimePicker from './TimePicker'
import SelectDayForSession from './SelectDayForSession'
import useOnOutsideClick from '../Hooks/useOnOutsideClick'

const Container = styled.div``
const Card = styled.div`
  background: #fff;
  border: 1px solid #dddfe2;
  border-radius: 4px;
  padding: 2rem;
  width: 100%;
  margin-bottom: 1rem;
  z-index: 0;
  min-height: 100%;
  :hover {
    background: ${props => !props.back && '#ededed'};
    cursor: ${props => !props.back && 'pointer'};
  }
  div {
    cursor: inherit;
  }
`

const SessionTitle = styled.div`
  font-size: 2.2rem;
  font-weight: 900;
  margin-bottom: 0.5rem;
`

const Game = styled.div`
  font-size: 1.7rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`

const Gamers = styled.div`
  font-weight: 600;
  font-size: 1.6rem;
  word-wrap: break-word;
  margin-bottom: 0.5rem;
`

const Gamer = styled.span`
  font-weight: 400;
  margin-left: 0.5rem;
  font-size: 1.6rem;
`

const Length = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
`

const Buttons = styled.div`
  display: flex;
`

const Label = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`

const OneAdd = styled.div``

const BulkAdd = styled.div``

const BulkAddTop = styled.div`
  display: flex;
`

const AddOneTop = styled.div`
  display: flex;
`

const LabelAndPicker = styled.div`
  margin-right: 2rem;
  :last-of-type {
    margin-right: 0;
  }
`

const LabelAndDay = styled.div`
  margin-right: 2rem;
  :last-of-type {
    margin-right: 0;
  }
`

const AddOne = styled.button`
  font-weight: 800;
  cursor: pointer;
  color: white;
  background: #f10e0e;
  border-radius: 4px;
  padding: 1rem 2.2rem;
  height: 4.6rem;
  outline: 0;
  border: 0;
  font-size: 1.6rem;
  line-height: 2.4rem;
  margin-right: 1rem;
`

const AddBulk = styled.button`
  font-weight: 800;
  cursor: pointer;
  color: #f10e0e;
  background: #fff;
  border-radius: 4px;
  padding: 1rem 2.2rem;
  height: 4.6rem;
  outline: 0;
  border: 1px solid #f10e0e;
  font-size: 1.6rem;
  line-height: 2.4rem;
`

const SelectionButtons = styled.div`
  display: flex;
  width: 75%;
  justify-content: space-between;
  padding-top: 2rem;
`
const Add = styled.button`
  width: 18rem;
  font-weight: 800;
  cursor: pointer;
  color: white;
  background: #f10e0e;
  border-radius: 4px;
  padding: 1rem 2.2rem;
  height: 4.6rem;
  outline: 0;
  border: 0;
  font-size: 1.6rem;
  line-height: 2.4rem;
`

const Cancel = styled.div`
  outline: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
`

const CancelText = styled.span`
  cursor: pointer;
  color: #f10e0e;
  font-size: 1.6rem;
  font-weight: 600;
`

const CancelArrow = styled(FaChevronLeft)`
  cursor: pointer;
  color: #f10e0e;
  font-size: 1.6rem;
  margin-right: 0.5rem;
`

const Back = styled.div`
  outline: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  margin-top: 2rem;
`

const BackText = styled.span`
  cursor: pointer;
  color: #f10e0e;
  font-size: 1.6rem;
  font-weight: 600;
`

const BackArrow = styled(FaChevronLeft)`
  cursor: pointer;
  color: #f10e0e;
  font-size: 1.6rem;
  margin-right: 0.5rem;
`

const initialState = {
  flip: false,
  addState: null,
  addOne: {
    hour: '--',
    minutes: '--',
    period: '--',
  },
  addBulk: {
    start: {
      hour: '--',
      minutes: '--',
      period: '--',
    },
    end: {
      hour: '--',
      minutes: '--',
      period: '--',
    },
  },
  addDay: {
    month: '--',
    day: '--',
    year: '----',
  },
}

function reducer(state, action) {
  switch (action.type) {
    case 'flip':
      return { ...state, flip: action.payload }
    case 'addState':
      return { ...state, addState: action.payload }
    case 'clearState':
      return { ...initialState }
    case 'setAddOne':
      return {
        ...state,
        addOne: {
          ...state.addOne,
          [action.payload.type]: action.payload.value,
        },
      }
    case 'setAddBulkStart':
      return {
        ...state,
        addBulk: {
          ...state.addBulk,
          start: {
            ...state.addBulk.start,
            [action.payload.type]: action.payload.value,
          },
        },
      }
    case 'setAddBulkEnd':
      return {
        ...state,
        addBulk: {
          ...state.addBulk,
          end: {
            ...state.addBulk.end,
            [action.payload.type]: action.payload.value,
          },
        },
      }
    case 'setAddDay':
      return {
        ...state,
        addDay: {
          ...state.addDay,
          [action.payload.type]: action.payload.value,
        },
      }
    default:
      throw new Error()
  }
}

export default function GamerSessionCard({ session }) {
  const node = useRef()
  const [state, dispatch] = useReducer(reducer, initialState)
  const clearAndFlip = () => {
    dispatch({ type: 'clearState' })
    dispatch({ type: 'flip', payload: false })
    dispatch({ type: 'addState', payload: null })
  }
  useOnOutsideClick(
    node,
    useCallback(() => {
      clearAndFlip()
    }, [])
  )
  return (
    <Container ref={node}>
      <ReactCardFlip isFlipped={state.flip} flipDirection="horizontal">
        <Card
          key="front"
          onClick={() => dispatch({ type: 'flip', payload: true })}
        >
          <SessionTitle>{session.title}</SessionTitle>
          <Game>{noUnderscores(session.game)}</Game>
          <Gamers>
            {`Gamers: `}
            <Gamer>Quinn</Gamer>
          </Gamers>
          <Length>{`${session.length} minutes`}</Length>
          {/* Will be names of gamers when I'm actually getting from db. Will be mapped.*/}
        </Card>
        <Card key="back" back>
          {state.addState === null && (
            <Fragment>
              <Buttons>
                <AddOne
                  onClick={e => {
                    e.stopPropagation()
                    dispatch({ type: 'addState', payload: 'one' })
                  }}
                >
                  Add One
                </AddOne>
                <AddBulk
                  onClick={e => {
                    e.stopPropagation()
                    dispatch({ type: 'addState', payload: 'bulk' })
                  }}
                >
                  Add Bulk
                </AddBulk>
              </Buttons>
              <Back
                onClick={() => {
                  dispatch({ type: 'flip', payload: false })
                }}
              >
                <BackArrow />
                <BackText>Back</BackText>
              </Back>
            </Fragment>
          )}
          {state.addState === 'one' && (
            <OneAdd>
              <AddOneTop>
                <LabelAndDay>
                  <Label>Select Day</Label>
                  <SelectDayForSession
                    type="setAddDay"
                    dispatch={dispatch}
                    state={state.addDay}
                  />
                </LabelAndDay>
                <LabelAndPicker>
                  <Label>Start Time</Label>
                  <TimePicker
                    type="setAddOne"
                    dispatch={dispatch}
                    state={state.addOne}
                  />
                </LabelAndPicker>
              </AddOneTop>
              <SelectionButtons>
                <Cancel
                  onClick={() => {
                    dispatch({ type: 'addState', payload: null })
                  }}
                >
                  <CancelArrow />
                  <CancelText>Cancel</CancelText>
                </Cancel>
                <Add>Add Session</Add>
              </SelectionButtons>
            </OneAdd>
          )}
          {state.addState === 'bulk' && (
            <BulkAdd>
              <BulkAddTop>
                <LabelAndPicker>
                  <Label>Start Time</Label>
                  <TimePicker
                    type="setAddBulkStart"
                    dispatch={dispatch}
                    state={state.addBulk.start}
                  />
                </LabelAndPicker>
                <LabelAndPicker>
                  <Label>End Time</Label>
                  <TimePicker
                    type="setAddBulkEnd"
                    dispatch={dispatch}
                    state={state.addBulk.end}
                  />
                </LabelAndPicker>
              </BulkAddTop>
              <SelectionButtons>
                <Cancel
                  onClick={() => {
                    dispatch({ type: 'addState', payload: null })
                  }}
                >
                  <CancelArrow />
                  <CancelText>Cancel</CancelText>
                </Cancel>
                <Add>Add Session</Add>
              </SelectionButtons>
            </BulkAdd>
          )}
        </Card>
      </ReactCardFlip>
    </Container>
  )
}
