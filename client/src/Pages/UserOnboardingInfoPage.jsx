import React, { useReducer, useEffect } from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { useMutation, useQuery } from 'react-apollo-hooks'
import { withRouter } from 'react-router-dom'

//local imports
import NavBar from '../Components/NavBar'
import GenderDropdown from '../Components/GenderDropdown'

const PageContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh;
`

const Content = styled.div`
  @media (min-width: 744px) {
    max-width: 696px;
  }
  @media (min-width: 1128px) {
    max-width: 1080px;
  }
  margin: 0 auto;
  width: auto;
  padding-right: 2.4rem;
  padding-left: 2.4rem;
`

const AddInfo = styled.div`
  padding-top: 9.6rem;
  padding-bottom: 8rem;
  border-bottom: 1px solid #dddfe2;
`

const LetsAdd = styled.div`
  font-size: 6rem;
  line-height: 6.4rem;
  letter-spacing: -2.5px;
  font-weight: 800;
  text-align: center;
  margin-bottom: 3rem;
`

const Container = styled.div`
  border: 1px solid #ebebeb;
  margin-bottom: 2rem;
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
  margin-bottom: 0.5rem;
`

const RowLeft = styled.div`
  flex: 25%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-align: right;
  padding-right: 0.8rem;
`

const Label = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
`

const RowRight = styled.div`
  flex: 75%;
  position: ${props => props.relative && 'relative'};
`

const AboutMe = styled.textarea`
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

const Name = styled.input`
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

const Next = styled.button`
  color: #fff;
  text-decoration: none;
  outline: 0;
  cursor: pointer;
  border: 0;
  border-radius: 4px;
  font-size: 1.6rem;
  font-weight: 600;
  padding: 1rem 2.2rem;
  background: ${props => (props.disabled ? '#dddfe2' : '#db1422')};
  pointer-events: ${props => props.disabled && 'none'};
`

const NextContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`

const UPDATE_USER_PROFILE = gql`
  mutation($input: UpdateUserProfileInput!) {
    updateUserProfile(input: $input) {
      updated
    }
  }
`

const initialState = {
  aboutMe: '',
  displayName: '',
  psn: '',
  nso: '',
  xbl: '',
  epic: '',
  origin: '',
  steam: '',
  gog: '',
  battlenet: '',
  uplay: '',
  bethesda: '',
  itch: '',
  windows: '',
  gender: 'MALE',
}
function reducer(state, action) {
  switch (action.type) {
    case 'setAboutMe':
      return { ...state, aboutMe: action.payload }
    case 'setGender':
      return { ...state, gender: action.payload }
    case 'setDisplayName':
      return { ...state, displayName: action.payload }
    case 'setName':
      return { ...state, name: action.payload }
    case 'setPSN':
      return { ...state, psn: action.payload }
    case 'setXBL':
      return { ...state, xbl: action.payload }
    case 'setNSO':
      return { ...state, nso: action.payload }
    case 'setEpic':
      return { ...state, epic: action.payload }
    case 'setOrigin':
      return { ...state, origin: action.payload }
    case 'setRiot':
      return { ...state, riot: action.payload }
    case 'setSteam':
      return { ...state, steam: action.payload }
    case 'setGog':
      return { ...state, gog: action.payload }
    case 'setBattlenet':
      return { ...state, battlenet: action.payload }
    case 'setUplay':
      return { ...state, uplay: action.payload }
    case 'setBethesda':
      return { ...state, bethesda: action.payload }
    case 'setItch':
      return { ...state, itch: action.payload }
    case 'setWindows':
      return { ...state, windows: action.payload }
    default:
      return { ...state }
  }
}

const GET_ME = gql`
  {
    me {
      id
      name
    }
  }
