import React from 'react'
import styled from 'styled-components'
import StarRatings from 'react-star-ratings'

//local imports
import reviews from '../data/reviews'
import Review from './Review'
import ReviewSearchBar from './ReviewSearchBar'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 10rem;
  position: relative;
`

const Top = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 2.4rem;
  border-bottom: 1px solid #dddfe2;
  margin-bottom: 2.4rem;
`

const NumReviewsAndSearch = styled.div`
  width: 100%;
  display: flex;
  font-size: 1.6rem;
  font-weight: 700;
`

const NumReviews = styled.div`
  flex: 50%;
  font-size: 2.4rem;
`

const ReviewsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export default function Reviews(props) {
  return (
    <Container>
      <Top>
        <NumReviewsAndSearch>
          <NumReviews>{props.numReviews} Reviews</NumReviews>
          <ReviewSearchBar />
        </NumReviewsAndSearch>
        <StarRatings
          rating={props.reviews}
          starRatedColor="#f10e0e"
          numberOfStars={5}
          name="rating"
          starDimension="1.8rem"
          starSpacing=".3rem"
        />
      </Top>
      <ReviewsContainer>
        {reviews.map((review, index) => (
          <Review review={review} key={`${review}${index}`} />
        ))}
      </ReviewsContainer>
    </Container>
  )
}
