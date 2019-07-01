import React, { Fragment } from 'react'
import styled from 'styled-components'

import TimeSlots from './TimeSlots'
import Totals from './Totals'
import { formatGamers } from '../utils/Strings'

const Container = styled.div`
  flex: 40%;
  display: flex;
  position: sticky;
  top: 8rem;
  flex-direction: column;
  border: 1px solid #dddfe2;
  border-radius: 0.4rem;
  margin-top: 1rem;
  padding: 1rem 2.4rem 2.4rem;
  align-self: flex-start;
  margin-left: 4.5rem;
`

const Price = styled.div`
  font-size: 2.2rem;
  font-weight: 600;
`

const Per = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
`

const Top = styled.div`
  padding-bottom: 1.6rem;
  margin-bottom: 2rem;
  border-bottom: 0.1rem solid #dddfe2;
`

const HowManySlots = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 1rem;
`

const SignInToBook = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
`

export default function SelectionOptions({
  session,
  meRefetch,
  refetch,
  notEnoughSpots,
  me,
}) {
  return (
    <Container>
      <Top>
        <Price>
          {`$${parseFloat(session.price).toFixed(2)}`} <Per>per slot</Per>
        </Price>
      </Top>
      {me === null ? (
        <SignInToBook>Please sign in to book</SignInToBook>
      ) : (
        <Fragment>
          {/*TODO: Need slotsLeftToday to update at same time */}
          {/* <HowManySlots>{`${session.slotsLeftToday} ${
            session.slotsLeftToday === 1 ? 'slot' : 'slots'
          } left today`}</HowManySlots> */}
          <TimeSlots
            gamer={formatGamers(session.gamers)}
            game={session.game.name}
          />
          <Totals
            session={session}
            notEnoughSpots={notEnoughSpots}
            refetch={refetch}
            me={me}
            meRefetch={meRefetch}
          />
        </Fragment>
      )}
    </Container>
  )
}
