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

const Container = styled.div`
  flex: 40%;
  display: flex;
  position: sticky;
  top: 3rem;
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

const HowManySlots = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 1rem;
`

export default function SelectionOptions({
  price,
  reviews,
  numReviews,
  system,
  gamer,
  game,
  slotsLeftToday,
  refetch,
}) {
  return (
    <Container>
      <Top>
        <Price>
          {`$${price}`} <Per>per slot</Per>
        </Price>
        <RatingContainer>
          <StarRatings
            rating={reviews}
            starRatedColor="#f10e0e"
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
            {/*TODO: Need slotsLeftToday to update at same time */}
            <HowManySlots>{`${slotsLeftToday} slots left today`}</HowManySlots>
            <SystemPicker system={system} setSystem={session.setSystem} />
            <TimeSlots gamer={gamer} game={game} />
            <Totals price={price} refetch={refetch} />
          </Fragment>
        )}
      </Subscribe>
    </Container>
  )
}
