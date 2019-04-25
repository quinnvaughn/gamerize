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

const MY_SESSIONS = gql`
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
    myInvitesReceived {
      id
      from {
        username
      }
      booking {
        timeslot {
          gamingSession {
            system
            game {
              name
              launcher
            }
          }
          gamers {
            username
            name
          }
          startTime
        }
      }
    }
    myInvites {
      id
      booking {
        timeslot {
          gamingSession {
            game {
              name
            }
          }
          gamers {
            username
            name
          }
          startTime
        }
      }
    }
    myPastBookings {
      id
      timeslot {
        startTime
        players {
          player {
            username
          }
        }
        gamingSession {
          id
          gamers {
            name
          }
          game {
            name
          }
          creator {
            username
          }
        }
      }
    }
    myUpcomingBookings {
      id
      bookee {
        username
      }
      timeslot {
        startTime
        players {
          player {
            username
          }
        }
        gamingSession {
          id
          gamers {
            name
          }
          game {
            name
          }
          creator {
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
  const { data, loading, refetch } = useQuery(MY_SESSIONS, {
    pollInterval: 5000,
  })
  const deleteOldInvites = useMutation(DELETE_OLD_INVITES)
  useEffect(() => {
    async function oldInvites() {
      await deleteOldInvites()
    }
    oldInvites()
    refetch()
  }, {})
  let upcoming = !loading && data.myUpcomingBookings
  let previous = !loading && data.myPastBookings
  return loading ? (
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
                  {_.map(data.myInvitesReceived, invite => (
                    <MyInviteReceived
                      from={invite.from.username}
                      refetch={refetch}
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
                  {_.map(data.myInvites, invite => (
                    <MyInvite
                      refetch={refetch}
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
                      refetch={refetch}
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
