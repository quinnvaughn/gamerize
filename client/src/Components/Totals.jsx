import React, { Fragment, useState } from 'react'
import styled from 'styled-components'
import { Subscribe } from 'unstated'
import { FaCheck } from 'react-icons/fa'
import gql from 'graphql-tag'
import { withRouter } from 'react-router-dom'
import { Elements } from 'react-stripe-elements'
import { useMutation } from 'react-apollo-hooks'

import SessionsContainer from '../Containers/SessionsContainer'
import { capitalize } from '../utils/Strings'
import { displaySystem, mapSystem, mapLauncher } from '../utils/System'
import { calcFee } from '../utils/Fee'
import FirstTimeCheckout from './FirstTimeCheckout'
import { Mixpanel } from './Mixpanel'

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
  background: ${props => (props.disabled ? '#ebebeb' : '#db1422')};
  border-radius: 4px;
  line-height: 2.4rem;
  padding: 1rem 2.2rem;
  outline: 0;
  border: 0;
  font-size: 1.6rem;
  pointer-events: ${props => props.disabled && 'none'};
`

const NotCharged = styled.div`
  margin-top: 0.8rem;
  display: flex;
  justify-content: center;
  text-align: center;
`

const NotChargedYet = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  overflow-wrap: break-word;
`

const HowMuchYouPay = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`

const YouPay = styled.span`
  margin-top: 0.8rem;
  font-size: 1.2rem;
  font-weight: 600;
  overflow-wrap: break-word;
`

const AppropriateGT = styled.div`
  text-align: center;
  font-size: 1.6rem;
  font-weight: 800;
  overflow-wrap: break-word;
`
const Me = styled.div`
  text-align: center;
  font-size: 1.6rem;
  font-weight: 800;
  overflow-wrap: break-word;
`

const AddSession = styled.div`
  text-align: center;
  font-size: 1.6rem;
  font-weight: 800;
  overflow-wrap: break-word;
  margin-bottom: 1rem;
`

const DiscountsTitle = styled.span``

const DiscountPercentage = styled.span``

const totalReducer = (acc, cur) => acc + cur.slots * cur.price

const numSessionsReducer = (acc, cur) => acc + cur.slots

const BOOK_TIME_SLOTS = gql`
  mutation($input: BookTimeSlotsInput!) {
    bookTimeSlots(input: $input) {
      booked
    }
  }
`

function Totals(props) {
  const [loading, setLoading] = useState(false)
  const [booked, setBooked] = useState(false)
  const [bookError, setBookError] = useState(false)
  const [needCard, setNeedCard] = useState(false)
  const bookTimeSlots = useMutation(BOOK_TIME_SLOTS)
  const disabled = props.me.gamertags
    ? props.system === 'PC'
      ? !props.me.gamertags[mapSystem(props.system)][
          mapLauncher(props.launcher)
        ]
      : !props.me.gamertags[mapSystem(props.system)]
    : true
  const isMe = props.match.params.user === props.me.username
  const customerStripeId = props.customerId
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
          const fee = Number(calcFee(total, 'USD'))
          const discount = 0

          const totalMinusDiscounts = total + fee - discount
          const totalNotIncludingFees = total - discount
          const showTotals = sessions.length >= 1
          const content = showTotals ? (
            <TotalsContainer>
              <NumberSlots>
                <Items>
                  $
                  {`${props.price} x ${slots} ${
                    slots === 1 ? 'slot' : 'slots'
                  }`}
                </Items>
                <Cost>{`$${parseFloat(total).toFixed(2)}`}</Cost>
              </NumberSlots>
              <Discounts>
                <DiscountsTitle>Processing Fee</DiscountsTitle>
                <DiscountPercentage>{`+ $${parseFloat(fee).toFixed(
                  2
                )}`}</DiscountPercentage>
              </Discounts>
              <Discounts>
                <DiscountsTitle>Discounts</DiscountsTitle>
                <DiscountPercentage>{`- $${parseFloat(discount).toFixed(
                  2
                )}`}</DiscountPercentage>
              </Discounts>
              <Total>
                <TotalTitle>Total</TotalTitle>{' '}
                <TotalCost>{`$${parseFloat(totalMinusDiscounts).toFixed(
                  2
                )}`}</TotalCost>
              </Total>
            </TotalsContainer>
          ) : isMe ? (
            <Me>You can't add timeslots on your own session</Me>
          ) : (
            <AddSession>Please add a timeslot</AddSession>
          )
          return (
            <Fragment>
              {content}
              {disabled && !isMe && (
                <AppropriateGT>
                  {`You must add a gamertag for `}
                  {props.system === 'PC'
                    ? `the ${capitalize(props.launcher)} Launcher`
                    : displaySystem(props.system)}
                </AppropriateGT>
              )}
              <Book
                id="bookButton"
                disabled={sessions.length === 0 || disabled}
                onClick={async () => {
                  if (!customerStripeId || !props.hasDefaultCard) {
                    setNeedCard(true)
                  } else {
                    const timeSlots = sessions.map(timeslot => {
                      return {
                        timeSlotId: timeslot.id,
                        slots: timeslot.slots,
                        players: timeslot.players,
                        total: props.price * timeslot.slots,
                        startTime: timeslot.startTime,
                      }
                    })
                    const input = {
                      timeSlots,
                      creatorId: props.creator.id,
                      totalWithFee: totalMinusDiscounts,
                      totalWithoutFee: totalNotIncludingFees,
                    }
                    setLoading(true)
                    const { data } = await bookTimeSlots({
                      variables: { input },
                    })
                    if (data.bookTimeSlots.booked) {
                      Mixpanel.track('Booked a timeslot/s.')
                      setLoading(false)
                      setBooked(true)
                      container.clearSessions()
                      setTimeout(() => {
                        setBooked(false)
                        props.refetch()
                      }, 1000)
                    } else {
                      setBookError(true)
                    }
                  }
                }}
              >
                {loading ? (
                  'Booking'
                ) : !loading && booked ? (
                  <FaCheck />
                ) : bookError ? (
                  'Please Try Again'
                ) : (
                  'Book'
                )}
              </Book>
              {needCard && (
                <Elements>
                  <FirstTimeCheckout
                    setNeedCard={setNeedCard}
                    email={props.me.email}
                    refetch={props.meRefetch}
                  />
                </Elements>
              )}
              {/* <NotCharged>
                <NotChargedYet>You will not be charged yet.</NotChargedYet>
              </NotCharged> */}
              {/* Don't need either until I have multi payment set up. 
              {showTotals && (
                <HowMuchYouPay>
                  <YouPay>
                    This is not necessarily how much you will pay, depending on
                    how many players you have
                  </YouPay>
                </HowMuchYouPay>
              )} */}
            </Fragment>
          )
        }}
      </Subscribe>
    </Container>
  )
}

export default withRouter(Totals)
