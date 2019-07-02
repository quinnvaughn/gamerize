import React from 'react'
import styled from 'styled-components'
import { useQuery, useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import * as Yup from 'yup'

//local imports
import GamerDashboardAccountNav from '../Components/GamerDashboardAccountNav'
import GamerDashboardNav from '../Components/GamerDashboardNav'
import Loading from '../Components/Loading'
import ErrorPage from './ErrorPage'
import EditProfileSection from '../Components/EditProfileSection'
import EditProfileInput from '../Components/EditProfileInput'
import { Formik, Field } from 'formik'
import SubmitButton from '../Components/SubmitButton'

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

const EditSetupSchema = Yup.object().shape({
  setup: Yup.number('Setup must be a number')
    .min(1, 'Must at least have some setup')
    .required('A setup is required'),
})

export default function GamerDashboardAccountEdit(props) {
  const { data, loading, refetch, error } = useQuery(GET_INFO)
  const updateGamerProfile = useMutation(UPDATE_GAMER_PROFILE)
  return loading ? (
    <Loading gamer />
  ) : error ? (
    <ErrorPage errors={error} />
  ) : (
    <PageContainer>
      <GamerDashboardNav />
      <Content>
        <GamerDashboardAccountNav />
        <OutsideContainer>
          <Formik
            validationSchema={EditSetupSchema}
            enableReinitialize
            initialValues={{ setup: data.me.setup }}
            onSubmit={async (values, actions) => {
              const input = { setup: values.setup }
              const { data } = await updateGamerProfile({
                variables: { input },
              })
              if (data.updateGamerProfile.updated) {
                actions.setSubmitting(false)
                refetch()
              }
            }}
          >
            {({ handleSubmit, isSubmitting, values, isValid }) => (
              <form method="post" onSubmit={handleSubmit}>
                <EditProfileSection title="Required">
                  <Field
                    name="setup"
                    type="number"
                    min="1"
                    component={EditProfileInput}
                  />
                </EditProfileSection>
                <SubmitButton
                  disabled={
                    !Number.isInteger(values.setup) || values.setup <= 0
                  }
                  primary
                  width={70}
                  isSubmitting={isSubmitting}
                  isValid={Number.isInteger(values.setup)}
                >
                  Save
                </SubmitButton>
              </form>
            )}
          </Formik>
        </OutsideContainer>
      </Content>
    </PageContainer>
  )
}
