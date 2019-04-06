import React from 'react'
import styled from 'styled-components'

//local imports
import GamerBookings from '../Components/GamerBookings'

const PageContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh;
`

const Content = styled.div`
  width: 100%;
  max-width: 108rem;
  margin: 0 auto;
  padding-left: 8rem;
  padding-right: 8rem;
  padding-top: 1rem;
  margin-bottom: 9rem;
`

const Home = styled.div`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
`

const Top = styled.div`
  width: 100%;
  padding-top: 2rem;
  padding-bottom: 2rem;
  padding-right: 1rem;
`

const Section = styled.div`
  width: 100%;
  margin-bottom: 2rem;
`

const SectionTitle = styled.div`
  font-size: 2rem;
  font-weight: 400;
  padding-bottom: 1rem;
  width: 100%;
  border-bottom: 1px solid black;
`

export default function GamerDashboardHome(props) {
  return (
    <PageContainer>
      <Content>
        <Top>
          <Home>Home</Home>
        </Top>
        <Section>
          <SectionTitle>Bookings</SectionTitle>
          {/*misc &&
            misc.map((notification, index) => (
              <NotificationMiscellaneous
                refetch={refetch}
                notification={notification}
                key={notification.id}
                last={index === misc.length - 1}
              />
            )) */}
        </Section>
      </Content>
    </PageContainer>
  )
}
