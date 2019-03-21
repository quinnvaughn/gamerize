import React, { useState } from 'react'
import styled from 'styled-components'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import dateFns from 'date-fns'
import { withRouter } from 'react-router-dom'

const Container = styled.div`
  display: block;
  position: relative;
  width: 100%;
  background: #fff;
  border: 1px solid #dddfe2;
  border-radius: 2px;
  z-index: 100 !important;
`

const Header = styled.div`
  text-transform: uppercase;
  width: 100%;
  border-bottom: 1px solid #dddfe2;
  background: #fff;
  padding: 1rem 2rem;
  margin: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 1rem;
  font-weight: 700;
  color: black;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`

const ChevronLeft = styled(FaChevronLeft)`
  cursor: pointer;
  transition: 0.15s ease-out;
  font-size: 1rem;
  color: black;
  :hover {
    transform: scale(1.75);
    transition: 0.25s ease-out;
    color: #f10e0e;
  }
`

const ChevronRight = styled(FaChevronRight)`
  cursor: pointer;
  transition: 0.15s ease-out;
  font-size: 1rem;
  color: black;
  :hover {
    transform: scale(1.75);
    transition: 0.25s ease-out;
    color: #f10e0e;
  }
`

const Month = styled.span`
  cursor: default;
`

const CenterColumn = styled.div`
  flex-grow: 1;
  flex-basis: 0;
  max-width: 100%;
  flex-basis: calc(100% / 7);
  width: calc(100% / 7);
  justify-content: center;
  text-align: center;
  font-size: 1rem;
`

const Days = styled.div`
  cursor: default;
  text-transform: uppercase;
  font-weight: 700;
  color: #dddfe2;
  font-size: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #dddfe2;
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
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  border-right: 1px solid #dddfe2;
  overflow: hidden;
  cursor: pointer;
  background: ${props => (props.current ? '#f10e0e' : '#fff')};
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
  cursor: pointer;
  border-bottom: 1px solid #dddfe2;
  :last-child {
    border-bottom: none;
  }
`

function BigGamerCalendar(props) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [currentDay] = useState(new Date())

  const renderHeader = () => {
    const dateFormat = 'MMMM YYYY'

    return (
      <Header>
        <ChevronLeft onClick={prevMonth} />
        <Month>{dateFns.format(currentMonth, dateFormat)}</Month>
        <ChevronRight onClick={nextMonth} />
      </Header>
    )
  }

  const renderDays = () => {
    const dateFormat = 'dd'
    const days = []

    let startDate = dateFns.startOfWeek(currentMonth)

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
    const monthStart = dateFns.startOfMonth(currentMonth)
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
        days.push(
          <Cell
            disabled={
              !dateFns.isSameMonth(day, monthStart) ||
              (dateFns.isBefore(day, currentDay) &&
                !dateFns.isSameDay(day, currentDay))
            }
            key={cloneDay}
            onClick={() => onDateClick(dateFns.parse(cloneDay))}
            current={dateFns.isSameDay(day, currentDay)}
          >
            <Number>{formattedDate}</Number>
          </Cell>
        )
        day = dateFns.addDays(day, 1)
      }
      rows.push(<Row key={day}>{days}</Row>)
      days = []
    }
    return <div className="body">{rows}</div>
  }

  const onDateClick = inputDay => {
    const dateFormat = 'MM/DD/YYYY'

    const day = dateFns.format(inputDay, dateFormat)
    props.dispatch({ type: 'setDropdown', payload: false })
    props.dispatch({ type: 'setDate', payload: day })
  }

  const nextMonth = () => {
    setCurrentMonth(dateFns.addMonths(currentMonth, 1))
  }

  const prevMonth = () => {
    setCurrentMonth(dateFns.subMonths(currentMonth, 1))
  }

  return (
    <Container onClick={e => e.stopPropagation()}>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </Container>
  )
}

export default withRouter(BigGamerCalendar)
