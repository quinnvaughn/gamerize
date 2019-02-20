import React, { Component } from 'react'
import styled from 'styled-components'
import dateFns, { isThisHour } from 'date-fns'
import { FaChevronLeft } from 'react-icons/fa'

const Container = styled.div`
  display: block;
  position: relative;
  width: 100%;
  max-width: 1080px;
  background: #fff;
  border: 1px solid #dddfe2;
`

const Header = styled.div`
  text-transform: uppercase;
  width: 100%;
  border-bottom: 1px solid #dddfe2;
  background: #fff;
  padding: 40px 20px;
  margin: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 30px;
  font-weight: 700;
  color: black;
  justify-content: space-between;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 9999;
  max-width: inherit;
`

const ChevronLeft = styled(FaChevronLeft)`
  cursor: pointer;
  transition: 0.15s ease-out;
  font-size: 18px;
  color: black;
  :hover {
    transform: scale(1.75);
    transition: 0.25s ease-out;
    color: red;
  }
`

const Day = styled.span`
  cursor: default;
`

//For formatting.
const Empty = styled.div``

const Row = styled.div`
  margin: 0;
  padding: 0px 10px 0px 40px;
  height: 200px;
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
  width: 60px;
  align-items: center;
  padding-right: 10px;
  border-right: 1px solid #dddfe2;
`

const Sessions = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
`

const Session = styled.div`
  height: ${props => `${200 / (60 / props.height)}px`};
  background: ${props => (props.full ? 'red' : 'white')};
  width: 100%;
  color: ${props => (props.full ? 'white' : 'black')};
  border: ${props => !props.full && '1px solid #d3d3d3'};
  cursor: pointer;
  position: absolute;
  display: flex;
  z-index: 1;
  border-radius: 4px;
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

const Hours = styled.div``

const exampleSessions = [
  {
    players: [1],
    slots: 3,
    timeStart: 'February 19, 2019 15:00:00',
    length: 20,
  },
  {
    players: [1, 2],
    slots: 3,
    timeStart: 'February 19, 2019 15:20:00',
    length: 30,
  },
  {
    players: [1, 2],
    slots: 3,
    timeStart: 'February 19, 2019 14:00:00',
    length: 7,
  },
  {
    players: [1, 2],
    slots: 3,
    timeStart: 'February 19, 2019 14:07:00',
    length: 7,
  },
  {
    players: [1, 2],
    slots: 3,
    timeStart: 'February 19, 2019 14:14:00',
    length: 7,
  },
  {
    players: [1, 2, 3],
    slots: 3,
    timeStart: 'February 19, 2019 15:50:00',
    length: 20,
  },
  {
    players: [1, 2],
    slots: 3,
    timeStart: 'February 19, 2019 12:20:00',
    length: 20,
  },
]

export default class TimeSlotsHours extends Component {
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
                height={session.length}
                full={session.players.length === session.slots}
                startTime={dateFns.getMinutes(session.timeStart)}
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
