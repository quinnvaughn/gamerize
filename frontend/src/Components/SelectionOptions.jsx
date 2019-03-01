import React, { Fragment } from 'react'
import styled from 'styled-components'
import StarRatings from 'react-star-ratings'
import { Subscribe } from 'unstated'
import dateFns from 'date-fns'

import SystemPicker from './SystemPicker'
import TimeSlots from './TimeSlots'
import SessionsContainer from '../Containers/SessionsContainer'
import Totals from './Totals'

//data

import sessions from '../data/sessions'

const Container = styled.div`
  flex: 40%;
  display: flex;
  position: sticky;
  top: 2rem;
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

const NumReviews = styled.span`
  margin-left: 0.5rem;
  color: black;
  font-size: 1.2rem;
  font-weight: 600;
`

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
`

const Top = styled.div`
  padding-bottom: 1.6rem;
  margin-bottom: 2rem;
  border-bottom: 0.1rem solid #dddfe2;
`

const Book = styled.button`
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

const HowManySlots = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 1rem;
`

// Will have to fix to do only ones still available for today with filtering.
const slotsReducer = (acc, cur) => {
  if (dateFns.compareAsc(new Date(), cur.timeStart) === 1) {
    return acc
  } else return acc + (cur.slots - cur.players.length)
}

const slotsLeft = sessions.reduce(slotsReducer, 0)

export default function SelectionOptions({
  price,
  reviews,
  numReviews,
  systems,
  gamer,
  game,
}) {
  return (
    <Container>
      <Top>
        <Price>
          {`$${price}`} <Per>per session</Per>
        </Price>
        <RatingContainer>
          <StarRatings
            rating={reviews}
            starRatedColor="#e62739"
            numberOfStars={5}
            name="rating"
            starDimension="1.2rem"
            starSpacing=".1rem"
          />
          <NumReviews>{`${numReviews}`}</NumReviews>
        </RatingContainer>
      </Top>
      <Subscribe to={[SessionsContainer]}>
        {session => (
          <Fragment>
            <HowManySlots>{`${slotsLeft} slots left today`}</HowManySlots>
            <SystemPicker systems={systems} setSystem={session.setSystem} />
            <TimeSlots gamer={gamer} game={game} />
            {session.state.sessions.length >= 1 && <Totals />}
          </Fragment>
        )}
      </Subscribe>
      <Book>Book</Book>
    </Container>
  )
}