`

function UserOnboardingInfoPage(props) {
  const { data, loading } = useQuery(GET_ME)
  const updateUserProfile = useMutation(UPDATE_USER_PROFILE)
  const [state, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    if (data && data.me && data.me.name) {
      dispatch({ type: 'setDisplayName', payload: data.me.name })
      dispatch({ type: 'setName', payload: data.me.name })
    }
  }, [data.me])
  return loading ? null : (
    <PageContainer>
      <NavBar />
      <Content>
        <AddInfo>
          <LetsAdd>Let's add some info</LetsAdd>
          <Container>
            <Top>
              <Title>Info</Title>
            </Top>
            <Body>
              <Row>
                <RowLeft>
                  <Label>Gender</Label>
                </RowLeft>
                <RowRight relative>
                  <GenderDropdown title={state.gender} dispatch={dispatch} />
                </RowRight>
              </Row>
              <Row>
                <RowLeft>
                  <Label>Display Name</Label>
                </RowLeft>
                <RowRight>
                  <Name
                    onChange={e => {
                      e.target.value === ''
                        ? dispatch({ type: 'setDisplayName', payload: '' })
                        : dispatch({
                            type: 'setDisplayName',
                            payload: String(e.target.value),
                          })
                    }}
                    value={state.displayName ? state.displayName : ''}
                  />
                </RowRight>
              </Row>
              <Row>
                <RowLeft>
                  <Label>About Me</Label>
                </RowLeft>
                <RowRight>
                  <AboutMe
                    rows="4"
                    cols="50"
                    onChange={e => {
                      e.target.value === ''
                        ? dispatch({ type: 'setAboutMe', payload: '' })
                        : dispatch({
                            type: 'setAboutMe',
                            payload: String(e.target.value),
                          })
                    }}
                    value={state.aboutMe ? state.aboutMe : ''}
                  />
                </RowRight>
              </Row>
            </Body>
          </Container>
          <Container>
            <Top>
              <Title>Gamertags</Title>
            </Top>
            <Body>
              <Row>
                <RowLeft>
                  <Label>Playstation Network</Label>
                </RowLeft>
                <RowRight>
                  <Name
                    onChange={e => {
                      e.target.value === ''
                        ? dispatch({ type: 'setPSN', payload: '' })
                        : dispatch({
                            type: 'setPSN',
                            payload: String(e.target.value),
                          })
                    }}
                    value={state.psn ? state.psn : ''}
                  />
                </RowRight>
              </Row>
              <Row>
                <RowLeft>
                  <Label>Xbox Live</Label>
                </RowLeft>
                <RowRight>
                  <Name
                    onChange={e => {
                      e.target.value === ''
                        ? dispatch({ type: 'setXBL', payload: '' })
                        : dispatch({
                            type: 'setXBL',
                            payload: String(e.target.value),
                          })
                    }}
                    value={state.xbl ? state.xbl : ''}
                  />
                </RowRight>
              </Row>
              <Row>
                <RowLeft>
                  <Label>Nintendo Switch</Label>
                </RowLeft>
                <RowRight>
                  <Name
                    onChange={e => {
                      e.target.value === ''
                        ? dispatch({ type: 'setNSO', payload: '' })
                        : dispatch({
                            type: 'setNSO',
                            payload: String(e.target.value),
                          })
                    }}
                    value={state.nso ? state.nso : ''}
                  />
                </RowRight>
              </Row>
              <Row>
                <RowLeft>
                  <Label>Epic Launcher</Label>
                </RowLeft>
                <RowRight>
                  <Name
                    onChange={e => {
                      e.target.value === ''
                        ? dispatch({ type: 'setEpic', payload: '' })
                        : dispatch({
                            type: 'setEpic',
                            payload: String(e.target.value),
                          })
                    }}
                    value={state.epic ? state.epic : ''}
                  />
                </RowRight>
              </Row>
              <Row>
                <RowLeft>
                  <Label>Origin Launcher</Label>
                </RowLeft>
                <RowRight>
                  <Name
                    onChange={e => {
                      e.target.value === ''
                        ? dispatch({ type: 'setOrigin', payload: '' })
                        : dispatch({
                            type: 'setOrigin',
                            payload: String(e.target.value),
                          })
                    }}
                    value={state.origin ? state.origin : ''}
                  />
                </RowRight>
              </Row>
              <Row>
                <RowLeft>
                  <Label>Steam Launcher</Label>
                </RowLeft>
                <RowRight>
                  <Name
                    onChange={e => {
                      e.target.value === ''
                        ? dispatch({ type: 'setSteam', payload: '' })
                        : dispatch({
                            type: 'setSteam',
                            payload: String(e.target.value),
                          })
                    }}
                    value={state.steam ? state.steam : ''}
                  />
                </RowRight>
              </Row>
              <Row>
                <RowLeft>
                  <Label>Battle.net Launcher</Label>
                </RowLeft>
                <RowRight>
                  <Name
                    onChange={e => {
                      e.target.value === ''
                        ? dispatch({ type: 'setBattlenet', payload: '' })
                        : dispatch({
                            type: 'setBattlenet',
                            payload: String(e.target.value),
                          })
                    }}
                    value={state.battlenet ? state.battlenet : ''}
                  />
                </RowRight>
              </Row>
              <Row>
                <RowLeft>
                  <Label>Riot Launcher</Label>
                </RowLeft>
                <RowRight>
                  <Name
                    onChange={e => {
                      e.target.value === ''
                        ? dispatch({ type: 'setRiot', payload: '' })
                        : dispatch({
                            type: 'setRiot',
                            payload: String(e.target.value),
                          })
                    }}
                    value={state.riot ? state.riot : ''}
                  />
                </RowRight>
              </Row>
              <Row>
                <RowLeft>
                  <Label>Uplay Launcher</Label>
                </RowLeft>
                <RowRight>
                  <Name
                    onChange={e => {
                      e.target.value === ''
                        ? dispatch({ type: 'setUplay', payload: '' })
                        : dispatch({
                            type: 'setUplay',
                            payload: String(e.target.value),
                          })
                    }}
                    value={state.uplay ? state.uplay : ''}
                  />
                </RowRight>
              </Row>
              <Row>
                <RowLeft>
                  <Label>Gog Galaxy Launcher</Label>
                </RowLeft>
                <RowRight>
                  <Name
                    onChange={e => {
                      e.target.value === ''
                        ? dispatch({ type: 'setGog', payload: '' })
                        : dispatch({
                            type: 'setGog',
                            payload: String(e.target.value),
                          })
                    }}
                    value={state.gog ? state.gog : ''}
                  />
                </RowRight>
              </Row>
              <Row>
                <RowLeft>
                  <Label>Bethesda Launcher</Label>
                </RowLeft>
                <RowRight>
                  <Name
                    onChange={e => {
                      e.target.value === ''
                        ? dispatch({ type: 'setBethesda', payload: '' })
                        : dispatch({
                            type: 'setBethesda',
                            payload: String(e.target.value),
                          })
                    }}
                    value={state.bethesda ? state.bethesda : ''}
                  />
                </RowRight>
              </Row>
              <Row>
                <RowLeft>
                  <Label>Itch.io Launcher</Label>
                </RowLeft>
                <RowRight>
                  <Name
                    onChange={e => {
                      e.target.value === ''
                        ? dispatch({ type: 'setItch', payload: '' })
                        : dispatch({
                            type: 'setItch',
                            payload: String(e.target.value),
                          })
                    }}
                    value={state.itch ? state.itch : ''}
                  />
                </RowRight>
              </Row>
              <Row>
                <RowLeft>
                  <Label>Windows Launcher</Label>
                </RowLeft>
                <RowRight>
                  <Name
                    onChange={e => {
                      e.target.value === ''
                        ? dispatch({ type: 'setWindows', payload: '' })
                        : dispatch({
                            type: 'setWindows',
                            payload: String(e.target.value),
                          })
                    }}
                    value={state.windows ? state.windows : ''}
                  />
                </RowRight>
              </Row>
            </Body>
          </Container>
          <NextContainer>
            <Next
              onClick={async () => {
                const pc = {
                  epic: state.epic,
                  steam: state.steam,
                  origin: state.origin,
                  gog: state.gog,
                  battlenet: state.battlenet,
                  uplay: state.uplay,
                  bethesda: state.bethesda,
                  itch: state.itch,
                  riot: state.riot,
                  windows: state.windows,
                }
                const gamertags = {
                  psn: state.psn,
                  xbl: state.xbl,
                  nso: state.nso,
                  pc: pc,
                }
                const input = {
                  aboutMe: state.aboutMe,
                  gender: state.gender,
                  displayName: state.displayName,
                  name: state.name,
                  gamertags,
                }
                const { data } = await updateUserProfile({
                  variables: { input },
                })
                if (data.updateUserProfile.updated) {
                  await props.history.push('/user-onboarding/need-to-know')
                }
              }}
            >
              Next
            </Next>
          </NextContainer>
        </AddInfo>
      </Content>
    </PageContainer>
  )
}

export default withRouter(UserOnboardingInfoPage)
