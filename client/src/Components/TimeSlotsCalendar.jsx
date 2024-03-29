import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import dateFns from 'date-fns'
import { withRouter } from 'react-router-dom'
import { useSessions } from '../State/SessionsSelectedContext'

const Container = styled.div`
  display: block;
  position: relative;
  width: 100%;
  background: #fff;
  border: 1px solid #dddfe2;
  padding-bottom: 3rem;
`

const Header = styled.div`
  width: 100%;
  border-bottom: 1px solid #dddfe2;
  background: #fff;
  padding: 1rem 2rem 4rem 2rem;
  margin: 0;
  font-size: 2.4rem;
  font-weight: 700;
  color: black;
  max-width: inherit;
  position: sticky;
  top: 0;
  z-index: 1000;
`

const HeaderInfo = styled.div`
  align-items: center;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 1rem;
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
  @media (min-width: 640px) {
    font-size: 2rem;
  }
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

const Exit = styled(MdClose)`
  font-size: 3rem;
  cursor: pointer;
  z-index: 1000;
  color: black;
  :hover {
    color: #db1422;
  }
`

const ExitContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

function TimeSlotsCalendar(props) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [currentDay] = useState(new Date())
  const [_, dispatch] = useSessions()

  useEffect(() => {
    window.scrollTo(0, 0)
  })

  function renderHeader() {
    const dateFormat = 'MMMM'

    return (
      <Header>
        <ExitContainer>
          <Exit onClick={props.close} />
        </ExitContainer>
        <HeaderInfo>
          <ChevronLeft onClick={prevMonth} />
          <Month>{dateFns.format(currentMonth, dateFormat)}</Month>
          <ChevronRight onClick={nextMonth} />
        </HeaderInfo>
      </Header>
    )
  }

  function renderDays() {
    const dateFormat = 'ddd'
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

  function renderCells() {
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
        const current = dateFns.isSameDay(day, currentDay)
        days.push(
          <Cell
            disabled={!dateFns.isSameMonth(day, monthStart)}
            key={cloneDay}
            onClick={() => onDateClick(dateFns.parse(cloneDay))}
            current={dateFns.isSameDay(day, currentDay)}
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
    return <div className="body">{rows}</div>
  }

  function onDateClick(day) {
    dispatch({ type: 'SET_SELECTED_DAY', payload: day })
  }

  function nextMonth() {
    setCurrentMonth(prev => dateFns.addMonths(prev, 1))
  }

  function prevMonth() {
    setCurrentMonth(prev => dateFns.subMonths(prev, 1))
  }
  return (
    <Container>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </Container>
  )
}

export default withRouter(TimeSlotsCalendar)
