import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
import { useMutation } from 'react-apollo-hooks'
import * as yup from 'yup'
import { Formik } from 'formik'

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

const Item = styled.input`
  outline: 0;
  border-radius: 4px;
  border: 1px solid #dddfe2;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  :last-of-type {
    margin-bottom: 2rem;
  }
`

const Title = styled.div`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 2rem;
`

const SignupButton = styled.button`
  outline: 0;
  border: 0;
  border-radius: 4rem;
  color: #fff;
  font-weight: 700;
  padding: 1rem 1.6rem;
  text-transform: uppercase;
  background: #f10e0e;
  width: 100%;
  cursor: pointer;
`

const StyledLink = styled(Link)`
  margin-top: 2rem;
  color: #f10e0e;
  font-size: 1.4rem;
  cursor: pointer;
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
`

const SIGNUP = gql`
  mutation($input: SignupInput!) {
    signup(input: $input) {
      token
    }
  }
`

const signupSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email is not valid')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  username: yup
    .string()
    .min(2)
    .max(20, 'Username can be at most 20 characters')
    .required('Username is required'),
  name: yup.string().required('Name is required'),
})

export default function SignUpPage(props) {
  const signup = useMutation(SIGNUP)
  return (
    <Container>
      <Formik
        initialValues={{ email: '', password: '', username: '', name: '' }}
        validationSchema={signupSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true)
          const {
            data: {
              signup: { token },
            },
          } = await signup({ variables: { input: values } })
          await localStorage.setItem('TOKEN', token)
          setSubmitting(false)
          props.history.push('/')
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <LoginForm onSubmit={handleSubmit}>
            <Title>Sign up for Gamerize</Title>
            <Item
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              required
            />
            <Item
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              required
            />
            <Item
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              required
            />
            <Item
              type="text"
              placeholder="Full Name"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              required
            />
            <SignupButton type="submit" disabled={isSubmitting}>
              Sign Up
            </SignupButton>
            <StyledLink to="/login">Login</StyledLink>
          </LoginForm>
        )}
      </Formik>
    </Container>
  )
}