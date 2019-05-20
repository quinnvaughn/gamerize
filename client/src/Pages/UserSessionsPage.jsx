import React, { useEffect, useState, Fragment } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import gql from 'graphql-tag'
import { useQuery, useMutation } from 'react-apollo-hooks'

//local imports
import MyTimeSlot from '../Components/MyTimeSlot'
import NavBar from '../Components/NavBar'
import MyInvite from '../Components/MyInvite'
import MyInviteReceived from '../Components/MyInviteReceived'
import Loading from '../Components/Loading'

const PageContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100%;
  position: relative;
  padding-bottom: 6rem;
`

const Content = styled.div`
  margin: 0px auto;
  padding-left: 2.4rem;
  padding-right: 2.4rem;
  max-width: 160rem;
  @media (min-width: 1128px) {
    padding-left: 8rem;
    padding-right: 8rem;
  }
`

const Upcoming = styled.div`
  margin-top: 3.2rem;
  padding-bottom: 3.2rem;
  margin-bottom: 3.2rem;
  width: 100%;
  border-bottom: 1px solid #dddfe2;
  @media (min-width: 1128px) {
    margin-top: 5.6rem;
    margin-bottom: 5.6rem;
  }
`

const UpcomingSessions = styled.h2`
  font-size: 3.2rem;
  font-weight: 800;
  line-height: 1.125em;
  word-wrap: break-word;
  margin-bottom: 3.2rem;
`

const NegativeMargin = styled.div`
  margin-left: -0.8rem;
  margin-right: -0.8rem;
  width: 100%;
`

const UpcomingContent = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  width: 100%;
`

const Previous = styled.div`
  margin-top: 3.2rem;
  padding-bottom: 3.2rem;
  margin-bottom: 3.2rem;
  width: 100%;
  @media (min-width: 1128px) {
    margin-top: 5.6rem;
    margin-bottom: 5.6rem;
  }
`

const PreviousSessions = styled.h2`
  font-size: 3.2rem;
  font-weight: 800;
  line-height: 1.125em;
  word-wrap: break-word;
  margin-bottom: 3.2rem;
`

const PreviousContent = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  width: 100%;
`

const Invites = styled.div`
  margin-top: 3.2rem;
  padding-bottom: 3.2rem;
  margin-bottom: 3.2rem;
  width: 100%;
  border-bottom: 1px solid #dddfe2;
  @media (min-width: 1128px) {
    margin-top: 5.6rem;
    margin-bottom: 5.6rem;
  }
`

const InvitesTitle = styled.h2`
  font-size: 3.2rem;
  font-weight: 800;
  line-height: 1.125em;
  word-wrap: break-word;
  margin-bottom: 3.2rem;
`

const InvitesContent = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  width: 100%;
`

const SetButton = styled.button`
  font-size: 1.4rem;
  color: black;
  text-decoration: none;
  cursor: pointer;
  margin-right: 1.5rem;
  font-weight: 600;
  padding: 1rem 0.8rem;
  margin-bottom: 2rem;
  background: #fff;
  outline: none;
  border: none;
  border-bottom: ${props =>
    props.active ? '2px solid #db1422' : '2px solid transparent'};
`

const ME = gql`
  {
    me {
      id
      username
      gamertags {
        psn
        nso
        xbl
        pc {
          epic
          origin
          steam
          battlenet
          bethesda
        }
      }
    }
  }
`

const MY_INVITES_RECEIVED = gql`
  {
    myInvitesReceived {
      id
      from {
        id
        username
        profilePicture
      }
      booking {
        id
        timeslot {
          id
          gamingSession {
            id
            system
            game {
              id
              name
              launcher
            }
          }
          gamers {
            id
            username
            name
          }
          startTime
        }
      }
    }
  }
`
const MY_INVITES = gql`
  {
    myInvites {
      id
      booking {
        id
        timeslot {
          id
          gamingSession {
            id
            game {
              id
              name
            }
            creator {
              id
              displayName
              profilePicture
            }
          }
          gamers {
            id
            username
            name
          }
          startTime
        }
      }
    }
  }
`

const MY_PAST_BOOKINGS = gql`
  {
    myPastBookings {
      id
      timeslot {
        startTime
        id
        players {
          player {
            id
            username
          }
        }
        gamingSession {
          id
          gamers {
            id
            name
          }
          game {
            id
            name
          }
          creator {
            id
            profilePicture
            displayName
            username
          }
        }
      }
    }
  }
`

