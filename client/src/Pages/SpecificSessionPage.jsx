import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import Media from 'react-media'

//local
import SelectionOptions from '../Components/SelectionOptions'
import Footer from '../Components/Footer'
import TodayAvailability from '../Components/TodayAvailability'
import NavBar from '../Components/NavBar'
import FixedSelectionOptions from '../Components/FixedSelectionOptions'
import Modal from '../Components/Modal'
import Calendar from '../Components/TimeSlotsCalendar'
import TimeSlotsHours from '../Components/TimeSlotsHours'
import TimeSlotSession from '../Components/TimeSlotSession'
import { noUnderscores, capitalize, mapGameType } from '../utils/Strings'
import { formatSystem } from '../utils/Strings'
import Loading from '../Components/Loading'
import { Mixpanel } from '../Components/Mixpanel'
import ErrorPage from './ErrorPage'
import { useSessions } from '../State/SessionsSelectedContext'
import SelectedSlotsModal from '../Components/SelectedSlotsModal'
import OccupationList from '../Components/OccupationList'

//data

const PageContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100%;
  position: relative;
  padding-bottom: 6rem;
`

const Content = styled.div`
  padding-top: 2rem;
  padding-left: 2.4rem;
  padding-right: 2.4rem;
  max-width: none;
  padding-bottom: 6rem;
  display: flex;
  @media (min-width: 743px) {
    max-width: 69.6rem;
    margin: 0 auto;
    width: auto;
    padding-left: 2.4rem;
    padding-right: 2.4rem;
  }
  @media (min-width: 1128px) {
    margin: 0 auto;
    max-width: 108rem;
    display: flex;
  }
`

const TopContainer = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 2.4rem;
  padding-bottom: 2.4rem;
  border-bottom: 1px solid #dddfe2;
`

const Gamer = styled.h2`
  font-size: 2rem;
  overflow-wrap: break-word;
  white-space: nowrap;
`

const GamerLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: black;
  :hover {
    color: #db1422;
  }
`

const Avatar = styled.img`
  border-radius: 50%;
  overflow: hidden;
  width: 6.4rem;
  height: 6.4rem;
`

const Title = styled.h1`
  font-size: 3.2rem;
  font-weight: 800;
  overflow-wrap: break-word;
`

const TitleContainer = styled.div`
  flex: 7;
`

const Game = styled.h3`
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2.2rem;
`

const LeftSide = styled.div`
  flex: 60%;
  padding-right: 1rem;
  margin-top: 1rem;
`

const Systems = styled.span`
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 2.2rem;
`

const BannerContainer = styled.div`
  height: auto;
`

const Banner = styled.img`
  width: 100%;
  max-height: 40rem;
`

const TypeOfGame = styled.span`
  line-height: 2.2rem;
  font-size: 1.6rem;
  font-weight: 400;
`

const Slots = styled.span`
  font-size: 1.6rem;
  font-weight: 400;
`

const Length = styled.span`
  font-size: 1.6rem;
  font-weight: 400;
`
const Setup = styled.span`
  font-size: 1.6rem;
  font-weight: 400;
`

const Launcher = styled.span`
  font-size: 1.6rem;
  font-weight: 400;
`

const GamerInfo = styled.div`
  width: 100%;
`

const MiddleContainer = styled.div`
  padding-bottom: 2.4rem;
  margin-bottom: 2.4rem;
  border-bottom: 1px solid #dddfe2;
  display: flex;
`

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`

const FlexHalf = styled.div`
  flex: 1;
`

const TypeOfContent = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  margin-top: 1.6rem;
  line-height: 2.2rem;
  :first-child {
    margin-top: 0;
  }
`

const GamerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 3;
`

const GET_SPECIFIC_SESSION = gql`
  query($sessionId: String!) {
    getSpecificSession(sessionId: $sessionId) {
      title
      length
      id
      type
      slots
      launcher
      price
      slotsLeftToday
      reviewRating
      numReviews
      system
      creator {
        id
        setup
        banner
        username
        profilePicture
        occupations
        displayName
      }
      game {
        id
        name
      }
      gamers {
        id
        occupations
        username
        name
      }
    }
  }
`

