import React, {useState} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
import { useMutation } from 'react-apollo-hooks'
import * as yup from 'yup'
import { Formik } from 'formik'
import { spawn } from 'child_process'

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
  background: #db1422;
  width: 100%;
  cursor: pointer;
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

const SmallErrorMessage = styled.div`
  margin-bottom: 0.2rem;
  color: #db1422;
  font-size: 1.2rem;
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
              login: { error, token },
            },
          } = await login({ variables: { input: values } })
          if (error) {
            setError(error)
            setSubmitting(false)
          } else {
          await localStorage.setItem('TOKEN', token)
          setSubmitting(false)
          props.history.push('/')
          }
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
            {touched.email && errors.email && <SmallErrorMessage>{errors.email}</SmallErrorMessage>}
            <Item
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              required
            />
            {touched.password && errors.password && <SmallErrorMessage>{errors.password}</SmallErrorMessage>}
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <LoginButton type="submit">Login</LoginButton>
            <StyledLink to="/sign-up">Sign up</StyledLink>
          </LoginForm>
        )}
      </Formik>
    </Container>
  )
}
