import React from 'react'
import styled from 'styled-components'
import { useQuery, useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import { Formik, Field } from 'formik'

//local imports
import EditProfileNav from '../Components/EditProfileNav'
import NavBar from '../Components/NavBar'
import Loading from '../Components/Loading'
import PaymentMethods from '../Components/PaymentMethods'
import ErrorPage from './ErrorPage'
import EditProfileInput from '../Components/EditProfileInput'
import EditProfileSection from '../Components/EditProfileSection'
import EditProfileGenderDropdown from '../Components/EditProfileGenderDropdown'
import EditProfileTextArea from '../Components/EditProfileTextArea'

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
      displayName
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

export default function GamerDashboardAccountEdit(props) {
  const { data, loading, refetch, error } = useQuery(GET_INFO)
  const updateUserProfile = useMutation(UPDATE_USER_PROFILE)
  /// Change this to formik
  return loading ? (
    <Loading />
  ) : error ? (
    <ErrorPage errors={error} />
  ) : (
    <PageContainer>
      <NavBar />
      <Content>
        <EditProfileNav />
        <OutsideContainer>
          <Formik
            enableReinitialize
            initialValues={{
              firstName: data.me.name.split(' ')[0],
              lastName: data.me.name.split(' ')[1],
              displayName: data.me.displayName,
              gender: data.me.gender,
              aboutMe: data.me.aboutMe ? data.me.aboutMe : '',
              psn: data.me.gamertags ? data.me.gamertags.psn : '',
              nso: data.me.gamertags ? data.me.gamertags.nso : '',
              xbl: data.me.gamertags ? data.me.gamertags.xbl : '',
              epic: data.me.gamertags ? data.me.gamertags.pc.epic : '',
              origin: data.me.gamertags ? data.me.gamertags.pc.origin : '',
              steam: data.me.gamertags ? data.me.gamertags.pc.steam : '',
              gog: data.me.gamertags ? data.me.gamertags.pc.gog : '',
              battlenet: data.me.gamertags
                ? data.me.gamertags.pc.battlenet
                : '',
              uplay: data.me.gamertags ? data.me.gamertags.pc.uplay : '',
              bethesda: data.me.gamertags ? data.me.gamertags.pc.bethesda : '',
              itch: data.me.gamertags ? data.me.gamertags.pc.itch : '',
              windows: data.me.gamertags ? data.me.gamertags.pc.windows : '',
              riot: data.me.gamertags ? data.me.gamertags.pc.riot : '',
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
                name: `${values.firstName} ${values.lastName}`,
                displayName: values.displayName,
                aboutMe: values.aboutMe,
                gender: values.gender,
                gamertags,
              }
              const { data } = await updateUserProfile({
                variables: { input },
              })
              if (data.updateUserProfile.updated) {
                setTimeout(() => {
                  actions.setSubmitting(false)
                  refetch()
                }, 1000)
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
                <EditProfileSection title="Payment Methods">
                  <PaymentMethods
                    savedCards={data.me.savedCards}
                    email={data.me.email}
                    refetch={refetch}
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
                <Save type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving' : 'Save'}
                </Save>
              </form>
            )}
          </Formik>
        </OutsideContainer>
      </Content>
    </PageContainer>
  )
}
