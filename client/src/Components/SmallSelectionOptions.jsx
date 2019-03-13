import React, { Fragment } from 'react'
import styled from 'styled-components'
import StarRatings from 'react-star-ratings'
import { Subscribe } from 'unstated'
import dateFns from 'date-fns'
import { MdClose } from 'react-icons/md'

import SystemPicker from './SystemPicker'
import TimeSlots from './TimeSlots'
import SessionsContainer from '../Containers/SessionsContainer'
import Totals from './Totals'

//data

import sessions from '../data/sessions'

const Container = styled.div`
  width: 100%;
  padding: 2.4rem;
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

const Exit = styled(MdClose)`
  font-size: 3rem;
  cursor: pointer;
  z-index: 1000;
  color: black;
  :hover {
    color: #f10e0e;
  }
`

const ExitContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 1rem;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 9999;
  background: #fff;
  height: 3rem;
`

// Will have to fix to do only ones still available for today with filtering.
const slotsReducer = (acc, cur) => {
  if (dateFns.compareAsc(new Date(), cur.timeStart) === 1) {
    return acc
  } else return acc + (cur.slots - cur.players.length)
}

const slotsLeft = sessions.reduce(slotsReducer, 0)

export default function SmallSelectionOptions({
  price,
  reviews,
  numReviews,
  systems,
  gamer,
  game,
  close,
}) {
  return (
    <Container>
      <ExitContainer>
        <Exit onClick={close} />
      </ExitContainer>
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
            <HowManySlots>{`${slotsLeft} slots left today`}</HowManySlots>
            <SystemPicker systems={systems} setSystem={session.setSystem} />
            <TimeSlots gamer={gamer} game={game} />
            <Totals price={price} />
          </Fragment>
        )}
      </Subscribe>
    </Container>
  )
}
