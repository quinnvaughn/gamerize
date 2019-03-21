import React, { Fragment } from 'react'
import styled from 'styled-components'
import { FaChevronLeft } from 'react-icons/fa'
import { useMutation } from 'react-apollo-hooks'
import dateFns from 'date-fns'
import gql from 'graphql-tag'

//local imports
import TimePicker from './TimePicker'
import SelectDayForSession from './SelectDayForSession'
import { convertTo24Hours, convertToDay } from '../utils/Dates'

const Card = styled.div`
  background: #fff;
  border: 1px solid #dddfe2;
  border-radius: 4px;
  padding: 2rem;
  width: 100%;
  margin-bottom: 1rem;
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

const ErrorMessage = styled.div`
  font-size: 1.6rem;
  color: #f10e0e;
  font-weight: 700;
  margin-top: 1rem;
`

const SuccessMessage = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  margin-top: 1rem;
`

const MessageContainer = styled.div`
  width: 100%;
`

const CREATE_INDIVIDUAL_SESSION = gql`
  mutation($input: CreateIndividualGamingSessionInput!) {
    createIndividualGamingSession(input: $input) {
      created
      errorMsg
      successMsg
    }
  }
`

const CREATE_BULK_SESSIONS = gql`
  mutation($input: CreateBulkSessionsInput!) {
    createBulkSessions(input: $input) {
      created
      errorMsg
      successMsg
      overlaps {
        startTime
        endTime
      }
      sessions {
        startTime
        endTime
      }
    }
  }
`

//TODO: Still need to fix time changing. Need to fix messages on bulk add.
export default function GamerSessionCardBack({
  state,
  session,
  dispatch,
  refetch,
}) {
  const createSession = useMutation(CREATE_INDIVIDUAL_SESSION)
  const createBulkSessions = useMutation(CREATE_BULK_SESSIONS)
  return (
    <Card back>
      {state.addState === null && (
        <Fragment>
          <Buttons>
            <AddOne
              onClick={e => {
                dispatch({ type: 'addState', payload: 'one' })
              }}
            >
              Add One
            </AddOne>
            <AddBulk
              onClick={e => {
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
          <MessageContainer>
            {state.errorMsg && <ErrorMessage>{state.errorMsg}</ErrorMessage>}
            {state.successMsg && (
              <SuccessMessage>{state.successMsg}</SuccessMessage>
            )}
          </MessageContainer>
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
                dispatch({ type: 'setSuccessMsg', payload: null })
                dispatch({ type: 'setErrorMsg', payload: null })
                const dateFormat = 'YYYY-MM-DDTHH:mm:ssZ'
                const { hour, minutes, period } = state.addOne
                const [hours, _, seconds] = convertTo24Hours(
                  `${hour}:${minutes} ${period}`
                )
                const [year, month, day] = convertToDay(state.day)
                const startTime = dateFns.format(
                  new Date(year, month, day, hours, minutes, seconds),
                  dateFormat
                )
                const input = { startTime, gamingSessionId: session.id }
                dispatch({ type: 'loading', payload: true })
                const { data } = await createSession({
                  variables: { input },
                })
                dispatch({ type: 'loading', payload: false })
                data.createIndividualGamingSession.successMsg &&
                  dispatch({
                    type: 'setSuccessMsg',
                    payload: data.createIndividualGamingSession.successMsg,
                  })
                data.createIndividualGamingSession.errorMsg &&
                  dispatch({
                    type: 'setErrorMsg',
                    payload: data.createIndividualGamingSession.errorMsg,
                  })
                refetch()
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
            <MessageContainer>
              {state.errorMsg && <ErrorMessage>{state.errorMsg}</ErrorMessage>}
              {state.successMsg &&
                state.successMsg.map(msg => (
                  <SuccessMessage>{msg}</SuccessMessage>
                ))}
            </MessageContainer>
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
            <Add
              onClick={async () => {
                dispatch({ type: 'setSuccessMsg', payload: null })
                dispatch({ type: 'setErrorMsg', payload: null })
                const dateFormat = 'YYYY-MM-DDTHH:mm:ssZ'
                const { hour, minutes, period } = state.addBulk.start
                const {
                  hour: hourEnd,
                  minutes: minutesEnd,
                  period: periodEnd,
                } = state.addBulk.end
                const [hours, _, seconds] = convertTo24Hours(
                  `${hour}:${minutes} ${period}`
                )
                const [hoursEnd, __, secondsEnd] = convertTo24Hours(
                  `${hourEnd}:${minutesEnd} ${periodEnd}`
                )
                const [year, month, day] = convertToDay(state.day)
                const startTime = dateFns.format(
                  new Date(year, month, day, hours, minutes, seconds),
                  dateFormat
                )
                const endTime = dateFns.format(
                  new Date(year, month, day, hoursEnd, minutesEnd, secondsEnd),
                  dateFormat
                )
                const input = {
                  startTime,
                  endTime,
                  gamingSessionId: session.id,
                }
                dispatch({ type: 'loading', payload: true })
                const { data } = await createBulkSessions({
                  variables: { input },
                })
                dispatch({ type: 'loading', payload: false })
                data.createBulkSessions.successMsg &&
                  dispatch({
                    type: 'setSuccessMsg',
                    payload: data.createBulkSessions.successMsg,
                  })
                data.createBulkSessions.errorMsg &&
                  dispatch({
                    type: 'setErrorMsg',
                    payload: data.createBulkSessions.errorMsg,
                  })
                refetch()
              }}
            >
              Add Sessions
            </Add>
          </SelectionButtons>
        </BulkAdd>
      )}
    </Card>
  )
}
