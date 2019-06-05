import React from 'react'
import styled from 'styled-components'

import NavBar from '../Components/NavBar'
import Collapsible from '../Components/Collapsible'
import useTitle from '../Hooks/useTitle'

const PageContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh;
`

const Content = styled.div`
  @media (min-width: 744px) {
    max-width: 696px;
  }
  @media (min-width: 1128px) {
    max-width: 1080px;
  }
  margin: 0 auto;
  width: auto;
  padding-right: 2.4rem;
  padding-left: 2.4rem;
  font-size: 1.6rem;
`

const Top = styled.div`
  padding-top: 9.6rem;
  padding-bottom: 8rem;
  border-bottom: 1px solid #dddfe2;
`

const FAQ = styled.div`
  font-size: 6rem;
  line-height: 6.4rem;
  letter-spacing: -2.5px;
  font-weight: 800;
  text-align: center;
  margin-bottom: 3rem;
`

const Users = styled.div`
  font-size: 2.2rem;
  margin-bottom: 1.6rem;
  font-weight: 600;
`

export default function FAQPage(props) {
  useTitle('Gamerize - Frequently Asked Questions')
  return (
    <PageContainer>
      <NavBar />
      <Content>
        <Top>
          <FAQ>Frequently Asked Questions</FAQ>
          <Users>Users</Users>
          <Collapsible title="How do I sign up?">
            Click on the Sign Up link in the navigation bar and fill out your
            information.
          </Collapsible>
          <Collapsible title="How do I edit my profile?">
            Click on your avatar in the top right corner and click on profile.
          </Collapsible>
          <Collapsible title="How do I find a session?">
            There are several ways to do this. You could start by searching for
            a particular game you like and then finding sessions through that,
            or finding a gamer you're aware of and looking through their
            sessions. Finally you could also look through all the sessions until
            you find one interesting to you.
          </Collapsible>
          <Collapsible title="How do I book a time slot?">
            There are several ways to do this. You could start by searching for
            a particular game you like and then finding sessions through that,
            or finding a gamer you're aware of and looking through their
            sessions. Finally you could also look through all the sessions until
            you find one interesting to you.
          </Collapsible>
        </Top>
      </Content>
    </PageContainer>
  )
}
