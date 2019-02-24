import React, { Component } from 'react'
import styled from 'styled-components'
import dateFns from 'date-fns'
import { FaChevronLeft } from 'react-icons/fa'

import exampleSessions from '../data/sessions'

const Container = styled.div`
  display: block;
  position: relative;
  width: 100%;
  max-width: 108rem;
  background: #fff;
  border: 1px solid #dddfe2;
`

const Header = styled.div`
  text-transform: uppercase;
  width: 100%;
  border-bottom: 1px solid #dddfe2;
  background: #fff;
  padding: 4rem 2rem;
  margin: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 3rem;
  font-weight: 700;
  color: black;
  justify-content: space-between;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 9999;
  max-width: inherit;
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
    color: red;
  }
`

const Day = styled.span`
  font-size: 3rem;
  cursor: default;
`

//For formatting.
const Empty = styled.div``

const Row = styled.div`
  margin: 0;
  padding: 0px 0px 0px 4rem;
  height: 20rem;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  border-bottom: 1px solid #dddfe2;
  :last-child {
    border-bottom: none;
  }
`

const Hour = styled.div`
  height: 100%;
  display: flex;
  width: 6rem;
  align-items: center;
  padding-right: 1rem;
  border-right: 1px solid #dddfe2;
`

const Sessions = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
`

const Session = styled.div`
  height: ${props => `${20 / (6 / props.height)}px`};
  background: ${props => (props.full ? 'red' : 'white')};
  width: 100%;
  color: ${props => (props.full ? 'white' : 'black')};
  border: ${props => !props.full && '1px solid #d3d3d3'};
  cursor: pointer;
  position: absolute;
  display: flex;
  z-index: 1;
  border-radius: 0.4rem;
  align-items: center;
  justify-content: center;
  top: ${props => `${(props.startTime / 60) * 100}%`};
  transition: 0.15s ease-out;
  :hover {
    transform: scale(1.05);
    transition: 0.25s ease-out;
    z-index: 10;
  }
`

const Hours = styled.div`
  font-size: 1.2rem;
`
class TimeSlotHours extends Component {
  componentDidUpdate() {
    console.log(this.props.scrollTop)
  }
  renderHeader() {
    const dateFormat = 'MMMM Do, YYYY'

    return (
      <Header>
        <ChevronLeft onClick={this.props.goBack} />
        <Day>{dateFns.format(this.props.day, dateFormat)}</Day>
        <Empty />
      </Header>
    )
  }

  renderHours() {
    const dateFormat = 'ha'
    const hours = []
    let selectedDate = dateFns.startOfDay(this.props.day)

    for (let i = 0; i < 24; i++) {
      const sessions = exampleSessions.filter(
        session => dateFns.getHours(session.timeStart) === i
      )

      hours.push(
        <Row key={i}>
          <Hour>
            {dateFns.format(dateFns.addHours(selectedDate, i), dateFormat)}
          </Hour>
          <Sessions>
            {sessions.map(session => (
              <Session
                key={session.timeStart}
                height={session.length}
                full={session.players.length === session.slots}
                startTime={dateFns.getMinutes(session.timeStart)}
                onClick={() => {
                  this.props.setSelectedSession(session)
                }}
              >
                {`${session.slots - session.players.length} ${
                  session.slots - session.players.length === 1
                    ? 'spot'
                    : 'spots'
                } left`}
              </Session>
            ))}
          </Sessions>
        </Row>
      )
    }

    return <Hours>{hours}</Hours>
  }
  render() {
    return (
      <Container>
        {this.renderHeader()}
        {this.renderHours()}
      </Container>
    )
  }
}

export default TimeSlotHours