const GET_SLOTS_TODAY = gql`
  query($sessionId: String!, $timeZone: String!) {
    specificSessionSlotsToday(sessionId: $sessionId, timeZone: $timeZone) {
      startTime
      length
      slots
      id
      passed
      gamingSession {
        id
        system
        launcher
        game {
          id
        }
      }
      players {
        player {
          id
          username
        }
      }
    }
  }
`

const GET_ME = gql`
  {
    me {
      username
      email
      id
      role
      profilePicture
      customerStripeId
      hasDefaultCard
      gamertags {
        psn
        xbl
        nso
        pc {
          epic
          steam
          origin
          gog
          battlenet
          uplay
          bethesda
          itch
          windows
        }
      }
    }
  }
`

function timeslotDoesNotHaveSlots(allSessions, setNotEnoughSpots, secondData) {
  // Probably better way to do this
  useEffect(() => {
    allSessions.sessions.length === 0 && setNotEnoughSpots([])
    secondData.specificSessionSlotsToday &&
      secondData.specificSessionSlotsToday.map(slot => {
        allSessions.sessions.map(session => {
          if (session.id === slot.id) {
            if (slot.slots - slot.players.length < session.slots) {
              setNotEnoughSpots(prev => [...prev, slot])
            }
          } else {
            setNotEnoughSpots([])
          }
        })
      })
  }, [allSessions.sessions, secondData.specificSessionSlotsToday])
}

