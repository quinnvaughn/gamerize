import React, { Component } from 'react'
import styled from 'styled-components'
import { FaChevronLeft } from 'react-icons/fa'
import dateFns from 'date-fns'

const Container = styled.div``

const Header = styled.div`
  width: 100%;
  padding: 1.75em 0;
  border-bottom: 1px solid #d3d3d3;
  background: white;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
`

const HeaderLeft = styled.div`
  flex-grow: 1;
  flex-basis: 0;
  max-width: 100%;
  justify-content: flex-start;
  text-align: left;
`

export default class Calender extends Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
  }

  renderHeader() {
    const dateFormat = 'MMMM YYYY'

    return (
      <Header>
        <HeaderLeft>
          <FaChevronLeft />
        </HeaderLeft>
      </Header>
    )
  }

  renderDays() {}

  renderCells() {}

  onDateClick = day => {}

  nextMonth = () => {}

  prevMonth = () => {}

  render() {
    return (
      <Container>
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </Container>
    )
  }
}
