import React, { Fragment } from 'react'
import styled from 'styled-components'
import StarRatings from 'react-star-ratings'
import { Subscribe } from 'unstated'
import dateFns from 'date-fns'
import { MdClose } from 'react-icons/md'

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
    color: #db1422;
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

const SignInToBook = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
`

export default function SmallSelectionOptions({
  price,
  reviews,
  numReviews,
  system,
  gamer,
  game,
  refetch,
  meRefetch,
  creator,
  close,
  slotsLeftToday,
  me,
  launcher,
}) {
  return (
    <Container>
      <ExitContainer>
        <Exit onClick={close} />
      </ExitContainer>
      <Top>
        <Price>
          {`$${parseFloat(price).toFixed(2)}`} <Per>per slot</Per>
        </Price>
        {/* <RatingContainer>
          <StarRatings
            rating={reviews}
            starRatedColor="#db1422"
            numberOfStars={5}
            name="rating"
            starDimension="1.2rem"
            starSpacing=".1rem"
          />
          <NumReviews>{`${numReviews}`}</NumReviews>
        </RatingContainer> */}
      </Top>
      {me === null ? (
        <SignInToBook>Please sign in to book</SignInToBook>
      ) : (
        <Subscribe to={[SessionsContainer]}>
          {session => (
            <Fragment>
              <HowManySlots>{`${slotsLeftToday} slots left today`}</HowManySlots>
              <TimeSlots gamer={gamer} game={game} />
              <Totals
                price={price}
                refetch={refetch}
                meRefetch={meRefetch}
                me={me}
                creator={creator}
                hasDefaultCard={me && me.hasDefaultCard}
                customerId={me.customerStripeId}
                launcher={launcher}
                system={system}
              />
            </Fragment>
          )}
        </Subscribe>
      )}
    </Container>
  )
}
