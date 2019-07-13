import React from 'react'
import styled from 'styled-components'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import dateFns from 'date-fns'

//local imports
import { mapSystem, mapLauncher } from '../utils/System'

const Container = styled.div`
  border-radius: 4px;
  padding: 2rem;
  width: 100%;
  margin-bottom: 1rem;
`

const Title = styled.div`
  font-size: 2.2rem;
  font-weight: 900;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
`

const FlexHalf = styled.div`
  flex: 50%;
`

const Game = styled.div`
  font-size: 1.7rem;
  font-weight: 700;
`
const Times = styled.div`
  font-size: 1.6rem;
`

const InfoContainer = styled.div`
  border-bottom: 1px solid #c0c0c0;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
`

const Usernames = styled.div`
  font-size: 1.7rem;
  font-weight: 700;
`

const Username = styled.div`
  font-size: 1.6rem;
`

const Discords = styled.div`
  font-size: 1.7rem;
  font-weight: 700;
`

const Discord = styled.div`
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
  query($timeZone: String!) {
    nextTimeSlot(timeZone: $timeZone) {
      slots
      startTime
      gamingSession {
        system
        launcher
        game {
          name
        }
      }
      endTime
      players {
        player {
          gamertags {
            psn
            xbl
            nso
            pc {
              epic
              origin
              steam
              bethesda
              battlenet
            }
          }
        }
      }
    }
  }
`

export default function NextSession(props) {
  const { data, loading } = useQuery(NEXT_SESSION, {
    variables: { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone },
    pollInterval: 5000,
  })
  const renderUsernames = () => {
    let usernames = new Set()
    let counter = 0
    let end = data.nextTimeSlot.slots
    const system = mapSystem(data.nextTimeSlot.gamingSession.system)
    const launcher = mapLauncher(
      data.nextTimeSlot.gamingSession.launcher
        ? data.nextTimeSlot.gamingSession.launcher
        : ''
    )
    while (counter < end) {
      if (system === 'pc') {
        let username =
          data.nextTimeSlot.players.length > 0 &&
          data.nextTimeSlot.players[counter]
            ? data.nextTimeSlot.players[counter].player.gamertags[system][
                launcher
              ]
            : null
        usernames.add(username)
      } else {
        let username =
          data.nextTimeSlot.players.length > 0 &&
          data.nextTimeSlot.players[counter]
            ? data.nextTimeSlot.players[counter].player.gamertags[system]
            : null
        usernames.add(username)
      }
      counter++
    }
    const uniqueUsernames = [...usernames]
    return (
      <FlexHalf>
        <Usernames>Usernames:</Usernames>
        {uniqueUsernames.map(username => (
          <Username>{username}</Username>
        ))}
      </FlexHalf>
    )
  }
  const dayFormat = 'MMMM Do, YYYY'
  const dateFormat = 'h:mm a'
  return (
    <Container>
      <InfoContainer>
        <Title>Next Session</Title>
      </InfoContainer>
      {loading ? null : data.nextTimeSlot === null ? (
        <NoUpcoming>
          You have no upcoming time slots! Be sure to add some!
        </NoUpcoming>
      ) : (
        <Content>
          <InfoContainer>
            <Game>{data.nextTimeSlot.gamingSession.game.name}</Game>
            <Day>{dateFns.format(data.nextTimeSlot.startTime, dayFormat)}</Day>
            <Times>
              {`${dateFns.format(
                data.nextTimeSlot.startTime,
                dateFormat
              )} - ${dateFns.format(data.nextTimeSlot.endTime, dateFormat)}`}
            </Times>
          </InfoContainer>
          {renderUsernames()}
        </Content>
      )}
    </Container>
  )
}
