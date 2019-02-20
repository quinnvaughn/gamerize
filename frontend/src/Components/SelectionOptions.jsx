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
  border-radius: 4px;
  margin-top: 10px;
  padding: 16px 24px 24px;
`

const Price = styled.div`
  font-size: 22px;
  font-weight: 600;
`

const Per = styled.span`
  font-size: 12px;
  font-weight: 600;
`

const NumRatings = styled.span`
  margin-left: 5px;
  color: black;
  font-size: 12px;
  font-weight: 600;
`

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
`

const Top = styled.div`
  padding-bottom: 16px;
  margin-bottom: 24px;
  border-bottom: 1px solid #dddfe2;
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
            starDimension="12px"
            starSpacing="1px"
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
