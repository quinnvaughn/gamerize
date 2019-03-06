import React from 'react'
import styled from 'styled-components'

//local imports
import UserProfileReview from './UserProfileReview'

const ReviewsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 3.2rem;
`

const Title = styled.div`
  margin-bottom: 2.4rem;
  font-size: 2.2rem;
  font-weight: 800;
`

export default function UserProfileReviews(props) {
  return (
    <ReviewsContainer>
      <Title>{`${props.reviews.length} ${
        props.reviews.length === 1 ? 'Review' : 'Reviews'
      }`}</Title>
      {props.reviews.map((review, index) => (
        <UserProfileReview
          review={review}
          key={`${review}${index}`}
          name={props.name}
          username={props.username}
        />
      ))}
    </ReviewsContainer>
  )
}