export default function SpecificSessionPage(props) {
  const [allSessions, dispatch] = useSessions()
  const [notEnoughSpots, setNotEnoughSpots] = useState([])
  useEffect(() => {
    Mixpanel.track('Clicked on a session')
  }, {})

  // data
  const { data, loading, error } = useQuery(GET_SPECIFIC_SESSION, {
    variables: {
      sessionId: props.match.params.id,
    },
    pollInterval: 500,
  })
  const {
    data: secondData,
    loading: secondLoading,
    refetch,
    error: secondError,
  } = useQuery(GET_SLOTS_TODAY, {
    variables: {
      sessionId: props.match.params.id,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    pollInterval: 500,
  })
  const {
    data: thirdData,
    loading: thirdLoading,
    refetch: meRefetch,
    error: thirdError,
  } = useQuery(GET_ME)

  // checks for timeslots
  timeslotDoesNotHaveSlots(allSessions, setNotEnoughSpots, secondData)

  const hasErrors = error || secondError || thirdError
  const isLoading = loading || secondLoading || thirdLoading

  return isLoading ? (
    <Loading />
  ) : hasErrors ? (
    <ErrorPage errors={hasErrors} />
  ) : (
    <PageContainer>
      <NavBar />
      <BannerContainer>
        <Banner src={data.getSpecificSession.creator.banner} alt="Banner" />
      </BannerContainer>
      <Content>
        <LeftSide>
          <GamerInfo>
            <TopContainer>
              <TitleContainer>
                <Title>{data.getSpecificSession.title}</Title>
              </TitleContainer>
              <GamerContainer>
                <GamerLink
                  to={`/users/${data.getSpecificSession.creator.username}`}
                >
                  <Avatar
                    src={data.getSpecificSession.creator.profilePicture}
                    alt="Avatar"
                  />
                  <Gamer>{`${
                    data.getSpecificSession.creator.displayName
                  }`}</Gamer>
                </GamerLink>
                <OccupationList
                  occupations={data.getSpecificSession.creator.occupations}
                />
              </GamerContainer>
            </TopContainer>
            <MiddleContainer>
              <FlexHalf>
                <Flex>
                  <TypeOfContent>Game</TypeOfContent>
                  <Game>{`${noUnderscores(
                    data.getSpecificSession.game.name
                  )}`}</Game>
                </Flex>
                <Flex>
                  <TypeOfContent>System</TypeOfContent>
                  <Systems>
                    {formatSystem(data.getSpecificSession.system)}
                  </Systems>
                </Flex>
                <Flex>
                  <TypeOfContent>Game Length</TypeOfContent>
                  <Length>{`${data.getSpecificSession.length} minutes`}</Length>
                </Flex>
                {data.getSpecificSession.system === 'PC' && (
                  <Flex>
                    <TypeOfContent>Launcher</TypeOfContent>
                    <Launcher>
                      {capitalize(data.getSpecificSession.launcher)}
                    </Launcher>
                  </Flex>
                )}
              </FlexHalf>
              <FlexHalf>
                <Flex>
                  <TypeOfContent>Type of game</TypeOfContent>
                  <TypeOfGame>
                    {mapGameType(data.getSpecificSession.type)}
                  </TypeOfGame>
                </Flex>
                <Flex>
                  <TypeOfContent>Slots per session</TypeOfContent>
                  <Slots>{`${data.getSpecificSession.slots}`}</Slots>
                </Flex>
                <Flex>
                  <TypeOfContent>Setup Length</TypeOfContent>
                  <Setup>{`${
                    data.getSpecificSession.creator.setup
                  } minutes`}</Setup>
                </Flex>
              </FlexHalf>
            </MiddleContainer>
          </GamerInfo>
          <TodayAvailability
            day={new Date()}
            sessions={secondData.specificSessionSlotsToday}
          />
        </LeftSide>
        <Media query="(max-width: 1127px)">
          {matches =>
            matches ? (
              // This is too many props being sent down. Can just be getSpecificSession
              <FixedSelectionOptions
                notEnoughSpots={notEnoughSpots}
                me={thirdData.me}
                refetch={refetch}
                meRefetch={meRefetch}
                session={data.getSpecificSession}
                // gamer={formatGamers(data.getSpecificSession.gamers)}
                // game={data.getSpecificSession.game.name}
                // slotsLeftToday={data.getSpecificSession.slotsLeftToday}
                // slots={data.getSpecificSession.slots}
                // price={data.getSpecificSession.price}
                // numReviews={data.getSpecificSession.numReviews}
                // reviewRating={data.getSpecificSession.reviewRating}
                // system={data.getSpecificSession.system}
                // creator={data.getSpecificSession.creator}
                // launcher={data.getSpecificSession.launcher}
              />
            ) : (
              <SelectionOptions
                notEnoughSpots={notEnoughSpots}
                me={thirdData.me}
                refetch={refetch}
                meRefetch={meRefetch}
                session={data.getSpecificSession}
                // gamer={formatGamers(data.getSpecificSession.gamers)}
                // game={data.getSpecificSession.game.name}
                // slotsLeftToday={data.getSpecificSession.slotsLeftToday}
                // slots={data.getSpecificSession.slots}
                // price={data.getSpecificSession.price}
                // numReviews={data.getSpecificSession.numReviews}
                // reviewRating={data.getSpecificSession.reviewRating}
                // system={data.getSpecificSession.system}
                // creator={data.getSpecificSession.creator}
                // launcher={data.getSpecificSession.launcher}
              />
            )
          }
        </Media>
      </Content>
      {allSessions.showSelectedSlotsModal && <SelectedSlotsModal />}
      {allSessions.showModal && (
        <Modal
          onRequestClose={() => {
            dispatch({ type: 'CLOSE_MODAL' })
          }}
        >
          {allSessions.selectedSession ? (
            // Also cut down on getSpecificSession props
            <TimeSlotSession
              slots={secondData.specificSessionSlotsToday}
              me={thirdData.me}
              selectedSession={allSessions.selectedSession}
              gamer={data.getSpecificSession.creator.displayName}
              system={data.getSpecificSession.system}
              game={data.getSpecificSession.game.name}
              close={() => {
                dispatch({ type: 'CLOSE_MODAL' })
              }}
            />
          ) : allSessions.selectedDay ? (
            <TimeSlotsHours
              day={allSessions.selectedDay}
              close={() => {
                dispatch({ type: 'CLOSE_MODAL' })
              }}
            />
          ) : (
            <Calendar
              close={() => {
                dispatch({ type: 'CLOSE_MODAL' })
              }}
            />
          )}
        </Modal>
      )}
      <Footer />
    </PageContainer>
  )
}
