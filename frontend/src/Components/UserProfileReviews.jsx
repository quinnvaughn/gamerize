import React from 'react'
import styled from 'styled-components'

//local imports
import UserProfileReview from './UserProfileReview'

const ReviewsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 2.4rem;
`

const Title = styled.div`
  margin-bottom: 2.4rem;
  font-size: 2.2rem;
  font-weight: 800;
  border-bottom: 1px solid #dddfe2;
  padding-bottom: 2.4rem;
`

export default function UserProfileReviews(props) {
  return (
    <ReviewsContainer>
      <Title>{`${props.reviews.length} Reviews`}</Title>
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
