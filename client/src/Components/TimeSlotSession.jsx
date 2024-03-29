import React, { useEffect, Fragment } from 'react'
import styled from 'styled-components'
import { FaChevronLeft } from 'react-icons/fa'
import dateFns from 'date-fns'
import { withRouter } from 'react-router-dom'
import { MdClose } from 'react-icons/md'
import Media from 'react-media'

//local imports
import Slot from './Slot'
import SlotOptionsDropdown from './SlotOptionsDropdown'
import { noUnderscores } from '../utils/Strings'
import { capitalize } from '../utils/Strings'
import { displaySystem, mapSystem, mapLauncher } from '../utils/System'
import { formatSystem } from '../utils/Strings'
import { Mixpanel } from './Mixpanel'
import { useSessions } from '../State/SessionsSelectedContext'

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
  padding: 1rem 2rem 4rem 2rem;
  margin: 0;
  font-size: 3rem;
  font-weight: 700;
  color: black;
  max-width: inherit;
  position: sticky;
  top: 0;
  z-index: 1000;
`

const ChevronLeft = styled(FaChevronLeft)`
  cursor: pointer;
  transition: 0.15s ease-out;
  font-size: 1.8rem;
  color: black;
  :hover {
    transform: scale(1.75);
    transition: 0.25s ease-out;
    color: #db1422;
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
  @media (max-width: 640px) {
    font-size: 2rem;
  }
`

const Date = styled.span`
  font-size: 2rem;
  font-weight: 600;
  cursor: default;
`

const System = styled.span`
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
  @media (max-width: 640px) {
    flex-direction: column;
  }
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

const SlotsAndPlayersContainer = styled.div`
  width: 100%;
  display: flex;
`

const NumberOfSlotsContainer = styled.label`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  @media (max-width: 640px) {
    margin-bottom: 0.5rem;
  }
`

const NumberOfPlayersContainer = styled.label`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  @media (max-width: 640px) {
    margin-bottom: 0.5rem;
  }
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
  color: #db1422;
  cursor: pointer;
  outline: 0;
  border: 1px solid #db1422;
  border-radius: 4px;
  :hover {
    border: 1px solid white;
    background: #db1422;
    color: white;
  }
`
const PickAllSlotsForMe = styled.button`
  background: white;
  height: 4rem;
  padding: 0.6rem 0.8rem;
  color: #db1422;
  cursor: pointer;
  outline: 0;
  border: 1px solid #db1422;
  border-radius: 4px;
  :hover {
    border: 1px solid white;
    background: #db1422;
    color: white;
  }
`

const AddSessions = styled.button`
  background: ${props => (props.disabled ? '#ebebeb' : '#db1422')};
  pointer-events: ${props => props.disabled && 'none'};
  padding: 1rem 1.4rem;
  color: #fff;
  cursor: pointer;
  outline: 0;
  font-size: 1.6rem;
  font-weight: 600;
  border: 1px solid ${props => (props.disabled ? '#ebebeb' : '#db1422')};
  border-radius: 4px;
`

const RemoveSessions = styled.button`
  background: #fff;
  pointer-events: ${props => props.disabled && 'none'};
  padding: 1rem 1.4rem;
  color: #db1422;
  cursor: pointer;
  outline: 0;
  font-size: 1.6rem;
  font-weight: 600;
  border: 1px solid #db1422;
  border-radius: 4px;
  margin-left: 1rem;
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
    color: #db1422;
  }
`

const ExitContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  background: #fff;
`

const ExtraContainer = styled.div`
  margin-top: 1rem;
  width: 100%;
  text-align: center;
`

const LoggedIn = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
`

const CorrectGamerTag = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
`
const Me = styled.div`
  text-align: center;
  font-size: 1.6rem;
  font-weight: 800;
  overflow-wrap: break-word;
`

const HeaderInfo = styled.div`
  align-items: center;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

function TimeSlotSession(props) {
  const [allSessions, dispatch] = useSessions()
  const { system, launcher } = allSessions.selectedSession.gamingSession
  useEffect(() => {
    const element = document.getElementById('modal')
    element.scrollTop = 0
    Mixpanel.track('Selected a specific timeslot')
  }, {})
  const isMe = props.match.params.user === props.me.username
  const noSlots = allSessions.sessionToBeAdded.slots === 0
  const disabled = isMe
    ? true
    : props.me.gamertags
    ? system === 'PC'
      ? !props.me.gamertags[mapSystem(system)][
          mapLauncher(launcher ? launcher : '')
        ]
      : !props.me.gamertags[mapSystem(system)]
    : true
  const renderHeader = () => {
    const dateFormat = 'MMMM Do'
    const endTime = 'h:mm a'
    return (
      <Header>
        <ExitContainer>
          <Exit onClick={props.close} />
        </ExitContainer>
        <HeaderInfo>
          <ChevronLeft onClick={props.goBack} />
          <Center>
            <Title>{`${props.gamer} - ${noUnderscores(props.game)}`}</Title>
            <System>{formatSystem(props.system)}</System>
            <Date>
              {dateFns.format(
                allSessions.selectedSession.startTime,
                dateFormat
              )}
            </Date>
            <Time>
              {`${dateFns.format(
                allSessions.selectedSession.startTime,
                endTime
              )} - ${dateFns.format(
                dateFns.addMinutes(
                  allSessions.selectedSession.startTime,
                  allSessions.selectedSession.length
                ),
                endTime
              )}`}
            </Time>
          </Center>
          <Empty />
        </HeaderInfo>
      </Header>
    )
  }

  const renderSlots = () => {
    // Should check for already booked slots and prevent from adding if they overlap.
    // Should also check if slots get booked by someone else after selected
    // but before booked.
    let slots = []
    let counter = 0
    let end = allSessions.selectedSession.slots
    const sameSessionSelection = allSessions.sessions.filter(
      addedSession => addedSession.id === allSessions.selectedSession.id
    )
    const alreadySelected = sameSessionSelection.length > 0
    if (alreadySelected) {
      while (allSessions.selectedSession.players.length > counter) {
        slots.push(
          <Slot index={counter + 1} taken={true}>
            {allSessions.selectedSession.players[counter].player.username}
          </Slot>
        )
        counter++
      }
      while (
        allSessions.selectedSession.players.length +
          sameSessionSelection[0].slots >
        counter
      ) {
        slots.push(<Slot index={counter + 1} taken={true} selected={true} />)
        counter++
      }
      while (counter < end) {
        let username = allSessions.selectedSession.players[counter]
          ? allSessions.selectedSession.players[counter].player.username
          : 'Available'
        slots.push(
          <Slot
            index={counter + 1}
            taken={username !== 'Available'}
            value={username ? counter : null}
          >
            {username}
          </Slot>
        )
        counter++
      }
    } else {
      while (counter < end) {
        let username = allSessions.selectedSession.players[counter]
          ? allSessions.selectedSession.players[counter].player.username
          : 'Available'
        slots.push(
          <Slot
            index={counter + 1}
            taken={username !== 'Available'}
            value={username ? counter : null}
          >
            {username}
          </Slot>
        )
        counter++
      }
    }
    return (
      <Slots>
        {slots}
        <AddSessionsContainer>
          <AddSessions
            disabled={disabled || noSlots || alreadySelected}
            onClick={() => {
              dispatch({ type: 'ADD_SESSION' })
              Mixpanel.track('Added session/s')
            }}
          >
            Add Session
          </AddSessions>
          {alreadySelected && (
            <RemoveSessions
              onClick={() => {
                dispatch({
                  type: 'REMOVE_SESSION',
                  payload: allSessions.selectedSession.id,
                })
                Mixpanel.track('Removed session/s')
              }}
            >
              Remove Session
            </RemoveSessions>
          )}
        </AddSessionsContainer>
        <ExtraContainer>
          {props.me === null && (
            <LoggedIn>You need to be logged in to add time slots.</LoggedIn>
          )}
          {props.me !== null && disabled && !isMe && (
            <CorrectGamerTag>
              You must add a gamertag for{' '}
              {system === 'PC'
                ? `the ${capitalize(launcher)} Launcher`
                : displaySystem(system)}
            </CorrectGamerTag>
          )}
          {isMe && <Me>You can't add timeslots on your own session</Me>}
        </ExtraContainer>
      </Slots>
    )
  }

  const renderSlotOptions = () => {
    return (
      <SlotOptionsContainer>
        <Media query={{ maxWidth: 640 }}>
          {matches =>
            matches ? (
              <SlotsAndPlayersContainer>
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
              </SlotsAndPlayersContainer>
            ) : (
              <Fragment>
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
              </Fragment>
            )
          }
        </Media>
        <OptionsContainer>
          <PickAllSlotsForTeam
            onClick={() => {
              dispatch({ type: 'FILL_ALL_SLOTS_WITH_FRIENDS' })
            }}
          >
            Fill all the slots with my friends
          </PickAllSlotsForTeam>
        </OptionsContainer>
        <OptionsContainer>
          <PickAllSlotsForMe
            onClick={() => {
              dispatch({ type: 'FILL_ALL_SLOTS_FOR_ME' })
            }}
          >
            Fill all the slots for me
          </PickAllSlotsForMe>
        </OptionsContainer>
      </SlotOptionsContainer>
    )
  }

  const renderPrimary = () => {
    return (
      <SlotsContainer>
        {renderSlotOptions()}
        {renderSlots(allSessions.selectedSession)}
      </SlotsContainer>
    )
  }

  return (
    <Container>
      {renderHeader()}
      {renderPrimary()}
    </Container>
  )
}

export default withRouter(TimeSlotSession)
