import React, { useReducer, useEffect } from 'react'
import styled from 'styled-components'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { FaCheck } from 'react-icons/fa'
import gql from 'graphql-tag'
import _ from 'lodash'

//local imports
import EditProfileNav from '../Components/EditProfileNav'
import NavBar from '../Components/NavBar'
import { capitalize, formatGender } from '../utils/Strings'
import GenderDropdown from '../Components/GenderDropdown'
import Loading from '../Components/Loading'
import PaymentMethods from '../Components/PaymentMethods'

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
      id
      name
      aboutMe
      email
      gender
      savedCards {
        brand
        lastFour
        cardId
        id
        default
      }
      gamertags {
        psn
        xbl
        nso
        pc {
          epic
          origin
          steam
          gog
          battlenet
          uplay
          bethesda
          itch
          windows
          riot
        }
      }
    }
  }
`

const UPDATE_USER_PROFILE = gql`
  mutation($input: UpdateUserProfileInput!) {
    updateUserProfile(input: $input) {
      updated
    }
  }
`

function reducer(state, action) {
  switch (action.type) {
    case 'setFirstName':
      return { ...state, firstName: action.payload }
    case 'setLastName':
      return { ...state, lastName: action.payload }
    case 'setAboutMe':
      return { ...state, aboutMe: action.payload }
    case 'setSaving':
      return { ...state, saving: action.payload }
    case 'setSaved':
      return { ...state, saved: action.payload }
    case 'setGender':
      return { ...state, gender: action.payload }
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

const initialState = {
  firstName: '',
  lastName: '',
  aboutMe: '',
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
  gender: null,
  saving: false,
  saved: false,
}

export default function GamerDashboardAccountEdit(props) {
  const { data, loading, refetch } = useQuery(GET_INFO)
  const updateUserProfile = useMutation(UPDATE_USER_PROFILE)
  const [state, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    if (!_.isNil(data) && !_.isNil(data.me)) {
      dispatch({ type: 'setFirstName', payload: data.me.name.split(' ')[0] })
      dispatch({ type: 'setLastName', payload: data.me.name.split(' ')[1] })
      dispatch({ type: 'setGender', payload: data.me.gender })
      if (!_.isNil(data.me.aboutMe)) {
        dispatch({
          type: 'setAboutMe',
          payload: data.me.aboutMe,
        })
      }
      if (!_.isNil(data.me.gamertags)) {
        dispatch({ type: 'setPSN', payload: data.me.gamertags.psn })
        dispatch({ type: 'setNSO', payload: data.me.gamertags.nso })
        dispatch({ type: 'setXBL', payload: data.me.gamertags.xbl })
        dispatch({ type: 'setEpic', payload: data.me.gamertags.pc.epic })
        dispatch({ type: 'setOrigin', payload: data.me.gamertags.pc.origin })
        dispatch({ type: 'setSteam', payload: data.me.gamertags.pc.steam })
        dispatch({ type: 'setGog', payload: data.me.gamertags.pc.gog })
        dispatch({
          type: 'setBattlenet',
          payload: data.me.gamertags.pc.battlenet,
        })
        dispatch({ type: 'setUplay', payload: data.me.gamertags.pc.uplay })
        dispatch({
          type: 'setBethesda',
          payload: data.me.gamertags.pc.bethesda,
        })
        dispatch({ type: 'setItch', payload: data.me.gamertags.pc.itch })
        dispatch({ type: 'setWindows', payload: data.me.gamertags.pc.windows })
        dispatch({ type: 'setRiot', payload: data.me.gamertags.pc.riot })
      }
    }
  }, [data.me])
  return loading ? (
    <Loading />
  ) : (
    <PageContainer>
      <NavBar />
      <Content>
        <EditProfileNav />
        <OutsideContainer>
          <Container>
            <Top>
              <Title>Required</Title>
            </Top>
            <Body>
              <Row>
                <RowLeft>
                  <Label>First Name</Label>
                </RowLeft>
                <RowRight>
                  <Name
                    onChange={e => {
                      e.target.value === ''
                        ? dispatch({ type: 'setFirstName', payload: '' })
                        : dispatch({
                            type: 'setFirstName',
                            payload: String(e.target.value),
                          })
                    }}
                    value={state.firstName ? state.firstName : ''}
                  />
                </RowRight>
              </Row>
              <Row>
                <RowLeft>
                  <Label>Last Name</Label>
                </RowLeft>
                <RowRight>
                  <Name
                    onChange={e => {
                      e.target.value === ''
                        ? dispatch({ type: 'setLastName', payload: '' })
                        : dispatch({
                            type: 'setLastName',
                            payload: String(e.target.value),
                          })
                    }}
                    value={state.lastName ? state.lastName : ''}
                  />
                </RowRight>
              </Row>
              <Row>
                <RowLeft>
                  <Label>Gender</Label>
                </RowLeft>
                <RowRight relative>
                  <GenderDropdown title={state.gender} dispatch={dispatch} />
                </RowRight>
              </Row>
            </Body>
          </Container>
          <Container>
            <Top>
              <Title>Payment Options</Title>
            </Top>
            <Body>
              <PaymentMethods
                savedCards={data.me.savedCards}
                email={data.me.email}
                refetch={refetch}
              />
            </Body>
          </Container>
          <Container>
            <Top>
              <Title>Optional</Title>
            </Top>
            <Body>
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
          <Save
            onClick={async () => {
              dispatch({ type: 'setSaving', payload: true })
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
                name: `${state.firstName} ${state.lastName}`,
                aboutMe: state.aboutMe,
                gender: state.gender,
                gamertags,
              }
              const { data } = await updateUserProfile({
                variables: { input },
              })
              if (data.updateUserProfile.updated) {
                setTimeout(
                  () => dispatch({ type: 'setSaving', payload: false }),
                  1000
                )
                dispatch({ type: 'setSaved', payload: true })
                setTimeout(
                  () => dispatch({ type: 'setSaved', payload: false }),
                  3000
                )
                refetch()
              }
            }}
          >
            {state.saving ? 'Saving' : state.saved ? <FaCheck /> : 'Save'}
          </Save>
        </OutsideContainer>
      </Content>
    </PageContainer>
  )
}
