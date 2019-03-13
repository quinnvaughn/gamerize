import React, { Component } from 'react'
import styled from 'styled-components'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import dateFns from 'date-fns'
import { withRouter } from 'react-router-dom'

const Container = styled.div`
  display: block;
  position: relative;
  width: 100%;
  background: #fff;
  border: 1px solid #dddfe2;
`

const Header = styled.div`
  text-transform: uppercase;
  width: 100%;
  border-bottom: 1px solid #dddfe2;
  background: #fff;
  padding: 1rem 2rem 3rem;
  margin: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 3rem;
  font-weight: 700;
  color: black;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`

const ChevronLeft = styled(FaChevronLeft)`
  cursor: pointer;
  transition: 0.15s ease-out;
  font-size: 1.8rem;
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
  font-size: 1.8rem;
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
  font-size: 1.2rem;
`

const Days = styled.div`
  cursor: default;
  text-transform: uppercase;
  font-weight: 700;
  color: #dddfe2;
  font-size: 70%;
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
  height: 9.6rem;
  border-right: 1px solid #dddfe2;
  overflow: hidden;
  cursor: pointer;
  background: #fff;
  :last-child {
    border-right: none;
  }
  color: ${props => (props.disabled ? '#dddfe2' : 'black')};
  pointer-events: ${props => props.disabled && 'none'};
`

const Number = styled.span`
  position: absolute;
  font-size: 1.2rem;
  width: ${props => props.current && '2.4rem'};
  line-height: ${props => props.current && '2.4rem'};
  border-radius: ${props => props.current && '50%'};
  text-align: ${props => props.current && 'center'};
  background: ${props => props.current && '#f10e0e'};
  color: ${props => props.current && 'white'};
  top: 0.75rem;
  right: 0.75rem;
  font-weight: 700;
`

const Row = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  border-bottom: 1px solid #dddfe2;
  :last-child {
    border-bottom: none;
  }
`

const Exit = styled(MdClose)`
  font-size: 3rem;
  cursor: pointer;
  z-index: 1000;
  color: black;
  :hover {
    color: #f10e0e;
  }
`

const ExitContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 1rem;
`

class Calendar extends Component {
  state = {
    currentMonth: new Date(),
    currentDay: new Date(),
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  renderHeader() {
    const dateFormat = 'MMMM YYYY'

    return (
      <Header>
        <ChevronLeft onClick={this.prevMonth} />
        <Month>{dateFns.format(this.state.currentMonth, dateFormat)}</Month>
        <ChevronRight onClick={this.nextMonth} />
      </Header>
    )
  }

  renderDays() {
    const dateFormat = 'dddd'
    const days = []

    let startDate = dateFns.startOfWeek(this.state.currentMonth)

    for (let i = 0; i < 7; i++) {
      days.push(
        <CenterColumn key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </CenterColumn>
      )
    }

    return <Days>{days}</Days>
  }

  renderCells() {
    const { currentMonth, currentDay } = this.state
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
            disabled={!dateFns.isSameMonth(day, monthStart)}
            key={cloneDay}
            onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
          >
            <Number current={dateFns.isSameDay(day, currentDay)}>
              {formattedDate}
            </Number>
          </Cell>
        )
        day = dateFns.addDays(day, 1)
      }
      rows.push(<Row key={day}>{days}</Row>)
      days = []
    }
    return <div className="body">{rows}</div>
  }

  onDateClick = day => {
    this.props.setSelectedDay(day)
  }

  nextMonth = () => {
    this.setState(prevState => ({
      currentMonth: dateFns.addMonths(prevState.currentMonth, 1),
    }))
  }

  prevMonth = () => {
    this.setState(prevState => ({
      currentMonth: dateFns.subMonths(prevState.currentMonth, 1),
    }))
  }

  render() {
    return (
      <Container>
        <ExitContainer>
          <Exit onClick={this.props.close} />
        </ExitContainer>
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </Container>
    )
  }
}

export default withRouter(Calendar)
