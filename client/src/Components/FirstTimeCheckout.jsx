import React, { useState } from 'react'
import styled from 'styled-components'
import { injectStripe, CardElement } from 'react-stripe-elements'
import gql from 'graphql-tag'
import { useMutation } from 'react-apollo-hooks'

import SimpleModal from './Modal'

const CustomCard = styled(CardElement)`
  display: block;
  margin: 1rem 0 2rem 0;
  max-width: 500px;
  padding: 1rem 1.4rem;
  font-size: 1.4em;
  font-family: 'Montserrat', sans-serif;
  box-shadow: rgba(50, 50, 93, 0.14902) 0px 1px 3px,
    rgba(0, 0, 0, 0.0196078) 0px 1px 0px;
  border: 0;
  outline: 0;
  border-radius: 4px;
  background: white;
`

const CardContainer = styled.div`
  padding: 1rem;
`

const Title = styled.div`
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`

const AddCard = styled.button`
  margin-top: 1.6rem;
  font-weight: 800;
  cursor: pointer;
  color: white;
  background: ${props => (props.disabled ? '#ebebeb' : '#db1422')};
  border-radius: 4px;
  line-height: 2.4rem;
  padding: 1rem 2.2rem;
  outline: 0;
  border: 0;
  font-size: 1.6rem;
  pointer-events: ${props => props.disabled && 'none'};
`

const ADD_CARD = gql`
  mutation($input: AddCardInput!) {
    addCard(input: $input) {
      added
    }
  }
`

function FirstTimeCheckout(props) {
  const addCard = useMutation(ADD_CARD)
  const [loading, setLoading] = useState(false)
  return (
    <SimpleModal onRequestClose={() => props.setNeedCard(false)} width={500}>
      <CardContainer>
        <Title>Card Payment</Title>
        <CustomCard />
        <AddCard
          onClick={async () => {
            const { source } = await props.stripe.createSource({
              type: 'card',
              owner: { email: props.email },
            })
            const input = {
              id: source.id,
              brand: source.card.brand,
              lastFour: source.card.last4,
            }
            const { data } = await addCard({ variables: { input } })
            if (data.addCard.added) {
              setLoading(true)
              props.refetch()
              setLoading(false)
              props.setNeedCard(false)
            }
          }}
        >
          {loading ? 'Adding' : 'Add Card'}
        </AddCard>
      </CardContainer>
    </SimpleModal>
  )
}

export default injectStripe(FirstTimeCheckout)
