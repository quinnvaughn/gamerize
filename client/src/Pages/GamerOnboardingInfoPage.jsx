import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { useMutation, useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'

//local imports
import NavBar from '../Components/NavBar'
import Loading from '../Components/Loading'
import ErrorPage from './ErrorPage'

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
`

const NeedToKnow = styled.div`
  padding-top: 9.6rem;
  padding-bottom: 8rem;
  border-bottom: 1px solid #dddfe2;
`

const Info = styled.div`
  font-size: 6rem;
  line-height: 6.4rem;
  letter-spacing: -2.5px;
  font-weight: 800;
  text-align: center;
  margin-bottom: 3rem;
`

const Alpha = styled.div`
  @media (min-width: 744px) {
    max-width: 680px;
    margin: 0 auto;
  }
  word-wrap: break-word;
  white-space: pre-wrap;
  font-size: 2.4rem;
  line-height: 3rem;
  font-weight: 400;
  text-align: center;
`

const Title = styled.div`
  word-wrap: break-word;
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.75em;
`

const Subtitle = styled.div`
  font-weight: 400;
  font-size: 1.8rem;
  line-height: 1.5em;
  margin-bottom: 2rem;
`

const LetsGo = styled.div`
  display: inline-block;
  margin-bottom: 1rem;
  color: #fff;
  text-decoration: none;
  outline: 0;
  border: 0;
  border-radius: 4px;
  font-size: 1.6rem;
  font-weight: 600;
  padding: 1rem 2.2rem;
  cursor: pointer;
  background: ${props => (props.disabled ? '#dddfe2' : '#db1422')};
  pointer-events: ${props => props.disabled && 'none'};
`

const Stripe = styled.a`
  margin-bottom: 1rem;
  margin-right: 3rem;
  color: #fff;
  text-decoration: none;
  outline: 0;
  border: 0;
  border-radius: 4px;
  font-size: 1.6rem;
  font-weight: 600;
  padding: 1rem 2.2rem;
  cursor: pointer;
  background: ${props => (props.disabled ? '#dddfe2' : '#db1422')};
  pointer-events: ${props => props.disabled && 'none'};
`

const UPDATE_USER_PROFILE = gql`
  mutation {
    allowGamerToPlay {
      allowed
    }
  }
`

const GET_MY_INFO = gql`
  {
    me {
      id
      email
      name
    }
  }
`

function getSearchParameters() {
  const prmstr = window.location.search.substr(1)
  return prmstr != null && prmstr != '' ? transformToAssocArray(prmstr) : {}
}

function transformToAssocArray(prmstr) {
  const params = {}
  const prmarr = prmstr.split('&')
  for (let i = 0; i < prmarr.length; i++) {
    const tmparr = prmarr[i].split('=')
    params[tmparr[0]] = tmparr[1]
  }
  return params
}

const ADD_STRIPE_CONNECT_ACCOUNT = gql`
  mutation($input: AddStripeConnectAccountInput!) {
    addStripeConnectAccount(input: $input) {
      completed
    }
  }
`

async function addStripeAccount(addStripe, params, setDisabled, setCallAgain) {
  if (params.code) {
    setCallAgain(false)
    const input = { code: params.code }
    const { data } = await addStripe({ variables: { input } })
    if (data.addStripeConnectAccount.completed) {
      setDisabled(false)
    }
  }
}

function GamerOnboardingInfoPage(props) {
  const { data, loading, error } = useQuery(GET_MY_INFO)
  const [disabled, setDisabled] = useState(true)
  const [callAgain, setCallAgain] = useState(true)
  const addStripe = useMutation(ADD_STRIPE_CONNECT_ACCOUNT)
  const params = getSearchParameters()
  useEffect(() => {
    params.code &&
      callAgain &&
      addStripeAccount(addStripe, params, setDisabled, setCallAgain)
  }, [params])
  const allowGamerToPlay = useMutation(UPDATE_USER_PROFILE)
  const firstName = !loading && data && data.me && data.me.name.split(' ')[0]
  const lastName = !loading && data && data.me && data.me.name.split(' ')[1]
  const email = !loading && data && data.me && data.me.email
  return loading ? (
    <Loading />
  ) : error ? (
    <ErrorPage errors={error} />
  ) : (
    <PageContainer>
      <NavBar />
      <Content>
        <NeedToKnow>
          <Info>Things you need to know</Info>
          <Title>Pricing</Title>
          <Subtitle>
            You can set whatever price you want! Even free if you so choose.
          </Subtitle>
          <Title>Setup</Title>
          <Subtitle>
            You just set your setup time. This is so you can send invites to new
            users/wait for them to respond if need be.
          </Subtitle>
          <Title>Next Session</Title>
          <Subtitle>
            The gamertags of the signed up users for your next session will show
            up on the calendar tab. These will be the correct gamertag for
            either the system or launcher you are on.
          </Subtitle>
          <Title>Current Session</Title>
          <Subtitle>
            Your current session will pop up in the calendar tab. You may add
            minutes to your session from this if need be.
          </Subtitle>
          <Title>Game Length</Title>
          <Subtitle>
            You should play a reasonable amount of the time that you are signed
            up for. Don't play 5 minutes of a scheduled 15 minute session if the
            game only goes that long. Play another one. You can always add time.
            But a game that ends in 13 minutes that is scheduled for 15 would be
            fine. This mostly applies to battle royale games.
          </Subtitle>
          <Title>Waiting</Title>
          <Subtitle>
            If a player isn't answering your invite, you should at least wait
            until the official time starts. But if your previous game gets done
            early and you sent it early, don't assume the user will respond
            immediately.
          </Subtitle>
          <Title>Most important</Title>
          <Subtitle>
            import ErrorPage from './ErrorPage'; Don't be an asshole to the
            gamers, or standoffish, or quiet. We want this to be a fun
            experience for everyone.
          </Subtitle>
          <Stripe
            disabled={!disabled}
            href={`https://connect.stripe.com/express/oauth/authorize?redirect_uri=${
              process.env.REACT_APP_STRIPE_REDIRECT_URI
            }&client_id=${process.env.REACT_APP_STRIPE_CLIENT_ID}&state=${
              process.env.REACT_APP_STRIPE_STATE_VALUE
            }&stripe_user[business_type]=individual&stripe_user[first_name]=${firstName}&stripe_user[last_name]=${lastName}&stripe_user[email]=${email}&suggested_capabilities[]=platform_payments`}
          >
            Add your Stripe Account
          </Stripe>
          <LetsGo
            disabled={disabled}
            onClick={async () => {
              const { data } = await allowGamerToPlay()
              if (data.allowGamerToPlay.allowed) {
                await props.history.push('/gamer-dashboard/home')
              }
            }}
          >
            Let's start gaming
          </LetsGo>
        </NeedToKnow>
      </Content>
    </PageContainer>
  )
}

export default withRouter(GamerOnboardingInfoPage)
