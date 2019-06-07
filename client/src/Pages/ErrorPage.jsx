import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import * as Sentry from '@sentry/browser'

import NavBar from '../Components/NavBar'

const PageContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh;
`

const Content = styled.div`
  width: 100%;
  margin: 0 auto;
  padding-left: 8rem;
  padding-right: 8rem;
  padding-top: 1rem;
  height: 100%;
  margin-bottom: 9rem;
`

const Wording = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const StyledLink = styled(Link)`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  text-decoration: none;
  :visited {
    color: black;
  }
  :hover {
    cursor: pointer;
    color: #db1422;
    text-decoration: underline;
  }
`

const Reload = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  :hover {
    cursor: pointer;
    color: #db1422;
    text-decoration: underline;
  }
`

const REPORT_ERROR = gql`
  mutation($input: PostErrorToSlackInput!) {
    postErrorToSlack(input: $input) {
      posted
    }
  }
`

export default function ErrorPage(props) {
  useEffect(() => {
    process.env.NODE_ENV === 'production' &&
      Sentry.captureException(new Error(props.errors))
  }, {})
  return (
    <PageContainer>
      <NavBar />
      <Content>
        <Wording>
          There was an error loading this page.
          <br />
          <StyledLink to="/">Either go back to the home page.</StyledLink>
          <div>Or</div>
          <Reload
            onClick={async () => {
              window.location.reload()
            }}
          >
            Try reloading the page.
          </Reload>
        </Wording>
      </Content>
    </PageContainer>
  )
}
