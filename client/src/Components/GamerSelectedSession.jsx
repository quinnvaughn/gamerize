import React from 'react'
import styled from 'styled-components'
import { useMutation } from 'react-apollo-hooks'
import { useStore } from 'react-hookstore'
import { MdClose } from 'react-icons/md'
import dateFns from 'date-fns'
import gql from 'graphql-tag'

//local imports
import Modal from './Modal'
import gamerSessionSelection from '../Stores/GamerSessionSelectionStore'

const Container = styled.div`
  padding: 2rem;
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

const Center = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const Hours = styled.div`
  font-size: 2.4rem;
  font-weight: 600;
  margin-bottom: 2rem;
`

const Time = styled.div`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
`

const Slots = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const Slot = styled.div`
  border: 1px solid #dddfe2;
  border-radius: 4px;
  padding: 1rem 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: ${props => props.taken && 'none'};
  color: ${props => props.taken && '#dddfe2'};
  background: #fff;
  font-size: 1.6rem;
  height: 4rem;
  width: 50%;
`

const Cancel = styled.button`
  outline: 0;
  padding: 1rem;
  color: #fff;
  background: ${props => (props.disabled ? '#dddfe2' : '#f10e0e')};
  cursor: pointer;
  border-radius: 4px;
  border: none;
  font-weight: 600;
  font-size: 1.6rem;
  pointer-events: ${props => props.disabled && 'none'};
`

const Width = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const CancelContainer = styled.div`
  margin-top: 3rem;
  width: 50%;
  display: flex;
  justify-content: flex-end;
`

const CANCEL_SESSION = gql`
  mutation($input: CancelSessionInput!) {
    cancelSession(input: $input) {
      cancelled
    }
  }
`

export default function GamerSelectedSession(props) {
  const [state, dispatch] = useStore(gamerSessionSelection)
  const cancelSession = useMutation(CANCEL_SESSION)
  const monthFormat = 'MMMM Do, YYYY'
  const dateFormat = 'h:mm A'
  const renderSlots = () => {
    let slots = []
    let counter = 0
    let end = state.selectedSession.slots
    while (counter < end) {
      let username = state.selectedSession.players[counter]
        ? state.selectedSession.players[counter].username
        : 'Available'
      slots.push(<Slot taken={username !== 'Available'}>{username}</Slot>)
      counter++
    }
    return <Slots>{slots}</Slots>
  }
  return (
    <Modal
      onRequestClose={() =>
        dispatch({ type: 'setSelectedSession', payload: null })
      }
    >
      <Container>
        <ExitContainer>
          <Exit
            onClick={() =>
              dispatch({ type: 'setSelectedSession', payload: null })
            }
          />
        </ExitContainer>
        <Center>
          <Time>
            {dateFns.format(state.selectedSession.startTime, monthFormat)}
          </Time>
          <Hours>
            {`${dateFns.format(
              state.selectedSession.startTime,
              dateFormat
            )} - ${dateFns.format(state.selectedSession.endTime, dateFormat)}`}
          </Hours>
        </Center>
        {renderSlots()}
        <Width>
          <CancelContainer>
            <Cancel
              disabled={
                state.selectedSession.finished ||
                dateFns.compareAsc(
                  state.selectedSession.startTime,
                  new Date()
                ) === -1
              }
              onClick={async () => {
                const input = { sessionId: state.selectedSession.id }
                const data = await cancelSession({ variables: { input } })
                props.refetch()
                console.log(data)
              }}
            >
              Cancel Session
            </Cancel>
          </CancelContainer>
        </Width>
      </Container>
    </Modal>
  )
}
