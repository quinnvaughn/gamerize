import React, { useEffect } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'

//local imports
import MyTimeSlot from '../Components/MyTimeSlot'
import NavBar from '../Components/NavBar'
import MyInvite from '../Components/MyInvite'
import MyInviteReceived from '../Components/MyInviteReceived'

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
    padding-left: 6.4rem;
    padding-right: 6.4rem;
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

const MY_SESSIONS = gql`
  {
    me {
      id
      username
    }
    myInvitesReceived {
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
    myUpcomingBookings {
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
`

export default function UserSessionsPage(props) {
  const { data, loading, refetch } = useQuery(MY_SESSIONS, {
    pollInterval: 5000,
  })
  useEffect(() => {
    refetch()
  }, {})
  let upcoming = !loading && data.myUpcomingBookings
  let previous = !loading && data.myPastBookings
  return loading ? null : (
    <PageContainer>
      <NavBar />
      <Content>
        <Invites>
          <InvitesTitle>Invites received</InvitesTitle>
          <NegativeMargin>
            <InvitesContent>
              {_.map(data.myInvitesReceived, invite => (
                <MyInviteReceived
                  refetch={refetch}
                  key={invite.id}
                  timeslot={invite.booking.timeslot}
                  inviteId={invite.id}
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
        <Upcoming>
          <UpcomingSessions>Upcoming sessions</UpcomingSessions>
          <NegativeMargin>
            <UpcomingContent>
              {_.map(upcoming, timeslot => (
                <MyTimeSlot
                  key={timeslot.startTime}
                  upcoming
                  timeslot={timeslot}
                  me={data.me}
                />
              ))}
            </UpcomingContent>
          </NegativeMargin>
        </Upcoming>
        <Previous>
          <PreviousSessions>Sessions you've played</PreviousSessions>
          <NegativeMargin>
            <PreviousContent>
              {_.map(previous, timeslot => (
                <MyTimeSlot
                  key={timeslot.startTime}
                  timeslot={timeslot}
                  me={data.me}
                />
              ))}
            </PreviousContent>
          </NegativeMargin>
        </Previous>
      </Content>
    </PageContainer>
  )
}
