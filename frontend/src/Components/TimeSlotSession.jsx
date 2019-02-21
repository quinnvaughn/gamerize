import React from 'react'
import styled from 'styled-components'
import { FaChevronLeft } from 'react-icons/fa'
import dateFns from 'date-fns'

//local imports
import Slot from './Slot'

const Container = styled.div`
  display: block;
  position: relative;
  width: 100%;
  max-width: 108rem;
  background: #fff;
  border: 1px solid #dddfe2;
`

const Header = styled.div`
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

const Center = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

const Title = styled.span`
  font-size: 3rem;
  cursor: default;
`

const Date = styled.span`
  font-size: 2rem;
  font-weight: 400;
  cursor: default;
`

const Time = styled.span`
  font-size: 1.6rem;
  font-weight: 400;
  cursor: default;
`

const Empty = styled.div``

const SlotsContainer = styled.div`
  padding: 8rem;
  font-size: 1.6rem;
  border-bottom: 1px solid #dddfe2;
  display: flex;
  align-items: center;
  position: relative;
`

const SlotsTitle = styled.div`
  padding-right: 2rem;
  width: inherit;
`

const Slots = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

export default function TimeSlotSession(props) {
  const renderHeader = () => {
    const dateFormat = 'MMM Do, YYYY'
    const endTime = 'h:mm:ss a'
    return (
      <Header>
        <ChevronLeft onClick={props.goBack} />
        <Center>
          <Title>{`${props.gamer.name} - ${props.game}`}</Title>
          {/* Add system when have that data. */}
          <Date>
            {dateFns.format(props.selectedSession.timeStart, dateFormat)}
          </Date>
          <Time>
            {`${dateFns.format(
              props.selectedSession.timeStart,
              endTime
            )} - ${dateFns.format(
              dateFns.addMinutes(
                props.selectedSession.timeStart,
                props.selectedSession.length
              ),
              endTime
            )}`}
          </Time>
        </Center>
        <Empty />
      </Header>
    )
  }

  const renderSlots = () => {
    let slots = []
    for (let i = 0; i < props.selectedSession.slots; i++) {
      const currentUser = props.selectedSession.players[i]
      currentUser
        ? slots.push(
            <Slot taken value={currentUser}>
              {currentUser}
            </Slot>
          )
        : slots.push(
            <Slot value={`empty${i}-${props.selectedSession.timeStart}`}>
              Empty
            </Slot>
          )
    }
    return (
      <SlotsContainer>
        <SlotsTitle>Slots:</SlotsTitle>
        <Slots>{slots}</Slots>
      </SlotsContainer>
    )
  }
  return (
    <Container>
      {renderHeader()}
      {renderSlots()}
    </Container>
  )
}
