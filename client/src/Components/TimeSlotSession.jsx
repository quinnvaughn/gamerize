import React, { useEffect } from 'react'
import styled from 'styled-components'
import { FaChevronLeft } from 'react-icons/fa'
import dateFns from 'date-fns'
import { Subscribe } from 'unstated'
import { MdClose } from 'react-icons/md'

//local imports
import Slot from './Slot'
import SessionsContainer from '../Containers/SessionsContainer'
import SlotOptionsDropdown from './SlotOptionsDropdown'
import { noUnderscores } from '../utils/Strings'

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
    color: #f10e0e;
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
  font-weight: 700;
`

const Date = styled.span`
  font-size: 2rem;
  font-weight: 600;
  cursor: default;
`

const Time = styled.span`
  font-size: 1.6rem;
  font-weight: 400;
  cursor: default;
`

const Empty = styled.div``

const SlotsContainer = styled.div`
  padding: 0 8rem 8rem;
  font-size: 1.6rem;
  border-bottom: 1px solid #dddfe2;
  display: flex;
  align-items: center;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`

const SlotOptionsContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 2rem 0 2rem;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`

const OptionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 1127px) {
    flex: 50%;

    button {
      margin-top: 1rem;
    }
  }
`

const NumberOfSlotsContainer = styled.label`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
`

const NumberOfPlayersContainer = styled.label`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
`

const Slots = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
`

const PickAllSlotsForTeam = styled.button`
  background: white;
  height: 4rem;
  padding: 0.6rem 0.8rem;
  color: #f10e0e;
  cursor: pointer;
  outline: 0;
  border: 1px solid #f10e0e;
  border-radius: 4px;
  :hover {
    border: 1px solid white;
    background: #f10e0e;
    color: white;
  }
`
const PickAllSlotsForMe = styled.button`
  background: white;
  height: 4rem;
  padding: 0.6rem 0.8rem;
  color: #f10e0e;
  cursor: pointer;
  outline: 0;
  border: 1px solid #f10e0e;
  border-radius: 4px;
  :hover {
    border: 1px solid white;
    background: #f10e0e;
    color: white;
  }
`

const AddSessions = styled.button`
  background: #f10e0e;
  padding: 1rem 1.4rem;
  color: #fff;
  cursor: pointer;
  outline: 0;
  border: 1px solid #f10e0e;
  border-radius: 4px;
`

const AddSessionsContainer = styled.div`
  width: 100%;
  display: flex;
  padding-top: 1rem;
  justify-content: flex-end;
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
  position: sticky;
  top: 0;
  left: 0;
  z-index: 9999;
  background: #fff;
  height: 3rem;
`

export default function TimeSlotSession(props) {
  useEffect(() => {
    const element = document.getElementById('modal')
    element.scrollTop = 0
  }, {})
  const renderHeader = () => {
    const dateFormat = 'MMM Do, YYYY'
    const endTime = 'h:mm a'
    return (
      <Header>
        <ChevronLeft onClick={props.goBack} />
        <Center>
          <Title>{`${props.gamer} - ${noUnderscores(props.game)}`}</Title>
          {/* Add system when have that data. */}
          <Date>
            {dateFns.format(props.selectedSession.startTime, dateFormat)}
          </Date>
          <Time>
            {`${dateFns.format(
              props.selectedSession.startTime,
              endTime
            )} - ${dateFns.format(
              dateFns.addMinutes(
                props.selectedSession.startTime,
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

  const renderSlots = session => {
    let slots = []
    let counter = 0
    let end = session.state.selectedSession.slots
    while (counter < end) {
      console.log(session.state.selectedSession.players[counter])
      const currentUser = session.state.selectedSession.players[counter]
        ? session.state.selectedSession.players[counter].username
        : null
      currentUser
        ? slots.push(
            <Slot taken value={counter}>
              {currentUser}
            </Slot>
          )
        : slots.push(<Slot value={counter}>Available</Slot>)
      counter++
    }
    return (
      <Slots>
        {slots}
        <AddSessionsContainer>
          <AddSessions onClick={() => session.addSessions()}>
            Add Session
          </AddSessions>
        </AddSessionsContainer>
      </Slots>
    )
  }

  const renderSlotOptions = () => {
    return (
      <Subscribe to={[SessionsContainer]}>
        {session => (
          <SlotOptionsContainer>
            <OptionsContainer>
              <NumberOfSlotsContainer>
                Slots: <SlotOptionsDropdown slots />
              </NumberOfSlotsContainer>
            </OptionsContainer>
            <OptionsContainer>
              <NumberOfPlayersContainer>
                Players: <SlotOptionsDropdown />
              </NumberOfPlayersContainer>
            </OptionsContainer>
            <OptionsContainer>
              <PickAllSlotsForTeam
                onClick={() => session.fillAllSlotsWithMyFriends()}
              >
                Fill all the slots with my friends
              </PickAllSlotsForTeam>
            </OptionsContainer>
            <OptionsContainer>
              <PickAllSlotsForMe onClick={() => session.fillAllSlotsForMe()}>
                Fill all the slots for me
              </PickAllSlotsForMe>
            </OptionsContainer>
          </SlotOptionsContainer>
        )}
      </Subscribe>
    )
  }

  const renderPrimary = () => {
    return (
      <Subscribe to={[SessionsContainer]}>
        {session => (
          <SlotsContainer>
            {renderSlotOptions()}
            {renderSlots(session)}
          </SlotsContainer>
        )}
      </Subscribe>
    )
  }

  return (
    <Container>
      <ExitContainer>
        <Exit onClick={props.close} />
      </ExitContainer>
      {renderHeader()}
      {renderPrimary()}
    </Container>
  )
}
