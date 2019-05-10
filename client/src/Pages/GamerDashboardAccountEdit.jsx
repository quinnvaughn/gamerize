import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { FaCheck } from 'react-icons/fa'
import gql from 'graphql-tag'

//local imports
import GamerDashboardAccountNav from '../Components/GamerDashboardAccountNav'
import GamerDashboardNav from '../Components/GamerDashboardNav'
import Loading from '../Components/Loading'

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
  font-weight: 400;
  :hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(26, 26, 29, 0.08);
  }
`

const Save = styled.button`
  border: 0;
  cursor: pointer;
  outline: 0;
  background: ${props => (props.disabled ? '#ebebeb' : '#db1422')};
  pointer-events: ${props => props.disabled && 'none'};
  color: #fff;
  border-radius: 4px;
  margin-top: 2rem;
  padding: 1rem 1.5rem;
  font-size: 1.6rem;
  font-weight: 600;
`

const GET_INFO = gql`
  {
    me {
      setup
      id
    }
  }
`

const UPDATE_GAMER_PROFILE = gql`
  mutation($input: UpdateGamerProfileInput!) {
    updateGamerProfile(input: $input) {
      updated
    }
  }
`

export default function GamerDashboardAccountEdit(props) {
  const { data, loading, refetch } = useQuery(GET_INFO)
  const updateGamerProfile = useMutation(UPDATE_GAMER_PROFILE)
  const [setup, setSetup] = useState(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  useEffect(() => {
    !loading && setSetup(data.me.setup)
  }, [data.me])
  return loading ? (
    <Loading gamer />
  ) : (
    <PageContainer>
      <GamerDashboardNav />
      <Content>
        <GamerDashboardAccountNav />
        <OutsideContainer>
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
                  <SetupLength
                    onChange={e => {
                      e.target.value === ''
                        ? setSetup('')
                        : setSetup(Number(e.target.value))
                    }}
                    value={setup ? setup : ''}
                  />
                </RowRight>
              </Row>
            </Body>
          </Container>
          <Save
            disabled={!Number.isInteger(setup) || setup === 0}
            onClick={async () => {
              setSaving(true)
              const input = { setup }
              const { data } = await updateGamerProfile({
                variables: { input },
              })
              if (data.updateGamerProfile.updated) {
                setTimeout(() => setSaving(false), 1000)
                await setSaved(true)
                setTimeout(() => setSaved(false), 3000)
                refetch()
              }
            }}
          >
            {saving ? 'Saving' : saved ? <FaCheck /> : 'Save'}
          </Save>
        </OutsideContainer>
      </Content>
    </PageContainer>
  )
}
