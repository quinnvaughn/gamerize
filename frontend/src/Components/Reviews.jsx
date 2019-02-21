import React from 'react'
import styled from 'styled-components'
import StarRatings from 'react-star-ratings'

//local imports
import reviews from '../data/reviews'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 10rem;
`

const Top = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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

const SearchContainer = styled.div`
  flex: 50%;
`

const Search = styled.input``

const ReviewsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Review = styled.div``

export default function Reviews(props) {
  return (
    <Container>
      <Top>
        <NumReviewsAndSearch>
          <NumReviews>{props.numReviews} Reviews</NumReviews>
          <SearchContainer>
            <Search type="text" placeholder="Search Reviews" />
          </SearchContainer>
        </NumReviewsAndSearch>
        <StarRatings
          rating={props.reviews}
          starRatedColor="red"
          numberOfStars={5}
          name="rating"
          starDimension="1.8rem"
          starSpacing=".3rem"
        />
      </Top>
      <ReviewsContainer>
        <Review>Hello</Review>
      </ReviewsContainer>
    </Container>
  )
}
