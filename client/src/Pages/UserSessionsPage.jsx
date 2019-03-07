import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import dateFns from 'date-fns'

//local imports
import MySession from '../Components/MySession'
import NavBar from '../Components/NavBar'

//data
import yoursessions from '../data/yoursessions'

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
  overflow: hidden;
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

export default function UserSessionsPage(props) {
  const data = _(yoursessions)
    .groupBy(session => dateFns.isAfter(session.timeStart, new Date()))
    .value()
  let upcoming = data.true
  let previous = data.false
  upcoming = upcoming.sort((a, b) => {
    const firstDate = new Date(a.timeStart)
    const secondDate = new Date(b.timeStart)
    return firstDate - secondDate
  })
  previous = previous.sort((a, b) => {
    const firstDate = new Date(a.timeStart)
    const secondDate = new Date(b.timeStart)
    return secondDate - firstDate
  })
  return (
    <PageContainer>
      <NavBar />
      <Content>
        <Upcoming>
          <UpcomingSessions>Upcoming sessions</UpcomingSessions>
          <NegativeMargin>
            <UpcomingContent>
              {_.map(upcoming, session => (
                <MySession session={session} />
              ))}
            </UpcomingContent>
          </NegativeMargin>
        </Upcoming>
        <Previous>
          <PreviousSessions>Sessions you've played</PreviousSessions>
          <NegativeMargin>
            <PreviousContent>
              {_.map(previous, session => (
                <MySession session={session} />
              ))}
            </PreviousContent>
          </NegativeMargin>
        </Previous>
      </Content>
    </PageContainer>
  )
}
