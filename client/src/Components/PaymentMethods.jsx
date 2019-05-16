import React, { useState } from 'react'
import styled from 'styled-components'
import { Elements } from 'react-stripe-elements'

import PaymentMethod from './PaymentMethod'
import AddCard from './AddCard'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
`

const Top = styled.div`
  margin-bottom: 2rem;
`

const AddCardButton = styled.button`
  border: 0;
  cursor: pointer;
  outline: 0;
  background: ${props => (props.disabled ? '#ebebeb' : '#db1422')};
  pointer-events: ${props => props.disabled && 'none'};
  color: #fff;
  border-radius: 4px;
  margin-top: 2rem;
  padding: 1rem 1.5rem;
  font-size: 1.6rem;
  width: 20rem;
  font-weight: 600;
`

export default function PaymentMethods(props) {
  const [add, setAdd] = useState(false)
  return (
    <Container>
      <Top>
        {props.savedCards.map(savedCard => (
          <PaymentMethod
            savedCard={savedCard}
            key={savedCard.cardId}
            refetch={props.refetch}
          />
        ))}
      </Top>
      <AddCardButton
        onClick={async () => {
          setAdd(true)
        }}
      >
        Add Card
      </AddCardButton>
      {add && (
        <Elements>
          <AddCard
            email={props.email}
            setAdd={setAdd}
            refetch={props.refetch}
          />
        </Elements>
      )}
    </Container>
  )
}
