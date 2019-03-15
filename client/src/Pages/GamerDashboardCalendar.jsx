import React, { useState } from 'react'
import styled from 'styled-components'

//local imports
import GamerCalendar from '../Components/GamerCalendar'
import GamerDay from '../Components/GamerDay'
import GamerSessionCard from '../Components/GamerSessionCard'

//data
import specificSessions from '../data/specificusersessions'

const PageContainer = styled.div`
  height: 100%;
`

const Content = styled.div`
  max-width: none;
  margin: 0 auto;
  padding-left: 8rem;
  padding-right: 8rem;
  padding-top: 7rem;
  margin-bottom: 9rem;
  display: flex;
`

const LeftSide = styled.div`
  flex: 60%;
  margin-right: 4rem;
`

const RightSide = styled.div`
  flex: 40%;
`

const YourSessions = styled.div`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
`

const Info = styled.div`
  font-weight: 400;
  line-height: 1.5em;
  font-size: 1.6rem;
  margin-bottom: 1rem;
`

const MONTH = 'MONTH'

const TODAY = 'TODAY'

export default function GamerDashboardCalendar(props) {
  const [dayOrMonth, setDayOrMonth] = useState(TODAY)
  return (
    <PageContainer>
      <Content>
        <LeftSide>
          <button onClick={() => setDayOrMonth(TODAY)}>Today</button>
          <button onClick={() => setDayOrMonth(MONTH)}>Calendar</button>
          {dayOrMonth === MONTH ? <GamerCalendar /> : <GamerDay />}
        </LeftSide>
        <RightSide>
          <YourSessions>Your sessions</YourSessions>
          <Info>
            These are all your sessions. Click on them to get options to add
            them to your calendar. Edit them in the sessions tab.
          </Info>
          {specificSessions.map(session => (
            <GamerSessionCard session={session} />
          ))}
        </RightSide>
      </Content>
    </PageContainer>
  )
}
