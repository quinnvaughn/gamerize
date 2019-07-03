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
  font-size: 1.4rem;
  cursor: pointer;
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

const SIGNUP = gql`
  mutation($input: SignupInput!) {
    signup(input: $input) {
      token
      user {
        id
        email
        name
      }
      error
    }
  }
`

const signupSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email is not valid')
    .trim()
    .required('Email is required'),
  password: yup
    .string()
    .trim()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
  username: yup
    .string()
    .min(2, 'Username must be at least 2 characters')
    .max(20, 'Username can be at most 20 characters')
    .trim()
    .required('Username is required'),
  name: yup
    .string()
    .trim()
    .required('Name is required'),
})

export default function SignUpPage(props) {
  const signup = useMutation(SIGNUP)
  const [error, setError] = useState('')
  return (
    <Container>
      <Formik
        initialValues={{
          email: '',
          password: '',
          username: '',
          name: '',
          passwordConfirmation: '',
        }}
        validationSchema={signupSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true)
          const {
            data: {
              signup: { error, token, user },
            },
          } = await signup({ variables: { input: values } })
          if (error) {
            setError(error)
            setSubmitting(false)
          } else {
            Mixpanel.alias(user.id)
            Mixpanel.track('Successful signup')
            Mixpanel.people.set({
              $email: user.email,
              $first_name: user.name.split(' ')[0],
              $last_name: user.name.split(' ')[1],
              $created: new Date(),
            })
            await localStorage.setItem('TOKEN', token)
            setSubmitting(false)
            await props.history.push('/user-onboarding/info')
          }
        }}
      >
        {({ isValid, handleSubmit, isSubmitting }) => (
          <LoginForm onSubmit={handleSubmit}>
            <Title>Sign up for Gamerize</Title>
            <Field
              type="email"
              placeholder="Email"
              name="email"
              required
              component={LoginInput}
            />
            <Field
              type="password"
              placeholder="Password"
              name="password"
              required
              component={LoginInput}
            />
            <Field
              type="password"
              placeholder="Confirm your password"
              name="passwordConfirmation"
              required
              component={LoginInput}
            />
            <Field
              placeholder="Username"
              name="username"
              required
              component={LoginInput}
            />
            <Field
              placeholder="Full Name"
              name="name"
              required
              component={LoginInput}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <SubmitButton
              isValid={isValid}
              isSubmitting={isSubmitting}
              primary
              width="100%"
            >
              Sign Up
            </SubmitButton>
            <StyledLink to="/login">Login</StyledLink>
          </LoginForm>
        )}
      </Formik>
    </Container>
  )
}
