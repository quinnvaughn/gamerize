import React, { Fragment, useState } from 'react'
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
  margin-bottom: ${props => (props.last ? '4rem' : '1rem')};
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
  background: #db1422;
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
  color: #db1422;
  background: #fff;
  border-radius: 4px;
  padding: 1rem 2.2rem;
  height: 4.6rem;
  outline: 0;
  border: 1px solid #db1422;
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
  background: #db1422;
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
  color: #db1422;
  font-size: 1.6rem;
  font-weight: 600;
`

const CancelArrow = styled(FaChevronLeft)`
  cursor: pointer;
  color: #db1422;
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
  color: #db1422;
  font-size: 1.6rem;
  font-weight: 600;
`

const BackArrow = styled(FaChevronLeft)`
  cursor: pointer;
  color: #db1422;
  font-size: 1.6rem;
  margin-right: 0.5rem;
`

const ErrorMessage = styled.div`
  font-size: 1.6rem;
  color: #db1422;
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

const CREATE_GAMING_TIME_SLOT = gql`
  mutation($input: CreateGamingTimeSlotInput!) {
    createGamingTimeSlot(input: $input) {
      created
      errorMsg
      successMsg
    }
  }
`

const CREATE_BULK_GAMING_TIME_SLOTS = gql`
  mutation($input: CreateBulkGamingTimeSlotsInput!) {
    createBulkGamingTimeSlots(input: $input) {
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

const dateFormat = 'MM/DD/YYYY'

//TODO: Still need to fix time changing. Need to fix messages on bulk add.
export default function GamerSessionCardBack({
  error,
  success,
  setError,
  setSuccess,
  session,
  setState,
  refetch,
  last,
}) {
  const [side, setSide] = useState(null)
  const [day, setDay] = useState(dateFns.format(new Date(), dateFormat))
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const createGamingSlot = useMutation(CREATE_GAMING_TIME_SLOT)
  const createBulkGamingSlots = useMutation(CREATE_BULK_GAMING_TIME_SLOTS)
  return (
    <Card back last={last}>
      {side === null && (
        <Fragment>
          <Buttons>
            <AddOne
              onClick={e => {
                setSide('ONE')
              }}
            >
              Add One
            </AddOne>
            <AddBulk
              onClick={e => {
                setSide('BULK')
              }}
            >
              Add Bulk
            </AddBulk>
          </Buttons>
          <Back
            onClick={() => {
              setState('FRONT')
            }}
          >
            <BackArrow />
            <BackText>Back</BackText>
          </Back>
        </Fragment>
      )}
      {side === 'ONE' && (
        <OneAdd>
          <AddOneTop>
            <LabelAndDay>
              <Label>Select Day</Label>
              <SelectDayForSession day={day} setDay={setDay} />
            </LabelAndDay>
            <LabelAndPicker>
              <Label>Start Time</Label>
              <TimePicker setTime={setStartTime} day={day} />
            </LabelAndPicker>
          </AddOneTop>
          <MessageContainer>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success && <SuccessMessage>{success}</SuccessMessage>}
          </MessageContainer>
          <SelectionButtons>
            <Cancel
              onClick={() => {
                setSide(null)
              }}
            >
              <CancelArrow />
              <CancelText>Cancel</CancelText>
            </Cancel>
            <Add
              // disabled={state.loading}
              onClick={async () => {
                const input = {
                  startTime,
                  gamingSessionId: session.id,
                  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                }
                const { data } = await createGamingSlot({
                  variables: { input },
                })
                data.createGamingTimeSlot.successMsg &&
                  setSuccess(data.createGamingTimeSlot.successMsg)
                data.createGamingTimeSlot.errorMsg &&
                  setError(data.createGamingTimeSlot.errorMsg)
                refetch()
                setTimeout(() => {
                  setSuccess(null)
                  setError(null)
                }, 2000)
              }}
            >
              Add Session
            </Add>
          </SelectionButtons>
        </OneAdd>
      )}
      {side === 'BULK' && (
        <BulkAdd>
          <BulkAddTop>
            <LabelAndDay>
              <Label>Select Day</Label>
              <SelectDayForSession day={day} setDay={setDay} />
            </LabelAndDay>
            <LabelAndPicker>
              <Label>Start Time</Label>
              <TimePicker setTime={setStartTime} />
            </LabelAndPicker>
            <LabelAndPicker>
              <Label>End Time</Label>
              <TimePicker setTime={setEndTime} endTime />
            </LabelAndPicker>
            <MessageContainer>
              {error && <ErrorMessage>{error}</ErrorMessage>}
              {success &&
                success.map(success => (
                  <SuccessMessage>{success}</SuccessMessage>
                ))}
            </MessageContainer>
          </BulkAddTop>
          <SelectionButtons>
            <Cancel
              onClick={() => {
                setSide(null)
              }}
            >
              <CancelArrow />
              <CancelText>Cancel</CancelText>
            </Cancel>
            <Add
              onClick={async () => {
                const input = {
                  startTime,
                  endTime,
                  gamingSessionId: session.id,
                  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                }
                const { data } = await createBulkGamingSlots({
                  variables: { input },
                })
                data.createBulkGamingTimeSlots.successMsg &&
                  setSuccess(data.createBulkGamingTimeSlots.successMsg)
                data.createBulkGamingTimeSlots.errorMsg &&
                  setError(data.createBulkGamingTimeSlots.errorMsg)
                refetch()
                setTimeout(() => {
                  setSuccess(null)
                  setError(null)
                }, 2000)
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
