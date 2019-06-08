import React from 'react'
import styled from 'styled-components'
import ReactLoading from 'react-loading'

//local imports
import NavBar from './NavBar'
import GamerDashboardNav from './GamerDashboardNav'
import AdminDashboardNav from './AdminDashboardNav'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

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

export default function Loading(props) {
  return props.gamer ? (
    <PageContainer>
      <GamerDashboardNav />
      <Content>
        <Container>
          <ReactLoading
            type="bubbles"
            color="#db1422"
            width={100}
            height={500}
          />
        </Container>
      </Content>
    </PageContainer>
  ) : props.admin ? (
    <PageContainer>
      <AdminDashboardNav />
      <Content>
        <Container>
          <ReactLoading
            type="bubbles"
            color="#db1422"
            width={100}
            height={500}
          />
        </Container>
      </Content>
    </PageContainer>
  ) : (
    <PageContainer>
      <NavBar />
      <Content>
        <Container>
          <ReactLoading
            type="bubbles"
            color="#db1422"
            width={100}
            height={500}
          />
        </Container>
      </Content>
    </PageContainer>
  )
}
