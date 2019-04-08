import React from 'react'
import styled from 'styled-components'

import GamerDashboardAccountNav from '../Components/GamerDashboardAccountNav'

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
  padding-top: 4rem;
  margin-bottom: 9rem;
  display: flex;
`

const OutsideContainer = styled.div`
  flex: 75%;
`

const Container = styled.div`
  border: 1px solid #ebebeb;
`

const Top = styled.div`
  width: 100%;
  background: #ebebeb;
  padding: 1.2rem 2rem;
`

const Title = styled.h2`
  font-weight: 400;
`

const Body = styled.div`
  padding: 2rem;
`

const Row = styled.div`
  width: 100%;
  display: flex;
`

const RowLeft = styled.div`
  flex: 25%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 0.8rem;
`

const RowRight = styled.div`
  flex: 75%;
`

export default function GamerDashboardAccountPhotos(props) {
  return (
    <PageContainer>
      <Content>
        <GamerDashboardAccountNav />
        <OutsideContainer>
          <Container>
            <Top>
              <Title>Profile Picture</Title>
            </Top>
            <Body>
              <Row>
                <RowLeft>Picture</RowLeft>
                <RowRight>Right</RowRight>
              </Row>
            </Body>
          </Container>
        </OutsideContainer>
      </Content>
    </PageContainer>
  )
}
