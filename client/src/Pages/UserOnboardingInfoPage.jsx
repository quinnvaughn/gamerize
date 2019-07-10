import React from 'react'
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
            enableReinitialize
            initialValues={{
              firstName: data.me ? data.me.name.split(' ')[0] : '',
              lastName: data.me ? data.me.name.split(' ')[1] : '',
              displayName: data.me ? data.me.name : '',
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
