import React from 'react'
import styled from 'styled-components'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'

const Container = styled.div`
  flex: 75%;
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

const Label = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
`

const RowRight = styled.div`
  flex: 75%;
`

const SetupLength = styled.input`
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #ebebeb;
  transition: box-shadow 200ms ease-in;
  transition: width 200ms ease-in;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 1.6rem;
  width: 100%;
  font-weight: 600;
  :hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(26, 26, 29, 0.08);
  }
`

const GET_INFO = gql`
  {
    me {
      setup
    }
  }
`

export default function GamerDashboardAccountEdit(props) {
  const { data, loading } = useQuery(GET_INFO)
  return loading ? null : (
    <Container>
      <Top>
        <Title>Required</Title>
      </Top>
      <Body>
        <Row>
          <RowLeft>
            <Label>Setup</Label>
          </RowLeft>
          <RowRight>
            <SetupLength onChange={e => {}} value={data.me.setup} />
          </RowRight>
        </Row>
      </Body>
    </Container>
  )
}
