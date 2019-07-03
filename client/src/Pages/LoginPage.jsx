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

const LoginForm = styled.form`
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

const LOGIN = gql`
  mutation($input: LoginInput!) {
    login(input: $input) {
      token
      error
      user {
        id
        email
        name
      }
    }
  }
`

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email is not valid')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

export default function LoginPage(props) {
  const login = useMutation(LOGIN)
  const [error, setError] = useState('')
  return (
    <Container>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true)
          const {
            data: {
              login: { error, token, user },
            },
          } = await login({ variables: { input: values } })
          if (error) {
            setError(error)
            setSubmitting(false)
            Mixpanel.track('Unsuccessful login')
          } else {
            Mixpanel.identify(user.id)
            Mixpanel.people.set({
              $email: user.email,
              $first_name: user.name.split(' ')[0],
              $last_name: user.name.split(' ')[1],
              $last_login: new Date(),
            })
            Mixpanel.track('Successful login')
            await localStorage.setItem('TOKEN', token)
            setSubmitting(false)
            props.history.push('/')
          }
        }}
      >
        {({ isValid, handleSubmit, isSubmitting }) => (
          <LoginForm onSubmit={handleSubmit} method="post">
            <Title>Login to Gamerize</Title>
            <Field
              type="email"
              name="email"
              placeholder="Email"
              required
              component={LoginInput}
            />
            <Field
              type="password"
              name="password"
              placeholder="Password"
              required
              component={LoginInput}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <SubmitButton
              isValid={isValid}
              width="100%"
              primary
              isSubmitting={isSubmitting}
            >
              Login
            </SubmitButton>
            <StyledLink to="/sign-up">Sign up</StyledLink>
          </LoginForm>
        )}
      </Formik>
    </Container>
  )
}
