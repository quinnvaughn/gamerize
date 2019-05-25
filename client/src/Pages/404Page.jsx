import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
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
  text-decoration: none;
  :visited {
    color: black;
  }
  :hover {
    color: #db1422;
    text-decoration: underline;
  }
`

export default function NotThere(props) {
  return (
    <PageContainer>
      <NavBar />
      <Content>
        <Wording>
          This page is either not available or doesn't exist.
          <br />
          <StyledLink to="/">Please go back to the home page.</StyledLink>
        </Wording>
      </Content>
    </PageContainer>
  )
}
