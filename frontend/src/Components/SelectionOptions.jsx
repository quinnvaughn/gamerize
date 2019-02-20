import React from 'react'
import styled from 'styled-components'
import StarRatings from 'react-star-ratings'
import SystemPicker from './SystemPicker'
import TimeSlots from './TimeSlots'
import PlayersOptions from './PlayersOptions'

const Container = styled.div`
  flex: 40%;
  display: flex;
  flex-direction: column;
  border: 1px solid #dddfe2;
  border-radius: 0.4rem;
  margin-top: 1rem;
  padding: 1rem 2.4rem 2.4rem;
`

const Price = styled.div`
  font-size: 2.2rem;
  font-weight: 600;
`

const Per = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
`

const NumRatings = styled.span`
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
  margin-bottom: 2.4rem;
  border-bottom: 0.1rem solid #dddfe2;
`

export default function SelectionOptions({
  price,
  rating,
  numRatings,
  systems,
  players,
}) {
  return (
    <Container>
      <Top>
        <Price>
          {`$${price}`} <Per>per session</Per>
        </Price>
        <RatingContainer>
          <StarRatings
            rating={rating}
            starRatedColor="red"
            numberOfStars={5}
            name="rating"
            starDimension="1.2rem"
            starSpacing=".1rem"
          />
          <NumRatings>{`${numRatings}`}</NumRatings>
        </RatingContainer>
      </Top>
      <SystemPicker systems={systems} />
      <TimeSlots />
      <PlayersOptions players={players} />
    </Container>
  )
}
