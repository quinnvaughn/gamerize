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

const LoginButton = styled.button`
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
  cursor: pointer;
  font-size: 1.4rem;
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
`

const LOGIN = gql`
  mutation($input: LoginInput!) {
    login(input: $input) {
      token
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
  return (
    <Container>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true)
          const {
            data: {
              login: { token },
            },
          } = await login({ variables: { input: values } })
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
            <Title>Login to Gamerize</Title>
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
            <LoginButton type="submit">Login</LoginButton>
            <StyledLink to="/sign-up">Sign up</StyledLink>
          </LoginForm>
        )}
      </Formik>
    </Container>
  )
}
