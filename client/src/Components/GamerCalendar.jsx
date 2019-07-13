import React from 'react'
import styled from 'styled-components'
import dateFns from 'date-fns'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

import { useGamerCalendar } from '../State/GamerCalendarContext'

const Container = styled.div`
  padding: 2rem;
`
const Header = styled.div`
  width: 100%;
  padding: 3rem 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 1.6rem;
  font-weight: 700;
  color: black;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`

const ChevronLeft = styled(FaChevronLeft)`
  cursor: pointer;
  transition: 0.15s ease-out;
  font-size: 1.6rem;
  color: black;
  :hover {
    transition: 0.25s ease-out;
    color: #db1422;
  }
`

const ChevronRight = styled(FaChevronRight)`
  cursor: pointer;
  transition: 0.15s ease-out;
  font-size: 1.6rem;
  color: black;
  :hover {
    transition: 0.25s ease-out;
    color: #db1422;
  }
`

const CenterColumn = styled.div`
  flex-grow: 1;
  flex-basis: 0;
  max-width: 100%;
  flex-basis: calc(100% / 7);
  width: calc(100% / 7);
  justify-content: center;
  text-align: center;
  font-size: 1.2rem;
`

const Days = styled.div`
  cursor: default;
  font-weight: 700;
  color: black;
  font-size: 1rem;
  padding: 1rem 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  :last-child {
    border-bottom: none;
  }
`

const Cell = styled.div`
  flex-grow: 1;
  flex-basis: 0;
  max-width: 100%;
  position: relative;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  overflow: hidden;
  cursor: pointer;
  :last-child {
    border-right: none;
  }
  :hover {
    cursor: pointer;
  }
  color: ${props =>
    props.disabled ? '#dddfe2' : props.current ? 'white' : 'black'};
  pointer-events: ${props => props.disabled && 'none'};
`

const Current = styled.span`
  background: #db1422;
  border-radius: 4px;
  padding: 0.3rem 1.2rem;
  color: white;
`

const Number = styled.span`
  font-weight: 700;
  cursor: pointer;
`

const Row = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`

const Month = styled.span`
  cursor: default;
`

export default function GamerCalendar(props) {
  const [gamerCalendar, dispatch] = useGamerCalendar()
  const renderHeader = () => {
    const dateFormat = 'MMMM'

    return (
      <Header>
        <ChevronLeft onClick={() => dispatch({ type: 'PREVIOUS_MONTH' })} />
        <Month>{dateFns.format(gamerCalendar.currentMonth, dateFormat)}</Month>
        <ChevronRight onClick={() => dispatch({ type: 'NEXT_MONTH' })} />
      </Header>
    )
  }

  const renderDays = () => {
    const dateFormat = 'ddd'
    const days = []

    let startDate = dateFns.startOfWeek(gamerCalendar.currentMonth)

    for (let i = 0; i < 7; i++) {
      days.push(
        <CenterColumn key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </CenterColumn>
      )
    }

    return <Days>{days}</Days>
  }

  const renderCells = () => {
    const monthStart = dateFns.startOfMonth(gamerCalendar.currentMonth)
    const monthEnd = dateFns.endOfMonth(monthStart)
    const startDate = dateFns.startOfWeek(monthStart)
    const endDate = dateFns.endOfWeek(monthEnd)

    const dateFormat = 'D'
    const rows = []

    let days = []
    let day = startDate
    let formattedDate = ''

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat)
        const cloneDay = day
        const current = dateFns.isSameDay(day, gamerCalendar.selectedDay)
        days.push(
          <Cell
            disabled={!dateFns.isSameMonth(day, monthStart)}
            key={cloneDay}
            onClick={() =>
              dispatch({
                type: 'SET_SELECTED_DAY',
                payload: dateFns.parse(cloneDay),
              })
            }
          >
            {current ? (
              <Current>
                <Number>{formattedDate}</Number>
              </Current>
            ) : (
              <Number>{formattedDate}</Number>
            )}
          </Cell>
        )
        day = dateFns.addDays(day, 1)
      }
      rows.push(<Row key={day}>{days}</Row>)
      days = []
    }
    return <div>{rows}</div>
  }
  return (
    <Container>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </Container>
  )
}