const MY_UPCOMING_BOOKINGS = gql`
  {
    myUpcomingBookings {
      id
      bookee {
        id
        username
      }
      timeslot {
        id
        startTime
        players {
          player {
            id
            username
          }
        }
        gamingSession {
          id
          gamers {
            id
            name
          }
          game {
            id
            name
          }
          creator {
            id
            displayName
            profilePicture
            username
          }
        }
      }
    }
  }
`

const DELETE_OLD_INVITES = gql`
  mutation {
    deleteOldInvites {
      deleted
    }
  }
`

const SESSIONS = 'SESSIONS'
const INVITES = 'INVITES'

export default function UserSessionsPage(props) {
  const [tab, setTab] = useState(SESSIONS)
  const { data, loading, refetch } = useQuery(ME, {
    pollInterval: 500,
  })
  const {
    data: secondData,
    loading: secondLoading,
    refetch: secondRefetch,
  } = useQuery(MY_INVITES_RECEIVED, {
    pollInterval: 500,
  })
  const {
    data: thirdData,
    loading: thirdLoading,
    refetch: thirdRefetch,
  } = useQuery(MY_INVITES, {
    pollInterval: 500,
  })
  const { data: fourthData, loading: fourthLoading } = useQuery(
    MY_PAST_BOOKINGS,
    {
      pollInterval: 500,
    }
  )
  const {
    data: fifthData,
    loading: fifthLoading,
    refetch: fifthRefetch,
  } = useQuery(MY_UPCOMING_BOOKINGS, {
    pollInterval: 500,
  })
  const deleteOldInvites = useMutation(DELETE_OLD_INVITES)
  useEffect(() => {
    async function oldInvites() {
      await deleteOldInvites()
    }
    oldInvites()
    refetch()
  }, {})
  let upcoming = !loading && fifthData.myUpcomingBookings
  let previous = !loading && fourthData.myPastBookings
  const wait =
    loading || secondLoading || thirdLoading || fourthLoading || fifthLoading
  return wait ? (
    <Loading />
  ) : (
    <PageContainer>
      <NavBar />
      <Content>
        <SetButton onClick={() => setTab(SESSIONS)} active={tab === SESSIONS}>
          Sessions
        </SetButton>
        <SetButton onClick={() => setTab(INVITES)} active={tab === INVITES}>
          Invites
        </SetButton>
        {tab === INVITES ? (
          <Fragment>
            <Invites>
              <InvitesTitle>Invites received</InvitesTitle>
              <NegativeMargin>
                <InvitesContent>
                  {_.map(secondData.myInvitesReceived, invite => (
                    <MyInviteReceived
                      from={invite.from.username}
                      profilePicture={invite.from.profilePicture}
                      refetch={secondRefetch}
                      key={invite.id}
                      timeslot={invite.booking.timeslot}
                      inviteId={invite.id}
                      gamertags={data.me.gamertags}
                    />
                  ))}
                </InvitesContent>
              </NegativeMargin>
            </Invites>
            <Invites>
              <InvitesTitle>My invites</InvitesTitle>
              <NegativeMargin>
                <InvitesContent>
                  {_.map(thirdData.myInvites, invite => (
                    <MyInvite
                      refetch={thirdRefetch}
                      key={invite.id}
                      timeslot={invite.booking.timeslot}
                      me={data.me.username}
                      inviteId={invite.id}
                    />
                  ))}
                </InvitesContent>
              </NegativeMargin>
            </Invites>
          </Fragment>
        ) : (
          <Fragment>
            <Upcoming>
              <UpcomingSessions>Upcoming sessions</UpcomingSessions>
              <NegativeMargin>
                <UpcomingContent>
                  {_.map(upcoming, ({ timeslot, id, bookee }) => (
                    <MyTimeSlot
                      key={id}
                      upcoming
                      bookingId={id}
                      timeslot={timeslot}
                      me={data.me}
                      refetch={fifthRefetch}
                      bookee={bookee}
                    />
                  ))}
                </UpcomingContent>
              </NegativeMargin>
            </Upcoming>
            <Previous>
              <PreviousSessions>Sessions you've played</PreviousSessions>
              <NegativeMargin>
                <PreviousContent>
                  {_.map(previous, ({ timeslot }, index) => (
                    <MyTimeSlot
                      key={timeslot.startTime + index}
                      timeslot={timeslot}
                      me={data.me}
                    />
                  ))}
                </PreviousContent>
              </NegativeMargin>
            </Previous>
          </Fragment>
        )}
      </Content>
    </PageContainer>
  )
}
