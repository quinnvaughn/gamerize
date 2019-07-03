import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
import { useMutation } from 'react-apollo-hooks'
import * as yup from 'yup'
import { Formik, Field } from 'formik'
import { Mixpanel } from '../Components/Mixpanel'
import LoginInput from '../Components/LoginInput'
import SubmitButton from '../Components/SubmitButton'

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

const ErrorMessage = styled.div`
  margin-bottom: 0.8rem;
  color: #db1422;
  font-size: 1.6rem;
  font-weight: 700;
`

const SentEmail = styled.div`
  margin-bottom: 0.8rem;
  color: black;
  font-size: 1.6rem;
  font-weight: 700;
`

const SEND_FORGOT_PASSWORD_EMAIL = gql`
  mutation($input: SendForgotPasswordEmailInput!) {
    sendForgotPasswordEmail(input: $input) {
      sent
      error
    }
  }
`

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email is not valid')
    .required('Email is required'),
})

export default function LoginPage(props) {
  const sendForgotPasswordEmail = useMutation(SEND_FORGOT_PASSWORD_EMAIL)
  const [errorMsg, setError] = useState('')
  const [sentEmail, setSentEmail] = useState('')
  return (
    <Container>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={loginSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const input = {
            email: values.email,
          }
          const {
            data: {
              sendForgotPasswordEmail: { sent, error },
            },
          } = await sendForgotPasswordEmail({ variables: { input } })
          if (error) {
            setError(error)
            setSubmitting(false)
          } else {
            if (sent) {
              setSubmitting(false)
              setSentEmail(
                `Your recovery email was successfully sent.,You can close this window.,`
              )
              resetForm()
            } else {
              setError('Email did not send. Please try again')
              setSubmitting(false)
            }
          }
        }}
      >
        {({ isValid, handleSubmit, isSubmitting }) => (
          <RecoverPasswordForm onSubmit={handleSubmit} method="post">
            <Title>Recover your Password</Title>
            <Field
              type="email"
              name="email"
              placeholder="Please enter your email"
              required
              component={LoginInput}
            />
            {sentEmail &&
              sentEmail.split(',').map(sent => <SentEmail>{sent}</SentEmail>)}
            {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
            <SubmitButton
              isValid={isValid}
              width="100%"
              primary
              isSubmitting={isSubmitting}
            >
              Recover Password
            </SubmitButton>
            <StyledLink to="/login">Login</StyledLink>
            <StyledLink to="/sign-up">Sign Up</StyledLink>
          </RecoverPasswordForm>
        )}
      </Formik>
    </Container>
  )
}
