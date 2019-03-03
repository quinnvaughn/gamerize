import React from 'react'
import styled from 'styled-components'
import { Subscribe } from 'unstated'

import SessionsContainer from '../Containers/SessionsContainer'

const Container = styled.div`
  width: 100%;
  padding: 0.8rem 0;
`

const TotalsContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const NumberSlots = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.4rem;
  font-weight: 400;
  padding-bottom: 0.8rem;
  margin-bottom: 0.8rem;
  border-bottom: 1px solid #dddfe2;
`

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 1.4rem;
  padding-bottom: 0.8rem;
  margin-bottom: 0.8rem;
`

const TotalTitle = styled.span``

const TotalCost = styled.span``

const Items = styled.span``

const Cost = styled.span``

const Discounts = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 400;
  font-size: 1.4rem;
  padding-bottom: 0.8rem;
  margin-bottom: 0.8rem;
  border-bottom: 1px solid #dddfe2;
`

const Book = styled.button`
  width: 100%;
  margin-top: 1.6rem;
  font-weight: 800;
  cursor: pointer;
  flex: 1;
  color: white;
  background: #e62739;
  border-radius: 4px;
  line-height: 2.4rem;
  padding: 1rem 2.2rem;
  outline: 0;
  border: 0;
  font-size: 1.6rem;
`

const DiscountsTitle = styled.span``

const DiscountPercentage = styled.span``

const totalReducer = (acc, cur) => acc + cur.slots * cur.price

const numSessionsReducer = (acc, cur) => acc + cur.slots

export default function Totals(props) {
  return (
    <Container>
      <Subscribe to={[SessionsContainer]}>
        {container => {
          const { sessions } = container.state
          const total = sessions
            .map(session => {
              return { ...session, price: props.price }
            })
            .reduce(totalReducer, 0)
          const slots = sessions.reduce(numSessionsReducer, 0)
          // const totals = sessions.state.sessions.map(session => (
          //   <Total session={session} container={sessions} price={props.price} />
          // ))
          const discount = 0

          const totalMinusDiscounts = total - discount

          return container.state.sessions.length >= 1 ? (
            <TotalsContainer>
              <NumberSlots>
                <Items>
                  $
                  {`${props.price} x ${slots} ${
                    slots === 1 ? 'slot' : 'slots'
                  }`}
                </Items>
                <Cost>{`$${total}`}</Cost>
              </NumberSlots>
              <Discounts>
                <DiscountsTitle>Discounts</DiscountsTitle>
                <DiscountPercentage>{`- $${discount}`}</DiscountPercentage>
              </Discounts>
              <Total>
                <TotalTitle>Total</TotalTitle>{' '}
                <TotalCost>{`$${totalMinusDiscounts}`}</TotalCost>
              </Total>
            </TotalsContainer>
          ) : null
        }}
      </Subscribe>
      <Book>Book</Book>
    </Container>
  )
}
