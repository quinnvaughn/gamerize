import React from 'react'
import styled from 'styled-components'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import dateFns from 'date-fns'

//local imports
import useInterval from '../Hooks/useInterval'
import { objectIsEmpty } from '../utils/Objects'

const Container = styled.div`
  background: #fff;
  border: 1px solid #dddfe2;
  border-radius: 4px;
  padding: 2rem;
  width: 100%;
  margin-bottom: 1rem;
`

const Title = styled.div`
  font-size: 2.2rem;
  font-weight: 900;
  margin-bottom: 0.5rem;
`

const Content = styled.div`
  display: flex;
`

const FlexHalf = styled.div`
  flex: 50%;
`

const Game = styled.div`
  font-size: 1.7rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`
const Times = styled.div`
  font-size: 1.6rem;
`

const Usernames = styled.div`
  font-size: 1.7rem;
  font-weight: 700;
`

const Username = styled.div`
  font-size: 1.6rem;
`

const Day = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
`

const NoUpcoming = styled.div`
  font-weight: 600;
  font-size: 1.8rem;
`

const NEXT_SESSION = gql`
  {
    nextTimeSlot {
      slots
      startTime
      gamingSession {
        game {
          name
        }
      }
      endTime
      players {
        player {
          username
        }
      }
    }
  }
`

export default function NextSession(props) {
  const { data, loading, refetch } = useQuery(NEXT_SESSION)
  useInterval(() => {
    refetch()
  }, 60000)
  const renderUsernames = () => {
    let usernames = []
    let counter = 0
    let end = data.nextTimeSlot.slots
    while (counter < end) {
      let username =
        data.nextTimeSlot.players.length > 0 &&
        data.nextTimeSlot.players[counter]
          ? data.nextTimeSlot.players[counter].player.username
          : 'Empty Slot'
      usernames.push(<Username>{username}</Username>)
      counter++
    }
    return (
      <FlexHalf>
        <Usernames>Usernames:</Usernames>
        {usernames}
      </FlexHalf>
    )
  }
  const dayFormat = 'MMMM Do, YYYY'
  const dateFormat = 'h:mm a'
  return (
    <Container>
      <Title>Next Session:</Title>
      {loading ? null : data.nextTimeSlot === null ? (
        <NoUpcoming>
          You have no upcoming time slots! Be sure to add some!
        </NoUpcoming>
      ) : (
        <Content>
          <FlexHalf>
            <Game>{data.nextTimeSlot.gamingSession.game.name}</Game>
            <Day>{dateFns.format(data.nextTimeSlot.startTime, dayFormat)}</Day>
            <Times>
              {`${dateFns.format(
                data.nextTimeSlot.startTime,
                dateFormat
              )} - ${dateFns.format(data.nextTimeSlot.endTime, dateFormat)}`}
            </Times>
          </FlexHalf>
          {renderUsernames()}
        </Content>
      )}
    </Container>
  )
}
