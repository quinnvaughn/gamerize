import React, { useEffect } from 'react'
import styled from 'styled-components'
import CustomPicker from 'rc-time-picker'
import 'rc-time-picker/assets/index.css'
import moment from 'moment'

//local imports

const Container = styled.div`
  /* display: flex;
  align-items: center;
  padding: 1rem 1rem;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid black;
  width: 12rem;
  border: 1px solid #ebebeb;
  transition: box-shadow 200ms ease-in;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: #fff; */
  /* .rc-time-picker-input {
    padding: 1rem 1rem;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid black;
    width: 12rem;
    border: 1px solid #ebebeb;
    transition: box-shadow 200ms ease-in;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background: #fff;
  } */
`

export default function TimePicker({
  field,
  form: { setFieldValue },
  day,
  endTime,
  ...props
}) {
  useEffect(() => {
    const now = moment()
    const nextMoment = moment(day)
      .set({
        hour: now.get('hour'),
        minute: now.get('minute'),
      })
      .toDate()
    if (field.value) {
      const current = moment(field.value)
      const newDate = moment(day).set({
        hour: current.get('hour'),
        minute: current.get('minute'),
      })
      setFieldValue(field.name, moment(newDate).toDate())
    } else {
      endTime
        ? setFieldValue(
            field.name,
            moment(nextMoment)
              .add(15, 'minutes')
              .add(1, 'hours')
              .toDate()
          )
        : setFieldValue(
            field.name,
            moment(nextMoment)
              .add(15, 'minutes')
              .toDate()
          )
    }
  }, [day])
  const now = moment()
  const nextMoment = moment(day)
    .set({
      hour: now.get('hour'),
      minute: now.get('minute'),
    })
    .toDate()
  return (
    <Container>
      <CustomPicker
        {...props}
        showSecond={false}
        defaultValue={
          endTime
            ? moment(nextMoment)
                .add(15, 'minutes')
                .add(1, 'hours')
            : moment(nextMoment).add(15, 'minutes')
        }
        use12Hours
        onChange={value => {
          setFieldValue(
            field.name,
            moment(day).set({
              hour: value.get('hour'),
              minute: value.get('minute'),
            })
          )
        }}
        allowEmpty={false}
      />
    </Container>
  )
}
