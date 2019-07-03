import React, { useReducer, useEffect } from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { useMutation, useQuery } from 'react-apollo-hooks'
import { withRouter } from 'react-router-dom'

//local imports
import NavBar from '../Components/NavBar'
import ErrorPage from './ErrorPage'
import EditProfileInput from '../Components/EditProfileInput'
import EditProfileSection from '../Components/EditProfileSection'
import EditProfileGenderDropdown from '../Components/EditProfileGenderDropdown'
import EditProfileTextArea from '../Components/EditProfileTextArea'
import { Formik, Field } from 'formik'
import SubmitButton from '../Components/SubmitButton'

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
  const { data, loading, error } = useQuery(GET_ME)
  const updateUserProfile = useMutation(UPDATE_USER_PROFILE)
  return loading ? null : error ? (
    <ErrorPage errors={error} />
  ) : (
    <PageContainer>
      <NavBar />
      <Content>
        <AddInfo>
          <LetsAdd>Let's add some info</LetsAdd>
          <Formik
            initialValues={{
              firstName: data.me.name.split(' ')[0],
              lastName: data.me.name.split(' ')[1],
              displayName: data.me.name,
              gender: 'MALE',
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
              riot: '',
            }}
            onSubmit={async (values, actions) => {
              const pc = {
                epic: values.epic,
                steam: values.steam,
                origin: values.origin,
                gog: values.gog,
                battlenet: values.battlenet,
                uplay: values.uplay,
                bethesda: values.bethesda,
                itch: values.itch,
                riot: values.riot,
                windows: values.windows,
              }
              const gamertags = {
                psn: values.psn,
                xbl: values.xbl,
                nso: values.nso,
                pc: pc,
              }
              const input = {
                aboutMe: values.aboutMe,
                gender: values.gender,
                displayName: values.displayName,
                name: `${values.firstName} ${values.lastName}`,
                gamertags,
              }
              const { data } = await updateUserProfile({
                variables: { input },
              })
              if (data.updateUserProfile.updated) {
                actions.setSubmitting(false)
                await props.history.push('/user-onboarding/need-to-know')
              }
            }}
          >
            {({ handleSubmit, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                <EditProfileSection title="Required">
                  <Field
                    name="firstName"
                    label="First Name"
                    component={EditProfileInput}
                  />
                  <Field
                    name="lastName"
                    label="Last Name"
                    component={EditProfileInput}
                  />
                  <Field
                    name="displayName"
                    label="Display Name"
                    component={EditProfileInput}
                  />
                  <Field
                    name="gender"
                    label="Gender"
                    component={EditProfileGenderDropdown}
                  />
                </EditProfileSection>
                <EditProfileSection title="Optional">
                  <Field
                    name="aboutMe"
                    label="About Me"
                    component={EditProfileTextArea}
                  />
                </EditProfileSection>
                <EditProfileSection title="Gamertags">
                  <Field
                    name="psn"
                    label="Playstation Network"
                    component={EditProfileInput}
                  />
                  <Field
                    name="xbl"
                    label="Xbox Live"
                    component={EditProfileInput}
                  />
                  <Field
                    name="nso"
                    label="Nintendo Switch Online"
                    component={EditProfileInput}
                  />
                  <Field
                    name="epic"
                    label="Epic Launcher"
                    component={EditProfileInput}
                  />
                  <Field
                    name="origin"
                    label="Origin Launcher"
                    component={EditProfileInput}
                  />
                  <Field
                    name="steam"
                    label="Steam Launcher"
                    component={EditProfileInput}
                  />
                  <Field
                    name="battlenet"
                    label="Battle.net Launcher"
                    component={EditProfileInput}
                  />
                  <Field
                    name="riot"
                    label="Riot Launcher"
                    component={EditProfileInput}
                  />
                  <Field
                    name="uplay"
                    label="Uplay Launcher"
                    component={EditProfileInput}
                  />
                  <Field
                    name="gog"
                    label="Gog Galaxy Launcher"
                    component={EditProfileInput}
                  />
                  <Field
                    name="bethesda"
                    label="Bethesda Launcher"
                    component={EditProfileInput}
                  />
                  <Field
                    name="itch"
                    label="Itch.io Launcher"
                    component={EditProfileInput}
                  />
                  <Field
                    name="windows"
                    label="Windows Launcher"
                    component={EditProfileInput}
                  />
                </EditProfileSection>
                <NextContainer>
                  <SubmitButton
                    type="submit"
                    primary
                    width={83}
                    isSubmitting={isSubmitting}
                  >
                    Next
                  </SubmitButton>
                </NextContainer>
              </form>
            )}
          </Formik>
        </AddInfo>
      </Content>
    </PageContainer>
  )
}

export default withRouter(UserOnboardingInfoPage)
