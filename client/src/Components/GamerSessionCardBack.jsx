import React, { Fragment } from 'react'
import styled from 'styled-components'
import { FaChevronLeft } from 'react-icons/fa'
import * as moment from 'moment'
import { useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'

//local imports
import TimePicker from './TimePicker'
import SelectDayForSession from './SelectDayForSession'

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

const CREATE_INDIVIDUAL_SESSION = gql`
  mutation($input: CreateIndividualGamingSessionInput!) {
    createIndividualGamingSession(input: $input) {
      created
      msg
    }
  }
`

export default function GamerSessionCardBack({ state, session, dispatch }) {
  const createSession = useMutation(CREATE_INDIVIDUAL_SESSION)
  return (
    <Card back>
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
                state={state}
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
          {state.msg && <div>{state.msg}</div>}
          <SelectionButtons>
            <Cancel
              onClick={() => {
                dispatch({ type: 'addState', payload: null })
              }}
            >
              <CancelArrow />
              <CancelText>Cancel</CancelText>
            </Cancel>
            <Add
              disabled={state.loading}
              onClick={async () => {
                const { month, day, year } = state.addDay
                const { hour, minutes, period } = state.addOne
                const result = moment(
                  `${year}-${month}-${day} ${hour}:${minutes} ${period}`,
                  'YYYY-MM-DD hh:mm a'
                )
                const startTime = new Date(result)
                const input = { startTime, gamingSessionId: session.id }
                dispatch({ type: 'loading', payload: true })
                const { data } = await createSession({
                  variables: { input },
                })
                if (data.createIndividualGamingSession.created) {
                  dispatch({ type: 'loading', payload: false })
                  dispatch({ type: 'flip', payload: false })
                }
                data.createIndividualGamingSession.msg &&
                  dispatch({
                    type: 'setMsg',
                    payload: data.createIndividualGamingSession.msg,
                  })
              }}
            >
              Add Session
            </Add>
          </SelectionButtons>
        </OneAdd>
      )}
      {state.addState === 'bulk' && (
        <BulkAdd>
          <BulkAddTop>
            <LabelAndDay>
              <Label>Select Day</Label>
              <SelectDayForSession
                type="setAddDay"
                dispatch={dispatch}
                state={state}
              />
            </LabelAndDay>
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
  )
}
