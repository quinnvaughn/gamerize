import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
import { useMutation } from 'react-apollo-hooks'
import * as yup from 'yup'
import { Formik, Field } from 'formik'
import LoginInput from '../Components/LoginInput'
import SubmitButton from '../Components/SubmitButton'
import useCheckPasswordToken from '../Hooks/useCheckPasswordToken'

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
`

const RecoverPasswordForm = styled.form`
  padding: 4rem;
  border-radius: 4px;
  border: 1px solid #dddfe2;
  display: flex;
  flex-direction: column;
  text-align: center;
`

const Title = styled.div`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 2rem;
`

const Error = styled.div`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 2rem;
`

const ErrorMessage = styled.div`
  margin-bottom: 0.8rem;
  color: #db1422;
  font-size: 1.6rem;
  font-weight: 700;
`

const Updated = styled.div`
  margin-bottom: 0.8rem;
  color: black;
  font-size: 1.6rem;
  font-weight: 700;
`

const StyledLink = styled(Link)`
  margin-top: 2rem;
  color: #db1422;
  cursor: pointer;
  font-size: 1.4rem;
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
`

const UPDATE_PASSWORD = gql`
  mutation($input: UpdatePasswordInput!) {
    updatePassword(input: $input) {
      updated
      error
    }
  }
`

const loginSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
})

export default function UpdatePasswordPage(props) {
  const { valid } = useCheckPasswordToken(props.match.params.token)
  const updatePassword = useMutation(UPDATE_PASSWORD)
  const [updated, setUpdated] = useState(false)
  const [serverError, setServerError] = useState(null)
  return (
    <Container>
      {!valid && <Error>Your token has already expired.</Error>}
      {valid && (
        <Formik
          initialValues={{ password: '', passwordConfirmation: '' }}
          validationSchema={loginSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const input = {
              resetPasswordToken: props.match.params.token,
              password: values.password,
            }
            const { data } = await updatePassword({ variables: { input } })
            if (data.updatePassword.updated) {
              setSubmitting(false)
              setUpdated(true)
            } else {
              setServerError(data.updatePassword.error)
              setSubmitting(false)
            }
          }}
        >
          {({ isValid, handleSubmit, isSubmitting }) => (
            <RecoverPasswordForm onSubmit={handleSubmit} method="post">
              <Title>Update your Password</Title>
              <Field
                type="password"
                name="password"
                placeholder="Please enter your new password"
                required
                component={LoginInput}
              />
              <Field
                type="password"
                name="passwordConfirmation"
                placeholder="Confirm your new password"
                required
                component={LoginInput}
              />
              {updated && (
                <Updated>
                  Your password has been updated. Please try logging in
                </Updated>
              )}
              {serverError && <Error>{serverError}</Error>}
              <SubmitButton
                isValid={isValid}
                width="100%"
                primary
                isSubmitting={isSubmitting}
              >
                Update Password
              </SubmitButton>
              {updated && <StyledLink to="/login">Login</StyledLink>}
            </RecoverPasswordForm>
          )}
        </Formik>
      )}
    </Container>
  )
}
